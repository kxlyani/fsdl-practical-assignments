import { personalInfo } from "../data/portfolioData";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container nav-container">
        <div className="nav-left">
          <a href="#" className="logo">{personalInfo.name}</a>
          <span className="subtitle">{personalInfo.title}</span>
        </div>
        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
