import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const SearchForm = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <div className="d-flex">
                <input
                    onChange={handleChange}
                    type="search"
                    value={text}
                    className="form-control mr-sm-2 mt-2 form-control-sm"
                    placeholder="Search"
                />
                <SearchOutlined
                    onClick={handleSubmit}
                    style={{
                        cursor: "pointer",
                        fontSize: "23px",
                        marginLeft: "10px",
                        marginTop: "10px",
                    }}
                />
            </div>
        </form>
    );
};

export default SearchForm;
