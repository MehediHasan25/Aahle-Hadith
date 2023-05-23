import React, { useEffect, useState } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Occupation = () => {
    const [occupation, setOccupation] = useState({
        OccupationId:"",
        OccupationName:"",
        OccupationNameBng:""
    });

    const [listOccupation, setListOccupation] = useState([]);
    const [search, setSearch] = useState("");
    const [track, setTrack] = useState(false);


    // useEffect(()=>{

    // },[]);



    const handleOccupationChange =(e) =>{
        const { name, value } = e.target;
        setOccupation((prev) => {
        return {
            ...prev,
            [name]: value
        }
        })
    }

  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Occupation</h3>
      </div>

      <div className="row pt-2">
        <div className="col-md-8">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Occupation (English)
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Occupation Name (English)"
                    name="OccupationName"
                    onChange={handleOccupationChange}
                    value={occupation.OccupationName}
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Occupation (Bangla)
                </label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Occupation Name (Bangla)"
                    name="OccupationNameBng"
                    onChange={handleOccupationChange}
                    value={occupation.OccupationNameBng}
                    autoComplete='off'
                  />
                </div>
              </div>
              {/* <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Division Code</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Enter Division Code"
                    name="codeDivision"
                    onChange={codeDivisionVal}
                    value={codeDivision}
                    disabled
                    autoComplete='off'
                  />
                </div>
              </div> */}
              <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>

      <div className="row pt-4">
        <div className="col-md-8">
          <div className="table form-tbl">
            <form className="d-flex w-50">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search By Division Name"
                name="search"
                onChange={handleSearch}
                value={search}
                autoComplete='off'
              />
            </form>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Action</th>
                  <th>Division(English)</th>
                  <th>Division(Bangla)</th>
                  <th>Code</th>

                </tr>
              </thead>
              <tbody>
                {listDivision.filter((item)=>{
                  return search.toLowerCase()==="" ? item : item.divisionNameEn.toLowerCase().includes(search.toLowerCase()) || item.divisionNameBn.toLowerCase().includes(search.toLowerCase())
                  }).map(item => (
                  <tr key={item.divisionId}>
                    <td>
                      <div className="act_icon">

                      <span  onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.divisionId)}><BsTrash /></span>
                      <span onClick={() => handleEdit(item)}><BiEditAlt /></span>
                      </div>
                    </td>
                    <td>{item.divisionNameEn}</td>
                    <td>{item.divisionNameBn}</td>
                    <td>{item.divisionCode}</td>
                    {/* <td onClick={() =>window.confirm("Are you sure you want to delete?") && handleDelete(item.divisionId)}><BsTrash /></td>
                    <td onClick={() => handleEdit(item)}><BiEditAlt /></td> */}
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

export default Occupation