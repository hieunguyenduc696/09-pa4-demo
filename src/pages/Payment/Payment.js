import React, { useState } from "react";
import classes from "./Payment.module.less";
import { Empty, Steps } from "antd";
import { items } from "./Payment.config";
import { useCart } from "../../context/cart-context";
import { CartDetails } from "./CartDetails";
import { UserInfo } from "./UserInfo";
import { Confirmation } from "./Confirmation";

export const Payment = () => {
  const { cart } = useCart();
  const [current, setCurrent] = useState(2);

  const handleNext = () => {
    setCurrent((prev) => ++prev);
  };

  const handlePrev = () => {
    setCurrent((prev) => --prev);
  };

  if (cart.totalItems === 0) {
    return <Empty />;
  }

  return (
    <div className={classes.container}>
      <Steps current={current} items={items} />

      {current === 0 && <CartDetails handleNext={handleNext} />}
      {current === 1 && (
        <UserInfo handleNext={handleNext} handlePrev={handlePrev} />
      )}
      {current === 2 && <Confirmation handlePrev={handlePrev} />}
    </div>
  );
};
