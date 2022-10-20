import React, { useEffect, useState } from "react";
import AntTable from "./charts/table.jsx";
import { json } from "d3";

const Playground = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    json("https://severin.fra1.digitaloceanspaces.com/hslu/AllData.json").then(
      (d) => {
        setData(d.data);
        setLoading(false);
      }
    );
    return () => undefined;
  }, []);

  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && <AntTable data={data} />}
    </div>
  );
};

export default Playground;
