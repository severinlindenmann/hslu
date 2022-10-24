import React, { useEffect, useState } from "react";
import BarPlot from "./charts/barplot";
import * as d3 from "d3";

function createBarPlotData(d) {
  return { name: d[1], value: d[2].length };
}

function Diagramm4(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      setData(props.data.currentDataSource);
      setLoading(false);

      setData(
        // Array.from(
        d3
          .flatGroup(
            props.data.currentDataSource,
            (v) => v.length,
            (d) => d.AccidentType_de
            // )
          )
          .map(createBarPlotData)
      );

      // console.log(data[0]);
    }
  }, [props.data.currentDataSource]);

  return (
    <div style={{ width: "500px", height: "450px" }}>
      {loading && <div>Barplot is loading...</div>}
      {!loading && <BarPlot data={data} />}
    </div>
  );
}

export default Diagramm4;
