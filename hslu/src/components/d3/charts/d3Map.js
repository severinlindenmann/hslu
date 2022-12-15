import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Chip from "@mui/material/Chip";

function D3Map({ data, kantone, gemeinden, parameter, colors }) {
  const ref = useRef();

  useEffect(() => {
    if (!(data.data === "")) {
      d3.select(ref.current).selectAll("*").remove();
      draw();
    }
  }, [data]);

  const draw = () => {
    const width = 700,
      height = 500;

    const svg = d3
      .select(ref.current)
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height);

    // })
    var projection = d3
      .geoMercator()
      .center([8.3, 46.8]) // GPS of location to zoom on
      .scale(9000) // This is like the zoom
      .translate([width / 2, height / 2]);

    // Draw the map
    svg
      .append("g")
      .selectAll("path")
      .data(gemeinden.features)
      .join("path")
      .attr("fill", "#b8b8b8")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "black")
      .style("opacity", 1);

    svg
      .append("g")
      .selectAll("path")
      .data(kantone.features)
      .join("path")
      .attr("fill", "#b8b8b8")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "black")
      .style("opacity", 0.3);

    const getColor = (p, v) => {
      return colors[v];
    };

    svg
      .selectAll(".pin")
      .data(data.data.currentDataSource.slice(0, 10000))
      .enter()
      .append("circle", ".pin")
      .attr("r", 1)
      .style("fill", function (d) {
        return getColor(parameter, d[parameter]);
      })
      .attr("transform", function (d) {
        return (
          "translate(" + projection([d.x_coordinates, d.y_coordinates]) + ")"
        );
      });
  };

  return (
    <div style={{ padding: "10px" }}>
      <svg ref={ref}></svg>

      <div>
        {Object.keys(colors).map((keyName, i) => (
          <Chip
            label={keyName}
            style={{ backgroundColor: colors[keyName] }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default D3Map;
