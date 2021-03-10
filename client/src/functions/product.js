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
