import React, { useEffect, useState } from "react";
import AntTable from "./charts/table.jsx";
import { json } from "d3";
import { Paper, LinearProgress } from "@mui/material";
import Diagramm3 from "../d3/diagramm3";
import Diagramm2 from "../d3/diagramm2";
import Diagramm1 from "../d3/diagramm1";
import Diagramm4 from "../d3/diagramm4";

const D3HSLU = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState("");

  useEffect(() => {
    json("https://severin.fra1.digitaloceanspaces.com/hslu/AllData.json").then(
      (d) => {
        setData(d.data);
        setLoading(false);
      }
    );
    return () => undefined;
  }, []);

  return (
    <>
      <Paper style={{ marginBottom: "20px" }}>
        <div style={{ overflow: "auto", maxWidth: "1200px" }}>
          {loading && <LinearProgress />}
          {!loading && <AntTable data={data} passChildData={setChildData} />}
          {console.log(childData)}
        </div>
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm1 />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm2 />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm3 />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm4 />
      </Paper>
    </>
  );
};

export default D3HSLU;
