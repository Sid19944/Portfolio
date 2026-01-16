import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-black text-white overflow-auto">
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </div>
);
