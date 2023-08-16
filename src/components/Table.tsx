import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./index.css";
import {
  Divider,
  Radio,
  Table,
  TableColumnsType,
  TableProps,
  Button,
} from "antd";
// import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  createdAt: Date;
  name: string;
  id: string;
  avatar: string;
  gender: string;
  phone: string;
  address: string;
}

// const columns: ColumnsType<DataType> = [
//   {
//     title: "createdAt",
//     dataIndex: "createdAt",
//     key: "createdAt",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text: string) => <a>{text}</a>,
//   },
//   {
//     title: "Id",
//     dataIndex: "id",
//     key: "name",
//     render: (text: string) => <a>{text}</a>,
//   },
//   {
//     title: "Avatar",
//     dataIndex: "avatar",
//     key: "name",
//   },
//   {
//     title: "gender",
//     dataIndex: "gender",
//     key: "name",
//   },
//   {
//     title: "phone",
//     dataIndex: "phone",
//     key: "name",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "name",
//   },
// ];

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Disabled User",
//     age: 99,
//     address: "Sydney No. 1 Lake Park",
//   },
// ];

// rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

interface FetchData {
  createdAt: Date;
  name: string;
  id: string;
  avatar: string;
  gender: string;
  phone: string;
  address: string;
}

const TableData: React.FC<{ data: FetchData[] | undefined }> = ({ data }) => {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

  const navigate = useNavigate();
  const [columns] = useState<TableColumnsType<FetchData>>(() => [
    {
      title: "Id",
      dataIndex: "id",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "Avatar",
      render: (url: string) => (
        <img src={url} alt="image data" height={150} width={200} />
      ),
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "name",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "Address",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ]);

  const _rowSelection = {
    type: selectionType,
    ...rowSelection,
  } as unknown as any;

  const handleClick = () => navigate("/add");
  return (
    <div>
      <div style={{ float: "right" }}>
        <Button type="primary" size={"large"} onClick={() => handleClick()}>
          Add
        </Button>
      </div>

      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={({ id }) => id}
          size="small"
          rowSelection={_rowSelection}
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
        />
      )}
    </div>
  );
};

export default TableData;
