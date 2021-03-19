import React, { useState, useEffect } from "react";
import { getProductByCount, fetchProductsByFilter } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import UserProductCard from "../components/cards/UserProductCard";
import { Menu, Slider, Checkbox } from "antd";
import { getAllCategories } from "../functions/category";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [okay, setOkay] = useState(false);
    const [categories, setCategories] = useState([]);

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        //fetch categories
        getAllCategories().then((res) => setCategories(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    // load products by Default on Laod
    const loadAllProducts = () => {
        setLoading(true);
        getProductByCount(12)
            .then((res) => {
                //console.log(res.data)
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                // console.log(err);
                setLoading(false);
            });
    };

    // load products on user Search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // load products on Price Range
    useEffect(() => {
        fetchProducts({ price });
    }, [okay]);

    const handlePriceSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice(value);
        setTimeout(() => {
            setOkay(!okay);
        }, 300);
    };

    // Load products base on Category
    // showing categories ina a list of checkbox
    const showCategories = () =>
        categories.map((cat) => (
            <div key={cat._id}>
                <Checkbox
                    className="pb-2 pl-4 pr-4"
                    value={cat._id}
                    name="category"
                >
                    {cat.name}
                    <br />
                </Checkbox>
            </div>
        ));

    return (
        <div className="container.fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="text-center pt-2 pb-2 mt-3 mb-3 jumbotron">
                        Search
                    </h4>
                    <Menu defaultOpenKeys={["1", "2"]} mode="inline">
                        {/* Price */}
                        <Menu.SubMenu
                            key="1"
                            title={
                                <span className="h6 small">Price Range</span>
                            }
                        >
                            <div>
                                <Slider
                                    tipFormatter={(val) => `৳${val}`}
                                    range
                                    value={price}
                                    onChange={handlePriceSlider}
                                    max="3000"
                                    style={{
                                        marginLeft: "30px",
                                        marginRight: "30px",
                                    }}
                                />
                            </div>
                        </Menu.SubMenu>

                        {/* Categories */}
                        <Menu.SubMenu
                            key="2"
                            title={<span className="h6 small">Categories</span>}
                        >
                            <div
                                style={{
                                    marginTop: "10px",
                                    marginLeft: "22px",
                                }}
                            >
                                {showCategories()}
                            </div>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <div className="col-md-9">
                    {loading ? (
                        <h4 className="ml-auto text-primary">Loading.....</h4>
                    ) : (
                        <h3 className="text-light text-center pt-2 pb-3 mt-3 mb-3 jumbotron bg-secondary">
                            Products
                        </h3>
                    )}
                    {products.length < 1 && <p>No Products Found!</p>}
                    <div className="row">
                        {products.map((pr) => (
                            <div key={pr._id} className="col-md-4 mb-2">
                                <UserProductCard product={pr} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
