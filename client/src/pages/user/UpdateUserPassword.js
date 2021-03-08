import React, { useState } from "react";
import UserPageNavbar from "../../components/navbar/UserPageNavbar";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const UpdateUserPassword = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password Updated Successfully!");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (
        <form
            class="d-flex align-items-center flex-column"
            onSubmit={submitHandler}
        >
            <input
                type="password"
                class="form-control text-center w-50"
                id="loginPassword"
                placeholder="New Password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                class="btn btn-primary mt-3"
                type="submit"
                disabled={password.length < 6 || !password || loading}
            >
                Update Now&nbsp;&nbsp;
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil mb-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
            </button>
        </form>
    );

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-1">
                    <UserPageNavbar />
                </div>
                <div class="col mt-5">
                    <h1 className="text-primary text-center">eMedicine</h1>
                    <div className="mt-3">
                        {loading ? (
                            <h4 className="d-flex justify-content-center text-primary">
                                Updating Password Now...
                            </h4>
                        ) : (
                            <h4 className="d-flex justify-content-center">
                                Update Your Password
                            </h4>
                        )}
                        {passwordUpdateForm()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserPassword;
