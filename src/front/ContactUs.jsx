import { useRef, useState } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AxiosReq from "./AxiosReq";
import toast from "react-hot-toast";

export default function ContactUs() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);

    const formRef = useRef(null);

    async function contactUS() {
        setLoading(true);
        const formData = new FormData(formRef.current)
        const formDataObj = Object.fromEntries(formData.entries());

        await AxiosReq(`contact-us`, formDataObj, 'post', navigate, token)
            .then((response) => {
                if (response.success) {
                    toast.success(response.message)
                    formRef.current.reset();
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });

    }

    function isNumeric(e) {
        const value = e.target.value;
        const regex = /^[0-9]*$/;
        if (!regex.test(value)) {
            e.target.value = value.replace(/[^0-9]/g, '');
        }
    }

    return (
        <>
            <div className="container pb-5 contactus">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="contact-wrapper">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <div className="contact-info h-100">
                                        <h3 className="mb-4">Get in touch</h3>
                                        <p className="mb-4">We'd love to hear from you. Please fill out the form or contact us using the information below.</p>

                                        <div className="contact-item">
                                            <div className="contact-icon" style={{width: '53px'}}>
                                                <i className="bi bi-geo-alt-fill"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Address</h6>
                                                <p className="mb-0">{import.meta.env.VITE_ADDRESS}</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="bi bi-phone"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Phone</h6>
                                                <p className="mb-0">{import.meta.env.VITE_CONTACT}</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="bi bi-envelope"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Email</h6>
                                                <p className="mb-0">{import.meta.env.VITE_EMAIL}</p>
                                            </div>
                                        </div>

                                        <div className="social-links">
                                            <h6 className="mb-3">Follow Us</h6>
                                            {import.meta.env.VITE_FACEBOOK_URL && <Link to={import.meta.env.VITE_FACEBOOK_URL} className="social-icon"><i className="bi bi-facebook"></i></Link> }
                                            {import.meta.env.VITE_INSTAGRAM_URL && <Link to={import.meta.env.VITE_INSTAGRAM_URL} className="social-icon"><i className="bi bi-instagram"></i></Link> }
                                            {import.meta.env.VITE_TWITTER_URL && <Link to={import.meta.env.VITE_TWITTER_URL} className="social-icon"><i className="bi bi-twitter"></i></Link> }
                                            {import.meta.env.VITE_YOUTUBE_URL && <Link to={import.meta.env.VITE_YOUTUBE_URL} className="social-icon"><i className="bi bi-youtube"></i></Link> }
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="contact-form">
                                        <h3 className="mb-4">Send us a message</h3>
                                        <form onSubmit={(e) => { e.preventDefault(); contactUS() }} ref={formRef}>
                                            <div className="row">
                                                <div className="col-md-12 mb-3">
                                                    <label className="form-label">Name</label>
                                                    <input type="text" name="name" className="form-control" placeholder="Name" />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Contact </label>
                                                <input type="text" name="contatc" onChange={(e)=>{isNumeric(e)}} className="form-control" placeholder="Contact" />
                                            </div>
                                            
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" name="email" className="form-control" placeholder="Email" />
                                            </div>

                                            {/* <div className="mb-3">
                                                <label className="form-label">Subject</label>
                                                <input type="text" className="form-control" placeholder="How can we help?" />
                                            </div> */}

                                            <div className="mb-4">
                                                <label className="form-label">Message</label>
                                                <textarea className="form-control" name="message" rows="5" placeholder="Your message here..."></textarea>
                                            </div>

                                            <button type="submit" disabled={loading} className="btn btn-submit text-white">{loading ? 'Loading...':'Submit'}</button>
                                        </form>

                                        <div className="map-container mt-4">
                                            <iframe src={import.meta.env.VITE_MAP_URL} width="100%" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}