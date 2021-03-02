import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import RegistrationDone from "./pages/auth/RegistrationDone";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Header from "./components/navbar/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
