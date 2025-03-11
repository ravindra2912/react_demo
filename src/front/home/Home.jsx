import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import category from '../../assets/category.png'
import AxiosReq from '../AxiosReq'
import homebanner from '../asset/homebanner.webp'
import { Link, useNavigate } from "react-router-dom";
import ProductListUI from "../component/ProductListUI";

function Home() {
    const navigate = useNavigate(); // Initialize navigation
    let [CatLoading, setCatLoading] = useState(false);
    let [categories, setCategories] = useState([]);
    let [productLoading, setProductLoading] = useState(false);
    let [products, setProducts] = useState([]);

    useEffect(() => {
        getCategory();
        // getProducts();
    }, [])

    //********************** Product start **********************
    async function getCategory() {
        setCatLoading(true);
        await AxiosReq(`products/search?q=&limit=12&order=asc`, '', 'GET', navigate)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setCategories(response.data.products);
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setCatLoading(false);
                getProducts()
            });
    }

    function showCategoryLoader() {
        var indents = [];
        for (var i = 1; i <= 12; i++) {
            indents.push(
                <div className='card col-sm-2 col-12 mt-3' style={{ border: 'unset' }} key={'mywork-' + i}>
                    <Skeleton height={210} />
                </div>
            )
        }
        return indents;
    }

    //********************** Product end **********************

    //********************** Product start **********************
    async function getProducts() {
        setProductLoading(true);
        await AxiosReq(`products/search?q=&limit=8&skip=12&order=asc`, '', 'GET', navigate)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setProducts(response.data.products);
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setProductLoading(false);
            });
    }
    function showProductLoader() {
        var indents = [];
        for (var i = 1; i <= 8; i++) {
            indents.push(
                <div className='col-xl-3 col-md-3 col-sm-4 col-12 mt-3' style={{ border: 'unset' }} key={'homeproduct-' + i}>
                    <Skeleton height={350} />
                </div>
            )
        }
        return indents;
    }
    //********************** Product end ********************

    return (
        <>
            <div className="home">
                <div className="banner">
                    <img src={homebanner} />
                </div>
                <div className="container">
                    <div className="category row my-4 mt-5">
                        <h2 className="text-start fw-semibold">Categories</h2>
                        {
                            CatLoading == true ? showCategoryLoader() :
                                categories.length != 0 ?
                                    categories.map((item, index) => {
                                        return (
                                            <div key={index} className="col-sm-2 col-6 mt-3" >
                                                <div className="card"
                                                // style={{ background: color, borderColor:color }}
                                                >
                                                    <img src={item.thumbnail} alt="category" />
                                                    <p className="mt-3">{item.title}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : ''
                        }
                    </div>

                    <div className="product row my-4 mt-5">
                        <div>
                            <h2 className="text-start fw-semibold mt-4 pb-2">Latest Products</h2>
                        </div>
                        {
                            productLoading == true ? showProductLoader() :
                                products.length != 0 ?
                                    products.map((item, index) => {
                                        return (<Link to={'/product/' + item.id} className="col-xl-3 col-md-3 col-sm-4 col-12 mb-3" key={index}>
                                            <ProductListUI item={item} />
                                        </Link>
                                        )
                                    })
                                    : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;