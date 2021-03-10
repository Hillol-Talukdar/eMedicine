import axios from "axios";

export const getAllSubCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
};

export const getASubCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);
};

export const removeASubCategory = async (slug, authtoken) => {
    return await axios.delete(
        `${process.env.REACT_APP_API}/sub-category/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const updateASubCategory = async (slug, subCategoryInfo, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/sub-category/${slug}`,
        subCategoryInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const createASubCategory = async (subCategoryInfo, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/sub-category`,
        subCategoryInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};
