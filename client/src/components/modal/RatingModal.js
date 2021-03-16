import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <div onClick={() => setModalVisible(true)}>
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
