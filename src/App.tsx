import React from "react";
import Display from "./pages/Display";
import { Routes, Route } from "react-router-dom";
import AddForm from "./pages/AddForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/add" element={<AddForm />} />
      </Routes>
    </>
  );
}

export default App;
