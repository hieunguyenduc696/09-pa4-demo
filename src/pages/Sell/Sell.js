import React, { useRef, useState } from "react";
import classes from "./Sell.module.less";
import { Button, Col, Form, Input, List, Row, Select, Typography } from "antd";
import FileUploader from "../../components/FileUploader/FileUploader";
import { useFileUploader } from "../../components/FileUploader/FileUploader.hook";
import { SellData } from "./Sell.config";
import { SellSuccessModal } from "./SellSuccessModal";
import { openNotification } from "../../components";
import { category } from "../../constant";

const { Title, Text } = Typography;
const { Item } = Form;
const { TextArea } = Input;

export const Sell = () => {
  const uploaderRef = useRef(null);
  const [form] = Form.useForm();
  const { setIsUploading, setUploadItems, setIsError } = useFileUploader();
  const [visible, setVisible] = useState(false);

  const type = Form.useWatch("type", form);

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleUploadCompleted = (values) => {
    setIsUploading(false);
    setIsError(false);
    setUploadItems(values);
  };

  const handleUploading = () => {
    setIsUploading(true);
  };

  const handleError = () => {
    setIsError(true);
    setIsUploading(false);
  };

  const onFinish = () => {
    if (uploaderRef.current.uploadItems.length === 0) {
      openNotification({
        notificationType: "Error",
        message: "Vui lòng chọn sản phẩm để đăng bán",
      });
    } else {
      handleOpenModal();
    }
  };

  const handleReset = () => {
    uploaderRef.current.setUploadItems([]);
  };

  return (
    <div className={classes.ctn}>
      <Title level={3} className={classes.title}>
        Đăng bán
      </Title>
      <Row gutter={[24, 24]} className={classes.content}>
        <Col span={12} xs={24} md={12}>
          <div style={{ marginBottom: "0.5rem" }}>
            <Text>
              Bạn muốn kiếm thêm thu nhập từ quần áo cũ không xài nữa? Hãy gửi
              cho R3S chúng tôi, quần áo của bạn sẽ được đăng bán với mức giá
              phù hợp và nhanh chóng.
            </Text>
          </div>
          <FileUploader
            ref={uploaderRef}
            onUploadCompleted={handleUploadCompleted}
            onUploading={handleUploading}
            onError={handleError}
            maxFileUpload={5}
          />
        </Col>
        <Col span={12} xs={24} md={12}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={24}>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="name"
                  label="Họ và tên"
                  required
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="phone"
                  label="Số điện thoại"
                  required
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    {
                      type: "string",
                      len: 10,
                      message: "Vui lòng nhập số điện thoại hợp lệ",
                    },
                  ]}
                >
                  <Input placeholder="0123456789" />
                </Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="title"
                  label="Tên sản phẩm"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên sản phẩm",
                    },
                  ]}
                >
                  <Input placeholder="Nhập môn lập trình" />
                </Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="type"
                  label="Loại sản phẩm"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại sản phẩm",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn loại sản phẩm"
                    options={[
                      { label: "Quần áo 2-hand", value: category.SECOND_HAND },
                      { label: "Sách vở", value: category.BOOK },
                    ]}
                  />
                </Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="size"
                  label="Size"
                  required
                  dependencies={["type"]}
                  rules={[
                    type !== category.BOOK && {
                      required: true,
                      message: "Vui lòng chọn size của quần áo",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn size của quần áo"
                    disabled={type === category.BOOK}
                    options={[
                      { label: "S", value: "S" },
                      { label: "M", value: "M" },
                      { label: "L", value: "L" },
                      { label: "XL", value: "XL" },
                    ]}
                  />
                </Item>
              </Col>
              <Col span={12} xs={24} sm={12}>
                <Item
                  name="price"
                  label="mức giá mong muốn"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mức giá mong muốn",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mức giá mong muốn" />
                </Item>
              </Col>
              <Col span={24}>
                <Item name="note" label="Ghi chú">
                  <TextArea placeholder="Nhập ghi chú" rows={3} />
                </Item>
              </Col>
            </Row>
            <div style={{ textAlign: "end", marginBottom: "1rem" }}>
              <Button type="primary" onClick={form.submit}>
                Đăng bán
              </Button>
            </div>
          </Form>
          <Title level={5} className={classes.introduction}>
            LÀM THẾ NÀO ĐỂ TÔI ĐĂNG BÁN QUẦN ÁO CŨ?
          </Title>

          <List
            itemLayout="horizontal"
            dataSource={SellData}
            className={classes.list}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<img src={item.image} alt="step" />}
                  title={<Title level={5}>{item.title}</Title>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <SellSuccessModal
        visible={visible}
        handleCloseModal={handleCloseModal}
        handleReset={handleReset}
      />
    </div>
  );
};
