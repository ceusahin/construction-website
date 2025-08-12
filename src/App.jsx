import { Route, Routes } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import Panel from "./pages/Panel";
import AboutUs from "./pages/AboutUs";
import ServicePage from "./pages/ServicePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import ReferencesPage from "./pages/ReferencesPage";
import ContactPage from "./pages/ContactPage";
import FaviconUpdater from "./components/site/FaviconUpdater";

function App() {
  return (
    <>
      <FaviconUpdater />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hakkimizda" element={<AboutUs />} />
        <Route path="/hizmetlerimiz" element={<ServicePage />} />
        <Route path="/projelerimiz" element={<ProjectsPage />} />
        <Route path="/projelerimiz/:id" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/referanslarimiz" element={<ReferencesPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/admin" element={<Panel />} />
      </Routes>
    </>
  );
}

export default App;
