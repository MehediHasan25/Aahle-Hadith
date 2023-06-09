import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetUpazilaList, GetMosqueList,GetMonthWisePaymentReport } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import { year,month } from '../../../Utils/EnrollmentData';


const MonthWisePaymentReport = () => {
    const [listDivision, setListDivision] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listUpazila, setListUpazila] = useState([]);
    const [listMosque, setListMosque] = useState([]);
    const [monthPay, setMonthPay] = useState([]);
    const [discount, setDiscount] = useState("20");
    const [monthPayement, setMonthPayement] = useState({
        ReportName: "Month Wise Payment Report",
        DivisionId: "",
        DivisionNameEn: "",
        DistrictId: "",
        DistrictNameEn: "",
        upazilaId: "",
        upazilaNameEn: "",
        MosqueId: "",
        MosqueNameEn: "",
        year:"",
        month:""
    });

    const[excpdf, setExcpdf] = useState("");

     //AutoComplete Division State //////////
     const [showDivSuggestions, setShowDivSuggestions] = useState(false);
     const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(monthPayement.DivisionNameEn.toLowerCase()));
     //AutoComplete Division State //////////
 
 
     //AutoComplete District State//////////
     const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
     let districtSuggestions;
     if(monthPayement.DivisionNameEn!==""){
      districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(monthPayement.DistrictNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn);
     }else{
      districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(monthPayement.DistrictNameEn.toLowerCase()));
     }
     //AutoComplete District State //////////
 
 
     //AutoComplete Upazila State //////////
     const [showUpazilaSuggestions, setShowUpazilaSuggestions] = useState(false);
   
    let upazilaSuggestions;
    if(monthPayement.DivisionNameEn!=="" && monthPayement.DistrictNameEn!==""){
        upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(monthPayement.upazilaNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn && option.districtNameEn === monthPayement.DistrictNameEn);
    }else if(monthPayement.DivisionNameEn!==""){
        upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(monthPayement.upazilaNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn);
    }else if(monthPayement.DistrictNameEn!==""){
        upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(monthPayement.upazilaNameEn.toLowerCase())  && option.districtNameEn === monthPayement.DistrictNameEn);
    }else{
        upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(monthPayement.upazilaNameEn.toLowerCase()));
    }
 
        //AutoComplete Upazila State //////////
 
     //AutoComplete Mosque State //////////
     const [showMosqueSuggestions, setShowMosqueSuggestions] = useState(false);
     let mosqueSuggestions;
 
     if(monthPayement.DivisionNameEn!=="" && monthPayement.DistrictNameEn!=="" && monthPayement.upazilaNameEn!==""){
        mosqueSuggestions=listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn && option.districtNameEn === monthPayement.DistrictNameEn &&  option.upazilaNameEn === monthPayement.upazilaNameEn);
     }else if(monthPayement.DivisionNameEn!=="" && monthPayement.DistrictNameEn!==""){
        mosqueSuggestions=listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn && option.districtNameEn === monthPayement.DistrictNameEn);
     }else if(monthPayement.DistrictNameEn!=="" && monthPayement.upazilaNameEn!==""){
        mosqueSuggestions=listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.districtNameEn === monthPayement.DistrictNameEn &&  option.upazilaNameEn === monthPayement.upazilaNameEn);
     }else if(monthPayement.DivisionNameEn!=="" &&  monthPayement.upazilaNameEn!=="" ){
        mosqueSuggestions=listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn &&  option.upazilaNameEn === monthPayement.upazilaNameEn);
     }else if(monthPayement.DivisionNameEn!==""){
         mosqueSuggestions = listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.divisionNameEn === monthPayement.DivisionNameEn);
     }else if(monthPayement.DistrictNameEn!==""){
         mosqueSuggestions =listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) && option.districtNameEn === monthPayement.DistrictNameEn);
     }else if(monthPayement.upazilaNameEn!==""){
         mosqueSuggestions=listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()) &&  option.upazilaNameEn === monthPayement.upazilaNameEn);
     }else{
         mosqueSuggestions = listMosque.filter(option => option.mosqueNameEn.toLowerCase().includes(monthPayement.MosqueNameEn.toLowerCase()));
     }
     
 


     useEffect(() => {
        getDivisionData();
        getDistrictData();
        getUpazila();
        getMosque();
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
  // //////////////////////////////Get ALL DATA FROM API FOR DROPDOWN ////////////////////////////////////////////////////////////////

  // //////////////////////  Report Handle SEARCH ///////////////////////
  const handleReportNameChange = (e) => {
    setMonthPayement({
        ...monthPayement,
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
    setMonthPayement({
        ...monthPayement,
        DivisionNameEn: e.target.value
    });
}

const handleSuggestionDivClick = (suggetion) => {
    setMonthPayement({
        ...monthPayement,
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
    setMonthPayement({
        ...monthPayement,
        DistrictNameEn: e.target.value
    });
}

const handleDisSuggestionClick = (suggetion) => {
    setMonthPayement({
        ...monthPayement,
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
    setMonthPayement({
        ...monthPayement,
        upazilaNameEn: e.target.value
    });
}

const handleUpaSuggestionClick = (suggetion) => {
    setMonthPayement({
        ...monthPayement,
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
    setMonthPayement({
    ...monthPayement,
    MosqueNameEn: e.target.value,
});
}

const handleSuggestionMosqueClick = (suggetion) => {
    setMonthPayement({
    ...monthPayement,
    MosqueId: suggetion.mosqueId,
    MosqueNameEn: suggetion.mosqueNameEn
});
setShowMosqueSuggestions(false);
}
/////////////////////// Mosque Auto Complete Handle Search //////////////////////////////////////

///////////////////////////////////////////Year and month handle Search /////////////////////////////////////
const handleYearMonthSearch = (e)=>{
    const { name, value } = e.target;
    setMonthPayement((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
 }

///////////////////////////////////////////Year and month handle Search /////////////////////////////////////

 //////////////////////////////Submit button //////////////////////////////////////////////////
 const handleSubmit = async(e,data) =>{
    e.preventDefault();
    const {ReportName,DivisionId,DivisionNameEn,DistrictId,DistrictNameEn,upazilaId,upazilaNameEn,MosqueId,MosqueNameEn,year,month} = monthPayement;
    
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    let divisionArr = listDivision.map(item => item.divisionNameEn);
    let districtArr = listDistrict.map(item => item.districtNameEn);
    let upazilaArr = listUpazila.map(item=> item.upazilaNameEn);
    let mosqueArr = listMosque.map(item => item.mosqueNameEn);
    

    ////////////////////Validation ////////////////////////////////////
    if(ReportName === ""){
        toast.error('Please Select Report Name',{duration: 4000,position: 'top-center'}); 
        return;
    }

    // if(DivisionNameEn === ""){
    //     toast.error('Please Select Name of Division',{duration: 4000,position: 'top-center'}); 
    //     return;
    // }

    if(DivisionNameEn!== "" && divisionArr.includes(DivisionNameEn) === false){
        toast.error('Invalid Division Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
        return;
     }

    //  if(DistrictNameEn === ""){
    //     toast.error('Please Select Name of District',{duration: 4000,position: 'top-center'}); 
    //     return;
    //  }

     if(DistrictNameEn!=="" && districtArr.includes(DistrictNameEn) === false){
        toast.error('Invalid District Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
        return;
     }

    //  if(upazilaNameEn === ""){
    //     toast.error('Please Select Name of Upazila',{duration: 4000,position: 'top-center'}); 
    //     return;
    //  }

     if(upazilaNameEn !== "" && upazilaArr.includes(upazilaNameEn)=== false){
        toast.error('Invalid Upazila Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
        return;
     }

    //  if(MosqueNameEn === ""){
    //     toast.error('Please Select Name of Mosque',{duration: 4000,position: 'top-center'}); 
    //     return;
    //  }

     if(MosqueNameEn!== "" && mosqueArr.includes(MosqueNameEn) === false){
        toast.error('Invalid Mosque Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
        return;
     }

     if(year === ""){
        toast.error('Please Select Year',{duration: 4000,position: 'top-center'}); 
        return;
     }

     if(month === ""){
        toast.error('Please Select Month',{duration: 4000,position: 'top-center'}); 
        return;
     }

    ////////////////////Validation ////////////////////////////////////

    // console.log("statecheck", month);

    let apiParams = `DistrictId=${DistrictId === "" ? 0 : DistrictId}&DivisionId=${DivisionId === "" ? 0 : DivisionId}&UpazilaId=${upazilaId ===""? 0 : upazilaId }&MosqueId=${MosqueId===""? 0 : MosqueId}&PaymentYear=${year}&PaymentMonth=${month}`;
    //  console.log("apiParams", apiParams);

     try{
        let savMonthPayment = await axios.get(GetMonthWisePaymentReport+apiParams,{headers});
        // console.log("saveMonthWisePaymeht", savMonthPayment.data);
        let monthSavPay = savMonthPayment.data;
        if(monthSavPay.success === true){
            toast.success('Requeset Successfull', { duration: 3000, position: 'top-center' });
            // console.log("monthly", monthSavPay._listData);
            setMonthPay(monthSavPay._listData);
            if(data === "Excel"){
                exportToExcel(monthSavPay._listData);
            }else{
               PdfMonthPaymentDownload(monthSavPay._listData);
            }
            
             setMonthPayement({
                ...monthPayement,
                DivisionId: "",
                DivisionNameEn: "",
                DistrictId: "",
                DistrictNameEn: "",
                upazilaId: "",
                upazilaNameEn: "",
                MosqueId: "",
                MosqueNameEn: "",
                year:"",
                month:""
            });

            setExcpdf("");

        }else{
            toast.error('No Data Found', { duration: 3000, position: 'top-center' });
            if(monthSavPay._listData === null){
                setMonthPay([]);
            }
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

const PdfMonthPaymentDownload = (data) => {

     const { ReportName,DivisionNameEn,DistrictNameEn,upazilaNameEn,MosqueNameEn,year,month} = monthPayement;

     const doc = new jsPDF();
     doc.setFontSize(20);

     const title = 'Month Wise Payment Details';
     const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
     const startX = (doc.internal.pageSize.width - titleWidth) / 2;
     const startY = 20;
     doc.text(title, startX, startY);

     // Add an underline
     const underlineY = startY + 2;
     const underlineWidth = doc.internal.pageSize.width - 40;
     doc.setLineWidth(1);
     doc.line(startX, underlineY, startX + underlineWidth, underlineY);


     const textColor = [0, 220, 0]; // Red color (RGB format)
     const textColorBlack = [0,0,0];


     doc.setFontSize(14);
     doc.text(70, 35, `For the Month of ${month} year ${year}`);



     doc.setFontSize(12);
     doc.text(14, 50, `Report Name:`);
    
     doc.setFontSize(12);
     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(42, 50, `${ReportName}`);


     doc.setFontSize(12);
     doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
     doc.text(14, 60, `Division :`);

     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(32, 60, `${DivisionNameEn === "" ? "" : DivisionNameEn }`);


     doc.setFontSize(12);
     doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
     doc.text(75, 60, `District :`);

     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(91, 60, `${DistrictNameEn === "" ? "" : DistrictNameEn }`);


     doc.setFontSize(12);
     doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
     doc.text(138, 60, `Upazila :`);

     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(155, 60, `${upazilaNameEn === "" ? "" : upazilaNameEn }`);

     doc.setFontSize(12);
     doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
     doc.text(14, 70, `Mosque :`);

     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(32, 70, `${MosqueNameEn === "" ? "" : MosqueNameEn }`);


     // Table data
     let tableData = data;

     // Table columns
     const tableColumns = ["SL", 'Actual ID', 'Organization ID', 'Name','Mobile No', 'Donation Amount', 'Discount(%)', 'Net Amount'];

     let totalDonationAmt = tableData.reduce(function(previousVal, currentVal) {
        return previousVal + currentVal.donationAmt;
       }, 0);

       let totalNetAmt = tableData.reduce(function(previousVal, currentVal) {
        return previousVal + currentVal.netAmount;
       }, 0);

       tableData = [...tableData, {mobileNo:"Total", donationAmt:totalDonationAmt, netAmount:totalNetAmt}];

     // Generate table data
     const tableRows = tableData.map((row, index) => [index + 1, row.donerActualId, row.organisationalId, row.donerName,row.mobileNo,row.donationAmt,discount+("%"),row.netAmount]);



     const styles = {
         fontSize: 10, // Adjust this value to increase or decrease the font size
     };

     let yPos =80;
    //  // Generate table
     doc.autoTable({
         head: [tableColumns],
         body: tableRows,
         startY: yPos,
         theme: 'grid',
         styles: styles
     });


     // Save the PDF
     doc.save(`${ReportName}.pdf`);

 }



 const exportToExcel = (data) => {
    const { ReportName,DivisionNameEn,DistrictNameEn,upazilaNameEn,MosqueNameEn, year,month} = monthPayement;
    

    const formattedData1 =[
        {"Division Name": DivisionNameEn, "District Name": DistrictNameEn, 'Upazila Name': upazilaNameEn,'Mosque Name': MosqueNameEn}
      ];

    const formattedData2 = data.map((item) => ({
        "Year":year,
        "Month":month,
        'Actual ID': item.donerActualId,
        'Organizational ID': item.organisationalId,
        'Name': item.donerName,
        'Mobile No': item.mobileNo,
        'Donation Amount': item.donationAmt,
        "Discount":discount+'%',
        'Net Amount':item.netAmount
      }));
    
     
    
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([]);
    
      // Add headers for table 1
      const headers1 = Object.keys(formattedData1[0]);
      XLSX.utils.sheet_add_aoa(worksheet, [headers1], { origin: 'A1' });
    
      // Add data for table 1
      const dataRows1 = formattedData1.map((item) => Object.values(item));
      XLSX.utils.sheet_add_aoa(worksheet, dataRows1, { origin: 'A2' });
    
      // Add headers for table 2
      const headers2 = Object.keys(formattedData2[0]);
      const table2StartRow = dataRows1.length + 4;
      XLSX.utils.sheet_add_aoa(worksheet, [headers2], { origin: `A${table2StartRow}` });
    
     // console.log("For2",formattedData2 );
      // Add data for table 2
      const dataRows2 = formattedData2.map((item) => Object.values(item));
     
      let totalDonationAmount = formattedData2.reduce((acc, item) => acc + item['Donation Amount'], 0);
      let totalDiscount = discount+'%';
      let totalNetAmount = formattedData2.reduce((acc, item) => acc + item["Net Amount"], 0);
    //  const totalRow = [
    //     ['Actual ID', 'Total'],
    //     ['Organizational ID',""],
    //     ['Name', ''],
    //     ['Mobile No', ''],
    //     ['Donation Amount', totalDonationAmount],
    //     ["Discount",discount+'%'],
    //     ['Net Amount',totalNetAmount]
    //   ];
      let total = ['', "", "","","","Total",totalDonationAmount,totalDiscount,totalNetAmount];
       dataRows2.push(total);
    //   // let dataTab2Row = [...dataRows2,totalRow];
    //   console.log("dataRow2", dataRows2);
      XLSX.utils.sheet_add_aoa(worksheet, dataRows2, { origin: `A${table2StartRow + 1}` });
    
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const fileName = `${ReportName}.xlsx`;
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
      saveAs(blob, fileName);
  };

  return (
    <div className="page-content p-4">
    <div className="pg_title">
        <h3>Month Wise Payment Report</h3>
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

                            <select value={monthPayement.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange} disabled>
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
                                    value={monthPayement.DivisionNameEn}
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
                                    value={monthPayement.DistrictNameEn}
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
                                    value={monthPayement.upazilaNameEn}
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
                                    value={monthPayement.MosqueNameEn}
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
                                    Year
                                </label>
                                <div className="col-md-8">
                                <select value={monthPayement.year} className="form-select" name="year" onChange={handleYearMonthSearch}>
                                <option value="">---Select----</option>
                                        {year.map((item) => (
                                            <option key={item.label} value={item.value}>{item.label}</option>
                                        ))}
                                </select>

                                </div>
                            </div>


                            <div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Month
                                </label>
                                <div className="col-md-8">
                                <select value={monthPayement.month} className="form-select" name="month" onChange={handleYearMonthSearch}>
                                <option value="">---Select----</option>
                                        {month.map((item) => (
                                            <option key={item.label} value={item.value}>{item.label}</option>
                                        ))}
                                </select>

                                </div>
                            </div>



                    

                    <div className="text-end">
                        <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e,"PDF")}>PDF Download</button>
                        <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e,"Excel")}>Excel Download</button>
                    </div>

                </form>
            </div>
        </div>

    </div>

</div>
  )
}

export default withAuthentication(MonthWisePaymentReport);