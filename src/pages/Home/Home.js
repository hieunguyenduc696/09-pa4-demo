import React from "react";
import classes from "./Home.module.less";
import { Col, Row, Typography } from "antd";
import { AntCarousel, CustomCard } from "../../components";
import { RECYCLE, RESHARE, REUSE } from "../../assets";

const { Title } = Typography;

export const Home = () => {
  return (
    <>
      <AntCarousel />
      <Title level={3} className={classes.title}>
        BENEFITS OF
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <CustomCard
            title="Recycle"
            src={RECYCLE}
            description="Recycle, reduce waste discharged, limit environmental pollution."
            actions="Read more"
          />
        </Col>
        <Col span={8}>
          <CustomCard
            title="Reshare"
            src={RESHARE}
            description="Items that are useless to you but necessary for the poor."
            actions="Read more"
          />
        </Col>
        <Col span={8}>
          <CustomCard
            title="Reuse"
            src={REUSE}
            description="Your old stuff can still be used(For you or for the poor)."
            actions="Read more"
          />
        </Col>
      </Row>
    </>
  );
};
