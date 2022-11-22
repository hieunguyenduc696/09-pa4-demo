import React from "react";
import classes from "./Confirmation.module.less";
import moment from "moment";
import bigDecimal from "js-big-decimal";
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd";
import { defaultCartValue, useCart } from "../../../context/cart-context";
import { defaultUserValue, useUser } from "../../../context/user-context";
import { uniqueId } from "lodash";
import { formatter } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { RootPaths } from "../../../constant/paths";
import { openNotification } from "../../../components/AntNotification";

const { Title, Text } = Typography;

export const Confirmation = ({ handlePrev }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { user, setUser } = useUser();

  const handleOrder = () => {
    navigate(RootPaths.HOME);
    setCart(defaultCartValue);
    setUser(defaultUserValue);
    openNotification({
      notificationType: "Success",
      message: "Mua hàng thành công",
    });
  };

  return (
    <div className={classes["confirmation-container"]}>
      <Title level={3} className={classes.title}>
        Đơn hàng của bạn
      </Title>
      <Row style={{ marginTop: "1rem" }}>
        <Col span={12}>
          <Space direction="vertical">
            <div>
              <div>
                <Text>Mã đơn hàng: {uniqueId()}</Text>
              </div>
              <div>
                <Text>
                  Thời gian đặt hàng:{" "}
                  {moment.utc(new Date()).format("DD/MM/YYYY")}
                </Text>
              </div>
            </div>
            <div>
              <div>
                <Text strong>Địa chỉ nhận hàng</Text>
              </div>
              <div>
                <Text>
                  {user.name} | {user.phone}
                </Text>
              </div>
              <div>
                <Text>{user.address}</Text>
              </div>
            </div>
            <div>
              <div>
                <Text strong>Thông tin vận chuyển</Text>
              </div>
              <div>
                <Text>{user.shippingType}</Text>
              </div>
            </div>
            <div>
              <div>
                <Text strong>Phương thức thanh toán</Text>
              </div>
              <div>
                <Text>{user.paymentType}</Text>
              </div>
            </div>
            <div>
              <div>
                <Text>Phí vận chuyển: {formatter.format(25000)}</Text>
              </div>
              <div>
                <Text>Tổng tiền hàng: {formatter.format(cart.totalPrice)}</Text>
              </div>
              <div>
                <Text strong>
                  Tổng thanh toán:{" "}
                  <Text type="danger">
                    {formatter.format(bigDecimal.add(25000, cart.totalPrice))}
                  </Text>
                </Text>
              </div>
            </div>
          </Space>
        </Col>
        <Col span={12}>
          {cart.items.map((item) => (
            <div key={item.id}>
              <Row className={classes.row}>
                <Col span={6}>
                  <img src={item.details.src} alt={item.id} />
                </Col>
                <Col span={12}>
                  <Space direction="vertical">
                    <Title level={4}>{item.details.name}</Title>
                    <Text>
                      Chất liệu: <Text strong>{item.details.description}</Text>
                    </Text>
                    <div>
                      <Text>Size: {item.details.size}</Text>
                    </div>
                    <div className={classes["quantity-wrapper"]}>
                      <Input defaultValue={item.quantity} disabled />
                    </div>
                  </Space>
                </Col>
                <Col span={6}>
                  <Text type="danger">
                    {formatter.format(item.details.price)}
                  </Text>{" "}
                </Col>
              </Row>
              <Divider />
            </div>
          ))}
        </Col>
      </Row>
      <div className={classes["next-wrapper"]}>
        <Button type="text" onClick={handlePrev}>
          Quay lại
        </Button>
        <Button type="primary" onClick={handleOrder}>
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};
