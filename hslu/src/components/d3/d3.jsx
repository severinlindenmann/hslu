import React, { useEffect, useState } from "react";
import AntTable from "./charts/table.jsx";
import { json } from "d3";
import { Paper, LinearProgress } from "@mui/material";
import Diagramm3 from "../d3/diagramm3";
import Diagramm2 from "../d3/diagramm2";
import Diagramm1 from "../d3/diagramm1";
import Diagramm4 from "../d3/diagramm4";
import Diagramm5 from "../d3/diagramm5";

const D3HSLU = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState("");

  useEffect(() => {
    json("https://severin.fra1.digitaloceanspaces.com/hslu/AllData.json").then(
      (d) => {
        setData(d.data);
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
        <p>HSLU Projekt zur Datenauswertung von Unfalldaten der Schweiz</p>
        <p>
          Die Darstellung der Webseite funktioniert am besten mit einer
          Auflösung von &lt;1600x1200 und braucht für Clientside Berechnungen
          eine gewisse Rechnerleistung.
        </p>
      </Paper>
      <Paper
        style={{ marginBottom: "20px", padding: "20px", textAlign: "center" }}
      >
        <h1>Tabelle</h1>
        <p>
          In der Tabelle kann gefiltert werden, gemäss dem Filter werden dann
          die Diagramm-Daten generiert.
        </p>
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <div style={{ overflow: "auto", maxWidth: "1200px" }}>
          {loading && <LinearProgress />}
          {!loading && <AntTable data={data} passChildData={setChildData} />}
          {/* {console.log(childData)} */}
        </div>
      </Paper>
      <Paper
        style={{ marginBottom: "20px", padding: "20px", textAlign: "center" }}
      >
        <h1>Heatmap</h1>
        <p>
          Es werden die Anzahl Unfälle dargestellt.{" "}
          <p>Dünklere Farbe = mehr Unfälle</p>
        </p>
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm1 data={childData} />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm5 data={childData} />
      </Paper>
      {/* <Paper style={{ marginBottom: "20px" }}>
        <Diagramm2 data={childData} />
      </Paper> */}
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm3 data={childData} />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <Diagramm4 data={childData} />
      </Paper>
    </>
  );
};

export default D3HSLU;
