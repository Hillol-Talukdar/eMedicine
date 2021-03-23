import React, { useState, useEffect } from "react";
import UserPageNavbar from "../../components/navbar/UserPageNavbar";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <UserPageNavbar />
                </div>
                <div class="col">
                    <div className=" text-center mb-4 mt-4">
                        <h4 className="text-dark text-center">Your Wishlist</h4>

                        {/* <h4 className="text-primary">eMedicine</h4> */}
                    </div>
                    <div className="d-flex justify-content-between row">
                        {wishlist.map((p) => (
                            <div
                                key={p._id}
                                className="d-flex justify-content-between align-items-center alert alert-secondary text-dark w-75 mx-auto"
                                // style={{ width: "40rem" }}
                            >
                                <Link to={`/product/${p.slug}`}>
                                    <h6 className="mt-1 text-primary">
                                        {p.title}
                                    </h6>
                                </Link>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="35"
                                    fill="currentColor"
                                    class="bi bi-trash text-danger btn btn-sm"
                                    viewBox="0 0 16 16"
                                    onClick={() => handleRemove(p._id)}
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
