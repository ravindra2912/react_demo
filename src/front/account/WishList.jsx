import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import { Modal } from "react-bootstrap";
import ProductListUI from "../component/ProductListUI";

function WishList() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [Loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [nomoreproduct, setNomoreproduct] = useState(false);
    let [limit, setLimit] = useState(12);
    let [skip, setSkip] = useState(0);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        setLoading(true);
        var data = {
            offset: skip,
            limite: limit,
        }
        await AxiosReq(`wishlist_list`, data, 'POST', navigate, token)
            .then((response) => {
                if (response.success) {
                    setProducts([...products, ...response.data])
                    if (response.data == [] || response.data.length < limit) {
                        setNomoreproduct(true);
                    }
                    setSkip((pre) => pre + limit)
                }else{
                    setNomoreproduct(true);
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

    async function removeToFavourite(id) {
        await AxiosReq(`add_to_wishlist`, { product_id: id }, 'POST', navigate, token)
            .then((response) => {
                if (response.success) {
                    //remove from favourite
                    setProducts(products.filter((item) => item.id != id))
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                toast.error('Somthing wron while add to cart')
                console.log(error);

            }).finally(() => {
            });
    }

    return (
        <>
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Profile</h5>
            </div>
            <div className="card-body">
                <div className="row product">
                    {
                        products.length > 0 ?
                            products.map((item, i) => {
                                return (
                                    <div className="col-xl-4 col-md-4 col-sm-6 col-12 mb-3" key={i}>
                                        <ProductListUI item={item} token={token} favouriteProduct={(e) => removeToFavourite(e)} />
                                    </div>
                                )
                            })
                            : !Loading ? <p className="text-center">Product Not found !</p> : null
                    }
                    {
                        Loading ? showProductLoader() :
                            (
                                nomoreproduct ? null :
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={() => getProducts()} className="btn btn-primary btn-sm mt-3">Load More</button>
                                        </div>
                                    </div>
                            )
                    }
                </div>

            </div>


        </>
    )
}

export default WishList