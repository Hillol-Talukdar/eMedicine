import React from "react";

const UploadFile = () => {
    const uploadFileAndResize = e() => {
        
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
