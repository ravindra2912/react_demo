import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import Skeleton from "react-loading-skeleton";
import ProductListUI from "../component/ProductListUI";
import { v4 as uuidv4 } from "uuid";
import PageWith404Handler from "../Layout/PageWith404Handler";
import toast from 'react-hot-toast';
import ProductImageZoom from "./ProductImageZoom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, emptyFromCart } from "../services/redux/slices/CartSlice";
// import { addToCart } from "../services/redux/Store";

function ProductDetails(props) {
    const token = useSelector((state) => state.auth.token);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate(); // Initialize navigation
    const [is404, setIs404] = useState(false);
    const [relatedProductId, setRelatedProductId] = useState('');
    const [product, setProduct] = useState(Array());
    const [loading, setLoading] = useState(false);
    // cart variable
    const [quantity, setQuantity] = useState(1);
    const [cartLoading, setCartLoading] = useState(false);

    var { slug } = useParams();

    useEffect(() => {
        // dispatch(emptyFromCart());
        if (relatedProductId != '')
            slug = relatedProductId

        getProductDetailds()
    }, [relatedProductId])

    async function getProductDetailds() {
        setLoading(true);
        window.scrollTo(0, 0);
        await AxiosReq(`product_details`, { slug: slug }, 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setProduct(response.data);
                } else {
                    if (response.status == 404)
                        setIs404(true)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }


    function showProductLoader() {
        var indents = [];
        for (var i = 1; i <= 4; i++) {
            indents.push(
                <div className="col-xl-3 col-md-3 col-sm-4 col-12 mb-3" style={{ border: 'unset' }} key={'homeproduct-' + i}>
                    <Skeleton height={400} />
                </div>
            )
        }
        return indents;
    }

    function showProductImagesLoader() {
        var indents = [];
        for (var i = 1; i <= 4; i++) {
            indents.push(
                <Skeleton height={100} width={100} className="me-3" />
            )
        }
        return indents;
    }

    // ************** Cart *************************//

    async function addToUserCart() {
        // const data = { product_id: product.id, quantity: quantity, price: product.price, title: product.title, thumbnail: product.imageurl }
        // dispatch(addToCart(data));
        // toast.success('Product Added Successfully in your cart.');

        if (token == null || token == undefined || token == '') {
            toast.error('Please login to add product in your cart')
            navigate('/login')
            return false;
        }

        setCartLoading(true)
        const data = {
            product_id: product.id,
            quantity: quantity
        };

        await AxiosReq(`add_to_cart`, data, 'POST', navigate, token)
            .then((response) => {
                if (response.success) {
                    dispatch(addToCart(response.data.cartData));
                    toast.success('Product Added Successfully in your cart.')
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                toast.error('Somthing wron while add to cart')
                console.log(error);

            }).finally(() => {
                setCartLoading(false)
            });
    }

    // Handle manual input change
    const handleInputChange = (event) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    };


    return (
        < >
            {
                is404 ? <PageWith404Handler /> :
                    <section className="container product-details">
                        <div className="row">
                            <div className="col-xl-5 col-md-5 col-12 text-center">
                                <div>
                                    {
                                        loading ? <Skeleton height={300} /> :
                                            // <ProductImageZoom img={product.thumbnail} />
                                            <img className="productimg" src={product.imageurl} />
                                    }
                                </div>
                                <div className="product_img_list py-3" key={uuidv4}>
                                    {!loading ? (
                                        product?.images_data?.length > 0 ? (
                                            product.images_data.map((item, index) => (
                                                <img
                                                    key={`pimg-${index}`}
                                                    src={item.imageurl}
                                                    alt={`Product image ${index + 1}`}
                                                    onClick={() => setProduct(prevProduct => ({ ...prevProduct, imageurl: item.imageurl }))}
                                                />
                                            ))
                                        ) : null
                                    ) : (
                                        showProductImagesLoader()
                                    )}
                                </div>

                            </div>
                            <div className="col-xl-7 col-md-7 col-12">
                                {loading ? <Skeleton height={25} width={200} /> : <h5>{product.brand}</h5>}
                                {loading ? <Skeleton height={30} width={300} className="mt-2" /> : <p className="h2 mt-3 fw-semibold"><span>&#8377;{product.price}</span><span className="ms-2 text-muted text-decoration-line-through">&#8377;{product.price}</span></p>}
                                {loading ? <Skeleton height={30} width={300} className="mt-2" /> : <h1>{product.name}</h1>}
                                {loading ? <Skeleton height={100} className="mt-3" /> : <p className="mt-3">{product.short_description}</p>}

                                <div className="d-flex align-items-center gap-2 mt-4">
                                    {loading ? <Skeleton height={80} width={400} /> : <>
                                        {/* Minus Button */}
                                        < button className="btn btn-outline-primary btn-dash" onClick={() => setQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1))}>
                                            <i className="bi bi-dash"></i> {/* Bootstrap icon */}
                                        </button>

                                        {/* Quantity Input */}
                                        <input
                                            type="text"
                                            className="form-control text-center cart-input"
                                            value={quantity}
                                            onChange={handleInputChange}
                                            
                                        />

                                        {/* Plus Button */}
                                        <button className="btn btn-outline-primary btn-plus" onClick={() => setQuantity(prevQty => prevQty + 1)}>
                                            <i className="bi bi-plus"></i> {/* Bootstrap icon */}
                                        </button>

                                        {/* Add to Cart Button */}
                                        <button className="btn btn-primary" disabled={cartLoading} onClick={(e) => addToUserCart(product.id, 2)}>
                                            {cartLoading ? 'Adding ...' : 'Add to Cart'}
                                        </button>

                                        {/* Go to cart Button */}
                                        <button className="btn btn-danger" disabled={cartLoading} onClick={(e) => navigate('/cart')}>
                                            {cartLoading ? 'Adding ...' : 'Go to Cart'}
                                        </button>
                                    </>
                                    }
                                </div>

                            </div>
                        </div>

                        <div className="row mt-5 mb-3">
                            <h4>Product details</h4>
                            {loading ? <Skeleton height={100} /> :
                                <div
                                    className="editor-output"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            }
                        </div>

                        {
                            loading || product?.related_products?.length > 0 ?

                                <div className="row product">
                                    <div className="col-12 mb-3">
                                        <h3>Related Products</h3>
                                    </div>
                                    {!loading ?
                                        product.related_products.length > 0 ?
                                            product.related_products.map((item, i) => {
                                                return (
                                                    <Link to={'/product/' + item.slug} onClick={() => setRelatedProductId(item.slug)} className="col-xl-3 col-md-3 col-sm-4 col-12 mb-3" key={'relate' + i}>
                                                        <ProductListUI item={item} />
                                                    </Link>
                                                )
                                            })
                                            : <p className="text-center">Not Product</p>
                                        : showProductLoader()
                                    }
                                </div>
                                : null
                        }
                    </section >
            }
        </>
    );
}

export default ProductDetails