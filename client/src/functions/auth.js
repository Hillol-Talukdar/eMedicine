import axios from "axios";

export const userCreateOrUpdate = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/user-create-or-update`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};