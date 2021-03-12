import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadFile = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const uploadFileAndResize = (e) => {
        let files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        //
                    },
                    "base54"
                );
            }
        }
    };
    return (
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
    );
};

export default UploadFile;
