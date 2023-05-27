import React, { useState } from 'react';
import EnrollmentFormPage from '../../Enrollment/EnrollmentFormPage';
import EnrollmentUpdate from '../../Enrollment/EnrollmentUpdate';

const DonarEnrollment = () => {
    const [update,setUpdate] = useState(true);

    const handleNew = () =>{
        setUpdate(true);
    }

    const handleUpdate =() =>{
        setUpdate(false);
    }

    return (
        <div>
            <div className="d-flex gap-3 p-3 justify-content-center">
                <div  className={update?"btn btn-small btn-success":"btn btn-outline-success"} onClick={()=> handleNew()}>
                   New
                </div>
                <div  className={update?"btn btn-outline-success":"btn btn-success"} onClick={()=> handleUpdate()}> 
                    Update
                </div>

            {/* <div class="form-check">
                <input class="form-check-input" type="radio" name="update" checked= {update} onClick={()=> handleNew()} />
                <label class="form-check-label" for="exampleRadios1">
                    New
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="update" onClick={()=> handleUpdate()}/>
                    <label className="form-check-label" htmlFor="exampleRadios2">
                        Update
                    </label>
            </div> */}
            </div>


            { update ? 
            (
            <>
            <EnrollmentFormPage/>
            </>)
            :
            (
            <>
            <EnrollmentUpdate/>
            </>
            )
        }
            
        </div>
    )
}

export default DonarEnrollment