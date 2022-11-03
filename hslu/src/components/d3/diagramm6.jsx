import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import D3Map from "./charts/d3Map";
import { getS3Data } from "./fetch_data";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";

function Diagramm6(data) {
  const [loading, setLoading] = useState(false);
  const [dataMap, setDataMap] = useState([]);

  async function handleClick() {
    setLoading(true);
    getS3Data("switzerland.json").then((d) => {
      setDataMap(d);
    });
    console.log("1");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("2");
    setLoading(false);
  }

  return (
    <div>
      {loading && <LinearProgress />}
      {/* {!loading && <D3Map data={data} dataMap={dataMap} />} */}
      <LoadingButton
        size="small"
        color="primary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<RefreshIcon />}
        variant="contained"
        style={{ margin: "10px" }}
      >
        Generate or Refresh
      </LoadingButton>
    </div>
  );
}

export default Diagramm6;
