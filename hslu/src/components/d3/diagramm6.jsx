import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import D3Map from "./charts/d3Map";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as topojson from "topojson-client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const templateColors = [
  "#3957ff",
  "#d3fe14",
  "#c9080a",
  "#fec7f8",
  "#0b7b3e",
  "#0bf0e9",
  "#c203c8",
  "#fd9b39",
  "#888593",
  "#906407",
  "#98ba7f",
  "#fe6794",
  "#10b0ff",
  "#ac7bff",
  "#fee7c0",
  "#964c63",
  "#1da49c",
  "#0ad811",
  "#bbd9fd",
  "#fe6cfe",
  "#297192",
  "#d1a09c",
  "#78579e",
  "#81ffad",
  "#739400",
  "#ca6949",
  "#d9bf01",
  "#646a58",
  "#d5097e",
  "#bb73a9",
  "#ccf6e9",
  "#9cb4b6",
  "#b6a7d4",
  "#9e8c62",
  "#6e83c8",
  "#01af64",
  "#a71afd",
  "#cfe589",
  "#d4ccd1",
  "#fd4109",
  "#bf8f0e",
  "#2f786e",
  "#4ed1a5",
];

function Diagramm6(data) {
  const [loading, setLoading] = useState(true);
  const [kantone, setKantone] = useState([]);
  const [gemeinden, setMunicpales] = useState([]);
  const [parameter, setParameter] = useState("AccidentType_de");
  const [colors, setColors] = useState({});
  const parameterObjects = [
    "AccidentType_de",
    "AccidentSeverityCategory_de",
    "AccidentInvolvingPedestrian",
    "AccidentInvolvingBicycle",
    "AccidentInvolvingMotorcycle",
    "RoadType_de",
    "CantonCode",
    "AccidentYear",
    "AccidentMonth",
    "AccidentHour",
    "AccidentWeekDay_en",
  ];

  async function handleClick() {
    setLoading(true);
    const topo = await import(`swiss-maps/2021/ch-combined.json`);
    setMunicpales(topojson.feature(topo, topo.objects.municipalities));
    setKantone(topojson.feature(topo, topo.objects.cantons));

    setLoading(false);

    let unique = [
      ...new Set(data.data.currentDataSource.map((item) => item[parameter])),
    ];

    const colorDict = new Object();
    unique.forEach((e, index) => {
      colorDict[e] = templateColors[index];
    });
    setColors(colorDict);
  }

  const handleChange = (event) => {
    setParameter(event.target.value);
  };

  return (
    <div>
      {loading && <LinearProgress />}
      {!loading && (
        <D3Map
          data={data}
          kantone={kantone}
          gemeinden={gemeinden}
          parameter={parameter}
          colors={colors}
        />
      )}
      <FormControl style={{ width: "200px", margin: "10px" }}>
        <InputLabel id="demo-simple-select-label">Point Color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={parameter}
          label="Year"
          onChange={handleChange}
        >
          {parameterObjects.map((d) => {
            return (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
