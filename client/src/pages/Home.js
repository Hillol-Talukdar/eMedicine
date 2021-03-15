import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import FeatureProducts from "../components/home_components/FeatureProducts";
import BestSellers from "../components/home_components/BestSellers";
const Home = () => {
    return (
        <div>
            <div className="jumbotron text-center bg-secondary">
                <div className="container pb-1 pt-3">
                    <h1 className="text-light">
                        <Jumbotron
                            text={[
                                "Welcome To eMedicine!",
                                "Get The Best Deal!",
                                "Save up to 80% instantly!",
                            ]}
                        />
                    </h1>
                </div>
            </div>
            <h3 className="text-light text-center pt-2 pb-3 mt-3 mb-3 jumbotron bg-secondary">
                Feature Products
            </h3>
            <FeatureProducts />

            <h3 className="text-light text-center pt-3 pb-3 mt-4 mb-3 jumbotron bg-secondary">
                Best Sellers
            </h3>
            <BestSellers />
            <br />
        </div>
    );
};

export default Home;
