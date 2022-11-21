import React from "react";
import classes from "./CustomCard.module.less";
import { Button, Card } from "antd";

const { Meta } = Card;

export const CustomCard = ({ title, description, src, actions }) => {
  return (
    <Card
      hoverable
      title={title}
      cover={<img alt={title} src={src} />}
      className={classes["custom-card"]}
      actions={[<Button type="primary">{actions}</Button>]}
    >
      <Meta description={description} />
    </Card>
  );
};
