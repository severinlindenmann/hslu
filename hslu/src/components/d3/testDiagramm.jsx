import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import RoadTrafficAccidentLocationsTest from "./RoadTrafficAccidentLocations_8_Elemente.json";
import Button from "@mui/material/Button";

const TestDiagramm = (props) => {
  const { width, height } = props;

  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
          for instance inserting elements into the DOM using D3 */
  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Bind D3 data
      const update = svg.append("g").selectAll("text").data(data);

      // Enter new D3 elements
      update
        .enter()
        .append("text")
        .attr("x", (d, i) => i * 25)
        .attr("y", 40)
        .style("font-size", 24)
        .text((d) => d);

      // Update existing D3 elements
      update.attr("x", (d, i) => i * 40).text((d) => d);

      // Remove old D3 elements
      update.exit().remove();
    }
  }, [data]);

  return (
    <>
      <svg width={width} height={height} ref={d3Container} />
      <Button
        onClick={() => {
          setData([...data, 1]);
        }}
        variant="contained"
      >
        Contained
      </Button>
    </>
  );
};

export default TestDiagramm;
