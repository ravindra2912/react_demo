import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

function AccountLayout() {
    const user = useSelector((state)=>state.auth);
    const [profile, SetProfile] = useState();

    useEffect(()=>{
        SetProfile(user.info);
    },[user])

    return (
        <>
            <div className="container account my-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 sidebar d-md-block d-none">
                        <div className="card p-0">
                            <div className="card-body rounded text-center p-0">
                                <div className="bg-primary rounded-top  py-3">
                                <img
                                    src={profile?.image ? profile.image :''}
                                    alt={profile?.name}
                                    className="rounded-circle object-fit-cover mb-3"
                                    width="90"
                                    height="90"
                                />
                                <h5 className="card-title">{profile?.name}</h5>
                                <p className="text-muted">{profile?.email}</p>
                                </div>
                                <ul className="nav flex-column">
                                    <li className="nav-item ">
                                        <NavLink activeclassname="active" to={'/account/profile'} className="nav-link ">
                                            <i className="bi bi-person-fill me-3"></i>Profile
                                        </NavLink>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a href="#" className="nav-link ">
                                            <i className="bi bi-geo-alt-fill me-3"></i>Address
                                        </a>
                                    </li> */}
                                    
                                    <li className="nav-item">
                                        <NavLink activeclassname="active" to={'/account/orders'} className="nav-link ">
                                            <i className="bi bi-box-fill me-3"></i>Orders
                                        </NavLink>
                                    </li>
                                    
                                    <li className="nav-item rounded-bottom">
                                        <NavLink to={'/account/wishlist'} activeclassname="active" className="nav-link rounded-bottom">
                                            <i className="bi bi-heart-fill me-3"></i>Wishlist
                                        </NavLink>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9">

                        {/* Bio Section */}
                        <div className="card p-0">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountLayout;