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

  //   var date = new Date(data.createdAt);
  //   console.log(typeof data.createdAt, "dataaaaaaaaa");
  //   const onGenderChange = (value: string) => {
  //     switch (value) {
  //       case "male":
  //         formRef.current?.setFieldsValue({ note: "Hi, man!" });
  //         break;
  //       case "female":
  //         formRef.current?.setFieldsValue({ note: "Hi, lady!" });
  //         break;
  //       case "other":
  //         formRef.current?.setFieldsValue({ note: "Hi there!" });
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  const onFinish = (values: any) => {
    // console.log(values, "valuesssssssss");
    formRef.current?.resetFields();
    navigate("/");
    updateUsers({ id, data: values });
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };
  //   const handleDOP = (date: any, dateString: any) => {
  //     formRef.current?.setFieldsValue({
  //       date: dateString,
  //     });
  //   };

  useEffect(() => {
    if (data) {
      // console.log(new Date(data.createdAt));

      //   console.log(`is being calleld`);

      //   setDefaultDate(moment(data.createdAt).format("YYYY-MM-DD"));

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

  //   const onFill = () => {
  //     formRef.current?.setFieldsValue({ note: "Hello world!", gender: "male" });
  //   };

  console.log(defaultDate);

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
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>{" "}
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

export default EditForm;
// #components-form-demo-control-ref .ant-btn {
//   margin-right: 8px;
// }
