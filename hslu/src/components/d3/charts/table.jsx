import React from "react";
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import { Table } from "antd";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
  },

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
      {
        text: "2015",
        value: "2015",
      },
      {
        text: "2016",
        value: "2016",
      },
      {
        text: "2017",
        value: "2017",
      },
      {
        text: "2018",
        value: "2018",
      },
      {
        text: "2019",
        value: "2019",
      },
      {
        text: "2020",
        value: "2020",
      },
      {
        text: "2021",
        value: "2021",
      },
    ],
    onFilter: (value, record) => record.AccidentYear.startsWith(value),
    filterSearch: true,
    // width: "40%",
  },
  {
    title: "AccidentMonth",
    dataIndex: "AccidentMonth",
  },
  {
    title: "AccidentHour",
    dataIndex: "AccidentHour",
  },
  {
    title: "AccidentWeekDay_en",
    dataIndex: "AccidentWeekDay_en",
  },
  {
    title: "AccidentType_de",
    dataIndex: "AccidentType_de",
  },
  {
    title: "AccidentSeverityCategory_de",
    dataIndex: "AccidentSeverityCategory_de",
  },
  {
    title: "AccidentInvolvingPedestrian",
    dataIndex: "AccidentInvolvingPedestrian",
    filters: [
      {
        text: "true",
        value: "true",
      },
      {
        text: "false",
        value: "false",
      },
    ],
    onFilter: (value, record) =>
      record.AccidentInvolvingPedestrian.startsWith(value),
    filterSearch: true,
  },
  {
    title: "AccidentInvolvingBicycle",
    dataIndex: "AccidentInvolvingBicycle",
    filters: [
      {
        text: "true",
        value: "true",
      },
      {
        text: "false",
        value: "false",
      },
    ],
    onFilter: (value, record) =>
      record.AccidentInvolvingBicycle.startsWith(value),
    filterSearch: true,
  },
  {
    title: "AccidentInvolvingMotorcycle",
    dataIndex: "AccidentInvolvingMotorcycle",
    filters: [
      {
        text: "true",
        value: "true",
      },
      {
        text: "false",
        value: "false",
      },
    ],
    onFilter: (value, record) =>
      record.AccidentInvolvingMotorcycle.startsWith(value),
    filterSearch: true,
  },
  {
    title: "RoadType_de",
    dataIndex: "RoadType_de",
  },
  {
    title: "CantonCode",
    dataIndex: "CantonCode",
    filters: [
      {
        text: "AG",
        value: "AG",
      },
      {
        text: "AI",
        value: "AI",
      },
      {
        text: "AR",
        value: "AR",
      },
      {
        text: "BE",
        value: "BE",
      },
      {
        text: "BL",
        value: "BL",
      },
      // AG AI AR BE BL BS FR GE GL GR JU LU NE NW OW SG SH SO SZ TG TI UR VD VS ZG ZH
    ],
    onFilter: (value, record) => record.CantonCode.startsWith(value),
    filterSearch: true,
  },
  {
    title: "MunicipalityCode",
    dataIndex: "MunicipalityCode",
  },
];

// const onChange = (props, pagination, filters, sorter, extra) => {
//   extra;
//   console.log("params", pagination, filters, sorter, extra);
// };

const AntTable = (props) => (
  <>
    <Table
      size="small"
      columns={columns}
      dataSource={props.data}
      onChange={(pagination, filters, sorter, extra) => {
        props.passChildData(extra);
      }}
    />
  </>
);

export default AntTable;
