import React from "react";
import Home from "./Home";
import ViewProject from "./subComponect/ViewProject.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:id" element={<ViewProject />} />
    </Routes>
  );
}

export default App;
