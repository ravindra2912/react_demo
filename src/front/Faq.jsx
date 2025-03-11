function Faq() {
    return (
        <>
            <div className="container accordion accordion-flush mx-auto faq"  id="faqAccordion" >
                <div className="accordion-item">
                    <h2 className="accordion-header" id="faqHeading1">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
                            <span className="me-2 text-primary">
                                <i className="bi bi-question-circle-fill"></i>
                            </span>
                            What is the return policy?
                        </button>
                    </h2>
                    <div id="faqCollapse1" className="accordion-collapse collapse show" aria-labelledby="faqHeading1" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You can return most items within 30 days of delivery for a full refund. Some exceptions may apply, please refer to our full return policy for more details.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="faqHeading2">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
                            <span className="me-2 text-primary">
                                <i className="bi bi-question-circle-fill"></i>
                            </span>
                            How do I track my order?
                        </button>
                    </h2>
                    <div id="faqCollapse2" className="accordion-collapse collapse" aria-labelledby="faqHeading2" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You can track your order by visiting the "Order Tracking" page on our website and entering your order number and email address.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="faqHeading3">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
                            <span className="me-2 text-primary">
                                <i className="bi bi-question-circle-fill"></i>
                            </span>
                            Do you offer international shipping?
                        </button>
                    </h2>
                    <div id="faqCollapse3" className="accordion-collapse collapse" aria-labelledby="faqHeading3" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            Yes, we offer international shipping to most countries around the world. Shipping rates and delivery times may vary depending on your location.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="faqHeading4">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
                            <span className="me-2 text-primary">
                                <i className="bi bi-question-circle-fill"></i>
                            </span>
                            How do I contact customer support?
                        </button>
                    </h2>
                    <div id="faqCollapse4" className="accordion-collapse collapse" aria-labelledby="faqHeading4" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            You can contact our customer support team by email at support@example.com or by phone at 555-123-4567 during regular business hours.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq;