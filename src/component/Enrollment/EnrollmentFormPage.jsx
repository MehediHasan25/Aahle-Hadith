import React, { useState } from 'react'

const EnrollmentFormPage = () => {
    const [personal, setPersonal] = useState({
        DonerName:"",
        DonerNameBng:"",
        MobileNo:"",
        Email:"",
        FatherName:"",
        MotherName:"",
        NIDNo:"",
        BirthCerNo:""
    });

    // Education autoComplete////
   //const [divSearch, setDivSearch] = useState("");
   const [listEducation, setListEducation] = useState([]);
   const [selectAutoEduVal, setSelectAutoEduVal] = useState({
    eduSearch:"",
    EduQualificationId:""
   });
   // Education autoComplete////

   //Occupation AutoComplete/////
   const [listOccupation, setListOccupation] = useState([]);
   const [selectAutoOccVal, setSelectAutoOccVal] = useState({
    OccSearch:"",
    OccupationId:""
   });
   //Occupation AutoComplete/////

    //Address
    const [sameAddress, setSameAddress] = useState(false);    

   const [address, SetAddress] = useState({
    PreAddress:"",
    PerAddress:""
   });

   const [listUpazila, setListUpazila] = useState([]);

    //Present Upazila AutoComplete
    const [selectAutoPreUpaVal, setSelectAutoPreUpaVal] = useState({
        PreUpaSearch:"",
        PreUpazilaId:""
       });
    
    //Present Upazila AutoComplete

    //Permanent Upazila AutoComplete
    const [selectAutoPerUpaVal, setSelectAutoPerUpaVal] = useState({
        PerUpaSearch:"",
        PerUpazilaId:""
       });
    
    //Permanent Upazila AutoComplete

    const [orgUpazila, setOrgUpazila] = useState({
        OrgUpaSearch:"",
        OrgUpazilaId:""
    });


    // Mosque Auto Complete
    const [selectAutoMosqueVal, setSelectAutoMosqueVal] = useState({
        MosqueSearch:"",
        OrgMosqueId:""
       });
    // Mosque Auto Complete


    const [listDonationAmt, ListDonationAmt] = useState([]);

    // Donation Auto Complete
    const [selectAutoDonationVal, setSelectAutoDonationVal] = useState({
        DonationSearch:"",
        DonationAmtId:""
       });
    // Donation Auto Complete


    // Donation Amount
    const [donationAmt, setDonationAmt] = useState({
        DisPerAmt:"",
        NetAmount:""
    });
    // Donation Amount

    const [donationData, setDonationData] = useState({
        DonationMonth:"",
        DonationYear:"",
        EnrollmentDate:"",
    });

    const [life, setLife] = useState({
        LifeStatus:"",
        DeadDate:""
    })


    const handlePersonalChange =(e)=>{
      const  {name,value} = e.target;
      setPersonal((prev) => {
        return {
          ...prev,
          [name]: value
        }
      })
    }


  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Enrollment</h3>
      </div>
      <div className="form card p-3">
        <form action="">
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <label className="form-label">
                        Name (Eng)
                        </label>
                        <input type="text" 
                        className="form-control" 
                        name="DonerName" 
                        value={personal.DonerName} 
                        onChange={handlePersonalChange}
                        placeholder="Name" 
                        autoComplete='off'
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="row">
                        <label className="form-label col-md-4">
                        Name (Bangla)
                        </label>
                        <input 
                        className="form-control" 
                        name="DonerNameBng" 
                        value={personal.DonerNameBng} 
                        onChange={handlePersonalChange}
                        placeholder="Enter Name (Bangla)" 
                        autoComplete='off' 
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                    Mobile no
                        </label>
                        <input 
                        className="form-control" 
                        name="MobileNo" 
                        value={personal.MobileNo} 
                        onChange={handlePersonalChange}
                        placeholder="Mobile No" 
                        autoComplete='off' 
                        />
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                       Email 
                        </label>
                        <input 
                        className="form-control" 
                        name="Email" 
                        value={personal.Email} 
                        onChange={handlePersonalChange}
                        placeholder="Enter Email No" 
                        autoComplete='off' 
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                   Father's Name
                        </label>
                        <input 
                        className="form-control" 
                        name="FatherName" 
                        value={personal.FatherName} 
                        onChange={handlePersonalChange}
                        placeholder="Enter Father Name" 
                        autoComplete='off'
                        />
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="">
                        <label className="form-label">
                         Mother's Name
                        </label>
                        <input type="text" className="form-control"  placeholder="Mother's Name" name="name" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                 NID No
                        </label>
                        <input type="text" className="form-control" placeholder="NID No" name="email" />
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                  Birth Certificate
                        </label>
                        <input type="text" className="form-control"  placeholder=" Birth Certificate" name="" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                  Education
                        </label>
                        <select className="form-select" id="sel1" name="Education">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                   Occupation
                        </label>
                        <select className="form-select" id="sel1" name="Occupation">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div>
                    <label className="form-label">
                   Present Address
                        </label>
                        <input type="text" className="form-control"  placeholder=" Present Address" name="address" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div>
                    <label className="form-label">
                   Permanent Address
                        </label>
                        <input type="text" className="form-control" placeholder="Permanent Address" name="address" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                         Org Upazilla
                        </label>
                        <select className="form-select" name="">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                    Org Mosque
                        </label>
                        <select className="form-select"  name="">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                        Donation Amount
                        </label>
                        <select className="form-select" name="">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                    Net Amount
                        </label>
                        <select className="form-select"  name="">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
            </div>
            
            
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                        Donation Month
                        </label>
                       <input type="date"  className='form-control'/>
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                   Year
                        </label>
                        <input type="date"  className='form-control'/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                      Enrollment Date
                        </label>
                       <input type="date"  className='form-control'/>
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                 Life Status
                        </label>
                        <select className="form-select"  name="">
                            <option>Alive</option>
                            <option>Dead</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
      </div>

      </div>
  )
}

export default EnrollmentFormPage