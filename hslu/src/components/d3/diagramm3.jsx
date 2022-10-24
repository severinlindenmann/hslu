import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getS3Data } from "./fetch_data";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

var margin = { top: 5, right: 0, bottom: 0, left: 0 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const url =
  "https://severin.fra1.digitaloceanspaces.com/hslu/YearMonthCount.json";

const Diagramm3 = () => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [year, setYear] = useState("");
  const ref = useRef();

  const createDiagramm = (data) => {
    const svg = d3.select(ref.current);
    //   .append("svg")
    //   .attr("width", "500")
    //   .attr("height", "500");

    var margin = 100,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + 40 + "," + 40 + ")");

    xScale.domain(
      data.map(function (d, index) {
        return index + 1;
      })
    );
    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d;
      }),
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(function (d) {
            return d;
          })
          .ticks(10)
      )
      .append("text")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("value");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d, index) {
        return xScale(index + 1);
      })
      .attr("y", function (d) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - yScale(d);
      });
  };
  const handleChange = (event) => {
    d3.select(ref.current).selectAll("*").remove();
    setYear(event.target.value);
    setData(rawData[event.target.value]);
    createDiagramm(data);
    // getS3Data(url).then((d) => {
    //   // let svg = d3.select("svg").remove();
    //   // svg.selectAll("*").remove();

    // });
  };
  useEffect(() => {
    getS3Data(url).then((d) => {
      setRawData(d);
      setYear("2013");
      setData(d[2013]);
      createDiagramm(d[2013]);
    });
  }, []);

  return (
    <>
      <h2>{year}</h2>
      <svg width="500" height="500" ref={ref}></svg>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          onChange={handleChange}
        >
          {Object.keys(rawData).map((d) => {
            return (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default Diagramm3;
