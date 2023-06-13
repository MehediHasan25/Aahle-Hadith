import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetReportUpazilaNameList } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';
//import '../../../css/AutoComplete.css';
import { reportName } from '../../../Utils/ReportName';
import withAuthentication from '../Protected/withAuthentication';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import { removeConsecutiveDuplicatesForUpazila } from '../../../Utils/ReportFunction';



const UpazilaNameReport = () => {
    // Division autoComplete////
    const [asearch, setAsearch] = useState("");
    const [listDivision, setListDivision] = useState([]);
    const [selectVal, setSelectVal] = useState("");
    // Division autoComplete////

    const[excpdf, setExcpdf] = useState("");

    const [listDistrict, setListDistrict] = useState([]);
    const [district, setDistrict] = useState({
        ReportName: "Upazila Name Report",
        DistrictId: "",
        DivisionId: "",
        DistrictNameEn: "",
        DistrictNameBn: "",
        DistrictCode: "",
        AddedBy: localStorage.getItem('userName')
    });

    const [pdfUpaList, setPdfUpaList] = useState([]);

    //AutoComplete Division //////////
    const [showDivSuggestions, setShowDivSuggestions] = useState(false);
    const divSuggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(asearch.toLowerCase()))

    //AutoComplete Division //////////

    //AutoComplete District //////////
    const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
    //const districtSuggestions = listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(district.DistrictNameEn.toLowerCase()) && option.divisionNameEn === asearch);

    let districtSuggestions;
    if(asearch!==""){
     districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(district.DistrictNameEn.toLowerCase()) && option.divisionNameEn === asearch);
    }else{
     districtSuggestions =listDistrict.filter(option => option.districtNameEn.toLowerCase().includes(district.DistrictNameEn.toLowerCase()));
    }
    //AutoComplete District //////////

    useEffect(() => {
        getDivisionData();
        getDistrictData();
        // districtCode();
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

    // AutoComplete ///////////

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
        setAsearch(e.target.value);
    }

    const handleSuggestionDivClick = (suggetion) => {
        //console.log("suggestion", suggetion.divisionNameEn);
        setAsearch(suggetion.divisionNameEn);
        setSelectVal(suggetion.divisionId);
        setDistrict({
            ...district,
            DistrictNameEn: "",
            DistrictNameBn: "",
            DistrictId: ""
        });
        setShowDivSuggestions(false);
    }

    ////////////////division AutoSearch


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
    }, [])

    const handleDisChange = e => {
        setDistrict({
            ...district,
            DistrictNameEn: e.target.value
        })
    }

    const handleDisSuggestionClick = (suggetion) => {
        //console.log("suggestion", suggetion.divisionNameEn);
        setDistrict({
            ...district,
            DistrictNameEn: suggetion.districtNameEn,
            DistrictNameBn: suggetion.districtNameBn,
            DistrictId: suggetion.districtId
        });
        setShowDistrictSuggestions(false);
    }


    const handleReportNameChange = (e) => {
        setDistrict({
            ...district,
            ReportName: e.target.value
        });
    }

    // console.log("district", district);


    // District AutoSearch

    /// AutoComplete /////////////

    



    const handleSubmit = async (e,data) => {
        e.preventDefault();

        const {ReportName, DistrictId, DistrictNameEn } = district;

        let token = localStorage.getItem("AuthToken");
        const headers = { 'Authorization': 'Bearer ' + token };

        let divisionArr = listDivision.map(item => item.divisionNameEn);
        let districtArr = listDistrict.map(item => item.districtNameEn);

        if(ReportName === ""){
            toast.error('Please Select Report Name', { duration: 5000, position: 'top-center' });
            return;
        }


        // if (asearch === "") {
        //     toast.error('Please Select Name of  Division', { duration: 5000, position: 'top-center' });
        //     return;
        // }

        if (asearch!=="" && divisionArr.includes(asearch) === false) {
            toast.error('Invalid Division Name... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }

        // if (DistrictNameEn === "") {
        //     toast.error('Please Select Name of District', { duration: 5000, position: 'top-center' });
        //     return;
        // }

        if (DistrictNameEn!== "" && districtArr.includes(district.DistrictNameEn) === false) {
            toast.error('Invalid District Name... Select from Auto Complete', { duration: 5000, position: 'top-center' });
            return;
        }


        let apiParams = `DistrictId=${DistrictId === "" ? 0 : DistrictId }&DivisionId=${selectVal === "" ? 0 : selectVal}`;
        //console.log("params", apiParams);

        try {
            let upaData = await axios.get(GetReportUpazilaNameList + apiParams, { headers });
            //  console.log("UpaDataList", upaData.data);
            let savUpaData = upaData.data;

            if (savUpaData.success === true) {
                setPdfUpaList(savUpaData._upazilaList);

                if(data === "Excel"){
                    exportToExcel(savUpaData._upazilaList);
                }else{
                    PdfDownloadFunc(savUpaData._upazilaList);
                }
              

                setAsearch("");
                setSelectVal("");
                setDistrict({
                    ...district,
                    DistrictId: "",
                    DivisionId: "",
                    DistrictNameEn: "",
                    DistrictNameBn: "",
                    DistrictCode: "",
                    AddedBy: localStorage.getItem('userName')
                });
                setExcpdf("");

                toast.success('Request Successfull!',{duration: 4000,position: 'top-center'}); 
            }else{
                toast.error('No Data Found For PDF',{duration: 4000,position: 'top-center'}); 
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


    const PdfDownloadFunc = (data) => {
       // console.log("InsidePdfFunction", data);
        const { ReportName } = district;

        const doc = new jsPDF();
        doc.setFontSize(20);

        const title = 'Upazila Name Report';
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
        const tableColumns = ["SL", 'Division Name', 'District Name', 'Upazila Name'];

        // Table options
        const tableOptions = {
            startY: 45,
        };

      //  let tableFormat = removeConsecutiveDuplicatesForUpazila(tableData);
        // Generate table data
        const tableRows = tableData.map((row, index) => [index + 1, row.divisionNameEn, row.districtNameEn, row.upazilaNameEn]);
        // console.log("tableRows", tableRows);


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
      // Save the PDF as a Blob
    }

    const exportToExcel = (data) => {
        const { ReportName } = district;

        const formattedData = data.map((item) => ({
          'Division Name': item.divisionNameEn,
          'District Name': item.districtNameEn,
          'Upazila Name': item.upazilaNameEn,
        }));

        ///////////////////////Experiment///////////////////
        // let newData = [{
        //     "Name":"Ishan",
        //     "Age":30,
        //     "address":"Mohakhali"
        // }];

        // const tab1 = [].concat(formattedData).concat([{}]).concat(newData);

        // const finalData = [...tab1];

        // const worksheet = XLSX.utils.json_to_sheet(finalData);
        ///////////////////////Experiment///////////////////


        console.log("format", formattedData);
      
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
                <h3>Upazila Name Report</h3>
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

                                    <select value={district.ReportName} className="form-select" name="ReportName" aria-label="Default select example" onChange={handleReportNameChange} disabled>
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
                                            value={asearch}
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


                            < div className="mb-3 row">
                                <label className="col-md-4 col-form-label">
                                    Name of District
                                </label>
                                <div className="col-md-8">
                                    <div className="autocomplete" ref={autocompleteDisRef}>
                                        <input
                                            value={district.DistrictNameEn}
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

export default withAuthentication(UpazilaNameReport);