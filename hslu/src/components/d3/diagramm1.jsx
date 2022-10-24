import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Heatmap from "./charts/heatmap";
import LinearProgress from "@mui/material/LinearProgress";
function Diagramm2(props) {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const [variable, setVariable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      setGroup([
        ...new Set(
          props.data.currentDataSource.map((item) => item.CantonCode).sort()
        ),
      ]);
      setVariable([
        ...new Set(
          props.data.currentDataSource
            .map((item) => item.AccidentType_de)
            .sort()
        ),
      ]);

      setData(
        Array.from(
          d3.flatGroup(
            props.data.currentDataSource,
            // (v) => v.length,
            (d) => d.CantonCode,
            (d) => d.AccidentType_de
          )
        )
      );

      setLoading(false);
    }
  }, [props.data.currentDataSource]);

  return (
    <div>
      {loading && <LinearProgress />}
      {!loading && (
        <Heatmap
          width={450}
          height={450}
          data={data}
          group={group}
          variable={variable}
        />
      )}
    </div>
  );
}

export default Diagramm2;
