import React from "react";
const Search = ({ keyword, setKeyword, titleText }) => {
    const handleSearchBox = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <div className="row m-auto">
            <h3 className="col text-center">{titleText}</h3>
            <input
                type="search"
                className="form-control w-50"
                placeholder="Search"
                value={keyword}
                onChange={handleSearchBox}
            />
        </div>
    );
};
export default Search;
