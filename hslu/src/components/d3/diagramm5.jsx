import React, { useEffect, useState } from "react";
import BarPlot from "./charts/barplot";
import * as d3 from "d3";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function createBarPlotData(d) {
  return { name: d[1], value: d[2].length };
}

function Diagramm4(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parameter, setParameter] = useState("");

  const handleChange = (event) => {
    // d3.select(ref.current).selectAll("*").remove();
    // setYear(event.target.value);
    // setData(rawData[event.target.value]);
    // createDiagramm(data);
  };

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      setData(props.data.currentDataSource);
      setLoading(false);

      setData(
        d3
          .flatGroup(
            props.data.currentDataSource,
            (v) => v.length,
            (d) => d.AccidentType_de
          )
          .map(createBarPlotData)
      );
    }
  }, [props.data.currentDataSource]);

  return (
    <>
      {loading && <LinearProgress />}

      {!loading && (
        <div style={{ width: "500px", height: "500px" }}>
          <BarPlot data={data} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parameter}
              label="Year"
              onChange={handleChange}
            >
              {Object.keys(data).map((d) => {
                return (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  );
}

export default Diagramm4;
