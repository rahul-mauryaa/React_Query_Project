import TableData from "../components/Table";
import { useFetchUsersQuery } from "../features/data-slice";

import { Space, Spin } from "antd";

// interface FetchData {
//   createdAt: Date;
//   name: string;
//   id: string;
//   avatar: string;
//   gender: string;
//   phone: string;
//   address: string;
// }

const Display = () => {
  const { data, isLoading, isFetching } = useFetchUsersQuery(undefined, {
    // pollingInterval: 5000,
  });
  console.log(data, "Alll_data");

  if (isLoading || isFetching) {
    return (
      <Space
        direction="vertical"
        style={{
          marginTop: "100px",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>{" "}
      </Space>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "70%", height: "70%" }}>
        <TableData data={data} />
      </div>
    </div>
  );
};

export default Display;
