import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { GetUpazilaList, GetDistrictfromUpazila } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';


const UpazilaDistrict = ({ sendData }) => {
    

    // console.log("upClean", saveComplete);
    const [listUpazila, setListUpazila] = useState([]);
    const [compData, setCompData] = useState({
         UpaSearch: "",
        UpaId: "",
        district: ""
        
    });

    const [showUpaSuggestions, setShowUpaSuggestions] = useState(false);
    const upaSuggestions = listUpazila.filter(option => option.upazilaNameEn.toLowerCase().includes(compData.UpaSearch.toLowerCase()))
  



    useEffect(() => {
        getUpazila();
    }, []);


    const getUpazila = async (e) => {
        try {
            let upaData = await axios.get(GetUpazilaList);
            // console.log("upaDataList", upaData.data._upazilaList);
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


    const handleDistrictChange = (e) => {
        setCompData({
            ...compData,
            district: e.target.name
        })
    }



    const autocompleteRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowUpaSuggestions(false)
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const handleChange = e => {
         setCompData({
            ...compData,
            UpaSearch: e.target.value
        });
  }


    

    const handleSuggestionClick = async(suggetion) => {
        //console.log("upaSug", suggetion.upazilaId);
           try {
            let getDistrict = await axios.get(GetDistrictfromUpazila + suggetion.upazilaId);
           // console.log("District", getDistrict.data.districtobj.districtNameEn);
            let districtName = getDistrict.data.districtobj.districtNameEn;

            setCompData({
                UpaSearch: suggetion.upazilaNameEn,
                UpaId: suggetion.upazilaId,
                district: districtName
            });
            setShowUpaSuggestions(false);

            sendData(suggetion.upazilaNameEn, suggetion.upazilaId, districtName);

            // setCompData({
            //     UpaSearch: "",
            //     UpaId: "",
            //     district: ""
            // });

        } catch (err) {
            console.log(err);
        }

      }


    // console.log("compData", compData);

    return (
        <div className="row mb-3">

            <div className="col-md-6">
                <div className="row">
                    <label className="col-sm-4 col-form-label text-end">Upazila</label>
                    <div className="col-sm-8">
                        
                     {/*  */}
                  <div className="autocomplete" ref={autocompleteRef}>
                    <input
                      value={compData.UpaSearch}
                      onChange={handleChange}
                      placeholder="Search Upazila"
                      onFocus={() => setShowUpaSuggestions(true)}
                    />
                    {showUpaSuggestions && (
                      <ul className="suggestions">
                        {upaSuggestions.map(suggestion => (
                          <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion.upazilaId}>
                            {suggestion.upazilaNameEn}
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>
                  {/*  */}

                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <label className="col-sm-4 col-form-label text-end">District</label>
                    <div className="col-sm-8">
                        <input
                            className="form-control"
                            name="district"
                            value={compData.district}
                            onChange={handleDistrictChange}
                            placeholder="Enter District Name (Bangla)"
                            autoComplete='off'
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    
            

        
    )
}

export default UpazilaDistrict;