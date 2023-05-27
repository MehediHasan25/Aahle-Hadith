import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GetEnrollmentData,DeleteEnrollData,GetEnrollmentDataBySearch } from "../../URL/ApiList";

const EnrollmentUpdate = () => {
    const [listEnrollData, setListEnrollData] = useState([]);
    const [search, setSearch] = useState("");
    const [track, setTrack] = useState(false);
    const [enrollSearch, setEnrollSearch] = useState({
      actualId:"",
      organizationalId:""
    });
    
    const navigate = useNavigate();


    useEffect(()=>{
        getEnrollmentData();
    },[]);


    useEffect(() => {
        if(track === true){
            getEnrollmentData();
        }
    
        return (() => {
          setTrack(false);
        })
       
      }, [track]);


      const handleChange = (e) => {
        const { name, value } = e.target;
        setEnrollSearch((prev) => {
          return {
            ...prev,
            [name]: value
          }
        })
      };


    const getEnrollmentData =async() =>{
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
        try{
            let enrolData = await axios.get(GetEnrollmentData, {headers});
            // debugger;
            if(enrolData.data.success === true){
                // debugger;
                let allData = enrolData.data._listData === null ? [] : enrolData.data._listData;
                // console.log("enrollData", allData);
                setListEnrollData(allData)
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
      };


      const handleDelete = async(id) =>{
        console.log("id",id);
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
       
        try{
         let deleteData = await axios.get(DeleteEnrollData+id,{headers});
         //console.log("deleteRes", deleteData.data);
         let resDel = deleteData.data.success;
         console.log("delteRes", resDel);
      
         if(resDel === true){
          toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
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


       const handleSearchSubmit = async(e) =>{
        e.preventDefault();
        const {actualId,organizationalId} = enrollSearch;
        const apiParams = `DonerActualId=${actualId}&OrganisationalId=${organizationalId}`;

        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        console.log("parmsData",apiParams);

        try{
          let subSearch = await axios.get(GetEnrollmentDataBySearch+apiParams,{headers});
          console.log("subSearch",subSearch.data);
          let searchRes = subSearch.data;


          if(searchRes.success === true){
            setListEnrollData(searchRes._listData);
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

       const handleEdit = (id) =>{
        //console.log("Donar Id", id);
        // navigate('/donar-update', { state: { donarId: id} });
        navigate('/donar-update', { state: { donarId: id } });

       }


  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Enrollment Update</h3>
      </div>

      <div className="row pt-2">
        <div className="col-md-8">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Actual ID
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Actual ID"
                    name="actualId"
                    onChange={handleChange}
                    value={enrollSearch.actualId}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                Oraganizational ID
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Oraganizational ID"
                    name="organizationalId"
                    onChange={handleChange}
                    value={enrollSearch.organizationalId}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={handleSearchSubmit}>Search</button>
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
                placeholder="Search By Donar Name or Mobile No"
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
                  <th>Donar Enrollemnt Id</th>
                  <th>Donar Enrollemnt Date</th>
                  <th>Donar Name</th>
                  <th>Mobile No</th>
                  <th>Net Amount</th>
                  <th>Present Address</th>
                </tr>
              </thead>
              <tbody>
                {listEnrollData.filter((item)=>{
                  return search.toLowerCase()==="" ? item : item.donerName.toLowerCase().includes(search.toLowerCase()) || item.mobileNo.toLowerCase().includes(search.toLowerCase())
                  }).map(item => (
                  <tr key={item.donerEnrollmentId}>
                    <td>
                      <div className="act_icon">

                      <span  onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.donerEnrollmentId)}><BsTrash /></span>
                      <span onClick={() => handleEdit(item.donerEnrollmentId)}><BiEditAlt /></span>
                      </div>
                    </td>
                    <td>{item.donerEnrollmentId}</td>
                    <td>{item.enrollmentDate}</td>
                    <td>{item.donerName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.netAmount}</td>
                    <td>{item.preAddress}</td>
                    
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

export default EnrollmentUpdate