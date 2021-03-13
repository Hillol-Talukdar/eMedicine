import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const UploadFile = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const uploadFileAndResize = (e) => {
        let files = e.target.files;
        let allFileUploaded = values.images;
        if (files) {
            // console.log("YES GOT IT!" + files.length);
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
                                // console.log("IMAGE UPLOAD RESPONSE", res);
                                setLoading(false);
                                allFileUploaded.push(res.data);
                                setValues({
                                    ...values,
                                    images: allFileUploaded,
                                });
                            })
                            .catch((err) => {
                                setLoading(false);
                                // console.log("Cloudinary Upload Error", err);
                            });
                    },
                    "base64"
                );
            }
        }
    };
    const handleRemove = (image_id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
                { public_id: image_id },
                {
                    headers: {
                        authtoken: user ? user.token : "",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((img) => {
                    return img.public_id !== image_id;
                });
                setValues({
                    ...values,
                    images: filteredImages,
                });
            })
            .catch((err) => {
                setLoading(false);
                // console.log("Cloudinary Remove Error", err);
            });
    };
    return (
        <>
            <div className="row">
                {values.images &&
                    values.images.map((image) => (
                        <div className="mb-3 mt-1 col-auto">
                            <Badge
                                count="X"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemove(image.public_id)}
                            >
                                <Avatar
                                    key={image.public_id}
                                    src={image.url}
                                    size={60}
                                    shape="circle"
                                />
                            </Badge>
                        </div>
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
