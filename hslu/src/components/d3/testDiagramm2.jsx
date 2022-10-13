import React, { useEffect } from "react";
import * as d3 from "d3";
import RoadTrafficAccidentLocationsTest from "./RoadTrafficAccidentLocations_8_Elemente.json";

const TestDiagramm2 = () => {
  // const [data, setData] = useState(RoadTrafficAccidentLocationsTest.features);
  const data = RoadTrafficAccidentLocationsTest.features;
  // const myRef = createRef();

  useEffect(() => {
    d3.select(".testDiagramm2")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(function (t) {
        return t.properties.AccidentType_de;
      })
      .style("color", "blue");
  });

  return <div className="testDiagramm2"></div>;
  // ref={myRef}
};

export default TestDiagramm2;