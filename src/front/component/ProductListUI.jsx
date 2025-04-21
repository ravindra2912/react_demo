import { Link } from "react-router-dom";


function ProductListUI({ item, favouriteProduct, token }, props) {
    function hendler(slug){
        if(props.setRelatedProductId != undefined){
            setRelatedProductId(slug)
        }
        
    }
    return (
        <div className="card">
            {token ? (
                <div className="d-flex position-absolute end-0 me-3 z-1" onClick={(e) => { favouriteProduct(item.id) }}>
                    {item.is_fevourit ?
                        <i className="bi bi-heart-fill h6"></i> :
                        <i className="bi bi-heart h6"></i>
                    }
                </div>
            ) : ''}
            <Link to={'/product/' + item.slug} onClick={() =>hendler(item.slug) }>
                <img className="produt-image" loading="lazy" src={item.imageurl} alt={item.name} />
                <div className="card-body">
                    <div className="mb-3">
                        <span className="me-2 discount_price">&#8377;{item.price}</span>
                        <span className="price">${item.price}</span>
                    </div>

                    <h5 className="product-name ">{item.name}</h5>
                    {/* <p className="product-text">{item.description}</p> */}
                </div>
            </Link>
        </div>
    )
}

export default ProductListUI;