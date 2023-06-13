import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetUpazilaList,GetReportMosqueNameList } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
//import '../../../css/AutoComplete.css';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';



const MosqueNameReport = () => {
  
    const [listDivision, setListDivision] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listUpazila, setListUpazila] = useState([]);
    const [listMosque, setListMosque] = useState([]);
    const [mosqueReport,setMosqueReport] =useState({
        ReportName: "Mosque Name Report",
        DistrictId: "",
        DivisionId: "",
        DivisionNameEn:"",
        DistrictNameEn: "",
        upazilaId:"",
        upazilaNameEn:""
    });
    const[excpdf, setExcpdf] = useState("");

//AutoComplete Division //////////
const [showDivSuggestions, setShowDivSuggestions] = useState(false);
const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(mosqueReport.DivisionNameEn.toLowerCase()))

//AutoComplete Division //////////

   //AutoComplete District //////////
   const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
//    const districtSuggestions = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(mosqueReport.DistrictNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn);
//    const districtSuggestionsAll = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(mosqueReport.DistrictNameEn.toLowerCase()));

    let districtSuggestions;
   if(mosqueReport.DivisionNameEn!==""){
    districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(mosqueReport.DistrictNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn);
   }else{
    districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(mosqueReport.DistrictNameEn.toLowerCase()));
   }

   //AutoComplete District //////////

   
   //AutoComplete Upazila //////////
   const [showUpazilaSuggestions, setShowUpazilaSuggestions] = useState(false);
  // const upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn && option.districtNameEn === mosqueReport.DistrictNameEn);
   //const upazilaSuggestionsAll = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()));

   let upazilaSuggestions;
   if(mosqueReport.DivisionNameEn!=="" && mosqueReport.DistrictNameEn!==""){
       upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn && option.districtNameEn === mosqueReport.DistrictNameEn);
   }else if(mosqueReport.DivisionNameEn!==""){
       upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn);
   }else if(mosqueReport.DistrictNameEn!==""){
       upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase())  && option.districtNameEn === mosqueReport.DistrictNameEn);
   }else{
       upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()));
   }

   //AutoComplete Upazila //////////




    useEffect(() => {
        getDivisionData();
        getDistrictData();
        getUpazila();
    }, []);


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


    const getUpazila = async(e) =>{
        try{
          let upaData = await axios.get(GetUpazilaList);
        //  console.log("upaDataList", upaData.data._upazilaList);
          let getUpaData = upaData.data._upazilaList;
          setListUpazila(getUpaData);
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


    //   Report Handle SEARCH
    const handleReportNameChange = (e) => {
        setMosqueReport({
            ...mosqueReport,
            ReportName: e.target.value
        });
    }
    
    //   Report Handle SEARCH

     // DIVISION AUTOSEARCH
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
        setMosqueReport({
            ...mosqueReport,
            DivisionNameEn:e.target.value
        });
     }
 
     const handleSuggestionDivClick = (suggetion) => {
        setMosqueReport({
           ...mosqueReport,
            DistrictId: "",
            DivisionId: suggetion.divisionId,
            DivisionNameEn:suggetion.divisionNameEn,
            DistrictNameEn: "",
            upazilaId:"",
            upazilaNameEn:""
        });
        
         setShowDivSuggestions(false);
     }
 
  

    // Division AutoSearch


    // District AutoSearch
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
       setMosqueReport({
        ...mosqueReport,
        DistrictNameEn:e.target.value
       });
    }

    const handleDisSuggestionClick = (suggetion) => {
        setMosqueReport({
            ...mosqueReport,
             DistrictId: suggetion.districtId,
             DistrictNameEn: suggetion.districtNameEn,
             upazilaId:"",
             upazilaNameEn:""
         });
        setShowDistrictSuggestions(false);
    }
// District AutoSearch


// Upazila AutoSearch

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
   setMosqueReport({
    ...mosqueReport,
    upazilaNameEn:e.target.value
   });
}

const handleUpaSuggestionClick = (suggetion) => {
    setMosqueReport({
        ...mosqueReport,
         upazilaId:suggetion.upazilaId,
         upazilaNameEn:suggetion.upazilaNameEn
     });
     setShowUpazilaSuggestions(false);
}

// Upazila AutoSearch



// Submit button
const handleSubmit = async(e,data) =>{
    e.preventDefault();
    const {ReportName,DistrictId,DivisionId,upazilaId,DivisionNameEn,DistrictNameEn,upazilaNameEn} = mosqueReport;
   // console.log("Submit Mosque Report Data");
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    let divisionArr = listDivision.map(item => item.divisionNameEn);
    let districtArr = listDistrict.map(item => item.districtNameEn);
    let upazilaArr = listUpazila.map(item=> item.upazilaNameEn);

    /////////////////////validation /////////////////////////////////////
    if(ReportName === ""){
        toast.error('Please Select Report Name',{duration: 4000,position: 'top-center'}); 
        return;
    }

    // if(DivisionNameEn === ""){
    //     toast.error('Please Select Name of Division',{duration: 4000,position: 'top-center'}); 
    //     return;
    // }

     if(DivisionNameEn !== "" && divisionArr.includes(DivisionNameEn) === false){
        toast.error('Invalid Division Name... Select from Auto Complete',{duration: 4000,position: 'top-center'}); 
        return;
     }

    //  if(DistrictNameEn === ""){
    //     toast.error('Please Select Name of District',{duration: 4000,position: 'top-center'}); 
    //     return;
    //  }

     if(DistrictNameEn !== "" && districtArr.includes(DistrictNameEn) === false){
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
    /////////////////////validation /////////////////////////////////////





    let apiParams =`DistrictId=${DistrictId === "" ? 0 : DistrictId}&DivisionId=${DivisionId ==="" ? 0 : DivisionId}&UpazilaId=${upazilaId ==="" ? 0: upazilaId}`;
   // console.log("MosqueParams", apiParams);


    try{
     let savMosqueData = await axios.get(GetReportMosqueNameList+apiParams,{headers});
    //  console.log("savMosque", savMosqueData.data);
     let getMosqueData = savMosqueData.data;

     if(getMosqueData.success === true){
        setListMosque(getMosqueData._mosqueList);
        // console.log("response",getMosqueData._mosqueList);
        if(data === "Excel"){
            exportToExcel(getMosqueData._mosqueList);
        }else{ 
            PdfMosqueDownload(getMosqueData._mosqueList);
        }

       setMosqueReport({
            ...mosqueReport,
            DistrictId: "",
            DivisionId: "",
            DivisionNameEn:"",
            DistrictNameEn: "",
            upazilaId:"",
            upazilaNameEn:""
        });
        setExcpdf("");
        toast.success('Request Successfull!',{duration: 4000,position: 'top-center'}); 

     }else{
        toast.error('No Data Found For PDF',{duration: 4000,position: 'top-center'}); 

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
// Submit button


const PdfMosqueDownload = (data) => {
    // console.log("InsidePdfFunction", data);
     const { ReportName } = mosqueReport;

    //  console.log("mosquePDF", mosqueReport);

     const doc = new jsPDF();
     doc.setFontSize(20);

     const title = 'Mosque Name Report';
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

     doc.setFontSize(12);
     doc.text(14, 40, `Report Name:`);

     doc.setFontSize(12);

     doc.setTextColor(textColor[0], textColor[1], textColor[2]);
     doc.text(42, 40, `${ReportName}`);



     let previousValue = null;
     let rowspan = 1;
     // Table data
     const tableData = data;

     // Table columns
     const tableColumns = ["SL", 'Division Name', 'District Name', 'Upazila Name','Mosque Name'];

     // Table options
     const tableOptions = {
         startY: 45,
     };

     //let tableFormat = removeConsecutiveDuplicatesForUpazila(tableData);
     // Generate table data
     const tableRows = tableData.map((row, index) => [index + 1, row.divisionNameEn, row.districtNameEn, row.upazilaNameEn,row.mosqueNameEn]);


     // Configure the autotable plugin for cell border remove
     // const tableConfig = {
     //     willDrawCell: tableRows => {
     //     if (tableRows.cell.raw === '') {
     //         tableRows.cell.styles.lineWidth = 0; // Set border line width to 0 for empty cells
     //         const isLastRow = tableRows.row.index === tableRows.table.body.length - 1;
     //     }
     //     },
     // };



     const styles = {
         fontSize: 12, // Adjust this value to increase or decrease the font size
     };


     // Generate table
     doc.autoTable({
         head: [tableColumns],
         body: tableRows,
         startY: tableOptions.startY,
         theme: 'grid',
         styles: styles,
     });

     // Save the PDF
     doc.save(`${ReportName}.pdf`);

 }


 const exportToExcel = (data) => {
    const { ReportName } = mosqueReport;
    // console.log("report",mosqueReport.ReportName);

    const formattedData = data.map((item) => ({
      'Division Name': item.divisionNameEn,
      'District Name': item.districtNameEn,
      'Upazila Name': item.upazilaNameEn,
      'Mosque Name': item.mosqueNameEn
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const fileName = `${ReportName}.xlsx`;
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(blob, fileName);
  };



  return (
    <div className="page-content p-4">
            <div className="pg_title">
                <h3>Mosque Name Report</h3>
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

                                    <select value={mosqueReport.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange} disabled>
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
                                            value={mosqueReport.DivisionNameEn}
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
                                            value={mosqueReport.DistrictNameEn}
                                            onChange={handleDisChange}
                                            placeholder="Select District"
                                            onFocus={() => setShowDistrictSuggestions(true)}
                                        />
                                        {showDistrictSuggestions && (
                                            <ul className="suggestions">
                                                {
                                                districtSuggestions.map(suggestion => (
                                                    <li onClick={() => handleDisSuggestionClick(suggestion)} key={suggestion.districtId}>
                                                        {suggestion.districtNameEn}
                                                    </li>
                                                ))
                                                }
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
                                            value={mosqueReport.upazilaNameEn}
                                            onChange={handleUpaChange}
                                            placeholder="Select Upazila"
                                            onFocus={() => setShowUpazilaSuggestions(true)}
                                        />
                                        {showUpazilaSuggestions && (
                                            <ul className="suggestions">
                                                { 
                                                upazilaSuggestions.map(suggestion => (
                                                    <li onClick={() => handleUpaSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                                                        {suggestion.upazilaNameEn}
                                                    </li>
                                                ))
                                                }
                                            </ul>
                                        )}

                                    </div>

                                    {/*  */}

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

export default withAuthentication(MosqueNameReport);