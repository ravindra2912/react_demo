import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LogoutReq } from "../services/redux/slices/AuthSlice";

function AccountManu() {
    const user = useSelector((state) => state.auth);
    const [profile, SetProfile] = useState();
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {
        SetProfile(user.info);
    }, [user])

    function logout() {
            dispatch(LogoutReq());
        }

    return (
        <>
            <div className={`container account my-4 `}>
                <div className="row">
                    {/* Sidebar */}
                    <div className={`col-md-3 sidebar `}>
                        <div className={`card p-0 }`}>
                            <div className="card-body rounded text-center p-0">
                                <div className="bg-primary rounded-top  py-3">
                                    <img
                                        src={profile?.image ? profile.image : ''}
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

                                    <li className="nav-item">
                                        <NavLink activeclassname="active" to={'/account/orders'} className="nav-link ">
                                            <i className="bi bi-box-fill me-3"></i>Orders
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to={'/account/wishlist'} activeclassname="active" className="nav-link rounded-bottom">
                                            <i className="bi bi-heart-fill me-3"></i>Wishlist
                                        </NavLink>
                                    </li>
                                    
                                    <li className="nav-item rounded-bottom fw-bold ">
                                        <div onClick={()=>logout()} activeclassname="active" className="nav-link rounded-bottom text-danger">
                                            {/* <i className="bi bi-power h6 me-1"></i> */}
                                            Logout
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div >
        </>
    )
}

export default AccountManu;