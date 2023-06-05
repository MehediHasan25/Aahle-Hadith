import React, { useEffect, useState } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SaveOccupation, GetOccupationList,DeleteOccupation } from '../../../URL/ApiList';
import withAuthentication from '../../Protected/withAuthentication';
import { useNavigate } from 'react-router-dom';

const Occupation = () => {
    const [occupation, setOccupation] = useState({
        OccupationId: "",
        OccupationName: "",
        OccupationNameBng: "",
        sts:true
    });

    const [listOccupation, setListOccupation] = useState([]);
    const [search, setSearch] = useState("");
    const [track, setTrack] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getOccupation();
    }, []);

    useEffect(() => {
        if(track === true){
            getOccupation();
        }
    
        return (() => {
          setTrack(false);
        })
       
      }, [track]);



    const handleOccupationChange = (e) => {
        const { name, value } = e.target;
        setOccupation((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    const getOccupation = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
        try {
            let getOcc = await axios.get(GetOccupationList, { headers });
            // console.log("list", getOcc.data._listData);
            let occupationSet = getOcc.data._listData;
            setListOccupation(occupationSet);
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


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const {OccupationId,OccupationName,OccupationNameBng,sts} = occupation;
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        if(OccupationName === ""){
            toast.error('Please Enter Occupation Name',{duration: 5000,position: 'top-center'});
            return;
        }

        if(OccupationNameBng === ""){
            toast.error('Please Enter Occupation Name Bangla',{duration: 5000,position: 'top-center'});
            return;
        }

        const payload = {
            OccupationId: OccupationId === "" ? 0 : OccupationId,
            OccupationName: OccupationName,
            OccupationNameBng: OccupationNameBng,
            sts:sts
        };

        // console.log("Submit", payload);

        try{
            let saveOccp = await axios.post(SaveOccupation, payload, {headers});
            console.log("SaveRes", saveOccp.data.success);
            let occSave = saveOccp.data.success;
            
            if(occSave === true){
                if(OccupationId > 0){
                  toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
                
                }else{
                  toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});  
                
                }

                setTrack(true);
                setOccupation({
                ...occupation,
                OccupationId: "",
                OccupationName: "",
                OccupationNameBng: ""
                });
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



    const handleEdit = (editData)=>{
        // console.log(editData);
        const {occupationId,occupationName,occupationNameBng} = editData;
        setOccupation({
            ...occupation,
            OccupationId: occupationId,
            OccupationName: occupationName,
            OccupationNameBng: occupationNameBng
        });
    }


    const handleDelete = async(id) =>{
        // console.log("id",id);
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
       
        try{
         let deleteData = await axios.get(DeleteOccupation+id, {headers});
         let resDel = deleteData.data.success;
      
         if(resDel === true){
          toast.success('Successfully Deleted!',{duration: 4000,position: 'top-center'});  
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
                <h3>Occupation</h3>
            </div>

            <div className="row pt-2">
                <div className="col-md-12">
                    <div className="form card p-3">
                        <form action="" className="form-horizontal">
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Occupation 
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Occupation Name "
                                        name="OccupationName"
                                        onChange={handleOccupationChange}
                                        value={occupation.OccupationName}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Occupation (Bangla)
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Occupation Name (Bangla)"
                                        name="OccupationNameBng"
                                        onChange={handleOccupationChange}
                                        value={occupation.OccupationNameBng}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                <button type="button" className="btn btn-md btn-danger" onClick={() => navigate("/dashboard")}>Close</button>
                <button type="button" className="btn btn-md btn-warning" onClick={() =>  window.location.reload()}>Refresh</button>
                <button type="button" className="btn btn-md btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
                            {/* <div className="text-end">
                                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
                            </div> */}
                        </form>
                    </div>
                </div>

            </div>

            <div className="row pt-4">
            <div className="col-md-12">
          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search By Occupation Name"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>
            <table className="table table-striped table-bordered">
              <thead className='bg-success'>
                <tr>
                  <th> Action</th>
                  <th>Name of Occupation</th>
                  <th>Name of Occupation (Bangla)</th>

                </tr>
              </thead>
              <tbody>
                {listOccupation.filter((item)=>{
                  return search.toLowerCase()==="" ? item : item.occupationName.toLowerCase().includes(search.toLowerCase()) || item.occupationNameBng.toLowerCase().includes(search.toLowerCase())
                  }).map(item => (
                  <tr key={item.occupationId}>
                    <td>
                      <div className="act_icon">

                      <span  onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.occupationId)}><BsTrash /></span>
                      <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                      </div>
                    </td>
                    <td>{item.occupationName}</td>
                    <td>{item.occupationNameBng}</td>
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

export default withAuthentication(Occupation);