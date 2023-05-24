import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { month, year } from '../../../Utils/EnrollmentData';
import { GetEducationList, GetOccupationList, GetUpazilaList, GetMosqueList, GetDonationAmtList } from '../../URL/ApiList';

const EnrollmentFormPage = () => {
    const [personal, setPersonal] = useState({
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
    const [sameAddress, setSameAddress] = useState(false);

    const [address, SetAddress] = useState({
        PreAddress: "",
        PerAddress: ""
    });

    const [listUpazila, setListUpazila] = useState([]);

    //Present Upazila AutoComplete
    const [selectAutoPreUpaVal, setSelectAutoPreUpaVal] = useState({
        PreUpaSearch: "",
        PreUpazilaId: ""
    });

    //Present Upazila AutoComplete

    //Permanent Upazila AutoComplete
    const [selectAutoPerUpaVal, setSelectAutoPerUpaVal] = useState({
        PerUpaSearch: "",
        PerUpazilaId: ""
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
        EnrollmentDate: "",
    });

    const [life, setLife] = useState({
        LifeStatus: "",
        DeadDate: ""
    })




    useEffect(() => {
        getEduList();
        getOccupation();
        getUpazila();
        getMosque();
        getDonationAmt();
    }, []);


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

        if(e.target.name === "LifeStatus" && e.target.value === "Alive"){
            DeadDate(e.target.value);
        }
       
    }

    const DeadDate = (data) =>{
        setLife({
            LifeStatus:data,
            DeadDate:""
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
                let message = err.response.data.message;
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
        console.log("edusearch", searchTerm);
        console.log("eduId", val);
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
                let message = err.response.data.message;
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
        console.log("occsearch", searchTerm);
        console.log("occId", val);
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
                let message = err.response.data.message;
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
    }

    const handleOrgUpaSearch = (searchTerm, val) => {
        console.log("Upasearch", searchTerm);
        console.log("UpaId", val);
        setOrgUpazila({
            OrgUpaSearch: searchTerm,
            OrgUpazilaId: val
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
                let message = err.response.data.message;
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
                let message = err.response.data.message;
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
        })
    }


    console.log("Life",life);
    return (
        <div className="page-content p-4">
            <div className="pg_title">
                <h3>Enrollment</h3>
            </div>
            <div className="form card p-3">
                <form action="">
                    <div className="row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <div className="row">
                                <label className="form-label col-md-4">
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
                    </div>
                    <div className="row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                    </div>
                    <div className="row">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                    </div>
                    <div className="row">
                        <div className="col-md-6">
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

                                                return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
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

                                                return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
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
                    <div className="row">
                        <div className="col-md-12">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <label className="form-label">
                                    Permanent Address
                                </label>
                                <input
                                    className="form-control"
                                    name="PerAddress"
                                    value={address.PerAddress}
                                    onChange={handleaddressChange}
                                    placeholder="Enter Permanent Address"
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </div>
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

                                                return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
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
                                            listMosque.filter(item => {
                                                const searchTerm = selectAutoMosqueVal.MosqueSearch.toLowerCase();
                                                const fullName = item.mosqueNameEn.toLowerCase();

                                                return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
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
                                </div>
                                {/*  */}
                            </div>
                        </div>
                    </div>
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
                                    <div className='dropdown'>
                                        {
                                            listDonationAmt.filter(item => {
                                                const searchTerm = selectAutoDonationVal.DonationSearch;
                                                const fullName = item.donationAmt;

                                                return searchTerm && fullName.toString().startsWith(searchTerm) && fullName != searchTerm;
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

                                <select class="form-select" name="DonationMonth" aria-label="Default select example" onChange={handleDonationDataChange}>
                                    <option selected>---Select----</option>
                                    {month.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Year
                                </label>
                                <select class="form-select" name="DonationYear" aria-label="Default select example" onChange={handleDonationDataChange}>
                                    <option selected>---Select----</option>
                                    {year.map((item) => (
                                        <option value={item.value}>{item.label}</option>
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
                                <input type="date" name="EnrollmentDate" className='form-control' onChange={handleDonationDataChange} />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <label className="form-label">
                                    Life Status
                                </label>
                                <select className="form-select" name="LifeStatus" onChange={handleLifeChange}>
                                    <option selected>---Select----</option>
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
                                        <input type="date" name="DeadDate" className='form-control' onChange={handleLifeChange}/>
                                    </div>

                                </div>
                            </div>
                        )
                        :
                        (<></>)


                    }

                </form>
            </div>

        </div>
    )
}

export default EnrollmentFormPage