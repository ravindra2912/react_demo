import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
    const token = useSelector((state) => state.auth.token)
    return (
        <footer>
            <div className="mobile-navigation position-fixed bottom-0 start-0 end-0 bg-transparent px-2 pb-1">
                <div className="box nav bg-white rounded-pill justify-content-between d-sm-none d-flex px-4 py-2">

                    <NavLink to={'/'} activeclassname="active" className="text-center"><i class="bi bi-house-door h4"></i><br />Home</NavLink>
                    <NavLink to={'/products'} activeclassname="active" className="text-center"><i class="bi bi-box h4"></i><br />Product</NavLink>
                    {
                        token ?
                            <NavLink to={'/account'} activeclassname="active" className="text-center"><i class="bi bi-person h4"></i><br />Account</NavLink> :
                            <NavLink to={'/login'} activeclassname="active" className="text-center"><i class="bi bi-person h4"></i><br />Login</NavLink>
                    }

                </div>
            </div>
            <div className="container ">
                <div className="row ">
                    <div className=" col-md-4 col-12  text-md-start text-center">

                        <img src={logo} height="60" />
                        <div className=" mt-3">
                            <p>Woody offers handcrafted wooden furniture with timeless design, natural materials, and sustainable craftsmanship to elevate your home decor beautifully.</p>
                            {/* <p className="mb-0"><strong>Corporate Office</strong></p> */}
                            {/* <p>{import.meta.env.VITE_ADDRESS}</p> */}

                        </div>
                    </div>

                    <div className=" col-md-8 col-12 row text-md-start text-center">
                        <div className="col-md-4 col-sm-12 quick-link ">
                            <h4>Quick links</h4>
                            <ul className="">
                                <li><Link to={'/'}>Hone</Link></li>
                                <li><Link to={'/category'}>Category</Link></li>
                            </ul>
                        </div>

                        {/* <div className="col-md-4 col-sm-12 col-12 contact mt-3">
                            <Link to={'mailto:' + import.meta.env.VITE_EMAIL} className="pb-2"><span><i className="bi bi-envelope"></i></span> {import.meta.env.VITE_EMAIL}</Link><br />
                            <Link ><span><i className="bi bi-telephone"></i></span> {import.meta.env.VITE_CONTACT}</Link>
                        </div> */}
                        <div className="col-md-4 col-sm-12 col-12 quick-link mt-md-0 mt-3">
                            <h4>Usefull links</h4>
                            <ul className="">
                                <li><Link to={'/'}>Privacy Policy</Link></li>
                                <li><Link to={'/category'}>Term And Condition</Link></li>
                                <li><Link to={'/faq'}>Faq</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-12 col-12 social-links mt-3">
                            <h4 className="mb-2">Follow Us</h4>
                            {import.meta.env.VITE_FACEBOOK_URL && <Link to={import.meta.env.VITE_FACEBOOK_URL} className="social-icon"><i className="bi bi-facebook"></i></Link>}
                            {import.meta.env.VITE_INSTAGRAM_URL && <Link to={import.meta.env.VITE_INSTAGRAM_URL} className="social-icon"><i className="bi bi-instagram"></i></Link>}
                            {import.meta.env.VITE_TWITTER_URL && <Link to={import.meta.env.VITE_TWITTER_URL} className="social-icon"><i className="bi bi-twitter"></i></Link>}
                            {import.meta.env.VITE_YOUTUBE_URL && <Link to={import.meta.env.VITE_YOUTUBE_URL} className="social-icon"><i className="bi bi-youtube"></i></Link>}
                        </div>
                        <div className="col-sm-12 col-12 mt-5 d-flex justify-content-sm-between">

                            <div>
                                <p>Copyright © 2025. All rights reserved.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;