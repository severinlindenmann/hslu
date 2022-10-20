import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import LeafletMap from "./charts/map";

function Diagramm4() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.json(
      "https://severin.fra1.digitaloceanspaces.com/hslu/YearCords.json"
    ).then((d) => {
      setData(
        d.data.filter(function (el) {
          return (
            el.AccidentYear === "2013" &&
            el.RoadType_de === "Nebenstrasse" &&
            el.CantonCode === "AG"
          );
        })
      );
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {loading && <div>Map is loading...</div>}
      {!loading && <LeafletMap data={data} />}
    </div>
  );
}

export default Diagramm4;
