import React from "react";
import classes from "./CustomPagination.module.less";
import { Pagination } from "antd";

export const CustomPagination = ({ defaultCurrent, total, page, setPage }) => {
  return (
    <Pagination
      className={classes.pagination}
      defaultCurrent={defaultCurrent}
      value={page}
      total={total}
      pageSize={8}
      onChange={(nextPage) => setPage(nextPage)}
    />
  );
};
