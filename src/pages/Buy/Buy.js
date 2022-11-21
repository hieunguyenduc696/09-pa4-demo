import React, { useState } from "react";
import classes from "./Buy.module.less";
import { Col, Row, Typography } from "antd";
import { CustomPagination, FilterView, ProductCard } from "../../components";
import { data } from "./Buy.config";
import { configuration } from "../../config";

const { Title } = Typography;

export const Buy = () => {
  const [page, setPage] = useState(1);

  const sliceData = (d) => {
    return d.slice(
      (page - 1) * configuration().TABLE_LIMIT_SIZE,
      (page - 1) * configuration().TABLE_LIMIT_SIZE +
        configuration().TABLE_LIMIT_SIZE
    );
  };

  return (
    <div>
      <div className={classes["top-section"]}>
        <Title level={4}>Áo quần 2-hand</Title>
        <FilterView />
      </div>
      <Row gutter={[24, 24]}>
        {sliceData(data).map((product) => (
          <Col span={6} key={product.id}>
            <ProductCard
              title={product.title}
              description={product.description}
              id={product.id}
              name={product.name}
              price={product.price}
              src={product.src}
            />
          </Col>
        ))}
      </Row>
      <CustomPagination
        defaultCurrent={page}
        total={data.length}
        setPage={setPage}
        page={page}
        className={classes["pagination"]}
      />
    </div>
  );
};
