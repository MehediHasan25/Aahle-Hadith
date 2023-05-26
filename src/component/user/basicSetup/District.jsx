import React, { useState, useEffect } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetDistrictCode,SaveDistrict,DeleteDistrict } from '../../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
import '../../../css/AutoComplete.css';

const District = () => {
  // Division autoComplete////
  const [asearch, setAsearch] = useState("");
  const [listDivision, setListDivision] = useState([]);
  const [selectVal, setSelectVal] = useState("");
  // Division autoComplete////

  const [listDistrict, setListDistrict] = useState([]);
  const [district, setDistrict] = useState({
    DistrictId: "",
    DivisionId: "",
    DistrictNameEn: "",
    DistrictNameBn: "",
    DistrictCode: "",
    AddedBy: localStorage.getItem('userName')
  });

  const [codeDistrict, setCodeDistrict] = useState("");
  const [track, setTrack] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getDivisionData();
    getDistrictData();
    districtCode();
  }, []);

  useEffect(() => {
    if(track === true){
      getDistrictData();
    }

    return (() => {
      setTrack(false);
    })
   
  }, [track]);

  const getDivisionData = async () => {
    try {
      let divGet = await axios.get(GetDivisionList);
      let getDivList = divGet.data._divisionList;

      setListDivision(getDivList);
    } catch (err) {
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
        }
    }
  }

  const districtCode = async () => {
    try {
      let codeDis = await axios.get(GetDistrictCode);
      let disCode = codeDis.data.disGenCode;
      //console.log("disCode", codeDis.data.disGenCode);
      setCodeDistrict(disCode);
    } catch (err) {
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
        }
    }
  };

  const getDistrictData = async () => {
    try {
      let distData = await axios.get(GetDistrictList);
      //console.log("distData", distData.data._districtList);
      let getDistrictData = distData.data._districtList;
      setListDistrict(getDistrictData);
    } catch (err) {
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
        }

    }
  }


  const onChange = (e) => {
    setAsearch(e.target.value);
  }

  const onSearch = (searchTerm, val) => {
    setAsearch(searchTerm);
    setSelectVal(val);
    // console.log("search", searchTerm);
    // console.log("idvAL", val);

  }

  const handleDistrictChange = (e) => {
    const { name, value } = e.target;
    setDistrict((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };

  const handleDistrictCode = (e) => {
    setCodeDistrict(e.target.value);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const {DistrictId,DistrictNameEn,DistrictNameBn,AddedBy} = district;
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    let divisionArr = listDivision.map(item=> item.divisionNameEn);

    if(asearch === ""){
      toast.error('Please Enter Division',{duration: 5000,position: 'top-center'});
      return;
    }

    if(divisionArr.includes(asearch) === false){
      toast.error('Invalid Division Name... Select from Auto Complete',{duration: 5000,position: 'top-center'});
      return;
    }

    if(DistrictNameEn === ""){
      toast.error('Please Enter Name of District (English)',{duration: 5000,position: 'top-center'});
      return;
    }

    if(DistrictNameEn === ""){
      toast.error('Please Enter Name of District (Bangla)',{duration: 5000,position: 'top-center'});
      return;
    }


    let payload = {
      DistrictId: DistrictId === "" ? 0 : DistrictId,
      DivisionId:selectVal, 
      DistrictNameEn:DistrictNameEn,
      DistrictNameBn:DistrictNameBn,
      DistrictCode:codeDistrict,
      AddedBy: AddedBy
    }
    console.log("submitPayload", payload);

    try{
      let saveDis = await axios.post(SaveDistrict,payload,{ headers });
      let subDisData = saveDis.data.success;
      if(subDisData=== true){
        if(DistrictId > 0){
          toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
        
        }else{
          toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});  
        
        }

        districtCode();
        setTrack(true);
        setDistrict({
          ...district,
          DivisionId: "",
          DistrictNameEn: "",
          DistrictNameBn: ""
        });
        setAsearch("");
      }

    }catch(err){
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
        }
    }
  }

  const handleEdit = (editData) =>{
   // console.log("edit",editData);
    setDistrict({
      ...district,
      DistrictId: editData.districtId,
      DistrictNameEn: editData.districtNameEn,
      DistrictNameBn: editData.districtNameBn,
      AddedBy: localStorage.getItem('userName')
    });

    setAsearch(editData.divisionNameEn);
    setSelectVal(editData.divisionId);
    setCodeDistrict(editData.districtCode);



  };

  const handleDelete = async(id) =>{
    //console.log("id",id);
   
    try{
     let deleteData = await axios.get(DeleteDistrict+id);
     //console.log("deleteRes", deleteData.data);
     let resDel = deleteData.data.success;
  
     if(resDel === true){
      toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
      districtCode();
      setTrack(true);
     }
    }catch(err){
      console.log("error",err);
        if (err.response) {
          let message = err.response.data.message;
          toast.error(message,{duration: 5000,position: 'top-center'});
        } else if (err.request) {
          console.log('Error Connecting ...', err.request);
          toast.error('Error Connecting ...',{duration: 5000,position: 'top-center'});
        } else if (err) {
          console.log(err.toString());
          toast.error(err.toString(),{duration: 5000,position: 'top-center'});
        }
    }
   }
  




  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>District</h3>
      </div>
      <div className="row pt-2">
        <div className="col-md-6">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Division
                </label>
                <div className="col-md-8">
                  <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Enter Division Name (English)"
                        name="asearch"
                        onChange={onChange}
                        value={asearch}
                        autoComplete='off'
                        // style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listDivision.filter(item => {
                          const searchTerm = asearch.toLowerCase();
                          const fullName = item.divisionNameEn.toLowerCase();

                          return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.divisionId}
                              onClick={() => onSearch(item.divisionNameEn, item.divisionId)}
                              className='dropdown-row'>
                              {item.divisionNameEn}
                            </div>
                          ))
                      }
                    </div>
                  </div>

                </div>

              </div>

              < div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of District
                </label>
                <div className="col-md-8">
                  {/*  */}
                  <input
                    type="text"
                    placeholder="Enter District Name (English)"
                    name="DistrictNameEn"
                    onChange={handleDistrictChange}
                    value={district.DistrictNameEn}
                    autoComplete='off'
                  />
                  {/*  */}
                </div>
              </div>

              < div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of District (Bangla)
                </label>
                <div className="col-md-8">
                  {/*  */}
                  <input
                    type="text"
                    placeholder="Enter District Name (Bangla)"
                    name="DistrictNameBn"
                    onChange={handleDistrictChange}
                    value={district.DistrictNameBn}
                    autoComplete='off' />
                  {/*  */}
                </div>
              </div>


              < div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  District Code
                </label>
                <div className="col-md-8">
                  {/*  */}
                  <input
                    type="text"
                    placeholder="Enter District Code"
                    name="codeDistrict"
                    onChange={handleDistrictCode}
                    value={codeDistrict}
                    disabled
                    autoComplete='off'
                  />
                  {/*  */}
                </div>
              </div>


              <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={(e)=> handleSubmit(e)}>Submit</button>
              </div>

            </form>
          </div>
        </div>

      </div>

      <div className="row pt-4">
        <div className="col-md-8">
          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search by District Name"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Action</th>
                  <th>Division</th>
                  <th>Division(Bangla)</th>
                  <th>District</th>
                  <th>District(Bangla)</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody>
                {
                  listDistrict.filter((item) => {
                    return search.toLowerCase() === "" ? item : item.districtNameEn.toLowerCase().includes(search.toLowerCase())||item.districtNameBn.toLowerCase().includes(search.toLowerCase())
                  }).map((item) => (

                    <tr key={item.districtId}>
                       <td>
                      <div className="act_icon">

                      <span  onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.districtId)}><BsTrash /></span>
                      <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                      </div>
                    </td>
                      <td>{item.divisionNameEn}</td>
                      <td>{item.divisionNameBn}</td>
                      <td>{item.districtNameEn}</td>
                      <td>{item.districtNameBn}</td>
                      <td>{item.districtCode}</td>
                      {/* <td onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.districtId)}><BsTrash /></td>
                      <td onClick={() => handleEdit(item)}><BiEditAlt /></td> */}
                    </tr>

                  ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default District