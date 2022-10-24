import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import BarChart from "./charts/barchart";
import LinearProgress from "@mui/material/LinearProgress";
function Diagramm2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.json(
      "https://severin.fra1.digitaloceanspaces.com/hslu/YearMonthCount.json"
    ).then((d) => {
      setData(d[2013]);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div>
      {loading && <LinearProgress />}
      {!loading && <BarChart width={600} height={500} data={data} />}
    </div>
  );
}

export default Diagramm2;
