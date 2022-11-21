import React from "react";
import classes from "./FilterView.module.less";
import { Button, Dropdown } from "antd";
import { RiFilter3Line } from "react-icons/ri";
import { items } from "./FilterView.config";

export const FilterView = ({ filterValue, setFilterValue }) => {
  const onClick = ({ key }) => {
    setFilterValue(key);
  };

  return (
    <Dropdown
      menu={{ items, onClick, activeKey: filterValue }}
      placement="bottomRight"
      trigger={["click"]}
      overlayClassName={classes.overlay}
      getPopupContainer={() => document.getElementById("add-filter-btn")}
    >
      <Button
        className={classes["add-filter-btn"]}
        id="add-filter-btn"
        type="text"
        icon={<RiFilter3Line />}
      >
        Add Filter
      </Button>
    </Dropdown>
  );
};
