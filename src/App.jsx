import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import Panel from "./pages/Panel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<Panel />} />
    </Routes>
  );
}

export default App;
