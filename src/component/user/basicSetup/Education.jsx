import React, { useEffect, useState } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { SaveEducation,GetEducationList,DeleteEducaiton } from '../../../URL/ApiList';
import withAuthentication from '../../Protected/withAuthentication';

const Education = () => {
    const [education, setEducation] = useState({
        EduQualificationId:"",
        EduQualification:"",
        EduQualificationBng:"",
        sts:true
    });

    const [listEducation, setListEducation] = useState([]);
    const [search, setSearch] = useState("");
    const [track, setTrack] = useState(false);

    useEffect(()=>{
        getEduList();
    },[]);

    useEffect(() => {
        if(track === true){
            getEduList();
        }
    
        return (() => {
          setTrack(false);
        })
       
      }, [track]);
      

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducation((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };


    const handleSearch = (e) => {
        setSearch(e.target.value);
    };



    const getEduList = async() =>{
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try{
            let eduList = await axios.get(GetEducationList, {headers});
           // console.log("listedu", eduList.data._listData);
            let getListEdu = eduList.data._listData;
            setListEducation(getListEdu);
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


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {EduQualificationId,EduQualification,EduQualificationBng,sts} = education;
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        if(EduQualification === ""){
            toast.error('Please Enter Name of Education',{duration: 5000,position: 'top-center'});
            return;
        }

        if(EduQualificationBng === ""){
            toast.error('Please Enter Name of Education (Bangla)',{duration: 5000,position: 'top-center'});
            return;
        }

        const payload = {
            EduQualificationId:EduQualificationId === "" ? 0 : EduQualificationId,
            EduQualification:EduQualification,
            EduQualificationBng:EduQualificationBng,
            sts:sts
        }

        //console.log("payload Education", payload);

        try{
            let saveEdu = await axios.post(SaveEducation, payload, {headers});
           // console.log("SaveRes", saveEdu.data.success);
            let eduSave = saveEdu.data.success;
            
            if(eduSave === true){
                if(EduQualificationId > 0){
                  toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});  
                
                }else{
                  toast.success('Successfully Added!',{duration: 4000,position: 'top-center'});  
                
                }

                setTrack(true);
                setEducation({
                ...education,
                EduQualificationId:"",
                EduQualification:"",
                EduQualificationBng:""
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

    const handleEdit =(editData) =>{
        // console.log("editData",editData);
        const {eduQualificationId,eduQualification,eduQualificationBng,sts} = editData;

        setEducation({
            EduQualificationId:eduQualificationId,
            EduQualification:eduQualification,
            EduQualificationBng:eduQualificationBng,
            sts:sts
        });
    }

    const handleDelete = async(id) =>{
        //  console.log("id",id);
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
       
        try{
         let deleteData = await axios.get(DeleteEducaiton+id, {headers});
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
                <h3>Educational Qualification</h3>
            </div>

            <div className="row pt-2">
                <div className="col-md-8">
                    <div className="form card p-3">
                        <form action="" className="form-horizontal">
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Education
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Education Name"
                                        name="EduQualification"
                                        onChange={handleEducationChange}
                                        value={education.EduQualification}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Education (Bangla)
                                </label>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Education Name (Bangla)"
                                        name="EduQualificationBng"
                                        onChange={handleEducationChange}
                                        value={education.EduQualificationBng}
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
            <div className="col-md-8">
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
                            <thead>
                                <tr>
                                    <th> Action</th>
                                    <th>Name of Education</th>
                                    <th>Name of Education (Bangla)</th>

                                </tr>
                            </thead>
                            <tbody>
                                {listEducation.filter((item) => {
                                    return search.toLowerCase() === "" ? item : item.eduQualification.toLowerCase().includes(search.toLowerCase()) || item.eduQualificationBng.toLowerCase().includes(search.toLowerCase())
                                }).map(item => (
                                    <tr key={item.eduQualificationId}>
                                        <td>
                                            <div className="act_icon">

                                                <span onClick={() => window.confirm("Are you sure you want to delete?") && handleDelete(item.eduQualificationId)}><BsTrash /></span>
                                                <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                                            </div>
                                        </td>
                                        <td>{item.eduQualification}</td>
                                        <td>{item.eduQualificationBng}</td>
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

export default withAuthentication(Education);