import React from "react";
import classes from "./SearchInput.module.less";
import { Input, Spin } from "antd";
import { RiSearchLine } from "react-icons/ri";

export const SearchInput = ({ isLoading, ...props }) => {
  return (
    <Input
      {...props}
      suffix={
        !isLoading ? (
          <RiSearchLine className={classes["icon"]} />
        ) : (
          <Spin className={classes["icon"]} />
        )
      }
      className={classes.input}
    />
  );
};
