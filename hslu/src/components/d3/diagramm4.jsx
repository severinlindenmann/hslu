import React, { useEffect, useState } from "react";
import LeafletMap from "./charts/map";

function Diagramm4(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toBig, setToBig] = useState(true);

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      if (props.data.currentDataSource.length < 1500) {
        setToBig(false);
        setData(props.data.currentDataSource);

        setLoading(false);
      }
    }
  }, [data]);

  return (
    <div style={{ width: "400px", height: "400px", padding: "20px" }}>
      {!toBig ? (
        <>
          {loading && <div>Map is loading...</div>}
          {!loading && <LeafletMap data={data} />}
        </>
      ) : (
        <div>
          Datefilter is to big, try to filter a bit more (Performance Issues)
        </div>
      )}
    </div>
  );
}

export default Diagramm4;
