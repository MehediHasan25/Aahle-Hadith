import React, { useEffect, useState,useRef } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../../css/AutoComplete.css';
import { GetDivisionList,GetDistrictList,GetUpazilaList,GetUpazilaCode,SaveUpazila,DeleteUpazila } from '../../../URL/ApiList';
import withAuthentication from '../../Protected/withAuthentication';


const Upazila = () => {
   // Division autoComplete////
   const [divSearch, setDivSearch] = useState("");
   const [listDivision, setListDivision] = useState([]);
   const [selectDivVal, setSelectDivVal] = useState("");
   // Division autoComplete////
 
   // District autoComplete////
 const [disSearch, setDisSearch] = useState("");
 const [listDistrict, setListDistrict] = useState([]);
 const [selectDisVal, setSelectDisVal] = useState("");
 // District autoComplete////

 const [upazila, setUpazila] = useState({
    UpazilaId:"",
    UpazilaNameEn:"",
    UpazilaNameBn:"",
    AddedBy:localStorage.getItem('userName')
 });
 
 const [listUpazila, setListUpazila] = useState([]);

 const [codeUpazila, setCodeUpazila] = useState("");
 const [search,setSearch] = useState("");
 const [track,setTrack] = useState(false);

//  Division AutoComplete state
const [showSuggDivision, setShowSuggDivision] = useState(false);
const divisionSugg = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(divSearch.toLowerCase()))

//  Division AutoComplete state
// District Auto Complete State
const [showSuggDistrict, setShowSuggDistrict] = useState(false);
const districtSugg = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(disSearch.toLowerCase()) && option.divisionNameEn === divSearch);
//console.log("dis", districtSugg);
// District Auto Complete State

 useEffect(()=>{
  getDivisionData();
  getDistrictData();
  getUpazila();
  upazilaCode();
 },[]);


 useEffect(() => {
  if(track === true){
    getUpazila();
  }

  return (() => {
    setTrack(false);
  })
 
}, [track]);


//  Division dropdown
//  const handleDivSearchChange = (e) => {
//   setDivSearch(e.target.value);
// }  

// const handleDivSearch = (searchTerm, val) => {
//   setDivSearch(searchTerm);
//   setSelectDivVal(val);
//   //console.log("divsearch", searchTerm);
//   //console.log("divId", val);

// }

const autocompleteDivRef = useRef();
useEffect(() => {
  const handleDivClick = (event) => {
    if (autocompleteDivRef.current && !autocompleteDivRef.current.contains(event.target)) {
      setShowSuggDivision(false)
    }
  };
  document.addEventListener("click", handleDivClick);
  return () => {
    document.removeEventListener("click", handleDivClick)
  }
}, [])

const handleDivChange = e => {
  setDivSearch(e.target.value);
}

const handleSuggestionDivClick = (suggetion) => {
  console.log("suggestion", suggetion.divisionNameEn);
  setDivSearch(suggetion.divisionNameEn);
  setSelectDivVal(suggetion.divisionId);
  setShowSuggDivision(false);
}


// Division dropdown

// District Dropdown
// const handleDistSearchChange = (e) => {
//   setDisSearch(e.target.value);
// }  

// const handleDistSearch = (searchTerm, val) => {
//   setDisSearch(searchTerm);
//   setSelectDisVal(val);
//   //console.log("diSsearch", searchTerm);
//   //console.log("disId", val);

// }

const autocompleteDisRef = useRef();
useEffect(() => {
  const handleDisClick = (event) => {
    if (autocompleteDisRef.current && !autocompleteDisRef.current.contains(event.target)) {
      setShowSuggDistrict(false)
    }
  };
  document.addEventListener("click", handleDisClick);
  return () => {
    document.removeEventListener("click", handleDisClick)
  }
}, [])

const handleDisChange = e => {
  setDisSearch(e.target.value);
}

const handleSuggestionDisClick = (suggetion) => {
  //console.log("suggestion", suggetion.divisionNameEn);
  setDisSearch(suggetion.districtNameEn);
  setSelectDisVal(suggetion.districtId);
  setShowSuggDistrict(false);
}


// District dropdown

// Upzila Code //////
const handleUpazilaCode = (e)=>{
  setCodeUpazila(e.target.value);
}
// Upzila code

// // Search bar handle Search
const handleSearch = (e) => {
  setSearch(e.target.value);
};
// Search bar handle Search

const handleChange = (e) => {
  const { name, value } = e.target;
  setUpazila((prev) => {
    return {
      ...prev,
      [name]: value
    }
  })
};

const getDivisionData = async () => {
  try {
    let divGet = await axios.get(GetDivisionList);
    let getDivList = divGet.data._divisionList;
    //console.log("division", getDivList);
    setListDivision(getDivList);
  } catch (err) {
    console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
  }
}

const getDistrictData = async () => {
  try {
    let distData = await axios.get(GetDistrictList);
    //console.log("distData", distData.data._districtList);
    let getDistrictData = distData.data._districtList;
    setListDistrict(getDistrictData);
  } catch (err) {
    console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }

  }
}

const getUpazila = async(e) =>{
  try{
    let upaData = await axios.get(GetUpazilaList);
    //console.log("upaDataList", upaData.data._upazilaList);
    let getUpaData = upaData.data._upazilaList;
    setListUpazila(getUpaData);
  }catch(err){
    console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
  }
}

const upazilaCode = async() =>{
  try{
    let codeUpazila = await axios.get(GetUpazilaCode);
    //console.log("codeUpazila",codeUpazila.data);
    let getCodeUpazila = codeUpazila.data.upaGenCode;
    setCodeUpazila(getCodeUpazila);
  }catch(err){
    console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
  }
}

const handleSubmit =async(e) =>{
  e.preventDefault();
  const {UpazilaId,UpazilaNameEn,UpazilaNameBn,AddedBy}= upazila;
  let token = localStorage.getItem("AuthToken");
  const headers = { 'Authorization': 'Bearer ' + token };

  const getDivData = listDivision.map(item=> item.divisionNameEn);
  const getDisData = listDistrict.filter(item=>item.divisionNameEn === divSearch).map(item=> item.districtNameEn);
  
  if(divSearch === ""){
    toast.error('Please Enter Name of Division',{duration: 5000,position: 'top-center'});
    return;
  }

  if(getDivData.includes(divSearch)=== false){
   // alert("No Match found on District. Please type your desired district and Select it by autoSearch");
   toast.error('Invalid Division Select .. Please Select Using Auto Complete',{duration: 5000,position: 'top-center'});
    return;
  }

  if(disSearch === ""){
    toast.error('Please Enter Name of District',{duration: 5000,position: 'top-center'});
  }

  if(getDisData.includes(disSearch) === false){
    //alert("No Match found on District. Please type your desired district and Select it by autoSearch");
    toast.error('Invalid District Select .. Please Select Using Auto Complete',{duration: 5000,position: 'top-center'});
    return;
  }

  if(UpazilaNameEn === ""){
    //alert("Please Enter Upzila Name English");
    toast.error("Please Enter Upzila Name English",{duration: 5000,position: 'top-center'});
    return;
  }

  if(UpazilaNameBn === ""){
    //alert("Please Enter Upazila Name Bangla");
    toast.error("Please Enter Upazila Name Bangla",{duration: 5000,position: 'top-center'});
    return;
  }

  let payload = {
    UpazilaId: UpazilaId === "" ? 0 : UpazilaId,
    DistrictId: selectDisVal,
    DivisionId:selectDivVal, 
    UpazilaNameEn:UpazilaNameEn,
    UpazilaNameBn:UpazilaNameBn,
    UpazilaCode:codeUpazila,
    AddedBy: AddedBy
  }
  console.log("submitPayload", payload);
  try{
    let submitData = await axios.post(SaveUpazila,payload,{headers});
    let subSuccess = submitData.data.success;
    if(subSuccess=== true){
      if(UpazilaId > 0){
        toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
      
      }else{
        toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});   
      }

    upazilaCode();
    setTrack(true);
    setUpazila({
      ...upazila,
      UpazilaId:"",
      UpazilaNameEn:"",
      UpazilaNameBn:""
    });

    setDivSearch("");
    setDisSearch("");
    }
  
  }catch(err){
    console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
  }
}

const handleEdit =(editData) =>{
 // console.log("edit",editData);
  setUpazila({
    UpazilaId:editData.upazilaId,
    UpazilaNameEn:editData.upazilaNameEn,
    UpazilaNameBn:editData.upazilaNameBn,
    AddedBy:localStorage.getItem('userName')
  });
  setCodeUpazila(editData.upazilaCode);
  setDivSearch(editData.divisionNameEn)
  setSelectDivVal(editData.divisionId);
  setDisSearch(editData.districtNameEn);
  setSelectDisVal(editData.districtId);
}


const handleDelete = async(id) =>{
  try{
    let deleteData = await axios.get(DeleteUpazila+id);
    // console.log("deleteRes", deleteData.data);
     let resDel = deleteData.data.success;
  
     if(resDel === true){
      toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
      upazilaCode();
      setTrack(true);
     }

  }catch(err){
           console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";;
                toast.error(message, { duration: 5000, position: 'top-center' });
            } else if (err.request) {
                console.log('Error Connecting ...', err.request);
                toast.error('Error Connecting ...', { duration: 5000, position: 'top-center' });
            } else if (err) {
                console.log(err.toString());
                toast.error(err.toString(), { duration: 5000, position: 'top-center' });
            }
  }
}



  return (
    <div className="page-content p-4">
    <div className="pg_title">
      <h3>Upazila</h3>
    </div>
    <div className="row pt-2">
      <div className="col-md-6">
        <div className="form card p-3">
          <form action="" className="form-horizontal">
          <div className="mb-3 row">
              {/* Start */}
          <label className="col-md-4 col-form-label">
                  Name of Division
                </label>
                <div className="col-md-8">


                  {/* <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Enter Division Name (English)"
                        name="divSearch"
                        onChange={handleDivSearchChange}
                        value={divSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listDivision.filter(item => {
                          const searchTerm = divSearch.toLowerCase();
                          const fullName = item.divisionNameEn.toLowerCase();

                          return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.divisionId}
                              onClick={() => handleDivSearch(item.divisionNameEn, item.divisionId)}
                              className='dropdown-row'>
                              {item.divisionNameEn}
                            </div>
                          ))
                      }
                    </div>
                  </div> */}

                  {/*  */}
                  <div className="autocomplete" ref={autocompleteDivRef}>
                    <input
                      value={divSearch}
                      onChange={handleDivChange}
                      placeholder="Search Division"
                      onFocus={() => setShowSuggDivision(true)}
                    />
                    {showSuggDivision && (
                      <ul className="suggestions">
                        {divisionSugg.map(suggestion => (
                          <li onClick={() => handleSuggestionDivClick(suggestion)} key={suggestion.divisionId}>
                            {suggestion.divisionNameEn}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  {/*  */}

                  

                </div>
            {/* End */}
            
            </div>
            <div className="mb-3 row">
                    {/* start */}
                    <label className="col-md-4 col-form-label">
                  Name of District
                </label>
                <div className="col-md-8">
                  {/* <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Enter District Name (English)"
                        name="disSearch"
                        onChange={handleDistSearchChange}
                        value={disSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listDistrict.filter(item=> item.divisionNameEn === divSearch)
                        .filter(item => {
                          const searchTerm = disSearch.toLowerCase();
                          const fullName = item.districtNameEn.toLowerCase();
                          return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.districtId}
                              onClick={() => handleDistSearch(item.districtNameEn, item.districtId)}
                              className='dropdown-row'>
                              {item.districtNameEn}
                            </div>
                          ))
                      }
                    </div>
                  </div> */}

                  {/*  */}
                  <div className="autocomplete" ref={autocompleteDisRef}>
                    <input
                      value={disSearch}
                      onChange={handleDisChange}
                      placeholder="Search District"
                      onFocus={() => setShowSuggDistrict(true)}
                    />
                    {showSuggDistrict && (
                      <ul className="suggestions">
                        {districtSugg.map(suggestion => (
                          <li onClick={() => handleSuggestionDisClick(suggestion)} key={suggestion.districtId}>
                            {suggestion.districtNameEn  }
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  {/*  */}

                </div>
                      {/* End */}
            </div>

            <div className="mb-3 row">
              <label className="col-md-4 col-form-label">
                Name of Upazila
              </label>
              <div className="col-md-8">
                <input
                   type="text"
                   placeholder="Enter Upazila Name (English)"
                   name="UpazilaNameEn"
                   onChange={handleChange}
                   value={upazila.UpazilaNameEn}
                   autoComplete='off' 
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label">
                Name of Upazila(Bangla)
              </label>
              <div className="col-md-8">
                <input
                 type="text"
                 placeholder="Enter Upazila Name (Bangla)"
                 name="UpazilaNameBn"
                 onChange={handleChange}
                 value={upazila.UpazilaNameBn}
                 autoComplete='off' 
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label">Upazila Code</label>
              <div className="col-md-8">
                <input
                  type="text"
                  placeholder="Enter Upazila Code"
                  name="codeUpazila"
                  onChange={handleUpazilaCode}
                  value={codeUpazila}
                  disabled
                  autoComplete='off'
                />
              </div>
            </div>
            <div className="text-end">
         <button type="button" className="btn btn-sm btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
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
                placeholder="Search by Upazila Name"
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
                  <th>Division (Bangla)</th>
                  <th>District</th>
                  <th>District (Bangla)</th>
                  <th>Upazila</th>
                  <th>Upazila (Bangla)</th>
                  <th>Upazila Code </th>

                </tr>
              </thead>
              <tbody>
                {listUpazila.filter((item) => {
                    return search.toLowerCase() === "" ? item : item.upazilaNameEn.toLowerCase().includes(search.toLowerCase()) || item.upazilaNameBn.toLowerCase().includes(search.toLowerCase())
                  }).map((item)=>(
                   <tr key={item.upazilaId}>
                    <td>
                      <div className="act_icon">
                      <span onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.upazilaId)}><BsTrash /></span>
                      <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                      </div>
                    </td>
                   <td>{item.divisionNameEn}</td>
                   <td>{item.divisionNameBn}</td>
                   <td>{item.districtNameEn}</td>
                   <td>{item.districtNameBn}</td>
                   <td>{item.upazilaNameEn}</td>
                   <td>{item.upazilaNameBn}</td>
                   <td>{item.upazilaCode}</td>
                   {/* <td onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.upazilaId)}><BsTrash/></td>
                 <td onClick={() => handleEdit(item)}><BiEditAlt/></td> */}
                 </tr>
                ))
                 
                }
                

              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
  )
}

export default withAuthentication(Upazila);