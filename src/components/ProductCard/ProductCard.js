import React from "react";
import classes from "./ProductCard.module.less";
import { Button, Card, Rate, Typography } from "antd";
import { useCart } from "../../context/cart-context";
import { openNotification } from "../AntNotification";
import { formatter } from "../../utils/number";
import { category } from "../../constant";

const { Meta } = Card;
const { Title, Text } = Typography;

export const ProductCard = ({
  title,
  src,
  description,
  name,
  id,
  price,
  cat,
  size
}) => {
  const { cart, setCart } = useCart();

  const handleAddToCart = () => {
    const foundIndex = cart.items.findIndex((item) => item.id === id);
    const newCart = { ...cart };

    if (foundIndex >= 0) {
      const newQuantity = cart.items[foundIndex].quantity + 1;

      newCart.items[foundIndex].quantity = newQuantity;
    } else {
      const newItem = {
        id,
        quantity: 1,
        details: {
          title,
          src,
          description,
          name,
          price,
          cat,
          size
        },
      };

      newCart.items.push(newItem);
      newCart.totalItems++;
    }
    newCart.totalPrice = newCart.totalPrice + Number(price);

    setCart(newCart);
    // save to local storage

    openNotification({
      notificationType: "Success",
      message: "Thêm vào giỏ hàng thành công",
    });
  };

  return (
    <Card
      hoverable
      className={classes["custom-card"]}
      actions={[
        <Rate value={3} />,
        <Button size="medium" type="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>,
      ]}
    >
      <Meta
        avatar={
          <div>
            <img src={src} alt="avatar" />
          </div>
        }
        description={
          <>
            <Title level={5}>{title}</Title>
            {cat !== category.BOOK && (
              <>
                <span className={classes.description}>
                  Chất liệu: <b>{description}</b>
                </span>
                <div>{name}</div>
              </>
            )}
            <div>Mã số: {id}</div>
            <Text type="danger">{formatter.format(price) || ""}</Text>
          </>
        }
      />
    </Card>
  );
};
