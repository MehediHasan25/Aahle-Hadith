import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GetDonationAmtList,DonarPaymentActualID,getMonthlyDonarPaymentList,SaveMonthlyDonarPaymentList } from '../../../URL/ApiList';
import { year } from '../../../../Utils/EnrollmentData';
import { ValueSetToDataList,ProcessSaveOutput } from '../../../../Utils/MonthlyPayment';
import withAuthentication from '../../Protected/withAuthentication';

const MonthlyDonarPaymentList = () => {
    const [listAllId, setListAllId] = useState([]);
    const [monthlyData, setMonthlyData] = useState(false,{
        actualIdSearch: "",
        actualIdVal: "",
        orgIdSearch:"",
        orgIdVal:"",
        donarEnrollmentId: "",
        
    });

    const [yearData, setYearData] = useState("");

    const [listDonationAmt, setListDonationAmt] = useState([]); 
    const [userAddress, setUserAddress] = useState("");
    const [disPerAmt, setDisPerAmt] = useState(20);

    const [dataList, setDataList]  = useState([
        {donerPaymentId:0, paymentMonth:"January",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0, paymentMonth:"February",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0, paymentMonth:"March",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0, paymentMonth:"April",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"May",  donationAmt:"",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"June",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"July",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"August",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"September",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"October",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"November",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
        {donerPaymentId:0,paymentMonth:"December",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""}
    ]);


    const [listArray, setListArray]  = useState([
      {donerPaymentId:0, paymentMonth:"January",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0, paymentMonth:"February",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0, paymentMonth:"March",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0, paymentMonth:"April",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"May",  donationAmt:"",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"June",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"July",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"August",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"September",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"October",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"November",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""},
      {donerPaymentId:0,paymentMonth:"December",  donationAmt: "",donationAmtId: "", netAmount:"",DisCountPer:disPerAmt,userPcIP:""}
  ]);

    useEffect(()=>{
        ipData();
        getDonationAmt();
        getActOrg();
    },[]);


    

    const handlemonthlyDataChange = (e) => {
    setYearData(e.target.value);
    handleGetInfo(e.target.value);        
    }



    


    const ipData = () => {
      fetch('https://api.ipify.org/?format=json')
          .then(response => response.json())
          .then(data => {
              const ipAddress = data.ip;
                 //console.log('IP Address:', ipAddress);
                 setUserAddress(ipAddress);
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

      
      // Actual Id Handle change all function for AutoComplete
      
      const [show, setshow] = useState(false)
  const handleActIdSearchChange = (e) => {
    if(e.target.value === ""){
      setshow(false);
    }else{

      setshow(true);
    }
    setMonthlyData({
      ...monthlyData,
      actualIdSearch: e.target.value
    });
  }

// const handleChange = () => {
// setshow(true)
// }

  const handleActIdSearch = (searchTerm, orgVal, donarId) => {
    setMonthlyData({
        ...monthlyData,
      actualIdSearch: searchTerm,
      actualIdVal: searchTerm,
      orgIdSearch:orgVal,
      orgIdVal:orgVal,
      donarEnrollmentId: donarId
      
    });
    setshow(false);
    handleSearchAll(searchTerm, orgVal, donarId);
    
  }
  // Actual Id Handle change all function for AutoComplete

  const handleGetInfo = async(yearVal)=>{
    if(monthlyData.actualIdVal === "" && monthlyData.orgIdVal ==="" && monthlyData.donarEnrollmentId===""){
      toast.error('Please Select Actual ID and Organization ID', { duration: 5000, position: 'top-center' });
      return;
    }
    const apiParams = `id=${monthlyData.donarEnrollmentId}&year=${yearVal}`
   // console.log("parameters from year", apiParams);
    apiCall(apiParams);
  }



  const handleSearchAll =async(act, org,donarId) =>{
    const apiParams = `id=${donarId}&year=${yearData}`
  //  console.log("parameters from donarId", apiParams);

    if(yearData !== ""){
      apiCall(apiParams);
    }

  }


  const apiCall = async(params) =>{
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };
        try{
      let getdataAll = await axios.get(getMonthlyDonarPaymentList+params,{headers});
      //console.log("getdataAll", getdataAll.data);
      let listData = getdataAll.data._listData;
      let resData=[];
      if(listData !== null){
       const newDataList =JSON.parse(JSON.stringify(listArray));
        resData = ValueSetToDataList(listData,newDataList,userAddress);
        //console.log("response", resData);
        setDataList(resData);
      }else{
        resData=[];
        const newDataList1 =JSON.parse(JSON.stringify(listArray));
        setDataList(newDataList1);
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
        let donaAmtId;
        if(name === "donationAmtId"){
            donaAmtId = parseInt(e.target.value);
            //console.log("donaAmt", donaAmtId);
        }
        setDataList(prevDataList => {
         const updatedDataList = prevDataList.map((item) => {
            if (item.paymentMonth === month) {
                return { ...item, [name]: value, donationAmtId:donaAmtId, netAmount:netAmountData, donationAmt:parseInt(labelVal),userPcIP:userAddress };
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


    const handleSubmit =async(e) =>{
      e.preventDefault();

      let processList = JSON.parse(JSON.stringify(dataList));
      const converPayload =  ProcessSaveOutput(processList,yearData,monthlyData.donarEnrollmentId);
      //console.log("payment", converPayload);
      let token = localStorage.getItem("AuthToken");
      const headers = { 'Authorization': 'Bearer ' + token };


      const payload = {
        listDonarPay:converPayload
      };

      try{
        let savSubmit = await axios.post(SaveMonthlyDonarPaymentList,payload,{headers});
        //console.log("save",savSubmit.data);
        let savSuccess = savSubmit.data;
        if(savSubmit.success = true){
          toast.success("Request Successfull", { duration: 5000, position: 'top-center' });
          setMonthlyData({
            actualIdSearch: "",
            actualIdVal: "",
            orgIdSearch:"",
            orgIdVal:"",
            donarEnrollmentId: ""
          });
          setYearData("");
          setDataList(listArray);
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

  //  console.log("Hello",dataList);

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
                    <div className={show? "dropdown":"d-none"}>
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
                    <select  className="form-select " name="yearData" value= {yearData} aria-label="Default select example" onChange={handlemonthlyDataChange}>
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
                                <tr key={item1.paymentMonth}>
                                <td>
                                <span className="btn btn-outline-primary">{item1.paymentMonth}</span>
                            </td>
                            <td>
                             
                            <select className="form-select text-danger" name="donationAmtId" value={item1.donationAmtId} onChange={(e)=>handleDonationSearch(e,item1.paymentMonth)}>
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
                        <button className="btn btn-success w-auto m-0" onClick={handleSubmit}>Save</button>
                        {/* <button className="btn btn-warning w-auto  m-0">Update</button> */}
                </div>
            </div>
             </form>
            </div>
        </div>
    </div>
  )
}

export default withAuthentication(MonthlyDonarPaymentList);