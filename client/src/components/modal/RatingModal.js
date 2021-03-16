import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ child }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <div onClick={() => setModalVisible(true)}>
                <StarOutlined className="text-warning" />
                <br /> {user ? "Rate The Product" : "Login to Rate"}
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
                {child}
            </Modal>
        </>
    );
};

export default RatingModal;
