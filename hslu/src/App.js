import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardContent from "./components/dashboard/Dashboard";
import Playground from "./components/d3/d3";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardContent />} />

          <Route path="/d3" element={<Playground />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
