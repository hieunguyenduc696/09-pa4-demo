import React from "react";
import classes from "./CartCard.module.less";
import { EMPTY } from "../../assets";
import { Button, Col, Row, Typography } from "antd";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useCart } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";
import { RootPaths } from "../../constant/paths";
import { formatter } from "../../utils/number";
import { category } from "../../constant";

const { Title, Text } = Typography;

export const CartCard = ({ handleClose }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const { items, totalItems, totalPrice, disableCart } = cart;

  const title =
    totalItems === 0
      ? "Bạn không có sản phẩm nào trong giỏ hàng."
      : `Bạn đang có ${totalItems} sản phẩm trong giỏ hàng.`;

  const handleSubtractItem = (item) => {
    const foundIndex = items.findIndex((i) => i.id === item.id);
    const newCart = { ...cart };
    if (foundIndex >= 0) {
      const newQuantity = items[foundIndex].quantity - 1;

      if (newQuantity === 0) {
        newCart.totalItems--;
        newCart.items = newCart.items.filter((i) => i.id !== item.id);
      } else {
        newCart.items[foundIndex].quantity = newQuantity;
      }
      newCart.totalPrice -= Number(item.details.price);
    }

    setCart(newCart);
  };

  const handleAddItem = (item) => {
    const foundIndex = items.findIndex((i) => i.id === item.id);
    const newCart = { ...cart };
    if (foundIndex >= 0) {
      const newQuantity = items[foundIndex].quantity + 1;

      newCart.items[foundIndex].quantity = newQuantity;

      newCart.totalPrice += Number(item.details.price);
    }

    setCart(newCart);
  };

  const handleRemoveItem = (item) => {
    const foundIndex = items.findIndex((i) => i.id === item.id);

    if (foundIndex < 0) return;

    setCart({
      ...cart,
      items: cart.items.filter((i) => i.id !== item.id),
      totalItems: cart.totalItems - 1,
      totalPrice: cart.totalPrice - Number(item.details.price * item.quantity),
    });
  };

  const handleBuyClick = () => {
    handleClose();
    navigate(RootPaths.BUY, { replace: true });
  };

  const handlePayment = () => {
    handleClose();
    navigate(RootPaths.PAYMENT);
  };

  return (
    <div className={classes["cart-card"]}>
      <Title level={4} className={classes.title}>
        {title}
      </Title>
      {totalItems === 0 ? (
        <>
          <img alt={title} src={EMPTY} />
          <div className={classes.actions}>
            <Button type="primary" onClick={handleBuyClick}>
              Mua sắm
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={classes["item-wrapper"]}>
            {items
              .slice(0, 5)
              .filter((i) => i.quantity > 0)
              .map((item) => (
                <Row
                  key={item.id}
                  gutter={[24, 24]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Col span={6}>
                    <img src={item.details.src} alt="src" />
                  </Col>
                  <Col span={10}>
                    <div>
                      <Text>{item.details.name}</Text>
                    </div>
                    <div>
                      <Text>
                        {item.details.cat === category.BOOK
                          ? "Thể loại: "
                          : "Chất liệu: "}
                        <span>{item.details.description}</span>
                      </Text>
                    </div>
                    <div style={{ marginTop: "0.2rem" }}>
                      <Button
                        size="small"
                        shape="circle"
                        onClick={() => handleSubtractItem(item)}
                        disabled={disableCart}
                      >
                        -
                      </Button>
                      <Text style={{ margin: "0.6rem" }}>{item.quantity}</Text>
                      <Button
                        size="small"
                        shape="circle"
                        onClick={() => handleAddItem(item)}
                        disabled={disableCart}
                      >
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
                        type="text"
                        onClick={() => handleRemoveItem(item)}
                        disabled={disableCart}
                      />
                    </div>
                    <div>
                      <Text type="danger">
                        {formatter.format(item.details.price)}
                      </Text>
                    </div>
                  </Col>
                </Row>
              ))}
            {items.length > 5 && (
              <Button
                type="text"
                onClick={() => {
                  handleClose();
                  navigate("/payment");
                }}
                style={{ color: "#27ce9f" }}
              >
                View more
              </Button>
            )}
          </div>
          <div className={classes["actions-price"]}>
            <Text strong>
              Tổng tiền:{" "}
              <Text type="danger"> {formatter.format(totalPrice)}</Text>
            </Text>
            <Button type="primary" onClick={handlePayment}>
              Thanh toán
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
