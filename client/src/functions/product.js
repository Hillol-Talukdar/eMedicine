import axios from "axios";

export const createAProduct = async (productInfo, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/product`,
        productInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const getProductByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeAProduct = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });
};

export const getAProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const updateAProduct = async (slug, productInfo, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/product/${slug}`,
        productInfo,
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const getProducts = async (sort, order, page) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        page,
    });

export const getProductsCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const productStar = async (productId, star, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/product/rating/${productId}`,
        { star },
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const getRelated = async (productId) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/product/related/${productId}`
    );
};
