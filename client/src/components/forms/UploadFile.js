import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

const UploadFile = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const uploadFileAndResize = (e) => {
        let files = e.target.files;
        let allFileUploaded = values.images;
        if (files) {
            console.log("YES GOT IT!" + files.length);
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("IMAGE UPLOAD RESPONSE", res);
                                setLoading(false);
                                allFileUploaded.push(res.data);
                                setValues({
                                    ...values,
                                    images: allFileUploaded,
                                });
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log("Cloudinary Upload Error", err);
                            });
                    },
                    "base64"
                );
            }
        }
    };
    return (
        <>
            <div className="row m-auto">
                {values.images &&
                    values.images.map((image) => (
                        <Avatar
                            key={image.public_id}
                            src={image.url}
                            size={50}
                            className="mx-2 mb-3"
                        />
                    ))}
            </div>
            <div className="row m-auto">
                <label className="btn btn-outline-primary">
                    Choose and Upload File
                    <input
                        type="file"
                        multiple
                        accept="images/*"
                        hidden
                        onChange={uploadFileAndResize}
                    />
                </label>
            </div>
        </>
    );
};

export default UploadFile;
