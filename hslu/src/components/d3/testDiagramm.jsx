import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Button from "@mui/material/Button";
import { getS3Data } from "./fetch_data";

const url =
  "https://severin.fra1.digitaloceanspaces.com/hslu/YearMonthCount.json";

const TestDiagramm = (props) => {
  const { width, height } = props;

  const [data, setData] = useState([]);
  const [year, setYear] = useState(2013);

  const d3Container = useRef(null);

  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  // const scaleX = d3
  //   .scaleBand()
  //   .domain(data.map(({ label }) => label))
  //   .range([0, width]);

  useEffect(() => {
    getS3Data(url).then((e) => {
      setData(e[year]);
    });

    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Bind D3 data
      const update = svg
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d, index) {
            return index;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, index) {
          return x(index);
        })
        .attr("y", function (d, index) {
          return y(d);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d);
        })
        .attr("fill", "#69b3a2");

      // Enter new D3 elements
      // update
      //   .enter()
      //   .append("text")
      //   .attr("x", (d, i) => i * 25)
      //   .attr("y", 40)
      //   .style("font-size", 24)
      //   .text((d) => d);

      // // Update existing D3 elements
      // update.attr("x", (d, i) => i * 40).text((d) => d);

      // // Remove old D3 elements
      // update.exit().remove();
    }
  }, [data]);

  return (
    <>
      <svg width={width} height={height} ref={d3Container} />
      <Button
        onClick={() => {
          // data
          data.map((d, index) => {
            console.log(d, index + 1);
          });
        }}
        variant="contained"
      >
        Contained
      </Button>
    </>
  );
};

export default TestDiagramm;
