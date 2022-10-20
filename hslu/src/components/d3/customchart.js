import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function CustomChart({ width, height, data, group, variable }) {
  const ref = useRef();

  const myGroups = group;
  const myVars = variable;
  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width + 100)
      .attr("height", height + 100)
      //   .append("g")
      .attr("transform", `translate(${50},${50})`);
    //   .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    // Build X scales and axis:
    const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Build X scales and axis:
    const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
    svg
      .append("g")
      .attr("transform", `translate(${width},0 )`)
      .call(d3.axisRight(y));

    // Build color scale
    const myColor = d3
      .scaleLinear()
      .range(["white", "#69b3a2"])
      .domain([1, 100]);

    svg
      .selectAll()
      .data(data, function (d) {
        return d.group + ":" + d.variable;
      })
      .join("rect")
      .attr("x", function (d) {
        return x(d.group);
      })
      .attr("y", function (d) {
        return y(d.variable);
      })
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return myColor(d.value);
      });
  };

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default CustomChart;
