import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddNewPage from "./components/pages/AddNewPage";
import EditPage from "./components/pages/EditPage";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/addnew" element={<AddNewPage />} />
        <Route path="/task/:taskId" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
