import React, { useState,useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi';
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { GetDivisionCode, GetDivisionList, SaveDivision,DeleteDivision } from "../../../URL/ApiList";

const District = () => {

  const [listDivision, setListDivision] = useState([]);
  const [autoDivSearch, setAutoDivSearch] = useState("");
  const [searchDivVal, setSearchDivVal] = useState("");

  useEffect(() => {
    getDivision();
  }, []);

  const onChange = (e) => {
    setAutoDivSearch(e.target.value);
  }

  const onSearch = (searchTerm, val) => {
    //setAsearch(searchTerm);
    //setSelectVal(val);
    console.log("search", searchTerm);
    console.log("idvAL", val);

  }

  const getDivision = async () => {
    try{
      let divGet = await axios.get(GetDivisionList);
      let getDivList = divGet.data._divisionList;
      setListDivision(getDivList);
    }catch(err){
      console.log("error",err);
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

  return (
    <div className="page-content p-4">
    <div className="pg_title">
      <h3>District</h3>
    </div>
    <div className="row pt-4">
      <div className="col-md-6">
        <div className="form">
        <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Division
                </label>
                <div className="col-md-8">
                  <div className='search-container'>
                    <div className='search-inner'>
                      <input
                        type="text"
                        placeholder="Enter Division Name (English)"
                        name="asearautoDivSearchch"
                        onChange={onChange}
                        value={autoDivSearch}
                        autoComplete='off'
                      />
                    </div>
                    <div className='dropdown'>
                      {
                        listDivision.filter(item => {
                          const searchTerm = autoDivSearch.toLowerCase();
                          const fullName = item.divisionNameEn.toLowerCase();

                          return searchTerm && fullName.startsWith(searchTerm) && fullName != searchTerm;
                        }).slice(0, 10)
                          .map((item) => (
                            <div
                              key={item.divisionId}
                              onClick={() => onSearch(item.divisionNameEn, item.divisionId)}
                              className='dropdown-row'>
                              {item.divisionNameEn}
                            </div>
                          ))
                      }
                    </div>
                  </div>

                </div>

                < div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of District
                </label>
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control"
                    id=""
                    placeholder="Hello"
                  />
                </div>
              </div>

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
                <th>District</th>
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

export default District