import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-links">
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          <span className="separator">•</span>
          <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
        </div>
      </div>
    </footer>
  );
}
