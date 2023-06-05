import React, { useEffect, useState,useRef } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GetEnrollmentData, DeleteEnrollData, GetEnrollmentDataBySearch, GetActualIdandOrgId,DonarPaymentActualID } from "../../URL/ApiList";
import withAuthentication from "../Protected/withAuthentication";

const EnrollmentUpdate = () => {
  const [listEnrollData, setListEnrollData] = useState([]);
  const [search, setSearch] = useState("");
  const [track, setTrack] = useState(false);
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


  // ACT ID state
  const [showAccIdSuggestions, setShowAccIdSuggestions] = useState(false);
  const accIdSuggestions = listActualId.filter(option => option.display.toLowerCase().includes(selectAutoActualVal.actualIdSearch.toLowerCase()))
// ACT ID state


//Org Id State 
const [showOrgIdSuggestions, setShowOrgIdSuggestions] = useState(false);
const orgIdSuggestions = listOrgId.filter(option => option.display.toLowerCase().includes(selectAutoOrgVal.OrgIdSearch.toLowerCase()))

//Org Id State





  const navigate = useNavigate();


  useEffect(() => {
    getEnrollmentData();
    getActOrg();
  }, []);


  useEffect(() => {
    if (track === true) {
      getEnrollmentData();
    }

    return (() => {
      setTrack(false);
    })

  }, [track]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollSearch((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };


  const getEnrollmentData = async () => {
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };
    try {
      let enrolData = await axios.get(GetEnrollmentData, { headers });
      // debugger;
      if (enrolData.data.success === true) {
        // debugger;
        let allData = enrolData.data._listData === null ? [] : enrolData.data._listData;
        // console.log("enrollData", allData);
        setListEnrollData(allData)
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleDelete = async (id) => {
    console.log("id", id);
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    try {
      let deleteData = await axios.get(DeleteEnrollData + id, { headers });
      //console.log("deleteRes", deleteData.data);
      let resDel = deleteData.data.success;
      console.log("delteRes", resDel);

      if (resDel === true) {
        toast.success('Successfully Deleted!', { duration: 4000, position: 'top-center' });
        setTrack(true);
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


  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // const { actualId, organizationalId } = enrollSearch;
    const {actualIdVal} = selectAutoActualVal
    const {OrgIdVal} = selectAutoOrgVal
    const apiParams = `DonerActualId=${actualIdVal}&OrganisationalId=${OrgIdVal}`;

    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    console.log("parmsData", apiParams);

    try {
      let subSearch = await axios.get(GetEnrollmentDataBySearch + apiParams, { headers });
      console.log("subSearch", subSearch.data);
      let searchRes = subSearch.data;


      if (searchRes.success === true) {
        setListEnrollData(searchRes._listData);
      }else{
        toast.error("Please check your Actual ID and Organization ID", { duration: 5000, position: 'top-center' });
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

  const handleEdit = (id) => {
    //console.log("Donar Id", id);
    // navigate('/donar-update', { state: { donarId: id} });
    navigate('/donar-update', { state: { donarId: id } });

  }


  const getActOrg = async () => {
    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };

    try {
      let getActOrgData = await axios.get(GetActualIdandOrgId, { headers });
      let actOrgGet = getActOrgData.data;
      //console.log("actId", actOrgGet._actualList);
      setListActualId(actOrgGet._actualList);
      setListOrgId(actOrgGet._orgList);

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

  // const handleActIdSearchChange = (e) => {
  //   setSelectAutoActualVal({
  //     ...selectAutoActualVal,
  //     actualIdSearch: e.target.value
  //   });
  // }

  const autocompleteActIdRef = useRef();
  useEffect(() => {
    const handleActIdClick = (event) => {
      if (autocompleteActIdRef.current && !autocompleteActIdRef.current.contains(event.target)) {
        setShowAccIdSuggestions(false)
      }
    };
    document.addEventListener("click", handleActIdClick);
    return () => {
      document.removeEventListener("click", handleActIdClick)
    }
  }, [])

  const handleActIdChange = e => {
    setSelectAutoActualVal({
        ...selectAutoActualVal,
        actualIdSearch: e.target.value
      });
  }

  // const handleActIdSearch = (searchTerm, val) => {
  //   //  console.log("edusearch", searchTerm);
  //   //  console.log("eduId", val);
  //   setSelectAutoActualVal({
  //     actualIdSearch: searchTerm,
  //     actualIdVal: val
  //   });
  // }

  const handleActIdSuggestionClick = (suggetion) => {
    setSelectAutoActualVal({
         actualIdSearch: suggetion.display,
           actualIdVal: suggetion.id
        });
        setShowAccIdSuggestions(false);
  }

  // Actual Id Handle change all function for AutoComplete


  // Organization Id Handle change all function for AutoComplete

  // const handleOrgIdSearchChange = (e) => {
  //   setSelectAutoOrgVal({
  //     ...selectAutoOrgVal,
  //     OrgIdSearch: e.target.value
  //   });
  // }

  const autocompleteOrdIdRef = useRef();
  useEffect(() => {
    const handleOrgIdClick = (event) => {
      if (autocompleteOrdIdRef.current && !autocompleteOrdIdRef.current.contains(event.target)) {
        setShowOrgIdSuggestions(false)
      }
    };
    document.addEventListener("click", handleOrgIdClick);
    return () => {
      document.removeEventListener("click", handleOrgIdClick)
    }
  }, [])

  const handleOrgIdChange = e => {
    setSelectAutoOrgVal({
      ...selectAutoOrgVal,
      OrgIdSearch: e.target.value
    });
  }

  // const handleOrdIdSearch = (searchTerm, val) => {
  //   //  console.log("edusearch", searchTerm);
  //   //  console.log("eduId", val);
  //   setSelectAutoOrgVal({
  //     OrgIdSearch: searchTerm,
  //     OrgIdVal: val
  //   });
  // }

  const handleOrgIdSuggestionClick = (suggetion) => {
      setSelectAutoOrgVal({
      OrgIdSearch: suggetion.display,
      OrgIdVal: suggetion.id
    });
    setShowOrgIdSuggestions(false);
  }

  // Organization Id Handle change all function for AutoComplete


  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Enrollment Update</h3>
      </div>

      <div className="row pt-2">
        <div className="col-md-12">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Actual ID
                </label>
                <div className="col-md-8">
                  {/*  */}

                  {/* <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Type Actual ID"
                        name="actualIdSearch"
                        onChange={handleActIdSearchChange}
                        value={selectAutoActualVal.actualIdSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listActualId.filter(item => {
                          const searchTerm = selectAutoActualVal.actualIdSearch.toLowerCase();
                          const fullName = item.display.toLowerCase();

                          return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.id}
                              onClick={() => handleActIdSearch(item.display, item.id)}
                              className='dropdown-row'>
                              {item.display}
                            </div>
                          ))
                      }
                    </div>
                  </div> */}

              <div className="autocomplete" ref={autocompleteActIdRef}>
                    <input
                      value={selectAutoActualVal.actualIdSearch}
                      onChange={handleActIdChange}
                      placeholder="Select Actual ID"
                      onFocus={() => setShowAccIdSuggestions(true)}
                    />
                    {showAccIdSuggestions && (
                      <ul className="suggestions">
                        {accIdSuggestions.map(suggestion => (
                          <li onClick={() => handleActIdSuggestionClick(suggestion)} key={suggestion.id}>
                            {suggestion.display}
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
                  Oraganizational ID
                </label>
                <div className="col-md-8">
                  {/* <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Type Organization Id (English)"
                        name="OrgIdSearch"
                        onChange={handleOrgIdSearchChange}
                        value={selectAutoOrgVal.OrgIdSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listOrgId.filter(item => {
                          const searchTerm = selectAutoOrgVal.OrgIdSearch.toLowerCase();
                          const fullName = item.display.toLowerCase();

                          return searchTerm && fullName.includes(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.id}
                              onClick={() => handleOrdIdSearch(item.display, item.id)}
                              className='dropdown-row'>
                              {item.display}
                            </div>
                          ))
                      }
                    </div>
                  </div> */}

          <div className="autocomplete" ref={autocompleteOrdIdRef}>
                    <input
                      value={selectAutoOrgVal.OrgIdSearch}
                      onChange={handleOrgIdChange}
                      placeholder="Select Organization Id"
                      onFocus={() => setShowOrgIdSuggestions(true)}
                    />
                    {showOrgIdSuggestions && (
                      <ul className="suggestions">
                        {orgIdSuggestions.map(suggestion => (
                          <li onClick={() => handleOrgIdSuggestionClick(suggestion)} key={suggestion.id}>
                            {suggestion.display}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>


                  {/*  */}
                </div>
              </div>

              <div className="text-center">
                <button type="button" className="btn btn-md btn-danger" onClick={() => navigate("/dashboard")}>Close</button>
                <button type="button" className="btn btn-md btn-warning" onClick={() =>  window.location.reload()}>Refresh</button>
                <button type="button" className="btn btn-md btn-primary" onClick={handleSearchSubmit}>Search</button>
              </div>
              {/* <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={handleSearchSubmit}>Search</button>
              </div> */}
            </form>
          </div>
        </div>

      </div>

      <div className="row pt-4">
        <div className="col-md-12">

          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search By Donar Name or Mobile No"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>


            <table className="table table-striped table-bordered">
              <thead  className="bg-success">
                <tr>
                  <th> Action</th>
                  <th>Donar Enrollemnt Id</th>
                  <th>Donar Enrollemnt Date</th>
                  <th>Donar Name</th>
                  <th>Mobile No</th>
                  <th>Net Amount</th>
                  <th>Present Address</th>
                </tr>
              </thead>
              <tbody>
                {listEnrollData.filter((item) => {
                  return search.toLowerCase() === "" ? item : item.donerName.toLowerCase().includes(search.toLowerCase()) || item.mobileNo.toLowerCase().includes(search.toLowerCase())
                }).map(item => (
                  <tr key={item.donerEnrollmentId}>
                    <td>
                      <div className="act_icon">

                        <span onClick={() => window.confirm("Are you sure you want to delete?") && handleDelete(item.donerEnrollmentId)}><BsTrash /></span>
                        <span onClick={() => handleEdit(item.donerEnrollmentId)}><BiEditAlt /></span>
                      </div>
                    </td>
                    <td>{item.donerEnrollmentId}</td>
                    <td>{item.enrollmentDate}</td>
                    <td>{item.donerName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.netAmount}</td>
                    <td>{item.preAddress}</td>

                  </tr>
                ))}
              </tbody>


            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthentication(EnrollmentUpdate);