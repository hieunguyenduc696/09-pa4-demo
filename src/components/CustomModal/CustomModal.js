import React from "react";
import classes from "./CustomModal.module.less";
import { Modal } from "antd";

export const CustomModal = ({
  title,
  visible,
  footer,
  width,
  onCancel,
  ...props
}) => {
  return (
    <Modal
      centered
      closable={false}
      open={visible}
      title={title}
      width={width}
      footer={footer}
      onCancel={onCancel}
      className={classes["custom-modal"]}
      {...props}
    >
      {props.children}
    </Modal>
  );
};
