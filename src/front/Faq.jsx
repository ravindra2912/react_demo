import { use, useEffect, useState } from "react";
import AxiosReq from "../front/AxiosReq";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

function Faq() {
    let [faqs, setFaq] = useState([]);
    let navigate = useNavigate
        let [Loading, setLoading] = useState(false);

    useEffect(() => {
        getFaques();  
    }, [])

    async function getFaques() {
        setLoading(true);
        await AxiosReq(`faqs`, '', 'get', navigate)
            .then((response) => {
                // console.log(response);
                if (response.success) {
                    setFaq(response.data)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    function showLoader() {
            var indents = [];
            for (var i = 1; i <= 4; i++) {
                indents.push(
                    <div className="col-12 mb-3" style={{ border: 'unset' }} key={'faqs-' + i}>
                        <Skeleton height={400} />
                    </div>
                )
            }
            return indents;
        }
    return (
        <>

            <div className="container my-2">
                <h2 className="text-center mb-5">Frequently Asked Questions</h2>
                <div className=" accordion accordion-flush mx-auto faq" id="faqAccordion" >

                    {
                        faqs.length > 0 ? faqs.map((item, index) => {
                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`faqHeading${index}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faqCollapse${index}`} aria-expanded="false" aria-controls={`faqCollapse${index}`}>
                                            <span className="me-2 text-primary">
                                                <i className="bi bi-question-circle-fill"></i>
                                            </span>
                                            {item.question}
                                        </button>
                                    </h2>
                                    <div id={`faqCollapse${index}`} className="accordion-collapse collapse" aria-labelledby={`faqHeading${index}`} data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : Loading ? showLoader() : <p className="text-center">No data</p>
                    }
                    {/* <div className="accordion-item">
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
                    </div> */}

                    

                    
                </div>
            </div>
        </>
    )
}

export default Faq;