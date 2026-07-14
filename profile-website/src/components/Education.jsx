import { education } from "../data/portfolioData";

const GraduationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default function Education() {
  return (
    <section id="education" className="section active">
      <h2 className="section-title">Education</h2>
      <div className="education-container">
        {education.map((edu) => (
          <div key={edu.id} className="education-card">
            <div className="education-icon">
              {edu.icon === "graduation" ? <GraduationIcon /> : <BookIcon />}
            </div>
            <div className="education-content">
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.institution}</p>
              <div className="education-meta">
                <span className="education-date">{edu.date}</span>
                <span className="education-grade">{edu.grade}</span>
              </div>
              {edu.coursework.length > 0 && (
                <div style={{ marginTop: "14px" }}>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 500 }}>
                    Relevant Coursework
                  </p>
                  <div className="skill-tags">
                    {edu.coursework.map((course) => (
                      <span key={course} className="skill-tag" style={{ fontSize: "12px", padding: "4px 10px" }}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
