import React, { useState, useEffect } from 'react';
import { year, month } from '../../../../Utils/EnrollmentData';
import axios from 'axios';
import { GetDonationAmtList, GetActualIdandOrgId, DonarPaymentActualID, DonarPaymentSave } from '../../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';

const DonarPayment = () => {
    const [donationData, setDonationData] = useState({
        DonarPaymentId: "",
        DonationMonth: "",
        DonationYear: ""
    });


    const [listDonationAmt, setListDonationAmt] = useState([]);

    // Donation Auto Complete
    const [selectAutoDonationVal, setSelectAutoDonationVal] = useState({
        DonationSearch: "",
        DonationAmtId: "",
    });
    // Donation Auto Complete


    // Donation Amount
    const [donationAmt, setDonationAmt] = useState({
        DisPerAmt: 20,
        NetAmount: ""
    });

    const [listAllId, setListAllId] = useState([]);
    const [selectAutoActOrgVal, setSelectAutoActOrgVal] = useState({
        actualIdSearch: "",
        actualIdVal: "",
        orgIdSearch: "",
        orgIdVal: "",
        donarEnrollmentId: ""
    });

    const [userAddress, setUserAddress] = useState({
        macAddress: "",
        ipAddress: ""
    });

    const [flag, setFlag] = useState(true);




    useEffect(() => {
        getDonationAmt();
        getActOrg();
        ipData();
    }, []);


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       setFlag(prevFlag => !prevFlag); // Toggle the flag value
    //     }, 10000); // 2000 milliseconds delay (adjust as needed)

    //     return () => clearTimeout(timer); // Clean up the timer on component unmount
    //   }, []);


    const handleMonthYearChange = e => {
        const { name, value } = e.target;
        setDonationData((prev) => {
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


    // Donation Amount AutoComplete/////////
    const getDonationAmt = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try {
            let getDonaAmt = await axios.get(GetDonationAmtList, { headers });
            let getAmtList = getDonaAmt.data._listData;
            //  console.log("list", getAmtList);
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
        setFlag(true);
    }

    const handleDonaAmtSearch = (searchTerm, val) => {
        setSelectAutoDonationVal({
            DonationSearch: searchTerm,
            DonationAmtId: val
        });


        NetAmount(searchTerm);
    }

    const NetAmount = (data) => {
        // console.log("net val",data+2);
        let { DisPerAmt } = donationAmt;
        let calcData = (data * DisPerAmt) / 100;
        let netData = data - calcData;

        setDonationAmt({
            ...donationAmt,
            NetAmount: netData
        });

        setFlag(false);

    }


    const handledonationOrgIdChange = (e) => {
        const { name, value } = e.target;
        setSelectAutoActOrgVal((prev) => {
            return {
                ...prev,
                [name]: value,
                orgIdVal: value
            }
        })
    }


    const getActOrg = async () => {
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        try {
            let getActOrgData = await axios.get(DonarPaymentActualID, { headers });
            let actOrgGet = getActOrgData.data;
            setListAllId(actOrgGet._listData);
            //setListOrgId(actOrgGet._orgList);

        } catch (err) {
            console.log("error", err);
            if (err.response) {
                let message = err.response.status === 401 ? "Authentication Error" : "Bad Request";
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
    // Actual Id Handle change all function for AutoComplete

    // Actual Id Handle change all function for AutoComplete

    const handleActIdSearchChange = (e) => {
        setSelectAutoActOrgVal({
            ...selectAutoActOrgVal,
            actualIdSearch: e.target.value
        });
    }

    const handleActIdSearch = (searchTerm, orgVal, donarId) => {
        //  console.log("edusearch", searchTerm);
        //  console.log("eduId", val);
        setSelectAutoActOrgVal({
            actualIdSearch: searchTerm,
            actualIdVal: searchTerm,
            orgIdSearch: orgVal,
            orgIdVal: orgVal,
            donarEnrollmentId: donarId
        });

    }
    // Actual Id Handle change all function for AutoComplete

    const ipData = () => {
        fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                //   console.log('IP Address:', ipAddress);
                setUserAddress({
                    ...userAddress,
                    ipAddress: ipAddress
                })
            })
            .catch(err => {
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
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        let payload = {
            donerPaymentId: donationData.DonarPaymentId === "" ? 0 : donationData.DonarPaymentId,
            donerEnrollmentId: selectAutoActOrgVal.donarEnrollmentId,
            paymentYear: donationData.DonationYear,
            paymentMonth: donationData.DonationMonth,
            donationAmtId: selectAutoDonationVal.DonationAmtId,
            netAmount: donationAmt.NetAmount,
            DisCountPer:donationAmt.DisPerAmt,
            userPcIP: userAddress.ipAddress
        }

         //console.log("PaymentPayload", payload);

        try {
            let savData = await axios.post(DonarPaymentSave, payload, { headers });
            //  console.log("SaveData", savData.data);
            if (savData.data.success === true) {
                toast.success('Successfully Saved!', { duration: 4000, position: 'top-center' });
                emptyState();
            } else {
                toast.success('Payment Error', { duration: 4000, position: 'top-center' });
            }

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

    const emptyState = () => {
        setDonationData({
            DonarPaymentId: "",
            DonationMonth: "",
            DonationYear: ""
        });

        setSelectAutoDonationVal({
            DonationSearch: "",
            DonationAmtId: "",
        });


        setDonationAmt({
            DisPerAmt: 20,
            NetAmount: ""
        });
        setSelectAutoActOrgVal({
            actualIdSearch: "",
            actualIdVal: "",
            orgIdSearch: "",
            orgIdVal: "",
            donarEnrollmentId: ""
        });

    }


    // console.log("ActualOrgId", selectAutoActOrgVal);

    return (
        <div className="page-content p-3">
            {/* <div className="pg_title">
        <h3>Donar Payment Entry</h3>
    </div> */}
            {/* <div className="row">
                <div className="col-md-4"> */}
                    <form action="">
                        <div className="form card shadow p-3">
                            <h5 className="text_primary text-capitalize">Donar Payment Entry</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="col-md-3 col-form-label">Year</label>
                                    {/* <div className="col-md-9"> */}
                                    <select value={donationData.DonationYear} className="form-select" name="DonationYear" aria-label="Default select example" onChange={handleMonthYearChange}>
                                        <option value="">---Select----</option>
                                        {year.map((item) => (
                                            <option key={item.label} value={item.value}>{item.label}</option>
                                        ))}

                                    </select>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="col-form-label col-md-3">Month</label>

                                    <select value={donationData.DonationMonth} className="form-select" name="DonationMonth" aria-label="Default select example" onChange={handleMonthYearChange}>
                                        <option value="">---Select----</option>
                                        {month.map((item) => (
                                            <option key={item.label} value={item.value}>{item.label}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className="mb-3">
                                <label className="col-form-label">Donation Amount</label>
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
                                    {flag === true ?
                                        <div className='dropdown'>
                                            {
                                                listDonationAmt.filter(item => {
                                                    const searchTerm = selectAutoDonationVal.DonationSearch;
                                                    const fullName = item.donationAmt;

                                                    return searchTerm && fullName.toString().includes(searchTerm) && fullName !== searchTerm;
                                                }).slice(0, 10)
                                                    .map((item) => (
                                                        <div
                                                            key={item.donationAmtId}
                                                            onClick={() => handleDonaAmtSearch(item.donationAmt, item.donationAmtId)}
                                                            className='dropdown-row'
                                                        >
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
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="col-form-label">Net Amount</label>
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
                            <div className="col-md-4">
                            <div className="mb-3">
                                <label className="col-form-label">Actual Id</label>
                                {/*  */}

                                <div className='search-container'>
                                    <div className='search-inner'>
                                        <input
                                            type="text"
                                            placeholder="Type Actual ID"
                                            name="actualIdSearch"
                                            onChange={handleActIdSearchChange}
                                            value={selectAutoActOrgVal.actualIdSearch}
                                            autoComplete='off'
                                            style={{ width: "2000px" }}
                                        />
                                    </div>
                                    <div className='dropdown'>
                                        {
                                            listAllId.filter(item => {
                                                const searchTerm = selectAutoActOrgVal.actualIdSearch;
                                                const fullName = item.donerActualId;

                                                return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                                            }).slice(0, 10)
                                                .map((item) => (
                                                    <div
                                                        key={item.donerEnrollmentId}
                                                        onClick={() => handleActIdSearch(item.donerActualId, item.organisationalId, item.donerEnrollmentId)}
                                                        className='dropdown-row'
                                                    >
                                                        {item.donerActualId}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                {/*  */}
                            </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="col-form-label">Organizational Id</label>
                                    <input
                                        className="form-control"
                                        name="orgIdSearch"
                                        value={selectAutoActOrgVal.orgIdSearch}
                                        onChange={handledonationOrgIdChange}
                                        placeholder="Organization ID"
                                        autoComplete='off'
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                            
                            
                            
                            
                           
                          
                            <div className="d-flex gap-2 mt-4">
                                <button className="btn btn-success w-auto m-0" onClick={handleSubmit}>Save</button>
                                {/* <button className="btn btn-warning w-auto  m-0">Update</button> */}
                            </div>
                        </div>

                    </form>
                {/* </div>
            </div> */}


        </div>
    )
}

export default DonarPayment