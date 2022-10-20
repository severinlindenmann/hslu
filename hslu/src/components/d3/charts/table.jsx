import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow",
          },
          {
            text: "Pink",
            value: "Pink",
          },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // filterMode: "tree",
    // filterSearch: true,
    // onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
  // {
  //   title: "Age",
  //   dataIndex: "age",
  //   sorter: (a, b) => a.age - b.age,
  // },
  {
    title: "AccidentYear",
    dataIndex: "AccidentYear",
    filters: [
      {
        text: "2013",
        value: "2013",
      },
      {
        text: "2014",
        value: "2014",
      },
    ],
    onFilter: (value, record) => record.AccidentYear.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
];

// const data = [
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
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const AntTable = (props) => (
  <>
    {console.log(props.data)}
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  </>
);

export default AntTable;
