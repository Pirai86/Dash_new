import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Projects_Page from "./Components/Projects_Page";
import Login from "./Components/Login";
import { GlobalProvider } from "./Components/Global";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Projects_Page />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
