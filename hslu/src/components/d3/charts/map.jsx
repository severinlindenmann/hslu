import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function LeafletMap({ data, year }) {
  const position = [47.04, 8.31];
  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {};

  return (
    <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((d) => {
        return (
          <Marker key={d.index} position={[d.y_coordinates, d.x_coordinates]}>
            <Popup>
              {d.AccidentYear} <br />
              {d.CantonCode}
              <br />
              {d.RoadType_de}
              <br />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default LeafletMap;
