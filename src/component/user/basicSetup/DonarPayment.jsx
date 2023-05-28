import React from 'react';
import { year, month } from '../../../../Utils/EnrollmentData';
import { useState } from 'react';

const DonarPayment = () => {
    const [donationData, setDonationData] = useState({
        DonationMonth:"",
        DonationYear:""
    });

    
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

    const [listActualId, setListActualId] = useState([]);
    const [selectAutoActualVal, setSelectAutoActualVal] = useState({
      actualIdSearch: "",
      actualIdVal: ""
    });
    const [listOrgId, setListOrgId] = useState([]);
    const [selectAutoOrgVal, setSelectAutoOrgVal] = useState({
      OrgIdSearch: "",
      OrgIdVal: ""
    });

    const handleMonthYearChange = e =>{
        const { name, value } = e.target;
        setDonationData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    
  

  return (
    <div className="page-content p-3">
    {/* <div className="pg_title">
        <h3>Donar Payment Entry</h3>
    </div> */}
    <div className="row">
        <div className="col-md-4">
            <form action="">
            <div className="form card shadow p-3">
            <h5 className="text_primary text-capitalize">Donar Payment Entry</h5>
                <div className="mb-3 row">
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
                <div className="mb-3 row">
                    <label className="col-form-label col-md-3">Month</label>
                    
                    <select value={donationData.DonationMonth} className="form-select" name="DonationMonth" aria-label="Default select example" onChange={handleMonthYearChange}>
                                    <option value="">---Select----</option>
                                    {month.map((item) => (
                                        <option key={item.label} value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label">Donation Amount</label>
                    <select className="form-select">
                            <option>1</option>
                            <option>2</option>
                    </select>
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label">Net Amount</label>
                    <select className="form-select">
                            <option>1</option>
                            <option>2</option>
                    </select>
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label">Actual Id</label>
                    <select className="form-select">
                            <option>1</option>
                            <option>2</option>
                    </select>
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label">Organizational Id</label>
                    <select className="form-select">
                            <option>1</option>
                            <option>2</option>
                    </select>
                </div>
                <div className="d-flex gap-2 mt-4">
                        <button className="btn btn-success w-auto m-0">Save</button>
                        <button className="btn btn-warning w-auto  m-0">Update</button>
                </div>
            </div>
        
             </form>
        </div>
    </div>


    </div>
  )
}

export default DonarPayment