import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import MainPage from "./pages/MainPage";
import Panel from "./pages/Panel";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Panel />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
