import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();
    let { slug } = useParams();

    const handleRatingModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push({
                pathname: "/login",
                state: { from: `/product/${slug}` },
            });
        }
    };
    return (
        <>
            <div onClick={handleRatingModal}>
                <StarOutlined
                    style={{ fontSize: "21px" }}
                    className="text-warning"
                />
                <br />{" "}
                {user ? (
                    <p className="h6 small mt-1">Rate This Item</p>
                ) : (
                    <p className="h6 small mt-1">Login to Rate</p>
                )}
            </div>
            <Modal
                title="Rate The Product"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success("Thanks For Your Valuable Review!");
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;
