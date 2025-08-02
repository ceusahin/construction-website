import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import Panel from "./pages/Panel";
import LanguageProvider from "./contexts/language/LanguageProvider";
import AboutUs from "./pages/AboutUs";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hakkimizda" element={<AboutUs />} />
        <Route path="/hizmetlerimiz" element={<ServicePage />} />
        <Route path="/admin" element={<Panel />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
