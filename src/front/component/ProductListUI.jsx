import { Link } from "react-router-dom";


function ProductListUI({ item }) {
    return (
        <div className="card">
            <img className="produt-image" loading="lazy" src={item.imageurl} alt={item.name} />
            <div className="card-body">
                <div className="mb-3">
                    <span className="me-2 discount_price">&#8377;{item.price}</span>
                    <span className="price">${item.price}</span>
                </div>

                <h5 className="product-name ">{item.name}</h5>
                {/* <p className="product-text">{item.description}</p> */}
            </div>
        </div>
    )
}

export default ProductListUI;