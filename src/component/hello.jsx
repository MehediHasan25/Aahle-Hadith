import React from 'react'

const hello = () => {
  return (
    <div className="row mb-3">

    <div className="col-md-6">
        <div className="row">
            <label  className="col-sm-4 col-form-label text-end">Upozilla</label>
            <div className="col-sm-8">
            <input type="email" className="form-control" id="inputEmail3" />
            </div>
        </div>
    </div>
    <div className="col-md-6">
       <div className="row">
       <label  className="col-sm-4 col-form-label text-end">District</label>
        <div className="col-sm-8">
        <input type="email" className="form-control" id="inputEmail3" />
        </div>
       </div>
    </div>
</div>


  )
}

export default hello