import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'

const Mosque = () => {
  return (
    <div className="page-content p-4">
      <div className="pg_title">
        <h3>Mosque</h3>
      </div>
      <div className="row pt-4">
        <div className="col-md-6">
          <div className="form">
            <form action="" className="form-horizontal">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Name of Upozilla
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