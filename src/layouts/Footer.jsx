import React, { useEffect, useState } from "react";
import FooterLastProjects from "../components/site/FooterLastProjects";
import FooterAboutUs from "../components/site/FooterAboutUs";
import FooterMenu from "../components/site/FooterMenu";
import FooterSocialMedia from "../components/site/FooterSocialMedia";
import axiosInstance from "../api/axiosInstance";

const Footer = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/footer-settings")
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

  const gridColsClass =
    renderedComponents.length === 1
      ? "md:grid-cols-1"
      : renderedComponents.length === 2
      ? "md:grid-cols-2"
      : renderedComponents.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <footer className="bg-gray-800 text-white py-10 text-center">
      <div
        className={`max-w-7xl mx-auto px-4 grid gap-10 grid-cols-1 sm:grid-cols-1 ${gridColsClass}`}
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
