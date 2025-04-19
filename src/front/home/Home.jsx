import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import AxiosReq from '../AxiosReq'
import homebanner from '../asset/homebanner.webp'
import { Link, useNavigate } from "react-router-dom";
import ProductListUI from "../component/ProductListUI";
import { useSelector } from "react-redux";

function Home() {
    const token = useSelector((state) => state.auth.token);

    const navigate = useNavigate(); // Initialize navigation
    let [CatLoading, setCatLoading] = useState(false);
    let [categories, setCategories] = useState([]);
    let [productLoading, setProductLoading] = useState(false);
    let [products, setProducts] = useState([]);

    useEffect(() => {
        getCategory();
        // getProducts();
        preLoadScript()
    }, [])

    function preLoadScript() {
        const indicatorContainer = document.querySelector(".carousel-indicators");
        if (indicatorContainer && indicatorContainer.firstElementChild) {
            indicatorContainer.firstElementChild.click();
        }
    }

    //********************** Product start **********************
    async function getCategory() {
        setCatLoading(true);
        var data = {
            offset: 0,
            limite: 12,
        }
        await AxiosReq(`categories`, data, 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setCategories(response.data);
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
        var data = {
            offset: 0,
            limite: 8,
            sortby: 1
        }
        await AxiosReq(`producs`, data, 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setProducts(response.data);
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
            <div className="home ">
                <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item banner active">
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/006/828/785/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-women-concept-free-vector.jpg' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item banner">
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item banner">
                            <img src='https://static.vecteezy.com/system/resources/thumbnails/004/707/502/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg' className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* <div className="banner">
                    <img src={homebanner} />
                </div> */}
                <div className="container">
                    <div className="category row my-4 mt-5">
                        <h2 className="text-start fw-semibold">Categories</h2>
                        {
                            CatLoading == true ? showCategoryLoader() :
                                categories.length != 0 ?
                                    categories.map((item, index) => {
                                        return (
                                            <div key={index} className="col-sm-2 col-6 mt-3" >
                                                <div className="card border-0"
                                                // style={{ background: color, borderColor:color }}
                                                >
                                                    <img src={item.image} alt="category" />
                                                    <p className="mt-3">{item.name}</p>
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
                                        return (<Link to={'/product/' + item.slug} className="col-xl-3 col-md-3 col-sm-4 col-12 mb-3" key={index}>
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