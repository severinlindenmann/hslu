import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import CustomChart from "./customchart";

function Diagramm2() {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const [variable, setVariable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    d3.json(
      "https://severin.fra1.digitaloceanspaces.com/hslu/UnfallTypKantonYear.json"
    ).then((d) => {
      setGroup([...new Set(d.data.map((item) => item.group))]);
      setVariable([...new Set(d.data.map((item) => item.variable))]);
      setData(d.data);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && (
        <CustomChart
          width={500}
          height={500}
          data={data}
          group={group}
          variable={variable}
        />
      )}
    </div>
  );
}

export default Diagramm2;
