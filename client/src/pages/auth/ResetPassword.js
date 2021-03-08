import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ResetPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const googleConfig = {
            url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, googleConfig)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    const resetForm = () => (
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

            <div
                class="d-grid gap-2 col-6 mx-auto mt-3"
                data-toggle="tooltip"
                data-placement="top"
                title="Entering your email will make this button enabled"
            >
                <button class="btn btn-primary" type="submit" disabled={!email}>
                    Reset
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
                    {loading ? (
                        <h4 className="d-flex justify-content-center text-primary">
                            Loading...
                        </h4>
                    ) : (
                        <h4 className="d-flex justify-content-center">
                            Reset Password
                        </h4>
                    )}
                    {resetForm()}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
