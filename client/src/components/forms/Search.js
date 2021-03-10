import React from "react";
const Search = ({ keyword, setKeyword, titleText }) => {
    const handleSearchBox = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <div className="row m-auto">
            <h4 className="col text-center mt-2">{titleText}</h4>
            <input
                type="search"
                className="form-control w-50 m-auto"
                placeholder="Search"
                value={keyword}
                onChange={handleSearchBox}
            />
        </div>
    );
};
export default Search;
