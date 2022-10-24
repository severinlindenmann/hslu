import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

var margin = { top: 0, right: 30, bottom: 40, left: 90 },
  width = 500 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

function BarPlot({ data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width + 200)
      .attr("height", height + 100)
      //   .append("g")
      .attr("transform", `translate(${250},${50})`);
    //   .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);

    // Add X axis
    var x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.name;
        })
      )
      .padding(0.1);

    svg.append("g").call(d3.axisLeft(y));

    //Bars
    svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("width", function (d) {
        return x(d.value);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2");
  };

  return (
    <div>
      <svg style={{ overflow: "visible" }} ref={ref}></svg>
    </div>
  );
}

export default BarPlot;
