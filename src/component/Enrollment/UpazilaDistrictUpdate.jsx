import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetUpazilaList, GetDistrictfromUpazila } from '../../URL/ApiList';
import toast, { Toaster } from 'react-hot-toast';


const UpazilaDistrictUpdate = ({ sendData },props) => {
    // console.log("upClean", saveComplete);
    const [listUpazila, setListUpazila] = useState([]);
    const [compData, setCompData] = useState({
         UpaSearch: "",
        UpaId: "",
        district: ""
        
    });

    useEffect(() => {
        getUpazila();
    }, []);

    // if(saveComplete === true){
    //     setCompData({
    //         UpaSearch: "",
    //         UpaId: "",
    //         district: ""
    //     });
    // }

    function updateFormData(data) {
        console.log("data",data);
        setCompData({
            UpaSearch: data.PreUpaSearch,
            UpaId: data.val,
            district: data.PreDistrict
        });
      }

    const getUpazila = async (e) => {
        try {
            let upaData = await axios.get(GetUpazilaList);
            //console.log("upaDataList", upaData.data._upazilaList);
            let getUpaData = upaData.data._upazilaList;
            setListUpazila(getUpaData);
        } catch (err) {
            console.log("error", err);
            if (err.response) {
                let message = err.response.data.message;
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


    const handleUpaSearchChange = (e) => {
        setCompData({
            ...compData,
            UpaSearch: e.target.value
        });
    }


    const handleUpaSearch = async (searchTerm, val) => {
        // console.log("edusearch", searchTerm);
        //console.log("eduId", val);
        try {
            let getDistrict = await axios.get(GetDistrictfromUpazila + val);
            console.log("District", getDistrict.data.districtobj.districtNameEn);
            let districtName = getDistrict.data.districtobj.districtNameEn;

            setCompData({
                UpaSearch: searchTerm,
                UpaId: val,
                district: districtName
            });

            sendData(searchTerm, val, districtName);

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

                        <div className='search-container'>
                            <div className='search-inner'>
                                <input
                                    type="text"
                                    placeholder="Type Upazila Name & Select (English)"
                                    name="UpaSearch"
                                    onChange={handleUpaSearchChange}
                                    value={compData.UpaSearch}
                                    autoComplete='off'
                                    style={{ width: "2000px" }}
                                />
                            </div>
                            <div className='dropdown'>
                                {
                                    listUpazila.filter(item => {
                                        const searchTerm = compData.UpaSearch.toLowerCase();
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

export default UpazilaDistrictUpdate;