import React, { useEffect, useState } from "react";
import AntTable from "../components/d3/charts/table.jsx";
import { json } from "d3";
import { Paper, LinearProgress } from "@mui/material";
import Diagramm3 from "../components/d3/diagramm3";
import Diagramm1 from "../components/d3/diagramm1";
import Diagramm4 from "../components/d3/diagramm4";
import Diagramm5 from "../components/d3/diagramm5";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import Diagramm6 from "../components/d3/diagramm6.jsx";

const D3HSLU = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState("");

  useEffect(() => {
    json("https://severin.fra1.digitaloceanspaces.com/hslu/AllData.json").then(
      (d) => {
        setData(d.data);
        setChildData({ currentDataSource: d.data });

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
            <h1>Tabelle</h1>
            <span>
              In der Tabelle kann gefiltert werden, gemäss dem Filter werden
              dann die Diagramm-Daten generiert.
            </span>
          </Paper>
          <Paper style={{ marginBottom: "20px" }}>
            <div style={{ overflow: "auto", maxWidth: "1200px" }}>
              {loading && <LinearProgress />}
              {!loading && (
                <AntTable data={data} passChildData={setChildData} />
              )}
            </div>
          </Paper>
          <Paper
            style={{
              marginBottom: "20px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1>Heatmap</h1>
            <span>
              Es werden die Anzahl Unfälle dargestellt.
              <br />
              Dünklere Farbe = mehr Unfälle
            </span>
          </Paper>
          <Paper style={{ marginBottom: "20px" }}>
            <Diagramm1 data={childData} />
          </Paper>
          <Paper
            style={{
              marginBottom: "20px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1>Linien Diagramm</h1>
            <span>Wähle deine eigene Werte für die Y-Achse aus</span>
          </Paper>
          <Paper style={{ marginBottom: "20px" }}>
            <Diagramm5 data={childData} />
          </Paper>
          <Paper
            style={{
              marginBottom: "20px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1>Map</h1>
            <span>Erstellt Cluster mit der Anzahl an Unfällen</span>
            <br />
            <span>
              Zeigt nur die ersten 10'000 Punkte wegen Performance-Problemen, am
              besten genauer Filtern mit der Tabelle oben
            </span>
          </Paper>
          <Paper style={{ marginBottom: "20px" }}>
            <Diagramm6 data={childData} />
          </Paper>
          {/* <Paper style={{ marginBottom: "20px" }}>
            <Diagramm3 data={childData} />
          </Paper> */}

          {/* <Paper style={{ marginBottom: "20px" }}>
            <Diagramm4 data={childData} />
          </Paper> */}
        </>
      )}
    </>
  );
};

export default D3HSLU;
