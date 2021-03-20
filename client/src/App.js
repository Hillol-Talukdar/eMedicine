import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SideDrawer from "./components/drawer/SideDrawer";
import Register from "./pages/auth/Register";
import RegistrationDone from "./pages/auth/RegistrationDone";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Header from "./components/navbar/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/auth/ResetPassword";
import History from "./pages/user/History";
import UpdateUserPassword from "./pages/user/UpdateUserPassword";
import Wishlist from "./pages/user/Wishlist";
import AdminRoute from "./components/routes/AdminRoute";
import UserPrivateRoute from "./components/routes/UserPrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/sub-category/CreateSubCategory";
import UpdateSubCategory from "./pages/admin/sub-category/UpdateSubCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/Allproducts";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/subCategory/SubCategoryHome";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
    const dispatch = useDispatch();

    //to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch();
            }
        });

        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <Header />
            <SideDrawer />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                    exact
                    path="/register/done"
                    component={RegistrationDone}
                />
                <Route exact path="/reset/password" component={ResetPassword} />
                <UserPrivateRoute
                    exact
                    path="/user/history"
                    component={History}
                />
                <UserPrivateRoute
                    exact
                    path="/user/password"
                    component={UpdateUserPassword}
                />
                <UserPrivateRoute
                    exact
                    path="/user/wishlist"
                    component={Wishlist}
                />
                <AdminRoute
                    exact
                    path="/admin/dashboard"
                    component={AdminDashboard}
                />
                <AdminRoute
                    exact
                    path="/admin/category"
                    component={CreateCategory}
                />
                <AdminRoute
                    exact
                    path="/admin/category/:slug"
                    component={UpdateCategory}
                />
                <AdminRoute
                    exact
                    path="/admin/sub-category"
                    component={CreateSubCategory}
                />
                <AdminRoute
                    exact
                    path="/admin/sub-category/:slug"
                    component={UpdateSubCategory}
                />
                <AdminRoute
                    exact
                    path="/admin/product"
                    component={CreateProduct}
                />
                <AdminRoute
                    exact
                    path="/admin/products"
                    component={AllProducts}
                />
                <AdminRoute
                    exact
                    path="/admin/product/:slug"
                    component={UpdateProduct}
                />
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/category/:slug" component={CategoryHome} />
                <Route
                    exact
                    path="/sub-category/:slug"
                    component={SubCategoryHome}
                />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
            </Switch>
        </>
    );
};

export default App;
