import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Education from "../components/Education";
import { personalInfo, awards } from "../data/portfolioData";

function About() {
  return (
    <section id="about" className="section active">
      <h1 className="section-title">{personalInfo.name}</h1>
      <p className="lead">{personalInfo.subtitle}</p>

      <div className="about-content">
        <p className="text-large">{personalInfo.profile}</p>

        <div className="info-grid">
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{personalInfo.location}</span>
          </div>
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{personalInfo.availability}</span>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="languages">
          <h3>Awards & Recognition</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
            {awards.map((award) => (
              <div
                key={award.id}
                className={`badge ${award.type === "success" ? "badge-success" : award.type === "info" ? "badge-info" : ""}`}
                style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", width: "fit-content", maxWidth: "100%" }}
              >
                <strong>{award.title}</strong>
                <span style={{ opacity: 0.85, marginTop: "3px", fontWeight: 400 }}>{award.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="languages">
          <h3>Languages</h3>
          <div className="language-tags">
            {personalInfo.languages.map((lang) => (
              <span key={lang} className="tag">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionComponents = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  education: Education,
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(() => {
    return window.location.hash.slice(1) || "about";
  });

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    history.pushState(null, null, `#${sectionId}`);
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveSection(window.location.hash.slice(1) || "about");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const ActiveComponent = sectionComponents[activeSection] || About;

  return (
    <>
      <Navbar />
      <main className="container main-content">
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
        <div className="content">
          <ActiveComponent />
        </div>
      </main>
      <Footer />
    </>
  );
}
