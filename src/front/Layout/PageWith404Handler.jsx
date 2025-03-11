import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageWith404Handler() {
    // const [showModal, setShowModal] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");



    return (
        <section className="container"  >
            <div style={{ textAlign: "center", marginTop: "200px" }}>
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link to="/">Go Back Home</Link>
            </div>
        </section>
        // <div>

        //     {/* Bootstrap Modal */}
        //     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        //         <Modal.Header closeButton>
        //             <Modal.Title>404 Not Found</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <p>{errorMessage}</p>
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button variant="secondary" onClick={() => setShowModal(false)}>
        //                 Close
        //             </Button>
        //             <Button variant="primary" onClick={() => window.location.href = "/"}>
        //                 Go to Home
        //             </Button>
        //         </Modal.Footer>
        //     </Modal>
        // </div>
    );
}

export default PageWith404Handler;
