import React, { useEffect, useState } from "react";
import AxiosReq from "../AxiosReq";
import { Link, useNavigate } from "react-router-dom";
import ProductListUI from "../component/ProductListUI";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

function debounce(callback, wait) {
    let timeout
    return (...args) => {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => callback.apply(context, args), wait)
    }
}


const Products = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate(); // Initialize navigation
    let [Loading, setLoading] = useState(false);
    let [products, setProducts] = useState([]);
    let [search, setSearch] = useState('');
    let [sortby, setSortby] = useState(1);
    let [nomoreproduct, setNomoreproduct] = useState(false);
    let [limit, setLimit] = useState(12);
    let [skip, setSkip] = useState(0);
    const debouncedSetSearch = debounce((...args) => setSearch(...args), 200);


    useEffect(() => {
        getProducts();
    }, [search, sortby]);



    function handler(type, value) {
        if (type == 'search') {
            if (value.length >= 2 || value.length == 0) {
                setSkip(0)
                setProducts([])
                setNomoreproduct(false);
                debouncedSetSearch(value)
            }
        } else if (type == 'sort') {
            setSkip(0)
            setProducts([])
            setNomoreproduct(false);
            setSortby(value)
        }

    }

    async function getProducts() {
        setLoading(true);
        var data = {
            offset: skip,
            limite: limit,
            sortby:sortby,
            search: search
        }
        await AxiosReq(`producs`, data, 'POST', navigate, token)
            .then((response) => {
                // console.log(response);
                if (response.success) {
                    setProducts([...products, ...response.data])
                    if (response.data == [] || response.data.length < limit) {
                        setNomoreproduct(true);
                    }
                    setSkip((pre) => pre + limit)
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

    return (
        <>
            <section className="container mt-3 home">
                {/* <div className="row">
                    <div className="col-md-12 mb-2">
                        <h1 className="mt-2">Product Catalogue</h1>
                        <p>Explore age-appropriate collection of 500+ toys & books from 70+ top brands for 0-12 years kids, carefully curated by our team</p>
                    </div>
                </div> */}
                <div className="row ">
                    {/* <div className="col-md-3 sidebare">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div>
                                    <span className="collapse-title">SORT BY: </span>
                                    <span className="collapse-value">Recommended</span>
                                </div>
                                <div className="filter-border mt-2"></div>
                                <div className="d-flex">
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={() => handler('sort', 1)} type="radio" name="sortby" id="sortby1" checked={sortby == 1 ? true : false} />
                                        <label className="form-check-label" for="sortby1"> Name : Ascending  </label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={() => handler('sort', 2)} type="radio" name="sortby" id="sortby2" checked={sortby == 2 ? true : false} />
                                        <label className="form-check-label" for="sortby2"> Name : Descending </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <div className="col-12 product mb-4">

                        {/* <div className="input-group mb-3">
                            <input type="text" onChange={(e) => { handler('search', e.target.value) }} className="form-control" placeholder="Search..." aria-label="Text input with dropdown button" />
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">110001</button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div> */}

                        <div className="row product">
                            {
                                products.length > 0 ?
                                    products.map((item, i) => {
                                        return (
                                            <Link to={'/product/' + item.slug} className="col-xl-3 col-md-3 col-sm-4 col-12 mb-3" key={i}>
                                                <ProductListUI item={item} />
                                            </Link>
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

                </div>
            </section>
        </>
    );
}

export default Products;