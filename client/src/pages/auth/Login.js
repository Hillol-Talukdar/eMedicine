import React, { useState } from "react";
import { Divider } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
    };

    const loginForm = () => (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                class="form-control text-center"
                id="loginEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <input
                type="password"
                class="form-control text-center mt-3"
                id="loginPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div
                class="d-grid gap-2 col-6 mx-auto mt-3"
                data-toggle="tooltip"
                data-placement="top"
                title="Email and Password which contains atleast 6 character will enable this button"
            >
                <button
                    class="btn btn-outline-primary"
                    type="submit"
                    disabled={!email || password.length < 6}
                >
                    Login
                </button>
            </div>
        </form>
    );

    return (
        <div className="d-flex p-5 justify-content-center">
            <div className="row align-items-center">
                <div className="d-flex justify-content-center">
                    <h1 className="text-primary">eMedicine</h1>
                </div>
                <div className="mt-3">
                    <h4 className="d-flex justify-content-center">
                        Login With Your Account
                    </h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    );
};

export default Login;
