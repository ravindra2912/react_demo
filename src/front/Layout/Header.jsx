import React from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogoutReq } from "../services/redux/slices/AuthSlice";

const Header = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    function logout() {
        dispatch(LogoutReq());
    }

    return <>
        <div className="nav-stiky mt-3">
            <nav className="navbar navbar-expand-lg navbar-light container  rounded">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">
                        <img src={img} alt="The logo" />
                    </Link>
                    <div className="d-block d-md-none">
                        <div className="cart">
                            <Link to={'/cart'} className="bi bi-cart ">{cart.length > 0 ? <span>{cart.length}</span> : ''}</Link>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse justify-content-end me-4" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/about-us">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/contactus">Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/faq">Faq</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/register">Blogs </NavLink>
                            </li>

                            {
                                !auth.token ? <li className="nav-item">
                                    <NavLink className="nav-link" activeclassname="active" to="/login">Login </NavLink>
                                </li> : <li className="nav-item">
                                    <div className="nav-link" onClick={() => logout()} >Logout </div>
                                </li>
                            }



                        </ul>

                    </div>
                    <div className="d-none d-md-block">
                        <div className="cart">
                            <Link to={'/cart'} className="bi bi-cart ">{cart.length > 0 ? <span>{cart.length}</span> : ''}</Link>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    </>
}

export default Header;