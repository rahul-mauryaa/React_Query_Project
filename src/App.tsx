import Display from "./pages/Display";
import { Routes, Route } from "react-router-dom";
import AddForm from "./pages/AddForm";
import EditForm from "./pages/EditForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </>
  );
}

export default App;
