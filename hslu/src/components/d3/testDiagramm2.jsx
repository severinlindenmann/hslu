import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { getS3Data } from "./fetch_data";

const url =
  "https://severin.fra1.digitaloceanspaces.com/hslu/RoadTrafficAccidentLocations_8_Elemente.json";

const TestDiagramm2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // getS3Data(url).then((e) => {
    //   setData(e.features);
    // });

    d3.select("#Diagramm2")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(function (t) {
        return t.properties.AccidentType_de;
      })
      .style("color", "blue");
  });

  return <div id="Diagramm2"></div>;
  // ref={myRef}
};

export default TestDiagramm2;
