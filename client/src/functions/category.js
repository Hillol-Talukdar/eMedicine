import axios from "axios";

export const getAllCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getACategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const removeACategory = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken,
        },
    });
};

export const updateACategory = async (slug, categoryInfo, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/category/${slug}`,
        categoryInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const createACategory = async (categoryInfo, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/category`,
        categoryInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const getSelectedSubCategory = async (_id) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/category/sub-category/${_id}`
    );
};
