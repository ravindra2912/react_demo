import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogoutReq } from "../services/redux/slices/AuthSlice";

const Header = () => {
    const cart = useSelector((state) => state.cart);
    const userInfo = useSelector((state) => state.auth.info);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navDivRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navDivRef.current && !navDivRef.current.contains(event.target)) {
                handleNavClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const handleNavClick = () => {
        if (navDivRef.current.classList.contains('show')) {
            // toggleRef.current.click();
            navDivRef.current.classList.remove('show');
        }
    };
    function logout() {
        dispatch(LogoutReq());
    }

    return <>
        <div className="nav-stiky mt-3">
            <nav className="navbar navbar-expand-lg navbar-light container  rounded">
                <div className="container">
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav" ref={navDivRef}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" to="/about-us">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" to="/contactus">Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" to="/faq">Faq</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={() => handleNavClick()} activeclassname="active" to="/register">Blogs </NavLink>
                            </li>

                            {
                                !auth.token ? <li className="nav-item">
                                    <NavLink className="nav-link" activeclassname="active" to="/login">Login </NavLink>
                                </li> : <li className="nav-item d-sm-block d-none align-self-center">
                                    <div className="dropdown text-end">
                                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={userInfo?.image} alt={userInfo?.name} className="rounded-circle profile-img" />
                                        </a>
                                        <ul className="dropdown-menu text-small" >
                                            <li><NavLink className="dropdown-item" to="/account/profile">Profile</NavLink></li>
                                            <li><NavLink className="dropdown-item" to="/account/orders">Orders</NavLink></li>
                                            <li><NavLink className="dropdown-item" to="/account/wishlist">Wishlist</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><div className="dropdown-item" onClick={() => logout()}>Sign out</div></li>
                                        </ul>
                                    </div>
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