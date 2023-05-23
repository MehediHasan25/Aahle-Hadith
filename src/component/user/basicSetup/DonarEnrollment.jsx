import React, { useState } from 'react';
import EnrollmentFormPage from '../../Enrollment/EnrollmentFormPage';

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
            <div class="form-check">
                <input class="form-check-input" type="radio" name="update" checked= {update} onClick={()=> handleNew()} />
                <label class="form-check-label" for="exampleRadios1">
                    New
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="update" onClick={()=> handleUpdate()}/>
                    <label class="form-check-label" for="exampleRadios2">
                        Update
                    </label>
            </div>


            { update ? 
            (
            <>
            <EnrollmentFormPage/>
            </>)
            :
            (
            <>

            </>
            )
        }
            
        </div>
    )
}

export default DonarEnrollment