import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetUpazilaList, GetMosqueList, GetEducationList, GetOccupationList,GetDonarEnrollmentList } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
//import '../../../css/AutoComplete.css';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const DonarEnrollmentListReport = () => {
    const [listDivision, setListDivision] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listUpazila, setListUpazila] = useState([]);
    const [listMosque, setListMosque] = useState([]);
    const [listOccupation, setListOccupation] = useState([]);
    const [listEducation, setListEducation] = useState([]);
    const [listdonarEnroll, setListDonarEnroll] = useState([]);
    const [dEnrollList, setDEnrollList] = useState({
        ReportName: "Donar Enrollment List Report",
        DivisionId: "",
        DivisionNameEn: "",
        DistrictId: "",
        DistrictNameEn: "",
        upazilaId: "",
        upazilaNameEn: "",
        MosqueId: "",
        MosqueNameEn: "",
        OccupationId: "",
        OccupationNameEn: "",
        EducationId: "",
        EducationNameEn: "",
        Status: ""
    });

    //AutoComplete Division State //////////
    const [showDivSuggestions, setShowDivSuggestions] = useState(false);
    const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(dEnrollList.DivisionNameEn.toLowerCase()));
    //AutoComplete Division State //////////


    //AutoComplete District State//////////
    const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
    const districtSuggestions = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(dEnrollList.DistrictNameEn.toLowerCase()) && option.divisionNameEn === dEnrollList.DivisionNameEn);

    //AutoComplete District State //////////


    //AutoComplete Upazila State //////////
    const [showUpazilaSuggestions, setShowUpazilaSuggestions] = useState(false);
    const upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(dEnrollList.upazilaNameEn.toLowerCase()) && option.divisionNameEn === dEnrollList.DivisionNameEn && option.districtNameEn === dEnrollList.DistrictNameEn);

    //AutoComplete Upazila State //////////

    //AutoComplete Mosque State //////////
    const [showMosqueSuggestions, setShowMosqueSuggestions] = useState(false);
    const mosqueSuggestions = listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(dEnrollList.MosqueNameEn.toLowerCase()) && option.divisionNameEn === dEnrollList.DivisionNameEn && option.districtNameEn === dEnrollList.DistrictNameEn && option.upazilaNameEn === dEnrollList.upazilaNameEn);
    //AutoComplete Mosque State //////////

    //AutoComplete Occpation State //////////
     const [showOccSuggestions, setShowOccSuggestions] = useState(false);
     const occSuggestions = listOccupation.filter(option => option.occupationName.toLowerCase().includes(dEnrollList.OccupationNameEn.toLowerCase()));
    //AutoComplete Occpation State //////////

    //AutoComplete Occpation State //////////
    const [showEduSuggestions, setShowEduSuggestions] = useState(false);
    const eduSuggestions = listEducation.filter(option => option.eduQualification.toLowerCase().includes(dEnrollList.EducationNameEn.toLowerCase()));
   //AutoComplete Occpation State //////////


    useEffect(() => {
        getDivisionData();
        getDistrictData();
        getUpazila();
        getMosque();
        getOccupation();
        getEduList();
    },[]);

    // //////////////////////////////Get ALL DATA FROM API FOR DROPDOWN ////////////////////////////////////////////////////////////////
    const getDivisionData = async () => {
        try {
            let divGet = await axios.get(GetDivisionList);
            let getDivList = divGet.data._divisionList;

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

    const getUpazila = async (e) => {
        try {
            let upaData = await axios.get(GetUpazilaList);
            //  console.log("upaDataList", upaData.data._upazilaList);
            let getUpaData = upaData.data._upazilaList;
            setListUpazila(getUpaData);
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


    const getMosque = async () => {
        try {
            let getMosqueData = await axios.get(GetMosqueList);
            let getDataMosque = getMosqueData.data._mosqueList;
            // console.log("mosqueList", getDataMosque);
            setListMosque(getDataMosque);

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


    const getOccupation = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
        try {
            let getOcc = await axios.get(GetOccupationList, { headers });
            //console.log("list", getOcc.data._listData);
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

    const getEduList = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try {
            let eduList = await axios.get(GetEducationList, { headers });
             //console.log("listedu", eduList.data._listData);
            let getListEdu = eduList.data._listData;
            setListEducation(getListEdu);
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

    // //////////////////////////////Get ALL DATA FROM API FOR DROPDOWN ////////////////////////////////////////////////////////////////

    // //////////////////////  Report Handle SEARCH ///////////////////////
    const handleReportNameChange = (e) => {
        setDEnrollList({
            ...dEnrollList,
            ReportName: e.target.value
        });
    }

    ///////////////////////   Report Handle SEARCH /////////////////////////////////////////

    //////////////////////// Division Auto Complete Handle Search //////////////////////////////////////
    const autocompleteDivRef = useRef();
    useEffect(() => {
        const handleDivClick = (event) => {
            if (autocompleteDivRef.current && !autocompleteDivRef.current.contains(event.target)) {
                setShowDivSuggestions(false)
            }
        };
        document.addEventListener("click", handleDivClick);
        return () => {
            document.removeEventListener("click", handleDivClick)
        }
    }, [])

    const handleDivChange = e => {
        setDEnrollList({
            ...dEnrollList,
            DivisionNameEn: e.target.value
        });
    }

    const handleSuggestionDivClick = (suggetion) => {
        setDEnrollList({
            ...dEnrollList,
            DistrictId: "",
            DivisionId: suggetion.divisionId,
            DivisionNameEn: suggetion.divisionNameEn,
            DistrictNameEn: "",
            upazilaId: "",
            upazilaNameEn: "",
            MosqueId: "",
            MosqueNameEn: ""
        });

        setShowDivSuggestions(false);
    }



    //////////////////////// Division Auto Complete Handle Search ////////////////////////////////////// 


    //////////////////////// District Auto Complete Handle Search /////////////////////////////////////
    const autocompleteDisRef = useRef();
    useEffect(() => {
        const handleDisClick = (event) => {
            if (autocompleteDisRef.current && !autocompleteDisRef.current.contains(event.target)) {
                setShowDistrictSuggestions(false);
            }
        };
        document.addEventListener("click", handleDisClick);
        return () => {
            document.removeEventListener("click", handleDisClick)
        }
    }, []);

    const handleDisChange = e => {
        setDEnrollList({
            ...dEnrollList,
            DistrictNameEn: e.target.value
        });
    }

    const handleDisSuggestionClick = (suggetion) => {
        setDEnrollList({
            ...dEnrollList,
            DistrictId: suggetion.districtId,
            DistrictNameEn: suggetion.districtNameEn,
            upazilaId: "",
            upazilaNameEn: "",
            MosqueId: "",
            MosqueNameEn: ""
        });
        setShowDistrictSuggestions(false);
    }
    //////////////////////// District Auto Complete Handle Search /////////////////////////////////////


    /////////////////////// Upazila Auto Complete Handle Search //////////////////////////////////////
    const autocompleteUpaRef = useRef();
    useEffect(() => {
        const handleUpaClick = (event) => {
            if (autocompleteUpaRef.current && !autocompleteUpaRef.current.contains(event.target)) {
                setShowUpazilaSuggestions(false);
            }
        };
        document.addEventListener("click", handleUpaClick);
        return () => {
            document.removeEventListener("click", handleUpaClick)
        }
    }, []);

    const handleUpaChange = e => {
        setDEnrollList({
            ...dEnrollList,
            upazilaNameEn: e.target.value
        });
    }

    const handleUpaSuggestionClick = (suggetion) => {
        setDEnrollList({
            ...dEnrollList,
            upazilaId: suggetion.upazilaId,
            upazilaNameEn: suggetion.upazilaNameEn,
            MosqueId: "",
            MosqueNameEn: ""
        });
        setShowUpazilaSuggestions(false);
    }

    /////////////////////// Upazila Auto Complete Handle Search //////////////////////////////////////

    /////////////////////// Mosque Auto Complete Handle Search //////////////////////////////////////
    const autocompleteMosqueRef = useRef();
  useEffect(() => {
    const handleMosqueClick = (event) => {
      if (autocompleteMosqueRef.current && !autocompleteMosqueRef.current.contains(event.target)) {
        setShowMosqueSuggestions(false)
      }
    };
    document.addEventListener("click", handleMosqueClick);
    return () => {
      document.removeEventListener("click", handleMosqueClick)
    }
  }, [])

  const handleMosqueChange = e => {
    setDEnrollList({
        ...dEnrollList,
        MosqueNameEn: e.target.value,
    });
  }

  const handleSuggestionMosqueClick = (suggetion) => {
    setDEnrollList({
        ...dEnrollList,
        MosqueId: suggetion.mosqueId,
        MosqueNameEn: suggetion.mosqueNameEn
    });
    setShowMosqueSuggestions(false);
  }
    /////////////////////// Mosque Auto Complete Handle Search //////////////////////////////////////

    ////////////////////// Occupation Auto Complete Handle Search //////////////////////////////////
    const autocompleteOccRef = useRef();
  useEffect(() => {
    const handleOccClick = (event) => {
      if (autocompleteOccRef.current && !autocompleteOccRef.current.contains(event.target)) {
        setShowOccSuggestions(false)
      }
    };
    document.addEventListener("click", handleOccClick);
    return () => {
      document.removeEventListener("click", handleOccClick)
    }
  }, [])

  const handleOccChange = e => {
     setDEnrollList({
        ...dEnrollList,
        OccupationNameEn: e.target.value
    });
  }

  const handleSuggestionOccClick = (suggetion) => {
    setDEnrollList({
        ...dEnrollList,
        OccupationId: suggetion.occupationId,
        OccupationNameEn: suggetion.occupationName
    });
    setShowOccSuggestions(false);
  }
    ////////////////////// Occupation Auto Complete Handle Search //////////////////////////////////

    ///////////////////// Education Auto Complete Handle Search ////////////////////////////////////
    const autocompleteEduRef = useRef();
  useEffect(() => {
    const handleEduClick = (event) => {
      if (autocompleteEduRef.current && !autocompleteEduRef.current.contains(event.target)) {
        setShowEduSuggestions(false)
      }
    };
    document.addEventListener("click", handleEduClick);
    return () => {
      document.removeEventListener("click", handleEduClick)
    }
  }, [])

  const handleEduChange = e => {
     setDEnrollList({
        ...dEnrollList,
        EducationNameEn: e.target.value
    });
  }

  const handleSuggestionEduClick = (suggetion) => {
     setDEnrollList({
        ...dEnrollList,
        EducationId: suggetion.eduQualificationId,
        EducationNameEn: suggetion.eduQualification
    });
    setShowEduSuggestions(false);
  }
    ///////////////////// Education Auto Complete Handle Search ////////////////////////////////////

    /////////////////////Status Handle Search /////////////////////////////////////////////////////
    const handleLifeChange = (e) => {
        const { name, value } = e.target;
        setDEnrollList((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    /////////////////////Status Handle Search /////////////////////////////////////////////////////


    //////////////////////////////Submit button //////////////////////////////////////////////////
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const {ReportName,DivisionId,DivisionNameEn,DistrictId,DistrictNameEn,upazilaId,upazilaNameEn,MosqueId,MosqueNameEn,OccupationId,OccupationNameEn,EducationId,EducationNameEn,Status} = dEnrollList;
        
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        let divisionArr = listDivision.map(item => item.divisionNameEn);
        let districtArr = listDistrict.map(item => item.districtNameEn);
        let upazilaArr = listUpazila.map(item=> item.upazilaNameEn);
        let mosqueArr = listMosque.map(item => item.mosqueNameEn);
        let occupationArr = listOccupation.map(item => item.occupationName);
        let educationArr = listEducation.map(item=> item.eduQualification);

        ////////////////////Validation ////////////////////////////////////
        if(ReportName === ""){
            toast.error('Please Select Report Name',{duration: 4000,position: 'top-center'}); 
            return;
        }

        if(DivisionNameEn === ""){
            toast.error('Please Select Name of Division',{duration: 4000,position: 'top-center'}); 
            return;
        }

        if(divisionArr.includes(DivisionNameEn) === false){
            toast.error('Invalid Division Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }
    
         if(DistrictNameEn === ""){
            toast.error('Please Select Name of District',{duration: 4000,position: 'top-center'}); 
            return;
         }
    
         if(districtArr.includes(DistrictNameEn) === false){
            toast.error('Invalid District Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }
    
         if(upazilaNameEn === ""){
            toast.error('Please Select Name of Upazila',{duration: 4000,position: 'top-center'}); 
            return;
         }
    
         if(upazilaArr.includes(upazilaNameEn)=== false){
            toast.error('Invalid Upazila Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(MosqueNameEn === ""){
            toast.error('Please Select Name of Mosque',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(mosqueArr.includes(MosqueNameEn) === false){
            toast.error('Invalid Mosque Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(OccupationNameEn === ""){
            toast.error('Please Select Name of Occupation',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(occupationArr.includes(OccupationNameEn)=== false){
            toast.error('Invalid Occupation Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(EducationNameEn === ""){
            toast.error('Please Select Name of Education',{duration: 4000,position: 'top-center'}); 
            return;
         }

         if(educationArr.includes(EducationNameEn)=== false){
            toast.error('Invalid Education Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
            return;
         }

        //  if(Status === ""){
        //     toast.error('Please Select Status',{duration: 4000,position: 'top-center'}); 
        //     return;
        //  }
        ////////////////////Validation ////////////////////////////////////
        let apiParams;
        if(Status === ""){
            apiParams = `DistrictId=${DistrictId}&DivisionId=${DivisionId}&UpazilaId=${upazilaId}&MosqueId=${MosqueId}&OccupationId=${OccupationId}&EducationId=${EducationId}&Status=`
        }else{
            apiParams = `DistrictId=${DistrictId}&DivisionId=${DivisionId}&UpazilaId=${upazilaId}&MosqueId=${MosqueId}&OccupationId=${OccupationId}&EducationId=${EducationId}&Status=${Status}`
        }

        // DistrictId=0&DivisionId=0&UpazilaId=0&MosqueId=0&OccupationId=0&EducationId=0&Status=
        //console.log("fullData", dEnrollList);
        console.log("apiParms", apiParams);

        try{
            let pdGetData = await axios.get(GetDonarEnrollmentList,{headers});
            console.log("dataPdf", pdGetData.data);

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
    //////////////////////////////Submit button //////////////////////////////////////////////////





    return (
        <div className="page-content p-4">
            <div className="pg_title">
                <h3>Donar Enrollment List Report</h3>
            </div>
            <div className="row pt-2">
                <div className="col-md-12">
                    <div className="form card p-3">
                        <form action="" className="form-horizontal">
                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Report Name
                                </label>
                                <div className="col-md-8">

                                    <select value={dEnrollList.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange} disabled>
                                        <option value="">---Select----</option>
                                        {reportName.map((item) => (
                                            <option key={item.id} value={item.nameOfReport}>{item.nameOfReport}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>





                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Division
                                </label>
                                <div className="col-md-8">
                                    {/*  */}
                                    <div className="autocomplete" ref={autocompleteDivRef}>
                                        <input
                                            value={dEnrollList.DivisionNameEn}
                                            onChange={handleDivChange}
                                            placeholder="Select Division"
                                            onFocus={() => setShowDivSuggestions(true)}
                                        />
                                        {showDivSuggestions && (
                                            <ul className="suggestions">
                                                {divSuggestions.map(suggestion => (
                                                    <li onClick={() => handleSuggestionDivClick(suggestion)} key={suggestion.divisionId}>
                                                        {suggestion.divisionNameEn}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

                                </div>
                            </div>


                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of District
                                </label>
                                <div className="col-md-8">
                                    <div className="autocomplete" ref={autocompleteDisRef}>
                                        <input
                                            value={dEnrollList.DistrictNameEn}
                                            onChange={handleDisChange}
                                            placeholder="Select District"
                                            onFocus={() => setShowDistrictSuggestions(true)}
                                        />
                                        {showDistrictSuggestions && (
                                            <ul className="suggestions">
                                                {districtSuggestions.map(suggestion => (
                                                    <li onClick={() => handleDisSuggestionClick(suggestion)} key={suggestion.districtId}>
                                                        {suggestion.districtNameEn}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>
                                    {/*  */}
                                </div>
                            </div>



                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Upazila
                                </label>
                                <div className="col-md-8">
                                    {/*  */}
                                    <div className="autocomplete" ref={autocompleteUpaRef}>
                                        <input
                                            value={dEnrollList.upazilaNameEn}
                                            onChange={handleUpaChange}
                                            placeholder="Select Upazila"
                                            onFocus={() => setShowUpazilaSuggestions(true)}
                                        />
                                        {showUpazilaSuggestions && (
                                            <ul className="suggestions">
                                                {upazilaSuggestions.map(suggestion => (
                                                    <li onClick={() => handleUpaSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                                                        {suggestion.upazilaNameEn}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

                                </div>
                            </div>


                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Mosque
                                </label>
                                <div className="col-md-8">
                                    {/*  */}
                                    <div className="autocomplete" ref={autocompleteMosqueRef}>
                                        <input
                                            value={dEnrollList.MosqueNameEn}
                                            onChange={handleMosqueChange}
                                            placeholder="Select Mosque"
                                            onFocus={() => setShowMosqueSuggestions(true)}
                                        />
                                        {showMosqueSuggestions && (
                                            <ul className="suggestions">
                                                {mosqueSuggestions.map(suggestion => (
                                                    <li onClick={() => handleSuggestionMosqueClick(suggestion)} key={suggestion.mosqueId}>
                                                        {suggestion.mosqueNameEn}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Occupation
                                </label>
                                <div className="col-md-8">
                                    {/*  */}
                                    <div className="autocomplete" ref={autocompleteOccRef}>
                                        <input
                                            value={dEnrollList.OccupationNameEn}
                                            onChange={handleOccChange}
                                            placeholder="Select Occupation"
                                            onFocus={() => setShowOccSuggestions(true)}
                                        />
                                        {showOccSuggestions && (
                                            <ul className="suggestions">
                                                {occSuggestions.map(suggestion => (
                                                    <li onClick={() => handleSuggestionOccClick(suggestion)} key={suggestion.occupationId}>
                                                        {suggestion.occupationName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

                                </div>
                            </div>


                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of Education
                                </label>
                                <div className="col-md-8">
                                    {/*  */}
                                    <div className="autocomplete" ref={autocompleteEduRef}>
                                        <input
                                            value={dEnrollList.EducationNameEn}
                                            onChange={handleEduChange}
                                            placeholder="Select Education"
                                            onFocus={() => setShowEduSuggestions(true)}
                                        />
                                        {showEduSuggestions && (
                                            <ul className="suggestions">
                                                {eduSuggestions.map(suggestion => (
                                                    <li onClick={() => handleSuggestionEduClick(suggestion)} key={suggestion.eduQualificationId}>
                                                        {suggestion.eduQualification}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

                                </div>
                            </div>


                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Status
                                </label>
                                <div className="col-md-8">
                                <select value={dEnrollList.Status} className="form-select" name="Status" onChange={handleLifeChange}>
                                    <option value="" >---Select----</option>
                                    <option value="Alive">Alive</option>
                                    <option value="Dead">Dead</option>
                                </select>

                                </div>
                            </div>

                            <div className="text-end">
                                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>PDF Download</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DonarEnrollmentListReport