import React, { useState, useEffect, useRef } from 'react';
import { year, month } from '../../../../Utils/EnrollmentData';
import axios from 'axios';
import { GetDonationAmtList, GetActualIdandOrgId, DonarPaymentActualID, DonarPaymentSave } from '../../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
import withAuthentication from '../../Protected/withAuthentication';
import { useNavigate } from 'react-router-dom';

const DonarPayment = () => {
    const navigate = useNavigate();
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

    const [showDonationSuggestions, setShowDonationSuggestions] = useState(false);
    const donationSuggestions = listDonationAmt.filter(option => option.donationAmt.toString().includes(selectAutoDonationVal.DonationSearch));

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

    const [showActIdSuggestions, setShowActIdSuggestions] = useState(false);
    const actIdSuggestions = listAllId.filter(option => option.donerActualId.toString().toLowerCase().includes(selectAutoActOrgVal.actualIdSearch.toLowerCase()))




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

    const autocompleteActIdRef = useRef();
    useEffect(() => {
        const handleActIdClick = (event) => {
            if (autocompleteActIdRef.current && !autocompleteActIdRef.current.contains(event.target)) {
                setShowActIdSuggestions(false)
            }
        };
        document.addEventListener("click", handleActIdClick);
        return () => {
            document.removeEventListener("click", handleActIdClick)
        }
    }, [])

    const handleActIdChange = e => {
        setSelectAutoActOrgVal({
            ...selectAutoActOrgVal,
            actualIdSearch: e.target.value
        });
    }

    const handleSuggestionActIdClick = (suggetion) => {
        setSelectAutoActOrgVal({
            actualIdSearch: suggetion.donerActualId,
            actualIdVal: suggetion.donerActualId,
            orgIdSearch: suggetion.organisationalId,
            orgIdVal: suggetion.organisationalId,
            donarEnrollmentId: suggetion.donerEnrollmentId
        });
        setShowActIdSuggestions(false);
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
            DisCountPer: donationAmt.DisPerAmt,
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
                                <div className="autocomplete" ref={autocompleteActIdRef}>
                                    <input
                                        value={selectAutoActOrgVal.actualIdSearch}
                                        onChange={handleActIdChange}
                                        placeholder="Select Actual Id"
                                        onFocus={() => setShowActIdSuggestions(true)}
                                    />
                                    {showActIdSuggestions && (
                                        <ul className="suggestions">
                                            {actIdSuggestions.map(suggestion => (
                                                <li onClick={() => handleSuggestionActIdClick(suggestion)} key={suggestion.donerEnrollmentId}>
                                                    {suggestion.donerActualId}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

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
                        <div className="text-center">
                            <button type="button" className="btn btn-md btn-danger" onClick={() => navigate("/dashboard")}>Close</button>
                            <button type="button" className="btn btn-md btn-warning" onClick={() => window.location.reload()}>Refresh</button>
                            <button type="button" className="btn btn-md btn-primary" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>

                </div>

            </form>
            {/* </div>
            </div> */}


        </div>
    )
}

export default withAuthentication(DonarPayment);