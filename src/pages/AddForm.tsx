import React from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import type { FormInstance } from "antd/es/form";
import { useCreateUsersMutation } from "../features/data-slice";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddForm: React.FC = () => {
  const navigate = useNavigate();
  const [createUsers] = useCreateUsersMutation();
  const formRef = React.useRef<FormInstance>(null);

  const onFinish = (values: any) => {
    createUsers(values);
    formRef.current?.resetFields();
    navigate("/");
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Form
      {...layout}
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
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
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
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
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        {/* <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default AddForm;
// #components-form-demo-control-ref .ant-btn {
//   margin-right: 8px;
// }
