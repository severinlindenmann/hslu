import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import geocluster from "geocluster";

function D3Map({ data, dataMap }) {
  const ref = useRef();
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (!(data.data === "")) {
      d3.select(ref.current).selectAll("*").remove();
      draw();
      setDataPoints(
        geocluster(
          data.data.currentDataSource.map((p) => [
            p.x_coordinates,
            p.y_coordinates,
          ]),
          0.2
        )
      );
    }
  }, [data]);

  const draw = () => {
    console.log(dataPoints.length);
    const width = 500,
      height = 300;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    var projection = d3
      .geoMercator()
      .center([8.53, 46.9]) // GPS of location to zoom on
      .scale(5000) // This is like the zoom
      .translate([width / 2, height / 2]);

    // Draw the map
    svg
      .append("g")
      .selectAll("path")
      .data(dataMap.features)
      .join("path")
      .attr("fill", "#b8b8b8")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "black")
      .style("opacity", 0.3);

    svg
      .selectAll("myCircles")
      .data(dataPoints)
      .join("circle")
      .attr("cx", function (d) {
        return projection(d.centroid)[0];
      })
      .attr("cy", function (d) {
        return projection(d.centroid)[1];
      })

      .attr("r", (d) => Math.sqrt(d.elements.length))
      .style("fill", "69b3a2")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("fill-opacity", 0.3);
  };

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default D3Map;
