import React, { useEffect, useState } from 'react';
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
    // Education autoComplete////

    //Occupation AutoComplete/////
    const [listOccupation, setListOccupation] = useState([]);
    const [selectAutoOccVal, setSelectAutoOccVal] = useState({
        OccSearch: "",
        OccupationId: ""
    });
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

    //Present Upazila AutoComplete

    //Permanent Upazila AutoComplete
    const [selectAutoPerUpaVal, setSelectAutoPerUpaVal] = useState({
        PerUpaSearch: "",
        PerUpazilaId: "",
        PerDistrict: ""
    });

    //Permanent Upazila AutoComplete

    const [orgUpazila, setOrgUpazila] = useState({
        OrgUpaSearch: "",
        OrgUpazilaId: ""
    });


    // Mosque Auto Complete
    const [listMosque, setListMosque] = useState([]);
    const [selectAutoMosqueVal, setSelectAutoMosqueVal] = useState({
        MosqueSearch: "",
        OrgMosqueId: ""
    });
    // Mosque Auto Complete


    const [listDonationAmt, setListDonationAmt] = useState([]);

    // Donation Auto Complete
    const [selectAutoDonationVal, setSelectAutoDonationVal] = useState({
        DonationSearch: "",
        DonationAmtId: ""
    });
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

    const handleEduSearchChange = (e) => {
        setSelectAutoEduVal({
            ...selectAutoEduVal,
            eduSearch: e.target.value
        });
    }

    const handleEduSearch = (searchTerm, val) => {
        // console.log("edusearch", searchTerm);
        // console.log("eduId", val);
        setSelectAutoEduVal({
            eduSearch: searchTerm,
            EduQualificationId: val
        });
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


    const handleOccSearchChange = (e) => {
        setSelectAutoOccVal({
            ...selectAutoOccVal,
            OccSearch: e.target.value
        });
    }

    const handleOccSearch = (searchTerm, val) => {
        // console.log("occsearch", searchTerm);
        // console.log("occId", val);
        setSelectAutoOccVal({
            OccSearch: searchTerm,
            OccupationId: val
        });
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
    const handleOrgUpaSearchChange = (e) => {
        setOrgUpazila({
            ...orgUpazila,
            OrgUpaSearch: e.target.value
        });
        changeMosqueData();
    }

    const handleOrgUpaSearch = (searchTerm, val) => {
        // console.log("Upasearch", searchTerm);
        // console.log("UpaId", val);
        setOrgUpazila({
            OrgUpaSearch: searchTerm,
            OrgUpazilaId: val
        });
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


    const handleMosqueSearchChange = (e) => {
        setSelectAutoMosqueVal({
            ...selectAutoMosqueVal,
            MosqueSearch: e.target.value
        });
    }

    const handleMosqueSearch = (searchTerm, val) => {
        //console.log("mossearch", searchTerm);
        //console.log("mosId", val);
        setSelectAutoMosqueVal({
            MosqueSearch: searchTerm,
            OrgMosqueId: val
        });
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


    const handleDonaAmtSearchChange = (e) => {
        setSelectAutoDonationVal({
            ...selectAutoDonationVal,
            DonationSearch: e.target.value
        });
        setDonationFlag(true);
    }

    const handleDonaAmtSearch = (searchTerm, val) => {
        //console.log("mossearch", searchTerm);
        //console.log("mosId", val);
        setSelectAutoDonationVal({
            DonationSearch: searchTerm,
            DonationAmtId: val
        });

        NetAmount(searchTerm);
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
        setDonationFlag(false);
    }

    // const sendData = (searchTerm, val, districtName) => {
    //     // console.log("data", searchTerm, val, districtName);
    //     setSelectAutoPreUpaVal({
    //         PreUpaSearch: searchTerm,
    //         PreUpazilaId: val,
    //         PreDistrict: districtName
    //     });
    // }

    // const myData = (searchTerm, val, districtName) => {
    //     // console.log("data2", searchTerm, val, districtName);
    //     setSelectAutoPerUpaVal({
    //         PerUpaSearch: searchTerm,
    //         PerUpazilaId: val,
    //         PerDistrict: districtName
    //     });
    // }


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


    const handlePreUpaSearchChange = (e) => {
        setSelectAutoPreUpaVal({
            ...selectAutoPreUpaVal,
            PreUpaSearch: e.target.value
        });
    }


    const handlePreUpaSearch = async (searchTerm, val) => {
        // console.log("edusearch", searchTerm);
        //console.log("eduId", val);
        try {
            let getDistrict = await axios.get(GetDistrictfromUpazila + val);
            console.log("District", getDistrict.data.districtobj.districtNameEn);
            let districtName = getDistrict.data.districtobj.districtNameEn;

            setSelectAutoPreUpaVal({
                PreUpaSearch: searchTerm,
                PreUpazilaId: val,
                PreDistrict: districtName
            });


        } catch (err) {
            console.log(err);
        }

    }


    ////////////////////////////////////////////////////////

    ///////////Permanent Upzila And District///////////////////


    const handlePerDistrictChange = (e) => {
        setSelectAutoPerUpaVal({
            ...compData,
            PreDistrict: e.target.name
        })
    }


    const handlePerUpaSearchChange = (e) => {
        setSelectAutoPerUpaVal({
            ...selectAutoPerUpaVal,
            PerUpaSearch: e.target.value
        });
    }


    const handlePerUpaSearch = async (searchTerm, val) => {

        try {
            let getDistrict = await axios.get(GetDistrictfromUpazila + val);
            console.log("District", getDistrict.data.districtobj.districtNameEn);
            let districtName = getDistrict.data.districtobj.districtNameEn;

            setSelectAutoPerUpaVal({
                PerUpaSearch: searchTerm,
                PerUpazilaId: val,
                PerDistrict: districtName
            });


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

                                <div className='search-container'>
                                    <div className='search-inner'>
                                        <input
                                            type="text"
                                            placeholder="Type Education (English)"
                                            name="eduSearch"
                                            onChange={handleEduSearchChange}
                                            value={selectAutoEduVal.eduSearch}
                                            autoComplete='off'
                                            style={{ width: "2000px" }}
                                        />
                                    </div>
                                    <div className='dropdown'>
                                        {
                                            listEducation.filter(item => {
                                                const searchTerm = selectAutoEduVal.eduSearch.toLowerCase();
                                                const fullName = item.eduQualification.toLowerCase();

                                                return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                                .map((item) => (
                                                    <div
                                                        key={item.eduQualificationId}
                                                        onClick={() => handleEduSearch(item.eduQualification, item.eduQualificationId)}
                                                        className='dropdown-row'>
                                                        {item.eduQualification}
                                                    </div>
                                                ))
                                        }
                                    </div>
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

                                <div className='search-container'>
                                    <div className='search-inner'>
                                        <input
                                            type="text"
                                            placeholder="Type Occupation Name (English)"
                                            name="OccSearch"
                                            onChange={handleOccSearchChange}
                                            value={selectAutoOccVal.OccSearch}
                                            autoComplete='off'
                                            style={{ width: "2000px" }}
                                        />
                                    </div>
                                    <div className='dropdown'>
                                        {
                                            listOccupation.filter(item => {
                                                const searchTerm = selectAutoOccVal.OccSearch.toLowerCase();
                                                const fullName = item.occupationName.toLowerCase();

                                                return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                                .map((item) => (
                                                    <div
                                                        key={item.occupationId}
                                                        onClick={() => handleOccSearch(item.occupationName, item.occupationId)}
                                                        className='dropdown-row'>
                                                        {item.occupationName}
                                                    </div>
                                                ))
                                        }
                                    </div>
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
                            {/* <div className="row mb-3">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label  className="col-sm-4 col-form-label text-end">Upazila</label>
                                        <div className="col-sm-8">
                                        <input type="email" className="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                   <div className="row">
                                   <label  className="col-sm-4 col-form-label text-end">District</label>
                                    <div className="col-sm-8">
                                    <input type="email" className="form-control" id="inputEmail3" />
                                    </div>
                                   </div>
                                </div>
                            </div> */}

                            {/* PreUpazila */}

                            <div className="row mb-3">

                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-4 col-form-label text-end">Upazila</label>
                                        <div className="col-sm-8">
                                            {/*  */}

                                            <div className='search-container'>
                                                <div className='search-inner'>
                                                    <input
                                                        type="text"
                                                        placeholder="Type Upazila Name & Select (English)"
                                                        name="PreUpaSearch"
                                                        onChange={handlePreUpaSearchChange}
                                                        value={selectAutoPreUpaVal.PreUpaSearch}
                                                        autoComplete='off'
                                                        style={{ width: "2000px" }}
                                                    />
                                                </div>
                                                <div className='dropdown'>
                                                    {
                                                        listUpazila.filter(item => {
                                                            const searchTerm = selectAutoPreUpaVal.PreUpaSearch.toLowerCase();
                                                            const fullName = item.upazilaNameEn.toLowerCase();

                                                            return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                                                        }).slice(0, 10)
                                                            .map((item) => (
                                                                <div
                                                                    key={item.upazilaId}
                                                                    onClick={() => handlePreUpaSearch(item.upazilaNameEn, item.upazilaId)}
                                                                    className='dropdown-row'>
                                                                    {item.upazilaNameEn}
                                                                </div>
                                                            ))
                                                    }
                                                </div>
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

                                                    <div className='search-container'>
                                                        <div className='search-inner'>
                                                            <input
                                                                type="text"
                                                                placeholder="Type Upazila Name & Select (English)"
                                                                name="PerUpaSearch"
                                                                onChange={handlePerUpaSearchChange}
                                                                value={selectAutoPerUpaVal.PerUpaSearch}
                                                                autoComplete='off'
                                                                style={{ width: "2000px" }}
                                                            />
                                                        </div>
                                                        <div className='dropdown'>
                                                            {
                                                                listUpazila.filter(item => {
                                                                    const searchTerm = selectAutoPerUpaVal.PerUpaSearch.toLowerCase();
                                                                    const fullName = item.upazilaNameEn.toLowerCase();

                                                                    return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                                                                }).slice(0, 10)
                                                                    .map((item) => (
                                                                        <div
                                                                            key={item.upazilaId}
                                                                            onClick={() => handlePerUpaSearch(item.upazilaNameEn, item.upazilaId)}
                                                                            className='dropdown-row'>
                                                                            {item.upazilaNameEn}
                                                                        </div>
                                                                    ))
                                                            }
                                                        </div>
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

                                <div className='search-container'>
                                    <div className='search-inner'>
                                        <input
                                            type="text"
                                            placeholder="Type Org Upazila Name (English)"
                                            name="OrgUpaSearch"
                                            onChange={handleOrgUpaSearchChange}
                                            value={orgUpazila.OrgUpaSearch}
                                            autoComplete='off'
                                            style={{ width: "2000px" }}
                                        />
                                    </div>
                                    <div className='dropdown'>
                                        {
                                            listUpazila.filter(item => {
                                                const searchTerm = orgUpazila.OrgUpaSearch.toLowerCase();
                                                const fullName = item.upazilaNameEn.toLowerCase();

                                                return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                                .map((item) => (
                                                    <div
                                                        key={item.upazilaId}
                                                        onClick={() => handleOrgUpaSearch(item.upazilaNameEn, item.upazilaId)}
                                                        className='dropdown-row'>
                                                        {item.upazilaNameEn}
                                                    </div>
                                                ))
                                        }
                                    </div>
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

                            <div className='search-container'>
                                <div className='search-inner'>
                                    <input
                                        type="text"
                                        placeholder="Type Mosque Name (English)"
                                        name="MosqueSearch"
                                        onChange={handleMosqueSearchChange}
                                        value={selectAutoMosqueVal.MosqueSearch}
                                        autoComplete='off'
                                        style={{ width: "2000px" }}
                                    />
                                </div>
                                <div className='dropdown'>
                                    {
                                        listMosque.filter(item => item.upazilaNameEn === orgUpazila.OrgUpaSearch)
                                            .filter(item => {
                                                const searchTerm = selectAutoMosqueVal.MosqueSearch.toLowerCase();
                                                const fullName = item.mosqueNameEn.toLowerCase();

                                                return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                            .map((item) => (
                                                <div
                                                    key={item.mosqueId}
                                                    onClick={() => handleMosqueSearch(item.mosqueNameEn, item.mosqueId)}
                                                    className='dropdown-row'>
                                                    {item.mosqueNameEn}
                                                </div>
                                            ))
                                    }
                                </div>
                                {/*  */}
                            </div>
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

                                <div className='search-container'>
                                    <div className='search-inner'>
                                        <input
                                            type="text"
                                            placeholder="Type Donation (English)"
                                            name="DonationSearch"
                                            onChange={handleDonaAmtSearchChange}
                                            value={selectAutoDonationVal.DonationSearch}
                                            autoComplete='off'
                                            style={{ width: "2000px" }}
                                        />
                                    </div>
                                    {
                                        donationFlag === true ?
                                        <div className='dropdown'>
                                        {
                                            listDonationAmt.filter(item => {
                                                const searchTerm = selectAutoDonationVal.DonationSearch;
                                                const fullName = item.donationAmt;

                                                return searchTerm && fullName.toString().includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                                .map((item) => (
                                                    <div
                                                        key={item.donationAmtId}
                                                        onClick={() => handleDonaAmtSearch(item.donationAmt, item.donationAmtId)}
                                                        className='dropdown-row'>
                                                        {item.donationAmt}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                        :
                                        ""  
                                    }
                                    
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