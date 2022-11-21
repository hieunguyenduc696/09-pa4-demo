import React from "react";
import classes from "./CartCard.module.less";
import { EMPTY } from "../../assets";
import { Button, Col, Row, Typography } from "antd";
import { RiDeleteBin7Line } from "react-icons/ri";

const { Title, Text } = Typography;

export const CartCard = ({ items, totalItems, totalPrice }) => {
  const title =
    totalItems === 0
      ? "Bạn không có sản phẩm nào trong giỏ hàng."
      : `Bạn đang có ${totalItems} sản phẩm trong giỏ hàng.`;

  return (
    <div className={classes["cart-card"]}>
      <Title level={4} className={classes.title}>
        {title}
      </Title>
      {totalItems === 0 ? (
        <>
          <img alt={title} src={EMPTY} />
          <div className={classes.actions}>
            <Button type="primary">Mua sắm</Button>
          </div>
        </>
      ) : (
        <>
          <div className={classes["item-wrapper"]}>
            {items.map((item) => (
              <Row
                key={item.id}
                gutter={[64, 40]}
                style={{ marginBottom: "1rem" }}
              >
                <Col span={4}>
                  <img src={item.details.src} alt="src" />
                </Col>
                <Col span={12} style={{ textAlign: "left" }}>
                  <div>
                    <Text>{item.details.name}</Text>
                  </div>
                  <div>
                    <Text>
                      Chất liệu: <span>{item.details.description}</span>
                    </Text>
                  </div>
                  <div style={{ marginTop: "0.2rem" }}>
                    <Button size="small" shape="circle">
                      -
                    </Button>
                    <Text style={{ margin: "0.6rem" }}>{item.quantity}</Text>
                    <Button size="small" shape="circle">
                      +
                    </Button>
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <div>
                    <Button
                      danger
                      icon={<RiDeleteBin7Line />}
                      shape="circle"
                      size="medium"
                      style={{ marginBottom: "6px" }}
                    />
                  </div>
                  <div>
                    <Text type="danger">{item.details.price} VND</Text>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
          <div className={classes.actions}>
            <Text strong>
              Tổng tiền: <Text type="danger"> {totalPrice} VND</Text>
            </Text>
            <Button type="primary">Thanh toán</Button>
          </div>
        </>
      )}
    </div>
  );
};
