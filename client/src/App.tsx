import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div
      style={{ backgroundColor: "#efefef" }}
      className="max-h-screen h-screen overflow-hidden w-screen"
    >
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
