
function Profile() {

    return (
        <>
            <div className="container account my-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 sidebar">
                        <div className="card p-0 pt-3">
                            <div className="card-body text-center p-0">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="User Avatar"
                                    className="rounded-circle img-fluid mb-3"
                                    width="100"
                                />
                                <h5 className="card-title">Camila Smith</h5>
                                <p className="text-muted">deydey@theEmail.com</p>
                                <ul className="nav flex-column">
                                    <li className="nav-item active">
                                        <a href="#" className="nav-link ">
                                            <i className="bi bi-person-fill me-3"></i>Profile
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            <i className="bi bi-geo-alt-fill me-3"></i>Address
                                        </a>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            <i className="bi bi-box-fill me-3"></i>Orders
                                        </a>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            <i className="bi bi-heart-fill me-3"></i>Wishlist
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9">

                        {/* Bio Section */}
                        <div className="card p-0">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile