import React from "react";
import classes from "./UserInfo.module.less";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { formatter } from "../../../utils";
import { useCart } from "../../../context/cart-context";
import { useUser } from "../../../context/user-context";
import bigDecimal from "js-big-decimal";

const { Title, Text } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export const UserInfo = ({ handlePrev, handleNext }) => {
  const { cart } = useCart();
  const { setUser } = useUser();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    setUser({ ...values });

    handleNext();
  };

  return (
    <div className={classes["userinfo-container"]}>
      <Title level={4} className={classes.title}>
        Người mua / nhận hàng
      </Title>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Item
              name="name"
              label="Họ và tên"
              required
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="phone"
              label="Số điẹn thoại"
              required
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="0123456789" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="address"
              label="Địa chỉ"
              required
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Nguyễn Văn Cừ, Quận 5, TP HCM" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="shippingType"
              label="Phương thức giao hàng"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức giao hàng",
                },
              ]}
            >
              <Select
                placeholder="Chọn phương thức giao hàng"
                options={[
                  { label: "Giao hàng nhanh", value: "fast" },
                  { label: "Giao hàng tiết kiệm", value: "save" },
                ]}
              />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="paymentType"
              label="phương thức thanh toán"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Select
                placeholder="Chọn phương thức thanh toán"
                options={[
                  { label: "Tiền mặt", value: "cash" },
                  { label: "Thẻ tín dụng", value: "credit" },
                ]}
              />
            </Item>
          </Col>
          <Col span={24}>
            <Item name="note" label="Ghi chú">
              <TextArea placeholder="Nếu tôi không có nhà,..." rows={3} />
            </Item>
          </Col>
        </Row>
      </Form>

      <div className={classes.summary}>
        <div className={classes.left}>
          <Title level={4}>Chi tiết thanh toán</Title>
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
        <div className={classes.right}>
          <Button type="text" onClick={handlePrev}>
            Quay lại
          </Button>
          <Button type="primary" onClick={form.submit}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </div>
  );
};