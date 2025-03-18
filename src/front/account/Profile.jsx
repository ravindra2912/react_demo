import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

function Profile() {
    const user = useSelector((state) => state.auth);
    const [profile, SetProfile] = useState(user.info);

    useEffect(() => {
        console.log(profile)

    }, [])

    return (
        <>

            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Profile</h5>
            </div>
            <div className="card-body">

                <div className="row">
                    <div className="col-md-6"> <p><strong>First Name:</strong> Camila</p> </div>
                    <div className="col-md-6"> <p><strong>Last Name:</strong> Smith</p> </div>
                    <div className="col-md-6"> <p><strong>Country:</strong> Australia</p> </div>
                    <div className="col-md-6"> <p><strong>Birthday:</strong> 13 July 1983</p> </div>
                    <div className="col-md-6"> <p><strong>Occupation:</strong> UI Designer</p> </div>
                    <div className="col-md-6"> <p><strong>Email:</strong> jsmith@flatlab.com</p> </div>
                    <div className="col-md-6"> <p><strong>Mobile:</strong> (12) 03 4567890</p> </div>
                    <div className="col-md-6"> <p><strong>Phone:</strong> 88 (02) 123456</p> </div>
                </div>
            </div>
        </>
    )
}

export default Profile