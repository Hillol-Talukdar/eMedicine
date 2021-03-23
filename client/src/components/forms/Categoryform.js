import React from "react";

const Categoryform = ({
    submitHandler,
    name,
    setName,
    loading,
    btnName,
    btnIcon,
    placeholder,
}) => (
    <form
    className="d-flex align-items-center flex-column"
        onSubmit={submitHandler}
    >
        <input
            type="text"
            class="form-control text-center w-50"
            placeholder={placeholder}
            disabled={loading}
            value={name}
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
        />

        <div
            className="mx-auto mt-3"
            data-toggle="tooltip"
            data-placement="top"
            title="Name which contains atleast 2 character will enable this button"
        >
            <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
            >
                {btnName}&nbsp;&nbsp;{btnIcon}
            </button>
        </div>
    </form>
);

export default Categoryform;
