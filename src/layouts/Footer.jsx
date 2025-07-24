import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterLastProjects from "../components/site/FooterLastProjects";
import FooterAboutUs from "../components/site/FooterAboutUs";
import FooterMenu from "../components/site/FooterMenu";
import FooterSocialMedia from "../components/site/FooterSocialMedia";

const Footer = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/footer-settings")
      .then((res) => {
        const visibleKeys = res.data
          .filter((s) => s.visible)
          .map((s) => s.sectionKey);
        setVisibleSections(visibleKeys);
      })
      .catch((err) => {
        console.error("Footer ayarları alınamadı:", err);
      });
  }, []);

  const renderedComponents = [];

  if (visibleSections.includes("about"))
    renderedComponents.push(<FooterAboutUs key="about" />);
  if (visibleSections.includes("pages"))
    renderedComponents.push(<FooterMenu key="pages" />);
  if (visibleSections.includes("contact"))
    renderedComponents.push(<FooterSocialMedia key="contact" />);
  if (visibleSections.includes("projects"))
    renderedComponents.push(<FooterLastProjects key="projects" />);

  return (
    <footer className="bg-gray-800 text-white py-10 text-center">
      <div
        className={`max-w-7xl mx-auto px-4 grid gap-40
          ${renderedComponents.length === 1 ? "grid-cols-1" : ""}
          ${renderedComponents.length === 2 ? "grid-cols-2" : ""}
          ${renderedComponents.length === 3 ? "grid-cols-3" : ""}
          ${renderedComponents.length === 4 ? "grid-cols-4" : ""}
        `}
      >
        {renderedComponents}
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BDSM DIGITAL. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
