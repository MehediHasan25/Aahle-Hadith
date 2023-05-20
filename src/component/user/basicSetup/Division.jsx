import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GetDivisionCode, GetDivisionList, SaveDivision,DeleteDivision } from "../../../URL/ApiList";

const Division = () => {
  const [division, setDivision] = useState({
    DivisionId:"",
    DivisionNameEn: "",
    DivisionNameBn: "",
    DivisionCode: "",
    AddedBy: localStorage.getItem('userName')
  });

  const [listDivision, setListDivision] = useState([]);
  const [search, setSearch] = useState("");
  const [track, setTrack] = useState(false);
  const [codeDivision, setCodeDivision]= useState("");
  //const [divTrack, setDivTrack]= useState(false);

  useEffect(() => {
    divisionCode();
    getDivision();
  }, []);

  useEffect(() => {
    if(track === true){
      getDivision();
    }

    return (() => {
      setTrack(false);
    })
   
  }, [track]);




  const setDivisionVal = (e) => {
    const { name, value } = e.target;
    setDivision((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const codeDivisionVal = (e)=>{
    setCodeDivision(e.target.value);
  }

  const divisionCode = async () => {
    try{
    let codeDiv = await axios.get(GetDivisionCode);
    let divCode = codeDiv.data.divGenCode;
   // console.log("divCode", divCode);
    setCodeDivision(divCode);
    }catch(err){
      console.log("error",err);
    if (err.response) {
      let message = err.response.data.message;
      alert(message);
    } else if (err.request) {
      alert('Error Connecting ...', err.request);
    } else if (err) {
      alert(err.toString());
    }
    }
  };

  const getDivision = async () => {
    try{
      let divGet = await axios.get(GetDivisionList);
      let getDivList = divGet.data._divisionList;
      setListDivision(getDivList);
    }catch(err){
      console.log("error",err);
    if (err.response) {
      let message = err.response.data.message;
      alert(message);
    } else if (err.request) {
      alert('Error Connecting ...', err.request);
    } else if (err) {
      alert(err.toString());
    }
    }
  }


  const handleSubmit = async (e) => {
    
    const {DivisionId,DivisionNameEn,DivisionNameBn,AddedBy} = division;
    e.preventDefault();
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };
    let payload = {
      DivisionId:DivisionId === "" ? 0 : DivisionId,
      DivisionNameEn: DivisionNameEn,
      DivisionNameBn: DivisionNameBn,
      DivisionCode: codeDivision,
      AddedBy: AddedBy
    }


   // console.log("Payload", payload);
    
    try {
      let saveDiv = await axios.post(SaveDivision, payload, { headers });
     // console.log("saveDiv", saveDiv.data.success);

      let newData = saveDiv.data.success;
       
      if(newData === true){
        if(DivisionId > 0){
          toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
        
        }else{
          toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});  
        
        }
        
        divisionCode();
        setTrack(true);
        setDivision({
          ...division,
          DivisionId:"",
          DivisionNameEn: "",
          DivisionNameBn: "",
        });

      }        

    } catch (error) {
      console.log(error);
      if (error.response) {
        let message = error.response.data.message;
        alert(message);
      } else if (error.request) {
        alert('Error Connecting ...', error.request);
      } else if (error) {
        alert(error.toString());
      }
    }
 }


 const handleEdit =(editData) =>{
  //console.log("Edit", editData);
  const {divisionId,divisionNameEn,divisionNameBn,divisionCode,addedBy} = editData;
  setCodeDivision(divisionCode);
  setDivision({
    ...division,
    DivisionId: divisionId,
    DivisionNameEn:divisionNameEn,
    DivisionNameBn: divisionNameBn,
    AddedBy:localStorage.getItem('userName')
  });
 }


 const handleDelete = async(id) =>{
  //console.log("id",id);
 
  try{
   let deleteData = await axios.get(DeleteDivision+id);
   console.log("deleteRes", deleteData.data);
   let resDel = deleteData.data.success;

   if(resDel === true){
    toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
    divisionCode();
    setTrack(true);
   }
  }catch(err){
    console.log("error",err);
    if (err.response) {
      let message = err.response.data.message;
      alert(message);
    } else if (err.request) {
      alert('Error Connecting ...', err.request);
    } else if (err) {
      alert(err.toString());
    }
  }
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
                    name="codeDivision"
                    onChange={codeDivisionVal}
                    value={codeDivision}
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
                type="text"
                className="form-control me-2"
                placeholder="Search By Division Name (English)"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Division(English)</th>
                  <th>Division(Bangla)</th>
                  <th>Code</th>
                  <th colSpan="2"> Action</th>

                </tr>
              </thead>
              <tbody>
                {listDivision.filter((item)=>{
                  return search.toLowerCase()==="" ? item : item.divisionNameEn.toLowerCase().includes(search.toLowerCase())
                  }).map(item => (
                  <tr key={item.divisionId}>
                    <td>{item.divisionNameEn}</td>
                    <td>{item.divisionNameBn}</td>
                    <td>{item.divisionCode}</td>
                    <td onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.divisionId)}><BsTrash /></td>
                    <td onClick={() => handleEdit(item)}><BiEditAlt /></td>
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
