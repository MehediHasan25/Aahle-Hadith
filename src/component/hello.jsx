
import React, { useState, useEffect, useRef } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
import { GetDivisionList, GetDistrictList, GetDistrictCode, SaveDistrict, DeleteDistrict } from '../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';


const Hello = () => {
  // Division autoComplete////
  const [asearch, setAsearch] = useState("");
  const [listDivision, setListDivision] = useState([]);

  const [district, setDistrict] = useState({
    DistrictId: "",
    DivisionId: "",
    DistrictNameEn: "",
    DistrictNameBn: "",
    DistrictCode: "",
    AddedBy: localStorage.getItem('userName')
  });


  // dropdown with autoComplete
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = listDivision.filter(option => option.divisionNameEn.toLowerCase().includes(asearch.toLowerCase()))


  useEffect(() => {
    getDivisionData();
    // getDistrictData();
    // districtCode();
  }, []);



  // DIVISION AUTOSEARCH
  const autocompleteRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const handleChange = e => {
    setAsearch(e.target.value);
  }

  const handleSuggestionClick = (suggetion) => {
    console.log("suggestion", suggetion.divisionNameEn);
    setAsearch(suggetion.divisionNameEn);
    setDistrict({
      ...district,
      DivisionId: suggetion.divisionId
    })

    setShowSuggestions(false);
  }

  ////////////////division AutoSearch

  const getDivisionData = async () => {
    try {
      let divGet = await axios.get(GetDivisionList);
      let getDivList = divGet.data._divisionList;
      console.log("division", getDivList);

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




  console.log("aSearch", asearch);
  console.log("district", district);

  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>District</h3>
      </div>
      <div className="row pt-2">
        <div className="col-md-6">
          <div className="form card p-3">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Division
                </label>
                <div className="col-md-8">
                  {/*  */}
                  <div className="autocomplete" ref={autocompleteRef}>
                    <input
                      value={asearch}
                      onChange={handleChange}
                      placeholder="asearch"
                      onFocus={() => setShowSuggestions(true)}
                    />
                    {showSuggestions && (
                      <ul className="suggestions">
                        {suggestions.map(suggestion => (
                          <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion.divisionId}>
                            {suggestion.divisionNameEn}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  {/*  */}

                </div>
              </div>



              <div className="text-end">
                <button type="button" className="btn btn-sm btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
              </div>

            </form>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Hello;