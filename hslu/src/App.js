import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardContent from "./components/dashboard/Dashboard";
import D3HSLU from "./components/d3/d3";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardContent />} />

          <Route path="/d3" element={<D3HSLU />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
