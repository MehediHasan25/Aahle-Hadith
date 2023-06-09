import React, { useEffect, useState, useRef } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../../css/AutoComplete.css';
import { GetUpazilaList, GetMosqueList, GetMosqueCode, SaveMosque, DeleteMosque } from '../../../URL/ApiList';
import withAuthentication from '../../Protected/withAuthentication';
import { useNavigate } from 'react-router-dom';


const Mosque = () => {
  // upazila autoComplete////
  const [upazilaSearch, setUpazilaSearch] = useState("");
  const [listUpazila, setListUpazila] = useState([]);
  const [selectUpaVal, setSelectUpaVal] = useState("");
  const navigate = useNavigate();
  // upazila autoComplete//// 

  const [mosque, setMosque] = useState({
    MosqueId: "",
    MosqueNameEn: "",
    MosqueNameBn: "",
    AddedBy: localStorage.getItem('userName')
  });
  const [listMosque, setListMosque] = useState([]);
  const [codeMosque, setCodeMosque] = useState([]);
  const [track, setTrack] = useState(false);
  const [search, setSearch] = useState("");

  // Mosque Upazila AutoComplete state
  const [showUpaSugg, setShowUpaSugg] = useState(false);
  const suggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(upazilaSearch.toLowerCase()))

  // Mosque Upazila AutoComplete state

  useEffect(() => {
    getUpazila();
    getMosque();
    mosqueCode();
  }, []);

  useEffect(() => {
    if (track === true) {
      getMosque();
    }

    return (() => {
      setTrack(false);
    })

  }, [track]);





  // Upazila ................

  const autocompleteRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowUpaSugg(false)
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const handleChange = e => {
    setUpazilaSearch(e.target.value);
  }

  const handleSuggestionClick = (suggetion) => {
    // console.log("suggestion", suggetion.divisionNameEn);
    setUpazilaSearch(suggetion.upazilaNameEn);
    setSelectUpaVal(suggetion.upazilaId)
    setShowUpaSugg(false);
  }


  // Upazila ................


  const handleMosqueChange = (e) => {
    const { name, value } = e.target;
    setMosque((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  };


  const handleMosqueCode = (e) => {
    setCodeMosque(e.target.value);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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


  const mosqueCode = async () => {
    try {
      let codeMos = await axios.get(GetMosqueCode);
      let mosqueCode = codeMos.data.mosqueCode;
      // console.log("mosque", codeMos.data.mosqueCode);
      setCodeMosque(mosqueCode);
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
  };


  const handleSubmit = async (e) => {
    let { MosqueId, MosqueNameEn, MosqueNameBn, AddedBy } = mosque;
    e.preventDefault();
    let upaArrData = listUpazila.map(item => item.upazilaNameEn);

    let token = localStorage.getItem("AuthToken");
    const headers = { 'Authorization': 'Bearer ' + token };


    if (upazilaSearch === "") {
      //alert("Please Enter Data for auto Complete Search");
      toast.error("Please Select Name of Upazila for auto Complete Search", { duration: 5000, position: 'top-center' });
      return
    }

    if (upaArrData.includes(upazilaSearch) === false) {
      //alert("Invalid Upazila Selected.. search from auto Complete");
      toast.error("Please Select Data from auto Complete Search", { duration: 5000, position: 'top-center' });
      return;
    }

    if (MosqueNameEn === "") {
      //alert("Please Enter Name of Mosque(English)");
      toast.error("Invalid Upazila Selected.. search from auto Complete", { duration: 5000, position: 'top-center' });
      return;
    }

    if (MosqueNameBn === "") {
      //alert("Please Enter Name of Mosque(Bangla)");
      toast.error("Please Enter Name of Mosque(Bangla)", { duration: 5000, position: 'top-center' });
      return;
    }


    let payload = {
      MosqueId: MosqueId === "" ? 0 : MosqueId,
      UpazilaId: selectUpaVal,
      MosqueNameEn: MosqueNameEn,
      MosqueNameBn: MosqueNameBn,
      MosqueCode: codeMosque,
      AddedBy: AddedBy
    }

    console.log("payload", payload);

    try {
      let subMosque = await axios.post(SaveMosque, payload, { headers });
      let subSuccess = subMosque.data.success;
      if (subSuccess === true) {
        if (MosqueId > 0) {
          toast.success('Successfully Updated!', { duration: 4000, position: 'top-center' });

        } else {
          toast.success('Successfully Added!', { duration: 4000, position: 'top-center' });
        }

        mosqueCode();
        setTrack(true);
        setMosque({
          ...mosque,
          UpazilaId: "",
          MosqueNameEn: "",
          MosqueNameBn: ""
        })
        setUpazilaSearch("");

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

  const handleEdit = (editData) => {
    // console.log("edit", editData);

    setMosque({
      MosqueId: editData.mosqueId,
      MosqueNameEn: editData.mosqueNameEn,
      MosqueNameBn: editData.mosqueNameBn,
      AddedBy: localStorage.getItem('userName')
    });

    setCodeMosque(editData.mosqueCode);
    setUpazilaSearch(editData.upazilaNameEn);
    setSelectUpaVal(editData.upazilaId);
  }


  const handleDelete = async (id) => {
    // console.log("delete Id", id);
    // console.log("api", DeleteMosque);
    try {
      let deleteData = await axios.get(DeleteMosque + id);
      // console.log("deleteRes", deleteData.data);
      let resDel = deleteData.data.success;

      if (resDel === true) {
        toast.success('Successfully Deleted!', { duration: 4000, position: 'top-center' });
        mosqueCode();
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


  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Mosque</h3>
      </div>
      <div className="row pt-2">
        <div className="col-md-12">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">

                {/* Start */}
                <label className="col-md-4 col-form-label">
                  Name of Upazila
                </label>
                <div className="col-md-8">
                  {/*  */}
                  <div className="autocomplete" ref={autocompleteRef}>
                    <input
                      value={upazilaSearch}
                      onChange={handleChange}
                      placeholder="Search Upazila"
                      onFocus={() => setShowUpaSugg(true)}
                    />
                    {showUpaSugg && (
                      <ul className="suggestions">
                        {suggestions.map(suggestion => (
                          <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                            {suggestion.upazilaNameEn}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  {/*  */}

                </div>
                {/* End */}

              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Mosque(English)
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Mosque Name (English)"
                    name="MosqueNameEn"
                    onChange={handleMosqueChange}
                    value={mosque.MosqueNameEn}
                    autoComplete='off'
                  />
                </div>
              </div>


              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Mosque(Bangla)
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Mosque Name (Bangla)"
                    name="MosqueNameBn"
                    onChange={handleMosqueChange}
                    value={mosque.MosqueNameBn}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Mosque Code</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Mosque Code"
                    name="codeMosque"
                    onChange={handleMosqueCode}
                    value={codeMosque}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-md btn-danger" onClick={() => navigate("/dashboard")}>Close</button>
                <button type="button" className="btn btn-md btn-warning" onClick={() => window.location.reload()}>Refresh</button>
                <button type="button" className="btn btn-md btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
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
                placeholder="Search by Mosque Name"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>
            <table className="table table-striped table-bordered">
              <thead className='bg-success'>
                <tr>
                  <th> Action</th>
                  <th>Division</th>
                  <th>Division (Bangla)</th>
                  <th>District</th>
                  <th>District (Bangla)</th>
                  <th>Upazila</th>
                  <th>Upazila (Bangla)</th>
                  <th>Mosque</th>
                  <th>Mosque (Bangla)</th>
                  <th>Mosque Code</th>

                </tr>
              </thead>
              <tbody>
                {listMosque.filter((item) => {
                  return search.toLowerCase() === "" ? item : item.mosqueNameEn.toLowerCase().includes(search.toLowerCase()) || item.mosqueNameBn.toLowerCase().includes(search.toLowerCase())
                }).map((item) => (
                  <tr key={item.mosqueId}>
                    <td>
                      <div className="act_icon">
                        <span onClick={() => window.confirm("Are you sure you want to delete?") && handleDelete(item.mosqueId)}><BsTrash /></span>
                        <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                      </div>
                    </td>
                    <td>{item.divisionNameEn}</td>
                    <td>{item.divisionNameBn}</td>
                    <td>{item.districtNameEn}</td>
                    <td>{item.districtNameBn}</td>
                    <td>{item.upazilaNameEn}</td>
                    <td>{item.upazilaNameBn}</td>
                    <td>{item.mosqueNameEn}</td>
                    <td>{item.mosqueNameBn}</td>
                    <td>{item.mosqueCode}</td>
                  </tr>

                ))


                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthentication(Mosque);