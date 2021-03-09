import React from "react";

const Categoryform = ({ submitHandler, name, setName, loading, btnName }) => (
    <form
        class="d-flex align-items-center flex-column"
        onSubmit={submitHandler}
    >
        <input
            type="text"
            class="form-control text-center w-50"
            placeholder="Category Name"
            disabled={loading}
            value={name}
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
        />

        <button
            class="btn btn-primary mt-3"
            type="submit"
            disabled={loading || name.length < 2}
            title="Name which contains atleast 2 character will enable this button"
        >
            {btnName}&nbsp;&nbsp;
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square-fill mb-1"
                viewBox="0 0 16 16"
            >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg>
        </button>
    </form>
);

export default Categoryform;
