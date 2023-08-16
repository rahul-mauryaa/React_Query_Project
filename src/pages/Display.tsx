import React from "react";
import TableData from "../components/Table";
import { useFetchDataQuery } from "../features/data-slice";

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
  const { data } = useFetchDataQuery();
  console.log(data, "dataaata");
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
