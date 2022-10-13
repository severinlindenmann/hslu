import "./App.css";
import React from "react";
import * as d3 from "d3";
import RoadTrafficAccidentLocations from "./RoadTrafficAccidentLocations_8_Elemente.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = RoadTrafficAccidentLocations.features;
  }

  componentDidMount() {
    d3.select("body")
      .selectAll("p")
      .data(this.dataset)
      .enter()
      .append("p")
      .text(function (t) {
        return t.properties.AccidentType_de;
      })
      .style("color", "blue");
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
export default App;
