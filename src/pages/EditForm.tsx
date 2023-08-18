import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

import {
  useFetchUsersByIdQuery,
  useUpdateUsersMutation,
} from "../features/data-slice";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditForm: React.FC = () => {
  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const params = useParams();

  const id = params && params.id;
  const [updateUsers] = useUpdateUsersMutation();
  const { data } = useFetchUsersByIdQuery(parseInt(id!));

  const [defaultDate] = useState<any>(new Date(Date.now()));

  const onFinish = (values: any) => {
    formRef.current?.resetFields();
    navigate("/");
    updateUsers({ id, data: values });
  };

  const onBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (data) {
      formRef.current?.setFieldsValue({
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        createdAt: dayjs(moment(data.createdAt).format("YYYY/MM/DD")),
        // date: moment(data && data.createdAt.slice(0, 10), "YYYY-MM-DD"),
      });
    }
  }, [data]);

  console.log(defaultDate);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{ width: 800 }}
      >
        <h2 style={{ textAlign: "center" }}>Edit Form</h2>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
          rules={[
            { required: true, message: "Please input a URL!" },
            {
              type: "url",
              message: "Please enter a valid URL!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Select gender" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true },
            {
              min: 10,
              max: 10,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="createdAt" label="Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        ></Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>{" "}
          <Button htmlType="button" onClick={onBack}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditForm;
