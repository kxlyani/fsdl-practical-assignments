export const personalInfo = {
  name: "Kalyani Patil",
  title: "Computer Engineer",
  subtitle: "B.Tech Computer Engineering · Full Stack & Flutter Developer",
  profile:
    "Computer Engineering undergraduate (B.Tech 2027, PCCOE Pune) with 10+ months of production internship experience building Java Spring Boot APIs and Flutter mobile applications. Placed 4th among 100+ national teams at Alphabyte 2.0 National Hackathon. Completed coursework in Machine Learning, Neural Networks, Generative AI, Cloud Computing, and Operating Systems.",
  highlights: ["Java Spring Boot", "Flutter", "React JS"],
  location: "Pune, India",
  availability: "Open to opportunities",
  email: "patil.kalyani1612@gmail.com",
  phone: "+91 84594 26332",
  github: "https://github.com/kxlyani",
  linkedin: "https://www.linkedin.com/in/kalyani-8613da5/",
  languages: [
    "English (C2 – Proficient)",
    "Marathi (Native)",
    "Hindi (C2 – Proficient)",
    "German (A1 – Beginner)",
    "Spanish (A1 – Beginner)",
  ],
};

export const awards = [
  {
    id: 1,
    title: "4th Place — Alphabyte 2.0 National Hackathon",
    detail: "Top 4% out of 100+ national teams · PCCoE Pune · Mar 2025",
    type: "success",
  },
  {
    id: 2,
    title: "Best Mentor (peer-awarded)",
    detail: "GDGC PCCOE Flutter Workshop 2024 — recognised by 50+ participants for live coding mentorship",
    type: "info",
  },
  {
    id: 3,
    title: "3 Tech-Event Sponsorships Secured",
    detail: "Strategic outreach as Marketing Team Member, ACM-W PCCOE, 2024",
    type: "default",
  },
];

export const experience = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "Therayu MedTech Solutions",
    date: "Dec 2025 – Mar 2026",
    bullets: [
      "Developed 8+ production REST APIs using Java Spring Boot and PostgreSQL across 5 core modules of a live patient-facing application, enabling real-time data synchronisation between client and backend.",
      "Eliminated a class of UI state bugs by refactoring 30+ Flutter screens to strict BLoC architecture, reducing regression-testing overhead for a 4-person engineering team each sprint.",
      "Owned full frontend-to-database feature delivery within 2-week sprint cycles — from DB schema design to API contract to Flutter UI — collaborating with senior engineers during daily standups and code reviews.",
      "Standardised API testing workflows in Postman, eliminating manual re-testing steps and unblocking faster release cycles; integrated CI/CD pipeline hooks for automated build validation.",
      "Traced and resolved 15+ end-to-end bugs spanning API response payloads through Flutter/Dart UI layers, producing reproducible defect reports.",
      "Containerised local dev environment with Docker, aligning team workflows and eliminating environment-mismatch defects across the sprint.",
    ],
    tags: ["Java", "Spring Boot", "PostgreSQL", "Flutter", "BLoC", "Docker", "Postman", "CI/CD"],
  },
  {
    id: 2,
    title: "Flutter Developer Intern",
    company: "Therayu MedTech Solutions",
    date: "Jun 2025 – Oct 2025",
    bullets: [
      "Applied BLoC state management across a growing feature set, enforcing strict separation of business logic from UI layers and maintaining zero architectural regressions over 3 consecutive development cycles.",
      "Applied Docker containerisation to streamline deployment and maintain reproducible environments across the team.",
      "Collaborated in a Git-based Agile workflow using feature branches and PR reviews as part of a 5-person cross-functional team; participated in testing, troubleshooting, and iterative delivery.",
    ],
    tags: ["Flutter", "Dart", "BLoC", "Docker", "Git", "Agile"],
  },
  {
    id: 3,
    title: "Flutter Domain Head",
    company: "Google Developer Groups on Campus, PCCOE",
    date: "May 2025 – Present",
    bullets: [
      "Defined technical roadmap for the Flutter domain, establishing a project-based curriculum adopted by 60+ active members for the 2025–26 academic year.",
      "Led design and development of the IR Cell Mobile App (Flutter + Firebase), targeting 1,000+ students and faculty with role-based access, real-time notifications, and document sharing.",
      "Oversee a team of 8+ developers across multiple real-world projects, enforcing Git, GitHub Actions, and CI workflows; serve as go-to technical reviewer triaging 30+ live coding issues per session.",
    ],
    tags: ["Flutter", "Firebase", "GitHub Actions", "CI/CD"],
  },
  {
    id: 4,
    title: "Flutter Executive",
    company: "Google Developer Groups on Campus, PCCOE",
    date: "Aug 2024 – May 2025",
    bullets: [
      "Served as primary technical mentor across a 5-day Flutter workshop series for 50+ participants, resolving 30+ live coding blockers and guiding developers from zero experience to a deployed mobile application.",
      "Co-developed an inclusive learning application for Deaf and Mute students, iterated through 3 feedback-driven update cycles with 2 teachers and 20 students in a live school environment.",
      "Recognised by GDGC PCCOE peers as best mentor for the Flutter workshop series.",
    ],
    tags: ["Flutter", "Mentorship", "Workshop"],
  },
  {
    id: 5,
    title: "Marketing Team Member",
    company: "ACM-W, PCCOE",
    date: "Aug 2024 – Jan 2025",
    bullets: [
      "Secured 3 sponsorships (food chains and irrigation company) through targeted outreach, funding tech events across two semesters.",
      "Executed 5+ promotional campaigns with a team of 5, increasing event participation through posters, reels, and cross-platform social media content.",
    ],
    tags: [],
  },
];

export const projects = [
  {
    id: 1,
    title: "CollabFlow — Role-Based Project Management System",
    date: "2025",
    description:
      "Built a full-stack web application with a React JS frontend and Node.js/Express backend, featuring role-based dashboards (Admin/Member) with project overviews, task stats, and activity summaries. Implemented JWT authentication with email verification, password reset, and role-based access control. Designed modular RESTful APIs for projects, tasks, subtasks, notes, chat, and notifications.",
    tags: ["React JS", "Node.js", "Express", "MongoDB", "JWT"],
    badges: [{ label: "Full Stack", type: "info" }],
    github: "https://github.com/kxlyani",
  },
  {
    id: 2,
    title: "Project Management REST API",
    date: "2025",
    description:
      "Engineered a production-ready RESTful backend with full CRUD for projects, tasks, subtasks, and notes, including priority levels, due dates, tags, and file attachments. Implemented JWT authentication with refresh tokens, email verification, and role-based access control; applied input validation, error-handling middleware, and auth-endpoint rate limiting against brute-force attacks.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    badges: [{ label: "Backend", type: "default" }],
    github: "https://github.com/kxlyani",
  },
  {
    id: 3,
    title: "Crisis Management App — Alphabyte 2.0 Hackathon",
    date: "Mar 2025",
    description:
      "Placed 4th out of 100+ national teams (Top 4%). Built a real-time disaster-response Flutter app featuring live alert feeds, donation flow integration, and a global disaster map within a single hackathon cycle. Code architecture explicitly praised by judges for scalability and clarity.",
    tags: ["Flutter", "Firebase", "Real-time APIs"],
    badges: [
      { label: "4th / 100+ Teams", type: "success" },
      { label: "National Level", type: "default" },
    ],
    github: "https://github.com/kxlyani/relief-link",
  },
  {
    id: 4,
    title: "International Relations Cell Mobile App — PCCOE",
    date: "Apr 2025",
    description:
      "Architected a role-based mobile platform with user auth, real-time notifications, and document sharing; designed to scale to 1,000+ students and faculty. Implemented Firebase Cloud Functions for backend logic, mirroring serverless/microservices patterns used in cloud-native production systems.",
    tags: ["Flutter", "Firebase", "Cloud Functions", "REST APIs"],
    badges: [
      { label: "1000+ Expected Users", type: "info" },
      { label: "In Development", type: "default" },
    ],
    github: "https://github.com/kxlyani",
  },
  {
    id: 5,
    title: "Inclusive Learning App for Deaf & Mute Students",
    date: "2024",
    description:
      "Co-developed an accessibility-focused mobile learning application with end-to-end ownership from design to deployment. Validated with 2 teachers and 20 students and iterated across 3 feedback-driven update cycles in a live school environment.",
    tags: ["Flutter", "Accessibility", "Mobile"],
    badges: [{ label: "Community Impact", type: "success" }],
    github: "https://github.com/kxlyani",
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Java (Spring Boot)", "Python", "Dart", "JavaScript (ES6+)", "C/C++", "SQL", "TypeScript (learning)"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Dart", "BLoC State Management", "Firebase"],
  },
  {
    category: "Backend & APIs",
    items: ["REST API Design & Integration", "Node.js", "Express", "JWT Authentication", "Rate Limiting", "FastAPI (learning)", "PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    category: "Web & Frontend",
    items: ["React JS", "HTML5", "CSS3", "Bootstrap", "jQuery", "Context API", "Responsive Design", "Angular (familiar)"],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS (EC2, S3)", "Docker", "Kubernetes (familiar)", "GitHub Actions", "CI/CD Pipelines", "SaaS/PaaS", "Virtualization"],
  },
  {
    category: "ML & Data Science",
    items: ["scikit-learn", "Pandas", "NumPy", "Matplotlib", "Neural Networks", "GANs", "LSTMs", "Transformers", "TensorFlow 2", "PCA", "Feature Engineering"],
  },
  {
    category: "AI & GenAI",
    items: ["Transformers", "BERT/GPT Architectures", "Fine-tuning LLMs", "AI-assisted Coding"],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "GitHub", "Postman", "Docker", "Jira", "Linux (Ubuntu)", "Agile/Scrum", "Code Reviews", "Technical Documentation"],
  },
  {
    category: "Testing & QA",
    items: ["API Testing", "Manual Testing", "Unit Testing", "Test Case Design", "Defect Reporting", "SDLC"],
  },
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Engineering",
    institution: "Pimpri Chinchwad College of Engineering, Akurdi, Pune",
    date: "2023 – 2027",
    grade: "CGPA: 7.8",
    icon: "graduation",
    coursework: [
      "Machine Learning & Data Science",
      "Generative AI & Deep Learning",
      "Cloud Computing & AWS",
      "Operating Systems",
      "Data Structures & Algorithms",
      "Computer Networks & Security",
      "Database Management Systems",
      "Software Engineering",
      "OOP (Java)",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "SNBP Junior College, Morwadi, Pune",
    date: "2021 – 2023",
    grade: "82.67%",
    icon: "book",
    coursework: [],
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];
