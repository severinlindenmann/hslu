import React, { useEffect, useState } from "react";
import BarPlot from "./charts/barplot";
import * as d3 from "d3";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshIcon from "@mui/icons-material/Refresh";

function createBarPlotData(d) {
  return { name: d[1], value: d[2].length };
}

function Diagramm4(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parameter, setParameter] = useState("AccidentType_de");
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

  function handleClick() {
    setLoading(true);
    if (Array.isArray(props.data.currentDataSource)) {
      setData(props.data.currentDataSource);

      setData(
        d3
          .flatGroup(
            props.data.currentDataSource,
            (v) => v.length,
            (d) => d[parameter]
          )
          .map(createBarPlotData)
      );
    }
    setLoading(false);
  }
  const handleChange = (event) => {
    setParameter(event.target.value);
  };

  return (
    <>
      {loading && <LinearProgress />}

      {!loading && (
        <div style={{ width: "450px", height: "500px" }}>
          <BarPlot data={data} />
        </div>
      )}
      <div style={{ margin: "10px" }}>
        <FormControl style={{ width: "200px", margin: "10px" }}>
          <InputLabel id="demo-simple-select-label">Y-Achse</InputLabel>
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
          loading={loading}
          loadingPosition="start"
          startIcon={<RefreshIcon />}
          variant="contained"
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Generate or Refresh
        </LoadingButton>
      </div>
    </>
  );
}

export default Diagramm4;
