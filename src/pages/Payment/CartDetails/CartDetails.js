import React from "react";
import classes from "./CartDetails.module.less";
import {
  Button,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import { useCart } from "../../../context/cart-context";
import { RiDeleteBin7Line } from "react-icons/ri";
import { formatter } from "../../../utils/number";
import bigDecimal from "js-big-decimal";

const { Title, Text } = Typography;

export const CartDetails = ({ handleNext }) => {
  const { cart, setCart } = useCart();

  const handleInputNumber = (e, item) => {
    let newTotalPrice = bigDecimal.subtract(
      cart.totalPrice,
      bigDecimal.multiply(item.quantity, item.details.price)
    );
    newTotalPrice = bigDecimal.add(
      newTotalPrice,
      bigDecimal.multiply(Number(e.target.value), item.details.price)
    );

    const foundIndex = cart.items.findIndex((i) => i.id === item.id);
    const newCart = { ...cart };
    if (foundIndex >= 0) {
      newCart.items[foundIndex].quantity = Number(e.target.value);
      newCart.totalPrice = newTotalPrice;
    }

    setCart(newCart);
  };

  const handleSelectSize = (e, item) => {
    const foundIndex = cart.items.findIndex((i) => i.id === item.id);
    const newCart = { ...cart };
    if (foundIndex >= 0) {
      newCart.items[foundIndex].details.size = e.target.value;
    }

    setCart(newCart);
  };

  const handleRemoveItem = (item) => {
    const foundIndex = cart.items.findIndex((i) => i.id === item.id);

    if (foundIndex < 0) return;

    setCart({
      ...cart,
      items: cart.items.filter((i) => i.id !== item.id),
      totalItems: cart.totalItems - 1,
      totalPrice: cart.totalPrice - Number(item.details.price * item.quantity),
    });
  };

  return (
    <div className={classes["cart-container"]}>
      {cart.items.map((item) => (
        <div key={item.id}>
          <Row className={classes.row}>
            <Col span={3}>
              <img src={item.details.src} alt={item.id} />
            </Col>
            <Col span={18}>
              <Space direction="vertical">
                <Title level={4}>{item.details.name}</Title>
                <Text>
                  Chất liệu: <Text strong>{item.details.description}</Text>
                </Text>
                <div>
                  <Text>Size: </Text>
                  <Radio.Group
                    defaultValue={item.details.size ?? "S"}
                    onChange={(e) => handleSelectSize(e, item)}
                  >
                    <Radio value="S">S</Radio>
                    <Radio value="M">M</Radio>
                    <Radio value="L">L</Radio>
                    <Radio value="XL">XL</Radio>
                  </Radio.Group>
                </div>
                <div className={classes["quantity-wrapper"]}>
                  <Input
                    defaultValue={item.quantity}
                    placeholder="Số lượng"
                    style={{ width: "120px" }}
                    onChange={(e) => handleInputNumber(e, item)}
                  />

                  <Button
                    type="text"
                    shape="circle"
                    danger
                    icon={<RiDeleteBin7Line />}
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleRemoveItem(item)}
                  />
                </div>
              </Space>
            </Col>
            <Col span={3}>
              <Text type="danger">{formatter.format(item.details.price)}</Text>{" "}
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
      <div className={classes["next-wrapper"]}>
        <Text>
          Tổng tiền:{" "}
          <Text type="danger">{formatter.format(cart.totalPrice)}</Text>
        </Text>
        <Button type="primary" onClick={handleNext}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};
