import React, { useState } from "react";
import classes from "./Buy.module.less";
import { Col, Row, Typography } from "antd";
import { CustomPagination, FilterView, ProductCard } from "../../components";
import { data } from "./Buy.config";
import { configuration } from "../../config";
import { category } from "../../constant";

const { Title } = Typography;

export const Buy = () => {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState(category.SECOND_HAND);

  const sliceData = (d) => {
    return d.slice(
      (page - 1) * configuration().TABLE_LIMIT_SIZE,
      (page - 1) * configuration().TABLE_LIMIT_SIZE +
        configuration().TABLE_LIMIT_SIZE
    );
  };

  const filterData = (d, category) => {
    return d.filter((item) => item.category === category);
  };

  return (
    <div>
      <div className={classes["top-section"]}>
        <Title level={4}>{filterValue}</Title>
        <FilterView filterValue={filterValue} setFilterValue={setFilterValue} />
      </div>
      <Row gutter={[24, 24]}>
        {sliceData(filterData(data, filterValue)).map((product) => (
          <Col key={product.id} span={6} xs={24} sm={12} md={12} lg={8} xl={6}>
            <ProductCard
              title={product.title}
              description={product.description}
              id={product.id}
              name={product.name}
              price={product.price}
              src={product.src}
              cat={product.category}
              size={"S"}
            />
          </Col>
        ))}
      </Row>
      <CustomPagination
        defaultCurrent={page}
        total={filterData(sliceData(data), filterValue).length}
        setPage={setPage}
        page={page}
        className={classes["pagination"]}
      />
    </div>
  );
};
