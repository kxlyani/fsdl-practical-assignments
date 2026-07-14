import { experience } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="section active">
      <h2 className="section-title">Work Experience</h2>
      <div className="timeline">
        {experience.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <div className="timeline-header">
                <div>
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
                </div>
                <span className="date">{item.date}</span>
              </div>
              <ul className="timeline-list">
                {item.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              {item.tags.length > 0 && (
                <div className="tech-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
