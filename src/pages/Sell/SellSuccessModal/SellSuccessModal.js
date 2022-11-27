import React from "react";
import classes from "./SellSuccessModal.module.less";
import { CustomModal } from "../../../components";
import { Image } from "antd";
import { SUCCESS } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { RootPaths } from "../../../constant/paths";

export const SellSuccessModal = ({
  visible,
  handleCloseModal,
  handleReset,
}) => {
  const navigate = useNavigate();

  const onCancel = () => {
    handleCloseModal();
    navigate(RootPaths.HOME);
  };

  const onOk = () => {
    handleCloseModal();
    handleReset();
  };

  return (
    <CustomModal
      visible={visible}
      title={null}
      width={432}
      destroyOnClose
      cancelText={"Trở về trang chủ"}
      onCancel={onCancel}
      okText={"Tiếp tục đăng bán"}
      onOk={onOk}
    >
      <div className={classes["approve-success-modal"]}>
        <Image src={SUCCESS} preview={false} loading="lazy" />
        <p>
          Đăng bán sản phẩm thành công. Vui lòng chờ đợi để admin duyệt sản
          phẩm.
        </p>
      </div>
    </CustomModal>
  );
};
