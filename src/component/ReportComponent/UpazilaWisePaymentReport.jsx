import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList,GetUpazilaWisePaymentReport } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
//import '../../../css/AutoComplete.css';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { year,month } from '../../../Utils/EnrollmentData';

const UpazilaWisePaymentReport = () => {
    const [listDivision, setListDivision] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [discount, setDiscount] = useState("20");
    const [upazilaPayment, setUpazilaPayment] = useState([]);

    const [upaPayment, setUpaPayment] = useState({
        ReportName: "Upazila Wise Payment Report",
        DistrictId: "",
        DivisionId: "",
        DistrictNameEn: "",
        DivisionNameEn: "",
        year:"",
        month:""
    });

    //AutoComplete Division //////////
const [showDivSuggestions, setShowDivSuggestions] = useState(false);
const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(upaPayment.DivisionNameEn.toLowerCase()))

//AutoComplete Division //////////

   //AutoComplete District //////////
   const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
   //const districtSuggestions = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(upaPayment.DistrictNameEn.toLowerCase()) && option.divisionNameEn === upaPayment.DivisionNameEn);

   let districtSuggestions;
     if(upaPayment.DivisionNameEn!==""){
      districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(upaPayment.DistrictNameEn.toLowerCase()) && option.divisionNameEn === upaPayment.DivisionNameEn);
     }else{
      districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(upaPayment.DistrictNameEn.toLowerCase()));
     }
   //AutoComplete District //////////

   useEffect(() => {
    getDivisionData();
    getDistrictData();
}, []);

/////////////////////////////////////////All Get API DATA //////////////////////////////////////////////////////////
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

/////////////////////////////////////////All Get API DATA //////////////////////////////////////////////////////////

// ////////////////////////////////  Report Handle SEARCH //////////////////////////////////////////////////////
const handleReportNameChange = (e) => {
    setUpaPayment({
        ...upaPayment,
        ReportName: e.target.value
    });
}

// ////////////////////////////////  Report Handle SEARCH //////////////////////////////////////////////////////

   /////////////////////////////////////////// DIVISION AUTO Complete Handle Search ////////////////////////////
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
      setUpaPayment({
          ...upaPayment,
          DivisionNameEn:e.target.value
      });
   }

   const handleSuggestionDivClick = (suggetion) => {
    setUpaPayment({
         ...upaPayment,
          DistrictId: "",
          DivisionId: suggetion.divisionId,
          DivisionNameEn:suggetion.divisionNameEn,
          DistrictNameEn: ""
      });
      
       setShowDivSuggestions(false);
   }



   /////////////////////////////////////////// DIVISION AUTO Complete Handle Search ////////////////////////////

 /////////////////////////////////////////// District AUTO Complete Handle Search ////////////////////////////
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
    setUpaPayment({
     ...upaPayment,
     DistrictNameEn:e.target.value
    });
 }

 const handleDisSuggestionClick = (suggetion) => {
     setUpaPayment({
         ...upaPayment,
          DistrictId: suggetion.districtId,
          DistrictNameEn: suggetion.districtNameEn,
      });
     setShowDistrictSuggestions(false);
 }
/////////////////////////////////////////// District AUTO Complete Handle Search ////////////////////////////

///////////////////////////////////////////Year and month handle Search /////////////////////////////////////
 const handleYearMonthSearch = (e)=>{
    const { name, value } = e.target;
    setUpaPayment((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
 };

///////////////////////////////////////////Year and month handle Search /////////////////////////////////////


/////////////////////////////////////////// Handle Submit ///////////////////////////////////////////////////
const handleSubmit = async(e) =>{
    e.preventDefault();
   const { ReportName,DistrictId,DivisionId,DistrictNameEn,DivisionNameEn,year,month} = upaPayment;

   let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    let divisionArr = listDivision.map(item => item.divisionNameEn);
    let districtArr = listDistrict.map(item => item.districtNameEn);

    ////////////////////////////////////Validation /////////////////////////////////
     /////////////////////validation /////////////////////////////////////
     if(ReportName === ""){
        toast.error('Please Select Report Name',{duration: 4000,position: 'top-center'}); 
        return;
    }

    // if(DivisionNameEn === ""){
    //     toast.error('Please Select Name of Division',{duration: 4000,position: 'top-center'}); 
    //     return;
    // }

     if(DivisionNameEn!=="" && divisionArr.includes(DivisionNameEn) === false){
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

     if(year === ""){
        toast.error('Please Select Year',{duration: 4000,position: 'top-center'}); 
        return;
     }

     if(month === ""){
        toast.error('Please Select Month',{duration: 4000,position: 'top-center'}); 
        return;
     }

     //////////////////////////////////////////Validation /////////////////////////////////////////////////////////

    //  DistrictId=0&DivisionId=0&PaymentYear=2023&PaymentMonth=
    
     console.log("upaPayment", upaPayment);

     let apiParams = `DistrictId=${DistrictId === "" ? 0 : DistrictId}&DivisionId=${DivisionId === "" ? 0 : DivisionId}&PaymentYear=${year}&PaymentMonth=${month}`;

     try{
        let savUpaPay = await axios.get(GetUpazilaWisePaymentReport+apiParams,{headers});
        console.log("savUpa", savUpaPay.data);
        let upaSave = savUpaPay.data;

        if(upaSave.success === true){
            toast.success('Requeset Successfull', { duration: 3000, position: 'top-center' });
            setUpazilaPayment(upaSave._listData);
            PdfUpazilaPaymentDownload(upaSave._listData);
             setUpaPayment({
               ...upaPayment,
                DistrictId: "",
                DivisionId: "",
                DistrictNameEn: "",
                DivisionNameEn: "",
                year:"",
                month:""
            });

        }else{
            toast.error('No Data Found', { duration: 3000, position: 'top-center' });
            if(monthSavPay._listData === null){
                setUpazilaPayment([]);
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
/////////////////////////////////////////// Handle Submit ///////////////////////////////////////////////////


const PdfUpazilaPaymentDownload = (data) => {

    const { ReportName,DivisionNameEn,DistrictNameEn,year,month} = upaPayment;

    const doc = new jsPDF();
    doc.setFontSize(20);

    const title = 'Upazila Wise Payment Report';
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


    // doc.setFontSize(12);
    // doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
    // doc.text(14, 60, `Division :`);

    // doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    // doc.text(32, 60, `${DivisionNameEn === "" ? "" : DivisionNameEn }`);


    // doc.setFontSize(12);
    // doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
    // doc.text(75, 60, `District :`);

    // doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    // doc.text(91, 60, `${DistrictNameEn === "" ? "" : DistrictNameEn }`);


    // doc.setFontSize(12);
    // doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
    // doc.text(138, 60, `Upazila :`);

    // doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    // doc.text(155, 60, `${upazilaNameEn === "" ? "" : upazilaNameEn }`);

    // doc.setFontSize(12);
    // doc.setTextColor(textColorBlack[0], textColorBlack[1], textColorBlack[2]);
    // doc.text(14, 70, `Mosque :`);

    // doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    // doc.text(32, 70, `${MosqueNameEn === "" ? "" : MosqueNameEn }`);


   //  const tableEndPosY = doc.autoTable.previous.finalY;
   //  console.log('tablend', tableEndPosY);

   






    let previousValue = null;
    let rowspan = 1;
    // Table data
    let tableData = data;

    // Table columns
    const tableColumns = ["SL", 'Division', 'District', 'Upazila','Donation Amount', 'Discount(%)', 'Net Amount'];

    
    // Table options
   //  const tableOptions = {
   //      startY: yPos,
   //  };

    //let tableFormat = removeConsecutiveDuplicatesForUpazila(tableData);

    let totalDonationAmt = tableData.reduce(function(previousVal, currentVal) {
       return previousVal + currentVal.donationAmt;
      }, 0);

      let totalNetAmt = tableData.reduce(function(previousVal, currentVal) {
       return previousVal + currentVal.netAmount;
      }, 0);

      tableData = [...tableData, {upazilaNameEn:"Total", donationAmt:totalDonationAmt, netAmount:totalNetAmt}];

    // Generate table data
    const tableRows = tableData.map((row, index) => [index + 1, row.divisionNameEn, row.districtNameEn, row.upazilaNameEn,row.donationAmt,discount+("%"),row.netAmount]);

   // console.log("tableRows", tableData);


    const styles = {
        fontSize: 10, // Adjust this value to increase or decrease the font size
    };

    let yPos =60;
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


  return (
    <div className="page-content p-4">
            <div className="pg_title">
                <h3>Upazila Wise Payment Report</h3>
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

                                    <select value={upaPayment.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange} disabled>
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
                                            value={upaPayment.DivisionNameEn}
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
                                            value={upaPayment.DistrictNameEn}
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
                                    Year
                                </label>
                                <div className="col-md-8">
                                <select value={upaPayment.year} className="form-select" name="year" onChange={handleYearMonthSearch}>
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
                                <select value={upaPayment.month} className="form-select" name="month" onChange={handleYearMonthSearch}>
                                <option value="">---Select----</option>
                                        {month.map((item) => (
                                            <option key={item.label} value={item.value}>{item.label}</option>
                                        ))}
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

export default withAuthentication(UpazilaWisePaymentReport);