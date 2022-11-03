import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function Heatmap({ width, height, data, group, variable }) {
  const ref = useRef();

  const myGroups = group;
  const myVars = variable;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width + 200)
      .attr("height", height + 100)
      //   .append("g")
      .attr("transform", `translate(${50},${50})`);

    //   .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    draw();
  }, [data, group, variable]);

  const draw = () => {
    const svg = d3.select(ref.current);

    const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
    svg
      .append("g")
      .attr("transform", `translate(${width},0 )`)
      .call(d3.axisRight(y));

    const myColor = d3
      .scaleLinear()
      .range(["white", "#081cff"])
      .domain([1, 1000]);

    svg
      .selectAll()
      .data(data, function (d) {
        return d[0] + ":" + d[1];
      })
      .join("rect")
      .attr("x", function (d) {
        return x(d[0]);
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) {
        return myColor(d[2].length);
      });
  };

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default Heatmap;
