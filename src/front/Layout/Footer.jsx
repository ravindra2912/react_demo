import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container ">
            <div className="row ">
                <div className=" col-md-5 col-12  ">

                    <img src={logo} height="60" />
                    <div className=" mt-3">
                        <p className="mb-0"><strong>Corporate Office</strong></p>
                        <p>4th, Floor, Near Prahlad nagar garden, ahmedabad, gujrat, india 302520</p>
                    </div>
                </div>

                <div className=" col-md-7 col-12 row ">
                    <div className="col-md-4 col-sm-12 quick-link">
                        <h4>Quick links</h4>
                        <ul className="">
                            <li><Link to={'/'}>Hone</Link></li>
                            <li><Link to={'/category'}>Category</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 col-sm-12 col-12 contact mt-3">
                        <div className="pb-2"><span><i className="bi bi-envelope"></i></span> Test@gmail.com</div>
                        <div><span><i className="bi bi-telephone"></i></span> +5588669955</div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-12 quick-link mt-3">
                        <h4>Usefull links</h4>
                        <ul className="">
                            <li><Link to={'/'}>Privacy Policy</Link></li>
                            <li><Link to={'/category'}>Term And Condition</Link></li>
                            <li><Link to={'/faq'}>Faq</Link></li>
                        </ul>
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