export default function ContactUs() {
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
                                            <div className="contact-icon">
                                                <i className="bi bi-geo-alt-fill"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Address</h6>
                                                <p className="mb-0">123 Business Avenue, Suite 100<br />New York, NY 10001</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="bi bi-phone"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Phone</h6>
                                                <p className="mb-0">+1 (555) 123-4567</p>
                                            </div>
                                        </div>

                                        <div className="contact-item">
                                            <div className="contact-icon">
                                                <i className="bi bi-envelope"></i>
                                            </div>
                                            <div>
                                                <h6 className="mb-0">Email</h6>
                                                <p className="mb-0">contact@company.com</p>
                                            </div>
                                        </div>

                                        <div className="social-links">
                                            <h6 className="mb-3">Follow Us</h6>
                                            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                                            <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                                            <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                                            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="contact-form">
                                        <h3 className="mb-4">Send us a message</h3>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">First Name</label>
                                                    <input type="text" className="form-control" placeholder="John" />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" placeholder="Doe" />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" placeholder="john@example.com" />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Subject</label>
                                                <input type="text" className="form-control" placeholder="How can we help?" />
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Message</label>
                                                <textarea className="form-control" rows="5" placeholder="Your message here..."></textarea>
                                            </div>

                                            <button type="submit" className="btn btn-submit text-white">Send Message</button>
                                        </form>

                                        <div className="map-container mt-4">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6260.682237481811!2d71.75175753386962!3d21.08767732228057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be23bc553899057%3A0xb8958443d12b168e!2sJ%20J%20MART%201!5e0!3m2!1sen!2sin!4v1741699182915!5m2!1sen!2sin" width="100%" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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