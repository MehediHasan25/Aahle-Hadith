import React from 'react'

const DonarPaymentList = () => {
  return (
    <div className="page-content p-3">
        <div className="row">
        <div className="col-md-7">
        <form action="">
            <div className="form card shadow p-3">
            <h5 className="text_primary text-capitalize">Donar Payment Entry (Individual)</h5>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Actual ID</label>

                   
                    <input className="col-md-9" type="text" placeholder="Enter Division Name (Bangla)"/>
                    {/* </div> */}
                </div>
                <div className="mb-3 row">
                    <label className="col-form-label col-md-3">Organizational ID</label>
                    <input className="col-md-9" type="text" placeholder="Enter Division Name (Bangla)"/>
                </div>
                <div className="mb-3 row">
                    <label className="col-md-3 col-form-label">Year</label>
                    <input className="col-md-9" type="date" placeholder="Enter Division Name (Bangla)"/>
                </div>
                <div className="mb-3 row">
                    {/* table will be auto generated */}
                    <table className="table table-striprd border">
                        <thead className="bg-info">
                            <tr>
                                <th>Month</th>
                                <th>Donation Amount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="btn btn-outline-primary">January</span>
                                </td>
                                <td>
                                <select className="form-select text-danger">
                                        <option className="text-danger">--Select--</option>
                                        <option >5000.00</option>

                                </select>
                                </td>
                                <td>
                                    <span className="text-success">10000.00</span>
                                </td>
                            </tr>
                            <tr>
                            <td>
                                    <span className="btn btn-outline-primary">February</span>
                                </td>
                                <td>
                                <select className="form-select text-danger">
                                        <option className="text-danger">--Select--</option>
                                        <option >5000.00</option>

                                </select>
                                </td>
                                <td>
                                    <span className="text-success">10000.00</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-flex gap-2 mt-4">
                        <button className="btn btn-success w-auto m-0">Save</button>
                        <button className="btn btn-warning w-auto  m-0">Update</button>
                </div>
            </div>
             </form>
            </div>
        </div>
    </div>
  )
}

export default DonarPaymentList;