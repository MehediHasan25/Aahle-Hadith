import React, { useState } from 'react';
import EnrollmentFormPage from '../../Enrollment/EnrollmentFormPage';
import EnrollmentUpdate from '../../Enrollment/EnrollmentUpdate';
import withAuthentication from '../../Protected/withAuthentication';

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

export default withAuthentication(DonarEnrollment);