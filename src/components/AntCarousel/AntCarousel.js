import React from "react";
import classes from "./AntCarousel.module.less";
import { Carousel } from "antd";
import { MAIN_IMAGE } from "../../assets";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "100%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 999,
        background: "white",
        right: "-12px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
};

const PreviousArrow = (props) => {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "24px",
        height: "24px",
        borderRadius: "100%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 999,
        background: "white",
        left: "-12px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};

const contentStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px",
};

const carouselSetting = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
};

export const AntCarousel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel
      arrows
      afterChange={onChange}
      className={classes["custom-ant-carousel"]}
      {...carouselSetting}
    >
      <div className={classes.wrapper}>
        <img style={contentStyle} src={MAIN_IMAGE} alt="main" />
      </div>
      <div>
        <img style={contentStyle} src={MAIN_IMAGE} alt="main" />
      </div>
      <div>
        <img style={contentStyle} src={MAIN_IMAGE} alt="main" />
      </div>
    </Carousel>
  );
};
