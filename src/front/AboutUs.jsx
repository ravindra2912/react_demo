function AboutUs() {
    return (
        <>
            <section className="about-us py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="font-weight-bold mb-4">About Our Company</h2>
                            <p className="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel. Donec vel mauris quam.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="text-primary">Our Mission</h5>
                                    <ul className="list-unstyled">
                                        <li><i className="bi bi-check-circle me-2 text-primary"></i>Innovative Solutions</li>
                                        <li><i className="bi bi-check-circle me-2 text-primary"></i>Customer Satisfaction</li>
                                        <li><i className="bi bi-check-circle me-2 text-primary"></i>Sustainable Practices</li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="text-primary">Our Vision</h5>
                                    <ul className="list-unstyled">
                                        <li><i className="bi bi-bullseye me-2 text-primary"></i>Global Reach</li>
                                        <li><i className="bi bi-bullseye me-2 text-primary"></i>Industry Leadership</li>
                                        <li><i className="bi bi-bullseye me-2 text-primary"></i>Continuous Growth</li>
                                    </ul>
                                </div>
                            </div>
                            <a href="#" className="btn btn-primary mt-4">Learn More</a>
                        </div>
                        <div className="col-md-6">
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wYW55fGVufDB8MHx8fDE3MjEyMTE5MDZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="About Us" className="img-fluid rounded shadow" />
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi bi-people fs-1 text-primary mb-2"></i>
                                <h2 className="fw-bold">500+</h2>
                                <p className="text-muted">Clients</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi bi-briefcase fs-1 text-primary mb-2"></i>
                                <h2 className="fw-bold">1000+</h2>
                                <p className="text-muted">Projects</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi bi-trophy fs-1 text-primary mb-2"></i>
                                <h2 className="fw-bold">50+</h2>
                                <p className="text-muted">Awards</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-4">
                            <div className="text-center">
                                <i className="bi bi-globe fs-1 text-primary mb-2"></i>
                                <h2 className="fw-bold">20+</h2>
                                <p className="text-muted">Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs;