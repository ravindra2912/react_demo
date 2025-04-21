import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import AxiosReq from '../AxiosReq'
import homebanner from '../asset/homebanner.webp'
import { Link, useNavigate } from "react-router-dom";
import ProductListUI from "../component/ProductListUI";
import { useSelector } from "react-redux";
import SEO from "../SEO";

function Home() {
    const token = useSelector((state) => state.auth.token);

    const navigate = useNavigate(); // Initialize navigation
    let [loading, setLoading] = useState(false);
    let [homeDatas, setHomeDatas] = useState([]);

    useEffect(() => {
        getCategory();
        // getProducts();
    }, [])

    function preLoadScript() {
        const indicatorContainer = document.querySelector(".carousel-indicators");
        if (indicatorContainer && indicatorContainer.firstElementChild) {
            indicatorContainer.firstElementChild.click();
        }
    }

    //********************** Product start **********************
    async function getCategory() {
        setLoading(true);

        await AxiosReq(`get-home`, '', 'get', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setHomeDatas(response.data);
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
                preLoadScript(); // preloding script for banner
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
    function showProductLoader() {
        var indents = [];
        for (var i = 1; i <= 4; i++) {
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
            <SEO title={'Home'} description={'Home of woody'} keywords={'woody, wood'} />
            <div className="home ">
                {homeDatas?.homeBanner?.length > 0 ?

                    <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                        <div className="carousel-indicators">
                            {
                                homeDatas.homeBanner.map((item, index) => {
                                    return (
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={'Slide ' + index}></button>
                                    )
                                })
                            }
                            {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                        </div>
                        <div className="carousel-inner">
                            {
                                homeDatas.homeBanner.map((item, index) => {
                                    return (
                                        <div className={`carousel-item banner ${index === 0 ? 'active' : ''}`} key={'banner-' + index}>
                                            <img src={item.image} className="d-block w-100" alt="banner" />
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="carousel-item banner active">
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/006/828/785/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-women-concept-free-vector.jpg' className="d-block w-100" alt="..." />
                            </div> 
                            <div className="carousel-item banner">
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/011/871/820/small_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg' className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item banner">
                                <img src='https://static.vecteezy.com/system/resources/thumbnails/004/707/502/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg' className="d-block w-100" alt="..." />
                            </div> */}
                        </div>
                        {
                            homeDatas?.homeBanner?.length > 1 &&
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        }

                    </div>
                    :
                    loading && <Skeleton height={400} />

                }
                {/* <div className="banner">
                    <img src={homebanner} />
                </div> */}
                <div className="container">
                    <div className="category row my-4 mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-start fw-semibold">Categories</h2>
                            <Link to={'/products'} className="">View All <i className="bi bi-arrow-right"></i></Link>
                        </div>
                        {
                            loading == true ? showCategoryLoader() :
                                homeDatas?.category?.length > 0 ?
                                    homeDatas.category.map((item, index) => {
                                        return (
                                            <div key={index} className="col-sm-2 col-6 mt-3" >
                                                <div className="card border-0"
                                                // style={{ background: color, borderColor:color }}
                                                >
                                                    <img src={item.imageurl} alt="category" />
                                                    <p className="mt-3">{item.name}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                    : ''
                        }
                    </div>

                    <div className="product row my-4 mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-start fw-semibold mt-4 pb-2">Latest Products</h2>
                            <Link to={'/products'} className="">View All <i className="bi bi-arrow-right"></i></Link>
                        </div>
                        {
                            loading == true ? showProductLoader() :
                                homeDatas?.product?.length > 0 ?
                                    homeDatas.product.map((item, index) => {
                                        return (<div className="col-xl-3 col-md-3 col-sm-4 col-6 mb-3" key={index}>
                                            <ProductListUI item={item} />
                                        </div>
                                        )
                                    })
                                    : ''
                        }
                    </div>

                    {
                        homeDatas?.fevouriteProduct?.length > 0 ?
                            <div className="product row my-4 mt-5">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="text-start fw-semibold mt-4 pb-2">Your wishlist</h2>
                                    <Link to={'/account/wishlist'} className="">View All <i className="bi bi-arrow-right"></i></Link>
                                </div>
                                {
                                    homeDatas.fevouriteProduct.map((item, index) => {
                                        return (<div className="col-xl-3 col-md-3 col-sm-4 col-6 mb-3" key={index}>
                                            <ProductListUI item={item} />
                                        </div>
                                        )
                                    })
                                }

                            </div>
                            : ''
                    }
                </div>

            </div>
        </>
    );
}

export default Home;