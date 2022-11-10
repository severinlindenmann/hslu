import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import D3Map from "./charts/d3Map";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as topojson from "topojson-client";

function Diagramm6(data) {
  const [loading, setLoading] = useState(true);
  const [kantone, setKantone] = useState([]);
  const [gemeinden, setMunicpales] = useState([]);

  async function handleClick() {
    setLoading(true);
    const topo = await import(`swiss-maps/2021/ch-combined.json`);
    setMunicpales(topojson.feature(topo, topo.objects.municipalities));
    setKantone(topojson.feature(topo, topo.objects.cantons));

    setLoading(false);
  }

  return (
    <div>
      {loading && <LinearProgress />}
      {!loading && (
        <D3Map data={data} kantone={kantone} gemeinden={gemeinden} />
      )}
      <LoadingButton
        size="small"
        color="primary"
        onClick={handleClick}
        // loading={loading}
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
