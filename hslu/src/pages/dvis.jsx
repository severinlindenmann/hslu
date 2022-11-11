import React, { useEffect, useState } from "react";
import { json } from "d3";
import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Line, G2, Pie } from "@ant-design/plots";

const HSLUGIS = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [configDiagramm1, setConfigDiagramm1] = useState([]);
  const [configDiagramm2, setConfigDiagramm2] = useState([]);
  const [year, setYear] = useState("alle");
  const [years, setYears] = useState([]);
  const G = G2.getEngine("canvas");

  function findOcc(arr, key) {
    let arr2 = [];

    arr.forEach((x) => {
      // Checking if there is any object in arr2
      // which contains the key value
      if (
        arr2.some((val) => {
          return val[key] === x[key];
        })
      ) {
        // If yes! then increase the occurrence by 1
        arr2.forEach((k) => {
          if (k[key] === x[key]) {
            k["count"]++;
          }
        });
      } else {
        // If not! Then create a new object initialize
        // it with the present iteration key's value and
        // set the occurrence to 1
        let a = {};
        a[key] = x[key];
        a["count"] = 1;
        arr2.push(a);
      }
    });

    return arr2;
  }

  const updateDiagramms = (currentData) => {
    const m = new Map();
    currentData.forEach(({ AccidentType_de, AccidentMonth }) => {
      // Create a key with values that we want to group by
      // A list of key-value pairs is chosen to make use of `Object.fromEntries` later
      const hash = JSON.stringify([
        ["name", AccidentType_de],
        ["value", AccidentMonth],
      ]);
      m.set(hash, (m.get(hash) || 0) + 1);
    });

    let diagramm1Data = [...m].map(([rec, count]) => ({
      ...Object.fromEntries(JSON.parse(rec)),
      count,
    }));

    setConfigDiagramm1({
      data: diagramm1Data,
      xField: "value",
      yField: "count",
      seriesField: "name",

      yAxis: {
        title: {
          text: "Anzahl Unfälle",
          style: {
            fontSize: 12,
          },
        },
      },

      xAxis: {
        title: {
          text: "Monat",
          style: {
            fontSize: 12,
          },
        },
      },
      legend: {
        layout: "vertical",
        position: "right",
      },
      smooth: true,

      animation: {
        appear: {
          animation: "path-in",
          duration: 5000,
        },
      },
    });

    setConfigDiagramm2({
      appendPadding: 10,
      data: findOcc(currentData, "RoadType_de"),
      angleField: "count",
      colorField: "RoadType_de",
      radius: 0.75,
      legend: false,
      label: {
        type: "spider",
        labelHeight: 40,
        formatter: (data, mappingData) => {
          const group = new G.Group({});
          group.addShape({
            type: "circle",
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              r: 5,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 10,
              y: 8,
              text: `${data.RoadType_de}`,
              fill: mappingData.color,
            },
          });
          group.addShape({
            type: "text",
            attrs: {
              x: 0,
              y: 25,
              text: `${Number((data.percent * 100).toFixed(1))}%`,
              fill: "rgba(0, 0, 0, 0.65)",
              fontWeight: 700,
            },
          });
          return group;
        },
      },
      interactions: [
        {
          type: "element-selected",
        },
        {
          type: "element-active",
        },
      ],
    });
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "year":
        setYear(event.target.value);
        if (event.target.value === "alle") {
          setYear(event.target.value);
          updateDiagramms(data);
        } else {
          updateDiagramms(
            data.filter((x) => x.AccidentYear === event.target.value)
          );
        }

        break;

      default:
        console.log("Error with handleChange");
    }
  };

  useEffect(() => {
    json("https://severin.fra1.digitaloceanspaces.com/hslu/AllData.json").then(
      (d) => {
        setData(d.data);
        setYears([...new Set(d.data.map((item) => item["AccidentYear"]))]);
        updateDiagramms(d.data);
        setLoading(false);
      }
    );
    return () => undefined;
  }, []);

  return (
    <>
      <Paper
        style={{ marginBottom: "20px", padding: "20px", textAlign: "center" }}
      >
        <h1>W.MDSE_VSGIS05</h1>
        <span>
          HSLU Projekt zur Datenauswertung von Unfalldaten der Schweiz
        </span>
        <br />

        <br />
        <span>
          Die Darstellung der Webseite funktioniert am besten mit einer
          Auflösung von &lt;1600x1080 und braucht für Clientside Berechnungen
          eine gewisse Rechnerleistung.
        </span>
      </Paper>
      {loading ? (
        <Paper
          style={{ marginBottom: "20px", padding: "20px", textAlign: "center" }}
        >
          <h2>Loading Data, please wait...</h2>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <>
          <Paper
            style={{
              marginBottom: "20px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Chip label="Facts & Figures" />

            <table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td>AccidentYear (2011-2022):</td>
                  <td>
                    {[...new Set(data.map((d) => d.AccidentYear))].length}
                  </td>
                </tr>
                <tr>
                  <td>AccidentType_de:</td>
                  <td>
                    {[...new Set(data.map((d) => d.AccidentType_de))].length}
                  </td>
                </tr>
                <tr>
                  <td>AccidentSeverityCategory_de:</td>
                  <td>
                    {
                      [
                        ...new Set(
                          data.map((d) => d.AccidentSeverityCategory_de)
                        ),
                      ].length
                    }
                  </td>
                </tr>
                <tr>
                  <td>RoadType_de:</td>
                  <td>{[...new Set(data.map((d) => d.RoadType_de))].length}</td>
                </tr>

                <tr>
                  <td>Datenquelle:</td>
                  <td>
                    <a href="https://opendata.swiss/dataset/strassenverkehrsunfalle-mit-personenschaden">
                      Strassenverkehrsunfälle
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </Paper>

          <Paper
            style={{
              marginBottom: "20px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1>Diagramm 1</h1>
            <Box>
              <FormControl>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  value={year}
                  label="Year"
                  onChange={handleChange}
                >
                  <MenuItem key={99} value={"alle"}>
                    Alle
                  </MenuItem>
                  {years.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>
          <Paper style={{ marginBottom: "20px" }}>
            <Line style={{ padding: "20px" }} {...configDiagramm1} />
          </Paper>

          <Paper style={{ marginBottom: "20px" }}>
            {console.log(configDiagramm2)}
            <Pie style={{ padding: "20px" }} {...configDiagramm2} />
          </Paper>
        </>
      )}
    </>
  );
};

export default HSLUGIS;
