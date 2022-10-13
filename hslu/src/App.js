import "./App.css";
import React from "react";
import TestDiagramm from "./components/d3/testDiagramm";
import TestDiagramm2 from "./components/d3/testDiagramm2";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: green;
`;

const Cards = styled.div`
  float: left;
  margin: 30px;
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <Title>Daten Auswertung</Title>
        <Cards>
          <TestDiagramm />
        </Cards>
        <Cards>
          <TestDiagramm2 />
        </Cards>
      </Container>
    );
  }
}
export default App;
