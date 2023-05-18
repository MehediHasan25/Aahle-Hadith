import React from 'react'

const District = () => {
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
                Name of District
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
                Name of District(Bangla)
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
              <label className="col-md-4 col-form-label">District Code</label>
              <div className="col-md-8">
                <input
                  type="email"
                  className="form-control"
                  id=""
                  placeholder=""
                />
              </div>
            </div>
          </form>
        </div>
      </div>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dhaka</td>
                <td>1206</td>
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