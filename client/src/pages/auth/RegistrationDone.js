import { Divider } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegistrationDone = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForSignIn"));
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!password && !email) {
            toast.warning(
                "Please enter email and password to complete the registration"
            );
            return;
        }
        if (!email) {
            toast.warning("Please enter email to complete the registration");
            return;
        }
        if (!password) {
            toast.warning("Please enter password to complete the registration");
            return;
        }
        if (password.length < 6) {
            toast.warning("Password must be contain atleast 6 characters");
            return;
        }
        try {
            const status = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            if (status.user.emailVerified) {
                //getting current user and token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                //deleting email
                window.localStorage.removeItem("emailForSignIn");
                toast.success("Registration Done! Welcome to eMedicine");
                //redirecting to the expected page
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const registrationDoneForm = () => (
        <form onSubmit={submitHandler}>
            <input
                type="email"
                class="form-control text-center"
                id="regEmail"
                value={email}
                disabled
            />
            <input
                type="password"
                class="form-control text-center mt-2"
                id="regPass"
                placeholder="Password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
            />
            <div class="d-grid gap-2 col-6 mx-auto mt-3">
                <button class="btn btn-outline-primary" type="submit">
                    Done
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
                        Complete Your Registration
                    </h4>
                    {registrationDoneForm()}
                </div>
            </div>
        </div>
    );
};

export default RegistrationDone;