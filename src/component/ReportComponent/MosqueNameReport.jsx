import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetUpazilaList,GetReportMosqueNameList } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
//import '../../../css/AutoComplete.css';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';




const MosqueNameReport = () => {
  
    const [listDivision, setListDivision] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listUpazila, setListUpazila] = useState([]);
    const [listMosque, setListMosque] = useState([]);
    const [mosqueReport,setMosqueReport] =useState({
        ReportName: "",
        DistrictId: "",
        DivisionId: "",
        DivisionNameEn:"",
        DistrictNameEn: "",
        upazilaId:"",
        upazilaNameEn:""
    });

//AutoComplete Division //////////
const [showDivSuggestions, setShowDivSuggestions] = useState(false);
const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(mosqueReport.DivisionNameEn.toLowerCase()))

//AutoComplete Division //////////

   //AutoComplete District //////////
   const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
   const districtSuggestions = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(mosqueReport.DistrictNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn);

   //AutoComplete District //////////

   
   //AutoComplete Upazila //////////
   const [showUpazilaSuggestions, setShowUpazilaSuggestions] = useState(false);
   const upazilaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(mosqueReport.upazilaNameEn.toLowerCase()) && option.divisionNameEn === mosqueReport.DivisionNameEn && option.districtNameEn === mosqueReport.DistrictNameEn);

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
    upazilaNameEn:e.target.valeu
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
const handleSubmit = async(e) =>{
    e.preventDefault();
    const {DistrictId,DivisionId,upazilaId} = mosqueReport;
    console.log("Submit Mosque Report Data");
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    let apiParams =`DistrictId=${DistrictId}&DivisionId=${DivisionId}&UpazilaId=${upazilaId}`;
    console.log("MosqueParams", apiParams);


    try{
     let savMosqueData = await axios.get(GetReportMosqueNameList+apiParams,{headers});
     console.log("savMosque", savMosqueData.data);
     let getMosqueData = savMosqueData.data;

     if(getMosqueData.success === true){
        setListMosque(getMosqueData._mosqueList);
        PdfMosqueDownload(getMosqueData._mosqueList);
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


const PdfDownloadFunc = (data) => {
    // console.log("InsidePdfFunction", data);
     const { ReportName } = mosqueReport;

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

     let tableFormat = removeConsecutiveDuplicatesForUpazila(tableData);
     // Generate table data
     const tableRows = tableFormat.map((row, index) => [index + 1, row.divisionNameEn, row.districtNameEn, row.upazilaNameEn,row.mosqueNameEn]);


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

     //console.log("TableRows", tableRows);

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

                                    <select value={mosqueReport.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange}>
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
                                            value={mosqueReport.upazilaNameEn}
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

export default MosqueNameReport