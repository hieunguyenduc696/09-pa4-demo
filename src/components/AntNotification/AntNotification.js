import React from "react";
import classes from "./AntNotification.module.less";
import clsx from "clsx";
import {
  CheckCircleFilled,
  CloseOutlined,
  InfoCircleFilled,
  WarningFilled,
} from "@ant-design/icons";
import { notification } from "antd";

const getNotificationConfig = ({
  notificationType,
  message,
  customProps = {},
}) => {
  switch (notificationType) {
    case "Error":
      return {
        className: clsx(classes.notitication, classes.error),
        message: <span className={classes["notification-msg"]}>{message}</span>,
        icon: <InfoCircleFilled />,
        duration: 3,
        closeIcon: <CloseOutlined />,
        placement: "topRight",
        ...customProps,
      };
    case "Success":
      return {
        className: classes.notification,
        message: <span className={classes["notification-msg"]}>{message}</span>,
        icon: <CheckCircleFilled />,
        duration: 3,
        closeIcon: <CloseOutlined />,
        placement: "topRight",
        ...customProps,
      };
    case "Warning":
      return {
        className: clsx(classes.notitication, classes.warning),
        message: <span className={classes["notification-msg"]}>{message}</span>,
        icon: <WarningFilled />,
        duration: 3,
        closeIcon: <CloseOutlined />,
        placement: "topRight",
        ...customProps,
      };
    case "Info":
      return {
        className: clsx(classes.notitication, classes.info),
        message: <span className={classes["notification-msg"]}>{message}</span>,
        icon: <InfoCircleFilled />,
        duration: 3,
        closeIcon: <CloseOutlined />,
        placement: "topRight",
        ...customProps,
      };
    default:
      return {};
  }
};

export const openNotification = (props) => {
  notification.open(getNotificationConfig(props));
};
