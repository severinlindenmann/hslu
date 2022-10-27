import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import D3Map from "./charts/d3Map";
import { getS3Data } from "./fetch_data";

function Diagramm6(data) {
  const [loading, setLoading] = useState(true);
  const [dataMap, setDataMap] = useState([]);

  useEffect(() => {
    getS3Data("switzerland.json").then((d) => {
      setDataMap(d);
      setLoading(false);
    });
  }, [data]);

  return (
    <div>
      {loading && <LinearProgress />}
      {!loading && <D3Map data={data} dataMap={dataMap} />}
    </div>
  );
}

export default Diagramm6;
