import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Heatmap from "./charts/heatmap";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";

function Diagramm2(props) {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const [variable, setVariable] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
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

    setLoading(false);
  }

  // useEffect(() => {
  //   if (Array.isArray(props.data.currentDataSource)) {
  //     setGroup([
  //       ...new Set(
  //         props.data.currentDataSource.map((item) => item.CantonCode).sort()
  //       ),
  //     ]);
  //     setVariable([
  //       ...new Set(
  //         props.data.currentDataSource
  //           .map((item) => item.AccidentType_de)
  //           .sort()
  //       ),
  //     ]);

  //     setData(
  //       Array.from(
  //         d3.flatGroup(
  //           props.data.currentDataSource,
  //           (v) => v.length,
  //           (d) => d.CantonCode,
  //           (d) => d.AccidentType_de
  //         )
  //       )
  //     );

  //     setLoading(false);
  //   }
  // }, [props.data.currentDataSource]);

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
      <LoadingButton
        size="small"
        color="primary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<RefreshIcon />}
        variant="contained"
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      >
        Generate or Refresh
      </LoadingButton>
    </div>
  );
}

export default Diagramm2;
