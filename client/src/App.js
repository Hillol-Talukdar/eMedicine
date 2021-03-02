import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import RegistrationDone from "./pages/auth/RegistrationDone";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Header from "./components/navbar/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    //to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
            }
        });

        // cleanup
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header />
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
            </Switch>
        </>
    );
};

export default App;
