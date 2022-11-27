import { Typography } from "antd";
import React from "react";
import { RiCopyrightLine } from "react-icons/ri";
import classes from "./Footer.module.less";

const { Text } = Typography;

export const Footer = () => {
  return (
    <div className={classes.footer}>
      <RiCopyrightLine size={20} />{" "}
      <Text className={classes.text}>
        {" "}
        Group 9, TKGD, 2022. All rights reserved.{" "}
      </Text>
    </div>
  );
};
