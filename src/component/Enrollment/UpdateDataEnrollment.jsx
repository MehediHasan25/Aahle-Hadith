import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { month, year,conversionDate } from '../../../Utils/EnrollmentData';
import { GetEducationList, GetOccupationList, GetUpazilaList, GetMosqueList, GetDonationAmtList, SaveEnrollmentData, GetDistrictfromUpazila,GetDonarAllData } from '../../URL/ApiList';
import { Modal, Button } from "react-bootstrap";
import { handleEnrollmentPayload } from '../../../Utils/EnrollmentPayload';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import withAuthentication from '../Protected/withAuthentication';



const UpdateDataEnrollment = () => {
    const { state } = useLocation();
    
    const [getAllData, setGetAllData] = useState([]);
    const [personal, setPersonal] = useState({
        DonerEnrollmentId: state.donarId,
        DonerName: "",
        DonerNameBng: "",
        MobileNo: "",
        Email: "",
        FatherName: "",
        MotherName: "",
        NIDNo: "",
        BirthCerNo: ""
    });

    // Education autoComplete////
    //const [divSearch, setDivSearch] = useState("");
    const [listEducation, setListEducation] = useState([]);
    const [selectAutoEduVal, setSelectAutoEduVal] = useState({
        eduSearch: "",
        EduQualificationId: ""
    });
    const [showEduSuggestions, setShowEduSuggestions] = useState(false);
    const eduSuggestion = listEducation.filter(option => option.eduQualification.toLowerCase().includes(selectAutoEduVal.eduSearch.toLowerCase()));

    // Education autoComplete////

    //Occupation AutoComplete/////
    const [listOccupation, setListOccupation] = useState([]);
    const [selectAutoOccVal, setSelectAutoOccVal] = useState({
        OccSearch: "",
        OccupationId: ""
    });

    const [showOccSuggestions, setShowOccSuggestions] = useState(false);
    const OccSuggestion = listOccupation.filter(option => option.occupationName.toLowerCase().includes(selectAutoOccVal.OccSearch.toLowerCase()));

    //Occupation AutoComplete/////

    //Address
    const [sameAddress, setSameAddress] = useState(true);

    const [address, SetAddress] = useState({
        PreAddress: "",
        PerAddress: ""
    });

    const [listUpazila, setListUpazila] = useState([]);

    //Present Upazila AutoComplete
    const [selectAutoPreUpaVal, setSelectAutoPreUpaVal] = useState({
        PreUpaSearch: "",
        PreUpazilaId: "",
        PreDistrict: ""

    });

    const [showPreUpaSuggestions, setShowPreUpaSuggestions] = useState(false);
    const preUpaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(selectAutoPreUpaVal.PreUpaSearch.toLowerCase()));
  


    //Present Upazila AutoComplete

    //Permanent Upazila AutoComplete
    const [selectAutoPerUpaVal, setSelectAutoPerUpaVal] = useState({
        PerUpaSearch: "",
        PerUpazilaId: "",
        PerDistrict: ""
    });

    const [showPerUpaSuggestions, setShowPerUpaSuggestions] = useState(false);
    const perUpaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(selectAutoPerUpaVal.PerUpaSearch.toLowerCase()))



    //Permanent Upazila AutoComplete

    const [orgUpazila, setOrgUpazila] = useState({
        OrgUpaSearch: "",
        OrgUpazilaId: ""
    });

    
    const [showOrgUpaSuggestions, setShowOrgUpaSuggestions] = useState(false);
    const orgUpaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(orgUpazila.OrgUpaSearch.toLowerCase()))



    // Mosque Auto Complete
    const [listMosque, setListMosque] = useState([]);
    const [selectAutoMosqueVal, setSelectAutoMosqueVal] = useState({
        MosqueSearch: "",
        OrgMosqueId: ""
    });

    const [showMosSuggestions, setShowMosSuggestions] = useState(false);
    const mosqueSuggestions = listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(selectAutoMosqueVal.MosqueSearch.toLowerCase()) && option.upazilaId ===orgUpazila.OrgUpazilaId);
  
    // Mosque Auto Complete


    const [listDonationAmt, setListDonationAmt] = useState([]);

    // Donation Auto Complete
    const [selectAutoDonationVal, setSelectAutoDonationVal] = useState({
        DonationSearch: "",
        DonationAmtId: ""
    });

    const [showDonationSuggestions, setShowDonationSuggestions] = useState(false);
    const donationSuggestions = listDonationAmt.filter(option => option.donationAmt.toString().includes(selectAutoDonationVal.DonationSearch));

    // Donation Auto Complete


    // Donation Amount
    const [donationAmt, setDonationAmt] = useState({
        DisPerAmt: 20,
        NetAmount: ""
    });
    // Donation Amount

    const [donationData, setDonationData] = useState({
        DonationMonth: "",
        DonationYear: "",
        EnrollmentDate: ""
    });

    const [life, setLife] = useState({
        LifeStatus: "",
        DeadDate: ""
    });

    const [show, setShow] = useState(false);
    const [donationFlag, setDonationFlag] = useState(true);



    const [saveOutput, setSaveOutput] = useState({
        DonerActualId: "",
        OrganisationalId: ""
    });



    useEffect(() => {
        getDonarData();
        getEduList();
        getOccupation();
        getUpazila();
        getMosque();
        getDonationAmt();
        
    }, []);

// //////////////////////////////////Get Donar Data //////////////////////////////////
    const getDonarData = async() =>{
        let {donarId} = state;
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };
        
        try{
            let getDonar = await axios.get(GetDonarAllData+donarId,{headers});
            // console.log("DonarData", getDonar.data.donarEnrollData);
            let allData = getDonar.data;
            if(allData.success === true){
                let allDonarData = allData.donarEnrollData;
                setGetAllData(allDonarData);
                // console.log("AllData", allDonarData);
                setPersonal({
                    DonerEnrollmentId:allDonarData.donerEnrollmentId,
                    DonerName: allDonarData.donerName,
                    DonerNameBng: allDonarData.donerNameBng,
                    MobileNo: allDonarData.mobileNo,
                    Email: allDonarData.email,
                    FatherName: allDonarData.fatherName,
                    MotherName: allDonarData.motherName,
                    NIDNo: allDonarData.nidNo,
                    BirthCerNo: allDonarData.birthCerNo
                });

                 setSelectAutoEduVal({
                    eduSearch: allDonarData.eduQualification,
                    EduQualificationId: allDonarData.eduQualificationId
                });

                setSelectAutoOccVal({
                    OccSearch: allDonarData.occupationName,
                    OccupationId: allDonarData.occupationId
                });

                if(allDonarData.preAddress === allDonarData.perAddress && allDonarData.preUpazilaId === allDonarData.perUpazilaId){
                    setSameAddress(false);
                }else{
                    setSameAddress(true);
                }

                SetAddress({
                    PreAddress: allDonarData.preAddress,
                    PerAddress: allDonarData.perAddress
                });
            
                setSelectAutoPreUpaVal({
                    PreUpaSearch: allDonarData.preUpazilaName,
                    PreUpazilaId: allDonarData.preUpazilaId,
                    PreDistrict: allDonarData.preDistrict
                });
            
                setSelectAutoPerUpaVal({
                    PerUpaSearch: allDonarData.perUpazilaName,
                    PerUpazilaId: allDonarData.perUpazilaId,
                    PerDistrict: allDonarData.perDistrict
                });

                setOrgUpazila({
                    OrgUpaSearch: allDonarData.orgUpazilaName,
                    OrgUpazilaId: allDonarData.orgUpazilaId
                });
            
                setSelectAutoMosqueVal({
                    MosqueSearch: allDonarData.mosqueNameEn,
                    OrgMosqueId: allDonarData.orgMosqueId
                });
            
                setSelectAutoDonationVal({
                    DonationSearch: allDonarData.donationAmt,
                    DonationAmtId: allDonarData.donationAmtId
                });
                 setDonationAmt({
                    DisPerAmt: allDonarData.disPerAmt,
                    NetAmount: allDonarData.netAmount
                });

                if(allDonarData.enrollmentDate === ""){
                    let myDate = allDonarData.enrollmentDate.split("");
                    console.log("datechange", myDate);
                }

                
                setDonationData({
                    DonationMonth: allDonarData.donationMonth,
                    DonationYear: allDonarData.donationYear,
                    EnrollmentDate: conversionDate(allDonarData.enrollmentDate)
                });

                 setLife({
                    LifeStatus: allDonarData.lifeStatus,
                    DeadDate: allDonarData.deadDate === null ? "" : conversionDate(allDonarData.deadDate)
                });

                 setSaveOutput({
                    DonerActualId: allDonarData.donerActualId,
                    OrganisationalId: allDonarData.organisationalId
                });





            }else{
                toast.error('No Data Found', { duration: 5000, position: 'top-center' });
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


// //////////////////////////////////Get Donar Data //////////////////////////////////

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setPersonal((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handledonationNetChange = (e) => {
        const { name, value } = e.target;
        setDonationAmt((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleaddressChange = (e) => {
        const { name, value } = e.target;
        SetAddress((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleDonationDataChange = (e) => {
        const { name, value } = e.target;
        setDonationData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleLifeChange = (e) => {
        const { name, value } = e.target;
        setLife((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        if (e.target.name === "LifeStatus" && e.target.value === "Alive") {
            DeadDate(e.target.value);
        }

    }

    const DeadDate = (data) => {
        setLife({
            LifeStatus: data,
            DeadDate: ""
        })
    }

    //  education dropdown
    const getEduList = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try {
            let eduList = await axios.get(GetEducationList, { headers });
            // console.log("listedu", eduList.data._listData);
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
        setSelectAutoEduVal({
            ...selectAutoEduVal,
            eduSearch: e.target.value
        });
    }

    const handleEduSuggestionClick = (suggetion) => {
        setSelectAutoEduVal({
            eduSearch: suggetion.eduQualification,
            EduQualificationId: suggetion.eduQualificationId
        });
        setShowEduSuggestions(false);
    }

    // Education dropdown


    ////////Occupation dropdown 
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


    const autocompleteOccRef = useRef();
    useEffect(() => {
        const handleOccClick = (event) => {
            if (autocompleteOccRef.current && !autocompleteOccRef.current.contains(event.target)) {
                setShowOccSuggestions(false);
            }
        };
        document.addEventListener("click", handleOccClick);
        return () => {
            document.removeEventListener("click", handleOccClick)
        }
    }, [])

    const handleOccChange = e => {
        setSelectAutoOccVal({
            ...selectAutoOccVal,
            OccSearch: e.target.value
        });
    }

    const handleOccSuggestionClick = (suggetion) => {
        setSelectAutoOccVal({
            OccSearch: suggetion.occupationName,
            OccupationId: suggetion.occupationId
        });
        setShowOccSuggestions(false);
    }
    ////////Occupation dropdown 

    // Get Upazila List ////////
    const getUpazila = async (e) => {
        try {
            let upaData = await axios.get(GetUpazilaList);
            //console.log("upaDataList", upaData.data._upazilaList);
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
    // Get Upazila List ////////


    // Org Upazila Search //////////
    const autocompleteOrgUpaRef = useRef();
    useEffect(() => {
        const handleOrgUpaClick = (event) => {
            if (autocompleteOrgUpaRef.current && !autocompleteOrgUpaRef.current.contains(event.target)) {
                setShowOrgUpaSuggestions(false)
            }
        };
        document.addEventListener("click", handleOrgUpaClick);
        return () => {
            document.removeEventListener("click", handleOrgUpaClick)
        }
    }, []);

    const handleOrgUpaChange = e => {
        setOrgUpazila({
            ...orgUpazila,
            OrgUpaSearch: e.target.value
        });

        changeMosqueData();
    }


    const handleSuggestionOrgUpaClick = (suggetion) => {
        //console.log("suggestion", suggetion.divisionNameEn);
        setOrgUpazila({
            OrgUpaSearch: suggetion.upazilaNameEn,
            OrgUpazilaId: suggetion.upazilaId
        });
        setShowOrgUpaSuggestions(false);
    }

    const changeMosqueData =()=>{
        setSelectAutoMosqueVal({
            MosqueSearch: "",
            OrgMosqueId: ""
        });
    }

    // Org Upazila Search /////////

    //List Mosque Autocomplete

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


    const autocompleteMosRef = useRef();
  useEffect(() => {
    const handleMosClick = (event) => {
      if (autocompleteMosRef.current && !autocompleteMosRef.current.contains(event.target)) {
        setShowMosSuggestions(false)
      }
    };
    document.addEventListener("click", handleMosClick);
    return () => {
      document.removeEventListener("click", handleMosClick)
    }
  }, [])

  const handleMosqueChange = e => {
    setSelectAutoMosqueVal({
        ...selectAutoMosqueVal,
        MosqueSearch: e.target.value
    });
  }

   

    const handleSuggestionMosqueClick = (suggetion) => {
        //console.log("suggestion", suggetion.divisionNameEn);
        setSelectAutoMosqueVal({
            MosqueSearch: suggetion.mosqueNameEn,
            OrgMosqueId: suggetion.mosqueId
        });
        setShowMosSuggestions(false);
      }

    // List Mosque AutoComplete


    // Donation Amount AutoComplete/////////
    const getDonationAmt = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try {
            let getDonaAmt = await axios.get(GetDonationAmtList, { headers });
            let getAmtList = getDonaAmt.data._listData;
            // console.log("list", getAmtList);
            setListDonationAmt(getAmtList);

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


    const autocompleteDonaRef = useRef();
  useEffect(() => {
    const handleDonaClick = (event) => {
      if (autocompleteDonaRef.current && !autocompleteDonaRef.current.contains(event.target)) {
        setShowDonationSuggestions(false)
      }
    };
    document.addEventListener("click", handleDonaClick);
    return () => {
      document.removeEventListener("click", handleDonaClick)
    }
  }, [])

  const handleDonaChange = e => {
    setSelectAutoDonationVal({
        ...selectAutoDonationVal,
        DonationSearch: e.target.value
    });
  }

    const handleDonaSuggestionClick = (suggetion) => {
        setSelectAutoDonationVal({
            DonationSearch: suggetion.donationAmt,
            DonationAmtId: suggetion.donationAmtId
        });
        setShowDonationSuggestions(false);
        NetAmount(suggetion.donationAmt);
      }

    // Donation Amount AutoComplete/////////

    const NetAmount = (data) => {
        // console.log("net val",data+2);
        let { DisPerAmt } = donationAmt;
        let calcData = (data * DisPerAmt) / 100;
        let netData = data - calcData;
        setDonationAmt({
            ...donationAmt,
            NetAmount: netData
        });
    }




    const handleSame = () => {
        setSameAddress(!sameAddress);
        handleAddressFunc();
        // console.log("same", sameAddress);
    }

    const handleAddressFunc = () => {
        if (sameAddress === true) {
            SetAddress({
                ...address,
                PerAddress: address.PreAddress
            });

            setSelectAutoPerUpaVal({
                PerUpaSearch: selectAutoPreUpaVal.PreUpaSearch,
                PerUpazilaId: selectAutoPreUpaVal.PreUpazilaId,
                PerDistrict: selectAutoPreUpaVal.PreDistrict
            });


        } else {
            SetAddress({
                ...address,
                PerAddress: ""
            });

            setSelectAutoPerUpaVal({
                PerUpaSearch: "",
                PerUpazilaId: "",
                PerDistrict: ""
            });
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        let eduValArr = listEducation.map(item => item.eduQualification);
        let occValArr = listOccupation.map(item => item.occupationName);
        let upaValArr = listUpazila.map(item => item.upazilaNameEn);
        let mosqueArr = listMosque.map(item => item.mosqueNameEn);
        let donationAmtArr = listDonationAmt.map(item => item.donationAmt);

        // Validation ////////////

        if (personal.DonerName === "") {
            toast.error("Please Enter Name (English)", { duration: 5000, position: 'top-center' });
            return;
        }

        if (personal.DonerNameBng === "") {
            toast.error("Please Enter Name (Bangla)", { duration: 5000, position: 'top-center' });
            return;
        }

        if (personal.MobileNo === "") {
            toast.error("Please Enter Mobile No", { duration: 5000, position: 'top-center' });
            return;
        }

        if (new RegExp("^(?:\\+88|88)?(01[3-9]\\d{8})$").test(personal.MobileNo) === false) {
            toast.error("Please Enter Mobile No", { duration: 5000, position: 'top-center' });
            return;
        }


        if (personal.FatherName === "") {
            toast.error("Please Enter Father's Name", { duration: 5000, position: 'top-center' });
            return;
        }

        if (personal.MotherName === "") {
            toast.error("Please Enter Mother's Name ", { duration: 5000, position: 'top-center' });
            return;
        }

        if (personal.NIDNo.length < 10) {
            toast.error("NID No is less than 10 digits", { duration: 5000, position: 'top-center' });
            return;
        } else if (personal.NIDNo.length > 10 && personal.NIDNo.length < 13) {
            toast.error("NID No is greater than 10 and less than 13 digits", { duration: 5000, position: 'top-center' });
            return;
        } else if (personal.NIDNo.length > 13 && personal.NIDNo.length < 17) {
            toast.error("NID No is greater than 13 and less than 17 digits", { duration: 5000, position: 'top-center' });
            return;
        } else if (personal.NIDNo.length > 17) {
            toast.error("NID No is greater than 17 digits", { duration: 5000, position: 'top-center' });
            return;
        }


        if (eduValArr.includes(selectAutoEduVal.eduSearch) === false) {
            toast.error('Invalid Education... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }

        if (occValArr.includes(selectAutoOccVal.OccSearch) === false) {
            toast.error('Invalid Occupation... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }


        if (address.PreAddress === "") {
            toast.error('Please Enter your Present Address', { duration: 5000, position: 'top-center' });
            return;
        }

        if (upaValArr.includes(selectAutoPreUpaVal.PreUpaSearch) === false) {
            toast.error('Invalid Present Address Upazila... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }


        if (address.PerAddress === "") {
            toast.error('Please Enter your Permanent Address', { duration: 5000, position: 'top-center' });
            return;
        }


        if (upaValArr.includes(selectAutoPerUpaVal.PerUpaSearch) === false) {
            toast.error('Invalid Permanent Address Upazila... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }


        if (upaValArr.includes(orgUpazila.OrgUpaSearch) === false) {
            toast.error('Invalid Org Upazila... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }

        if (upaValArr.includes(orgUpazila.OrgUpaSearch) === false) {
            toast.error('Invalid Org Upazila... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }


        if (mosqueArr.includes(selectAutoMosqueVal.MosqueSearch) === false) {
            toast.error('Invalid Mosque Input... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }

        if (donationAmtArr.includes(selectAutoDonationVal.DonationSearch) === false) {
            toast.error('Invalid Donation Amount... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }

        if (donationData.DonationMonth === "") {
            toast.error('Please Select Donation Month', { duration: 5000, position: 'top-center' });
            return;
        }

        if (donationData.DonationYear === "") {
            toast.error('Please Select Donation Year', { duration: 5000, position: 'top-center' });
            return;
        }

        if (donationData.EnrollmentDate === "") {
            toast.error('Please Select Donation Year', { duration: 5000, position: 'top-center' });
            return;
        }

        if (life.LifeStatus === "") {
            toast.error('Please Select Life Status', { duration: 5000, position: 'top-center' });
            return;
        }

        if (life.LifeStatus === "Dead" && life.DeadDate === "") {
            toast.error('Please Provide Dead Date', { duration: 5000, position: 'top-center' });
            return;
        }

        // Validation ////////////

        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        let payload = handleEnrollmentPayload(personal, selectAutoEduVal, selectAutoOccVal, address, selectAutoPreUpaVal, selectAutoPerUpaVal, orgUpazila, selectAutoMosqueVal, selectAutoDonationVal, donationAmt, donationData, life);
        console.log("EnPayload", payload);
        try {
            let saveEnroll = await axios.post(SaveEnrollmentData, payload, { headers });
            let enrollSave = saveEnroll.data;
            console.log("sAVE", enrollSave);
            if (enrollSave.success === true) {
                setSaveOutput({
                    DonerActualId: enrollSave.donerActualId,
                    OrganisationalId: enrollSave.organisationalId
                });

                setShow(true);
               // toast.success('Successfully Updated!',{duration: 4000,position: 'top-center'});
            }

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


    const handleClose = () => {
        window.location.reload(true);
        setShow(false);
    };


    ///////////Present Upzila And District///////////////////


    const handlePreDistrictChange = (e) => {
        setSelectAutoPreUpaVal({
            ...selectAutoPreUpaVal,
            PreDistrict: e.target.name
        })
    }


    const autocompletePreRef = useRef();
    useEffect(() => {
        const handlePreUpaClick = (event) => {
        if (autocompletePreRef.current && !autocompletePreRef.current.contains(event.target)) {
            setShowPreUpaSuggestions(false)
        }
        };
        document.addEventListener("click", handlePreUpaClick);
        return () => {
        document.removeEventListener("click", handlePreUpaClick);
        }
    }, [])

    const handlePreUpaChange = e => {
        setSelectAutoPreUpaVal({
            ...selectAutoPreUpaVal,
            PreUpaSearch: e.target.value
            });
    }


    const handlePreUpaSuggestionClick = async(suggetion) => {
        try {
            let getDistrict = await axios.get(GetDistrictfromUpazila + suggetion.upazilaId);
            console.log("District", getDistrict.data.districtobj.districtNameEn);
            let districtName = getDistrict.data.districtobj.districtNameEn;

            setSelectAutoPreUpaVal({
                PreUpaSearch: suggetion.upazilaNameEn,
                PreUpazilaId: suggetion.upazilaId,
                PreDistrict: districtName
            });
            setShowPreUpaSuggestions(false);


        } catch (err) {
            console.log(err);
        }

       
      }


    ////////////////////////////////////////////////////////

    ///////////Permanent Upzila And District///////////////////


    const handlePerDistrictChange = (e) => {
        setSelectAutoPerUpaVal({
            ...selectAutoPerUpaVal,
            PerDistrict: e.target.name
        })
    }



    const autocompletePerUpaRef = useRef();
    useEffect(() => {
        const handlePerUpaClick = (event) => {
        if (autocompletePerUpaRef.current && !autocompletePerUpaRef.current.contains(event.target)) {
            setShowPerUpaSuggestions(false)
        }
        };
        document.addEventListener("click", handlePerUpaClick);
        return () => {
        document.removeEventListener("click", handlePerUpaClick)
        }
    }, [])

     const handlePerUpaChange = e => {
        setSelectAutoPerUpaVal({
            ...selectAutoPerUpaVal,
            PerUpaSearch: e.target.value
        });
    }



    const handlePerUpaSuggestionClick = async(suggetion) => {
        try {
                    let getDistrict = await axios.get(GetDistrictfromUpazila + suggetion.upazilaId);
                    console.log("District", getDistrict.data.districtobj.districtNameEn);
                    let districtName = getDistrict.data.districtobj.districtNameEn;
        
                    setSelectAutoPerUpaVal({
                        PerUpaSearch: suggetion.upazilaNameEn,
                        PerUpazilaId: suggetion.upazilaId,
                        PerDistrict: districtName
                    });
                     setShowPerUpaSuggestions(false);
        
        
                } catch (err) {
                    console.log(err);
                }
        
       
      }
    



    ////////////////////////////////////////////////////////

    return (
        <div className="page-content p-3">
            <div className="pg_title">
                <h3>Enrollment Update</h3>
            </div>


            {/* <div className="form card p-3"> */}
            <form action="">
                <div className="form card shadow p-3">
                    <h5 className="text_primary text-uppercase">Personal Information</h5>
                    <div className="row pt-3">
                        <div className="col-md-4">
                            <div>
                                <label className="form-label">
                                    Name (Eng)
                                </label>
                                <input type="text"
                                    className="form-control"
                                    name="DonerName"
                                    value={personal.DonerName}
                                    onChange={handlePersonalChange}
                                    placeholder="Name"
                                    autoComplete='off'
                                />
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <label className="form-label">
                                    Name (Bangla)
                                </label>
                                <input
                                    className="form-control"
                                    name="DonerNameBng"
                                    value={personal.DonerNameBng}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter Name (Bangla)"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <label className="form-label">
                                    Mobile no
                                </label>
                                <input
                                    className="form-control"
                                    name="MobileNo"
                                    value={personal.MobileNo}
                                    onChange={handlePersonalChange}
                                    placeholder="Mobile No"
                                    autoComplete='off'
                                />
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="">
                                <label className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    name="Email"
                                    value={personal.Email}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter Email No"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <label className="form-label">
                                    Father's Name
                                </label>
                                <input
                                    className="form-control"
                                    name="FatherName"
                                    value={personal.FatherName}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter Father Name"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="">
                                <label className="form-label">
                                    Mother's Name
                                </label>
                                <input
                                    className="form-control"
                                    name="MotherName"
                                    value={personal.MotherName}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter Mother Name"
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div>
                                <label className="form-label">
                                    NID No
                                </label>
                                <input
                                    className="form-control"
                                    name="NIDNo"
                                    value={personal.NIDNo}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter NID No"
                                    autoComplete='off'
                                />
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className="">
                                <label className="form-label">
                                    Birth Certificate
                                </label>
                                <input
                                    className="form-control"
                                    name="BirthCerNo"
                                    value={personal.BirthCerNo}
                                    onChange={handlePersonalChange}
                                    placeholder="Enter Birth Certificate No"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <label className="form-label">
                                    Education
                                </label>
                                {/*  */}

                                <div className="autocomplete" ref={autocompleteEduRef}>
                                    <input
                                        value={selectAutoEduVal.eduSearch}
                                        onChange={handleEduChange}
                                        placeholder="Select Education"
                                        onFocus={() => setShowEduSuggestions(true)}
                                    />
                                    {showEduSuggestions && (
                                        <ul className="suggestions">
                                            {eduSuggestion.map(suggestion => (
                                                <li onClick={() => handleEduSuggestionClick(suggestion)} key={suggestion.eduQualificationId}>
                                                    {suggestion.eduQualification}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                                {/*  */}
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Occupation
                                </label>


                                {/*  */}
                                <div className="autocomplete" ref={autocompleteOccRef}>
                                    <input
                                        value={selectAutoOccVal.OccSearch}
                                        onChange={handleOccChange}
                                        placeholder="Select Occupation"
                                        onFocus={() => setShowOccSuggestions(true)}
                                    />
                                    {showOccSuggestions && (
                                        <ul className="suggestions">
                                            {OccSuggestion.map(suggestion => (
                                                <li onClick={() => handleOccSuggestionClick(suggestion)} key={suggestion.occupationId}>
                                                    {suggestion.occupationName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                                
                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form card shadow p-3 mt-3">
                    <h5 className="text_primary text-uppercase">Address</h5>
                    <div className="row pt-3">
                        <div className="col-md-6">
                            <div>
                                <label className="form-label">
                                    Present Address
                                </label>
                                <input
                                    className="form-control"
                                    name="PreAddress"
                                    value={address.PreAddress}
                                    onChange={handleaddressChange}
                                    placeholder="Enter Present Address"
                                    autoComplete='off'
                                />
                            </div>
                            

                            {/* PreUpazila */}

                            <div className="row mb-3">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label text-end">Upazila</label>
                                        <div className="col-sm-8">
                                            {/*  */}


                             <div className="autocomplete" ref={autocompletePreRef}>
                                    <input
                                    value={selectAutoPreUpaVal.PreUpaSearch}
                                    onChange={handlePreUpaChange}
                                    placeholder="Select Present Upazila Search"
                                    onFocus={() => setShowPreUpaSuggestions(true)}
                                    />
                                    {showPreUpaSuggestions && (
                                    <ul className="suggestions">
                                        {preUpaSuggestions.map(suggestion => (
                                        <li onClick={() => handlePreUpaSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                                            {suggestion.upazilaNameEn}
                                        </li>
                                        ))}
                                    </ul>
                                    )}

                                </div>


                                            {/*  */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label text-end">District</label>
                                        <div className="col-sm-8">
                                            <input
                                                className="form-control"
                                                name="PreDistrict"
                                                value={selectAutoPreUpaVal.PreDistrict}
                                                onChange={handlePreDistrictChange}
                                                placeholder="Enter District Name "
                                                autoComplete='off'
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* PreUpazila */}




                        </div>
                        <div className="col-md-6">
                            <div className='form-check'>

                                <label className=" form-label d-flex w-100 justify-content-between">
                                    <div className="">Permanent Address</div>
                                    <div className="form-check d-flex gap-2 align-item-center">
                                        <input className="w-auto mb-0" onChange={handleSame} type="checkbox" value={sameAddress} id="flexCheckDefault" checked={sameAddress === false}/>
                                        <label className="form-check-label">
                                            As Same
                                        </label>
                                    </div>
                                </label>
                                <input
                                    className="form-control"
                                    name="PerAddress"
                                    value={address.PerAddress}
                                    onChange={handleaddressChange}
                                    placeholder="Enter Permanent Address"
                                    autoComplete='off'
                                    disabled={!sameAddress}
                                />
                            </div>

                            {sameAddress ?
                                (

                                    <div className="row mb-3">

                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label text-end">Upazila</label>
                                                <div className="col-sm-8">
                                                    {/*  */}
                                                    <div className="autocomplete" ref={autocompletePerUpaRef}>
                                                        <input
                                                        value={selectAutoPerUpaVal.PerUpaSearch}
                                                        onChange={handlePerUpaChange}
                                                        placeholder="Select Permanent Upazila"
                                                        onFocus={() => setShowPerUpaSuggestions(true)}
                                                        />
                                                        {showPerUpaSuggestions && (
                                                        <ul className="suggestions">
                                                            {perUpaSuggestions.map(suggestion => (
                                                            <li onClick={() => handlePerUpaSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                                                                {suggestion.upazilaNameEn}
                                                            </li>
                                                            ))}
                                                        </ul>
                                                        )}

                                                    </div>
                                                 


                                                    {/*  */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label text-end">District</label>
                                                <div className="col-sm-8">
                                                    <input
                                                        className="form-control"
                                                        name="PerDistrict"
                                                        value={selectAutoPerUpaVal.PerDistrict}
                                                        onChange={handlePerDistrictChange}
                                                        placeholder="Enter District Name (Bangla)"
                                                        autoComplete='off'
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            



                                )
                                :
                                (
                                    <div className="row mb-3">

                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label text-end">Upazila</label>
                                                <div className="col-sm-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="PerUpaSearch"
                                                        value={selectAutoPerUpaVal.PerUpaSearch}
                                                        placeholder='type and select Upazila'
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label text-end">District</label>
                                                <div className="col-sm-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name='PerDistrict'
                                                        value={selectAutoPerUpaVal.PerDistrict}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }


                        </div>
                    </div>

                </div>
                <div className="form card shadow p-3 mt-3">
                    <h5 className="text_primary text-uppercase">organization</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label className="form-label">
                                    Org Upazilla
                                </label>

                                {/*  */}

                                <div className="autocomplete" ref={autocompleteOrgUpaRef}>
                                    <input
                                        value={orgUpazila.OrgUpaSearch}
                                        onChange={handleOrgUpaChange}
                                        placeholder="Select Org Upazila Search"
                                        onFocus={() => setShowOrgUpaSuggestions(true)}
                                    />
                                    {showOrgUpaSuggestions && (
                                        <ul className="suggestions">
                                            {orgUpaSuggestions.map(suggestion => (
                                                <li onClick={() => handleSuggestionOrgUpaClick(suggestion)} key={suggestion.upazilaId}>
                                                    {suggestion.upazilaNameEn}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                                {/*  */}


                            </div>

                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <label className="form-label">
                                Org Mosque
                            </label>
                            {/*  */}
                            <div className="autocomplete" ref={autocompleteMosRef}>
                    <input
                      value={selectAutoMosqueVal.MosqueSearch}
                      onChange={handleMosqueChange}
                      placeholder="Select Mosque"
                      onFocus={() => setShowMosSuggestions(true)}
                    />
                    {showMosSuggestions && (
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
                </div>

                <div className="form card shadow p-3 mt-3">
                    <h5 className="text_primary text-uppercase">donation</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label className="form-label">
                                    Donation Amount
                                </label>

                                {/*  */}
                                <div className="autocomplete" ref={autocompleteDonaRef}>
                    <input
                      value={selectAutoDonationVal.DonationSearch}
                      onChange={handleDonaChange}
                      placeholder="Select Donation Amount"
                      onFocus={() => setShowDonationSuggestions(true)}
                    />
                    {showDonationSuggestions && (
                      <ul className="suggestions">
                        {donationSuggestions.map(suggestion => (
                          <li onClick={() => handleDonaSuggestionClick(suggestion)} key={suggestion.donationAmtId}>
                            {suggestion.donationAmt}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                                {/*  */}

                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Net Amount
                                </label>
                                <input
                                    className="form-control"
                                    name="NetAmount"
                                    value={donationAmt.NetAmount}
                                    onChange={handledonationNetChange}
                                    placeholder="Donation Net Amount"
                                    autoComplete='off'
                                    disabled
                                />
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label className="form-label">
                                    Donation Month
                                </label>

                                <select value={donationData.DonationMonth} className="form-select" name="DonationMonth" aria-label="Default select example" onChange={handleDonationDataChange}>
                                    <option value="">---Select----</option>
                                    {month.map((item) => (
                                        <option key={item.label} value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Year
                                </label>
                                <select value={donationData.DonationYear} className="form-select" name="DonationYear" aria-label="Default select example" onChange={handleDonationDataChange}>
                                    <option value="">---Select----</option>
                                    {year.map((item) => (
                                        <option key={item.label} value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <label className="form-label">
                                    Enrollment Date
                                </label>
                                <input type="date" name="EnrollmentDate" className='form-control' value={donationData.EnrollmentDate} onChange={handleDonationDataChange} />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Life Status
                                </label>
                                <select value={life.LifeStatus} className="form-select" name="LifeStatus" onChange={handleLifeChange}>
                                    <option value="" >---Select----</option>
                                    <option value="Alive">Alive</option>
                                    <option value="Dead">Dead</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {life.LifeStatus === "Dead" ?
                        (
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <label className="form-label">
                                            Dead Date
                                        </label>
                                        <input type="date" name="DeadDate" className='form-control' value={life.DeadDate} onChange={handleLifeChange} />
                                    </div>

                                </div>
                            </div>
                        )
                        :
                        (<></>)


                    }
                </div>
                <div className="d-flex gap-3 justify-content-center mt-4">
                    {/* <button className="btn btn-success w-auto" onClick={handleSubmit}>Save</button> */}
                    <button className="btn btn-warning w-auto" onClick={handleSubmit}>Update</button>
                </div>
            </form>


            {/* Modal */}
            {/* React-Bootstrap Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Save Completed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ textAlign: "center" }}> Donar ID :{saveOutput.DonerActualId}</p>
                    <p style={{ textAlign: "center" }}> Organizaiotn ID :{saveOutput.OrganisationalId}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* Additional buttons or actions */}
                </Modal.Footer>
            </Modal>


            {/* Modal */}


        </div>

    )
}

export default withAuthentication(UpdateDataEnrollment);