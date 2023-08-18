import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDeleteUsersMutation } from "../features/data-slice";
import moment from "moment";
import {
  Divider,
  Radio,
  Table,
  TableColumnsType,
  TableProps,
  Button,
} from "antd";

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
  const [deleteUsers] = useDeleteUsersMutation();
  const [selectedRowsData, setSelectedRowData] = useState<FetchData[]>([]);
  const [allDeleteId, setAllDeleteId] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowData(selectedRows);
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

  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

  const navigate = useNavigate();
  const [columns] = useState<TableColumnsType<FetchData>>(() => [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
      key: "gender",
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
      title: "Dob",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        const currentDate = moment(date);
        const formattedDate = currentDate.format("MMMM DD, YYYY");
        return <>{formattedDate}</>;
      },
    },
  ]);

  const _rowSelection = {
    type: selectionType,
    ...rowSelection,
  } as unknown as any;

  const handleClick = () => navigate("/add");
  const handleEditPage = () => navigate(`/edit/${selectedRowsData[0].id}`);

  const handleDelete = () => {
    console.log(selectedRowsData.length, "selectedRowdata");
    if (selectedRowsData.length > 0) {
      selectedRowsData.map((item, _) => {
        deleteUsers(parseInt(item?.id));
      });
    }
  };

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
      <div style={{ float: "left", height: 50 }}>
        {selectedRowsData.length > 0 && (
          <>
            <Button
              type="primary"
              size={"small"}
              onClick={() => handleDelete()}
            >
              {selectedRowsData.length === 1 ? `Delete` : `DeleteAll`}
            </Button>{" "}
          </>
        )}
        {selectedRowsData.length === 1 && (
          <Button
            type="primary"
            size={"small"}
            onClick={() => handleEditPage()}
          >
            Update
          </Button>
        )}
      </div>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={({ id }) => id}
          size="small"
          rowSelection={_rowSelection}
          pagination={{
            current: page,
            defaultPageSize: pageSize,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              console.log(`page===>`, page, `pagesize===>`, pageSize);
              setPage(page);
              setPageSize(pageSize);
            },
          }}
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
