import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { GetDivisionCode, GetDivisionList, SaveDivision } from "../../../URL/ApiList";

const Division = () => {
  const [division, setDivision] = useState({
    DivisionNameEn: "",
    DivisionNameBn: "",
    DivisionCode: "",
    AddedBy: localStorage.getItem('userName')
  });

  const [listDivision, setListDivision] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    divisionCode();
    getDivision();
  }, []);

  useEffect(() => {
    console.log("useE",isUpdate);
    if(isUpdate === true){
      getDivision();
    }
   
  }, [isUpdate]);


  const setDivisionVal = (e) => {
    const { name, value } = e.target;
    setDivision((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const divisionCode = async () => {
    let codeDiv = await axios.get(GetDivisionCode);
    let divCode = codeDiv.data.divGenCode;
    setDivision({ ...division, DivisionCode: divCode });
  };

  const getDivision = async () => {
    let divGet = await axios.get(GetDivisionList);
    let getDivList = divGet.data._divisionList;
    //console.log("divisionList",divGet.data._divisionList);
    setListDivision(getDivList);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };
    console.log("divisionState", division);
    console.log("up1",isUpdate);
    try {
      let saveDiv = await axios.post(SaveDivision, division, { headers });

     
      console.log("saveDiv", saveDiv.data.success);
      let newData = saveDiv.data.success;
      if(newData === true){
        setIsUpdate(current => !current);
      }
      console.log("up2",isUpdate);
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }


    //setUpTableData("");
    
  }




  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Division</h3>
      </div>
      <div className="row pt-4">
        <div className="col-md-6">
          <div className="form">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Division
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Division Name (English)"
                    name="DivisionNameEn"
                    onChange={setDivisionVal}
                    value={division.DivisionNameEn}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Division(Bangla)
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Division Name (Bangla)"
                    name="DivisionNameBn"
                    onChange={setDivisionVal}
                    value={division.DivisionNameBn}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Division Code</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Division Code"
                    name="DivisionCode"
                    onChange={setDivisionVal}
                    value={division.DivisionCode}
                    disabled
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>
      <div className="row pt-4">
        <div className="col-md-6">
          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
              />
            </form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Division(English)</th>
                  <th>Division(Bangla)</th>
                  <th>Code</th>
                  <th colspan="2"> Action</th>

                </tr>
              </thead>
              <tbody>
                {listDivision.map(item => (
                  <tr key={item.divisionId}>
                    <td>{item.divisionNameEn}</td>
                    <td>{item.divisionNameBn}</td>
                    <td>{item.divisionCode}</td>
                    <td onClick={() => handleDelete(item.divisionId)}><BsTrash /></td>
                    <td onClick={() => handleEdit(item.divisionId)}><BiEditAlt /></td>
                  </tr>
                ))}
              </tbody>


            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Division;
