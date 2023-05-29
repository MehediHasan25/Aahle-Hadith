import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GetDonationAmtList,DonarPaymentActualID } from '../../../URL/ApiList';
import { year } from '../../../../Utils/EnrollmentData';

const MonthlyDonarPaymentList = () => {
    const [listAllId, setListAllId] = useState([]);
    const [monthlyData, setMonthlyData] = useState({
        actualIdSearch: "",
        actualIdVal: "",
        orgIdSearch:"",
        orgIdVal:"",
        donarEnrollmentId: "",
        yearData:""
    });

    const [listDonationAmt, setListDonationAmt] = useState([]); 
    // const [donationSearch, setDonationSearch] = useState("");
    const [disPerAmt, setDisPerAmt] = useState(20);

    const [dataList, setDataList]  = useState([
        { month:"January",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"February",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"March",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"April",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"May",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"June",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"July",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"August",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"September",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"October",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"November",  DonationSearch: "",DonationAmtId: "", netAmount:""},
        { month:"December",  DonationSearch: "",DonationAmtId: "", netAmount:""},
    ]);

    useEffect(()=>{
        getDonationAmt();
        getActOrg();
    },[]);

    const handlemonthlyDataChange = (e) => {
        const { name, value } = e.target;
        setMonthlyData((prev) => {
            return {
                ...prev,
                [name]: value
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

      
      // Actual Id Handle change all function for AutoComplete

  const handleActIdSearchChange = (e) => {
    setMonthlyData({
      ...monthlyData,
      actualIdSearch: e.target.value
    });
  }

  const handleActIdSearch = (searchTerm, orgVal, donarId) => {
    //  console.log("edusearch", searchTerm);
    //  console.log("eduId", val);
    setMonthlyData({
        ...monthlyData,
      actualIdSearch: searchTerm,
      actualIdVal: searchTerm,
      orgIdSearch:orgVal,
      orgIdVal:orgVal,
      donarEnrollmentId: donarId
    });
    
  }
  // Actual Id Handle change all function for AutoComplete


  const handledonationOrgIdChange = (e) =>{
    const {name,value} = e.target;
    monthlyData((prev) => {
        return {
            ...prev,
            [name]: value,
            orgIdVal:value
        }
    })
}
    
    
    const handleDonationSearch =(e, month) =>{
        const { name, value } = e.target;
        // console.log("val", e.target[e.target.selectedIndex].label);
        let labelVal =  e.target[e.target.selectedIndex].label;
        let netAmountData = NetAmount(labelVal);
        setDataList(prevDataList => {
         const updatedDataList = prevDataList.map((item) => {
            if (item.month === month) {
                return { ...item, [name]: value, netAmount:netAmountData, DonationSearch:labelVal };
             }
            return item;
            });

            return updatedDataList;

        });
        
    }


    const NetAmount = (data) => {
        // console.log("net val",data+2);
        let calcData = (data * disPerAmt) / 100;
        let netData = data - calcData;
        return netData;
    }


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



    console.log("data",monthlyData);

  return (
    <div className="page-content p-3">
        <div className="row">
        <div className="col-md-7">
        <form action="">
            <div className="form card shadow p-3">
            <h5 className="text_primary text-capitalize">Donar Payment Entry (Individual)</h5>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Actual ID</label>
{/*  */}
                    <div className='col-md-9'>
                    <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Type Actual ID"
                        name="actualIdSearch"
                        onChange={handleActIdSearchChange}
                        value={monthlyData.actualIdSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listAllId.filter(item => {
                          const searchTerm = monthlyData.actualIdSearch;
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
                  </div>
                  {/*  */}
                    {/* </div> */}
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label col-md-3">Organizational ID</label>
                    <div className='col-md-9'>
                        <input
                                    className="form-control "
                                    name="orgIdSearch"
                                    value={monthlyData.orgIdSearch}
                                    onChange={handledonationOrgIdChange}
                                    placeholder="Organization ID"
                                    autoComplete='off'
                                    disabled
                                />
                                </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Year</label>
                    <div className='col-md-9'>
                    <select defaultValue="" className="form-select " name="yearData" aria-label="Default select example" onChange={handlemonthlyDataChange}>
                                    <option value="">---Select----</option>
                                    {year.map((item) => (
                                        <option key={item.label} value={item.value}>{item.label}</option>
                                    ))}

                                </select>
                                </div>
                </div>
                <div className="mb-3 row">
                    {/* table will be auto generated */}
                    <table className="table table-striprd border">
                        <thead className="bg-info">
                            <tr>
                                <th>Month</th>
                                <th>Donation Amount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {dataList.map((item1 =>(
                                <tr key={item1.month}>
                                <td>
                                <span className="btn btn-outline-primary">{item1.month}</span>
                            </td>
                            <td>
                            <select className="form-select text-danger" name="DonationAmtId" value={dataList.DonationAmtId} onChange={(e)=>handleDonationSearch(e,item1.month)}>
                                        <option className="text-danger">--Select--</option>
                                        {listDonationAmt.map((item) => (
                                        <option key={item.donationAmtId} value={item.donationAmtId}>{item.donationAmt}</option>
                                    ))}
                                       

                                </select>
                            </td>
                            <td>
                                
                                {/* <input type='text' className="text-success" value={item1.netAmount} disabled/> */}
                                <span className="text-success">{item1.netAmount}</span>
                                
                            </td>
                            </tr>
                            )))}
                            
                                
                            
                            {/* <tr>
                            <td>
                                    <span className="btn btn-outline-primary">February</span>
                                </td>
                                <td>
                                <select className="form-select text-danger">
                                        <option className="text-danger">--Select--</option>
                                        <option >5000.00</option>

                                </select>
                                </td>
                                <td>
                                    <span className="text-success">10000.00</span>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
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

export default MonthlyDonarPaymentList;