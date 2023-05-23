import React from 'react'

const DonarEnrollment = () => {
  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Division</h3>
      </div>
      <div className="form card p-3">
        <form action="">
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <label className="form-label">
                        Name (Eng)
                        </label>
                        <input type="text" className="form-control" name="name" value="" placeholder="Name" />
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="row">
                        <label className="form-label col-md-4">
                        Name (Bangla)
                        </label>
                        <input type="text" className="form-control col-md-8"  placeholder="Name (Bangla)" name="name" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                    Mobile no
                        </label>
                        <input type="text" className="form-control"  placeholder="Mobile no" name="mobile_no" />
                    </div>

                </div>
                <div className="col-md-6">
                <div className="">
                    <label className="form-label">
                       Email
                        </label>
                        <input type="email" className="form-control"  placeholder="Email" name="email" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div>
                    <label className="form-label">
                   Father's Name
                        </label>
                        <input type="text" className="form-control" placeholder=" Father's Name" name="name" />
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

export default DonarEnrollment