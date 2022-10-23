import React, { useEffect, useState } from "react";
import LeafletMap from "./charts/map";

function Diagramm4(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      console.log("test");
      if (props.data.currentDataSource.length < 1500) {
        console.log("test2");
        setData(props.data.currentDataSource);
        setLoading(false);
      }
      // d3.json(
      //   "https://severin.fra1.digitaloceanspaces.com/hslu/YearCords.json"
      // ).then((d) => {
      //   setData(
      //     d.data.filter(function (el) {
      //       return (
      //         el.AccidentYear === "2013" &&
      //         el.RoadType_de === "Nebenstrasse" &&
      //         el.CantonCode === "AG"
      //       );
      //     })
      //   );

      // });
      // return () => undefined;
    }
  }, [data]);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {loading && <div>Map is loading...</div>}
      {!loading && <LeafletMap data={data} />}
    </div>
  );
}

export default Diagramm4;
