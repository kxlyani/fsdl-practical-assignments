import { skills } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" className="section active">
      <h2 className="section-title">Skills & Technologies</h2>
      <div className="skills-container">
        {skills.map((group) => (
          <div key={group.category} className="skill-category">
            <h3>{group.category}</h3>
            <div className="skill-tags">
              {group.items.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
