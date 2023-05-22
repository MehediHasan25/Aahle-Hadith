import React, { useEffect, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../../../css/AutoComplete.css';
import { GetUpazilaList,GetMosqueList,GetMosqueCode } from '../../../URL/ApiList';


const Mosque = () => {
  // upazila autoComplete////
  const [upazilaSearch, setUpazilaSearch] = useState("");
  const [listUpazila, setListUpazila] = useState([]);
  const [selectUpaVal, setSelectUpaVal] = useState("");
  // upazila autoComplete//// 

  const [mosque,setMosque] =useState({
    MosqueId:"",
    UpazilaId:"",
    MosqueNameEn:"",
    MosqueNameBn:"",
    AddedBy: localStorage.getItem('userName')
  });
  const [listMosque, setListMosque] = useState([]);
  const [codeMosque, setCodeMosque]= useState([]);
  const [track, setTrack] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    getUpazila();
    getMosque();
    mosqueCode();
  },[]);

  // Upazila ................
  const handleUpaSearchChange = (e) => {
    setUpazilaSearch(e.target.value);
  }  
  
  const handleUpaSearch = (searchTerm, val) => {
    setUpazilaSearch(searchTerm);
    setSelectUpaVal(val);
    console.log("Upasearch", searchTerm);
    console.log("UpaId", val);
  
  }

  // Upazila ................

  const getUpazila = async(e) =>{
    try{
      let upaData = await axios.get(GetUpazilaList);
      console.log("upaDataList", upaData.data._upazilaList);
      let getUpaData = upaData.data._upazilaList;
      setListUpazila(getUpaData);
    }catch(err){
      console.log("error", err);
      if (err.response) {
        let message = err.response.data.message;
        alert(message);
      } else if (err.request) {
        alert('Error Connecting ...', err.request);
      } else if (err) {
        alert(err.toString());
      }
    }
  }


  const getMosque = async() =>{
    try{
      let getMosqueData = await axios.get(GetMosqueList);
      let getDataMosque = getMosqueData.data._mosqueList;
      console.log("mosqueList", getDataMosque);
      setListMosque(getDataMosque);

    }catch(err){
      if (err.response) {
        let message = err.response.data.message;
        alert(message);
      } else if (err.request) {
        alert('Error Connecting ...', err.request);
      } else if (err) {
        alert(err.toString());
      }
    }
  }


  const mosqueCode = async () => {
    try {
      let codeMos = await axios.get(GetMosqueCode);
       let mosqueCode = codeMos.data.mosqueCode;
      console.log("mosque", codeMos.data.mosqueCode);
      setCodeMosque(mosqueCode);
    } catch (err) {
      console.log("error", err);
      if (err.response) {
        let message = err.response.data.message;
        alert(message);
      } else if (err.request) {
        alert('Error Connecting ...', err.request);
      } else if (err) {
        alert(err.toString());
      }
    }
  };

  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Mosque</h3>
      </div>
      <div className="row pt-2">
        <div className="col-md-6">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                
                {/* Start */}
          <label className="col-md-4 col-form-label">
                  Name of Upazila
                </label>
                <div className="col-md-8">
                  <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Enter Division Name (English)"
                        name="upazilaSearch"
                        onChange={handleUpaSearchChange}
                        value={upazilaSearch}
                        autoComplete='off'
                        style={{ width: "2000px" }}
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listUpazila.filter(item => {
                          const searchTerm = upazilaSearch.toLowerCase();
                          const fullName = item.upazilaNameEn.toLowerCase();

                          return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.upazilaId}
                              onClick={() => handleUpaSearch(item.upazilaNameEn, item.upazilaId)}
                              className='dropdown-row'>
                              {item.upazilaNameEn}
                            </div>
                          ))
                      }
                    </div>
                  </div>

                </div>
            {/* End */}
              
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Mosque(English)
                </label>
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control"
                    id=""
                    placeholder=""
                  />
                </div>
              </div>


              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Mosque(Bangla)
                </label>
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control"
                    id=""
                    placeholder=""
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Mosque Code</label>
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control"
                    id=""
                    placeholder=""
                  />
                </div>
              </div>
              <div className="text-end">
         <button type="button" className="btn btn-sm btn-primary">Submit</button>
         </div>
            </form>
          </div>
        </div>
    
      </div>
      <div className="row pt-4">
      <div className="col-md-6">
          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
              />
            </form>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Mosque</th>
                  <th>Code</th>
                <th colspan="2"> Action</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dhaka</td>
                  <td>1206</td>
                  <td><BsTrash/></td>
                <td><BiEditAlt/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mosque