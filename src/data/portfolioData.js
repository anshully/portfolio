export const personalInfo = {
  name: "Anshul Verma",
  role: "B.Tech CSE Student | Developer & AI Tech Enthusiast",
  degree: "B.Tech in Computer Science and Engineering (CSE Core)",
  institution: "JECRC University, Jaipur",
  location: "Jaipur, Rajasthan, India",
  coordinates: "26.9124° N, 75.7873° E",
  timeline: "August 2026 – Present",
  email: "anshul.292007@gmail.com",
  linkedin: "https://www.linkedin.com/in/anshully/",
  github: "https://github.com/anshully",
  intro: "I’m a computer science student at JECRC University, interested in programming, software development, artificial intelligence and building practical digital experiences.",
  academicStatus: "Undergraduate (CSE Core) · Active Studies",
  timezone: "IST (UTC+05:30)"
};

export const aboutNarrative = {
  lead: "Approaching computer science through structured problem solving, architectural precision, and continuous experimentation.",
  paragraphs: [
    "I am currently pursuing my B.Tech in Computer Science and Engineering at JECRC University in Jaipur. My journey in technology centers on understanding fundamental computing principles from the ground up—from low-level logic and memory dynamics to high-level application architectures.",
    "I spend my time writing code in C and Python, studying algorithms, and exploring how modern artificial intelligence and LLM-driven workflows can be leveraged to build meaningful, accessible tools. Rather than just consuming modern frameworks, I focus on understanding how things work under the hood and writing disciplined, clean code.",
    "Outside lecture halls and labs, I build practical digital utilities, experiment with web graphics and interactive visual design, and refine my engineering habits through version-controlled personal projects and technical documentation."
  ],
  pillars: [
    {
      title: "CS Fundamentals & Core Systems",
      desc: "Deep focus on memory layout, computational logic, data representation, and structured procedural programming in C.",
      icon: "cpu"
    },
    {
      title: "Python & Automation Scripting",
      desc: "Developing algorithmic workflows, data manipulation scripts, and utility tools for personal and academic productivity.",
      icon: "terminal"
    },
    {
      title: "AI Concepts & LLM Workflows",
      desc: "Studying neural networks, generative AI paradigms, prompt engineering strategies, and modern developer AI augmentation.",
      icon: "sparkles"
    },
    {
      title: "Modern Web & Spatial Graphics",
      desc: "Crafting semantic, accessible web experiences paired with interactive 3D WebGL environments using Three.js.",
      icon: "layers"
    }
  ]
};

export const educationData = {
  degree: "B.Tech in Computer Science and Engineering (CSE Core)",
  institution: "JECRC University, Jaipur, Rajasthan, India",
  timeline: "August 2026 – Present",
  status: "Active Undergraduate Student",
  campus: "JECRC University Campus, Ramchandrapura, Sitapura Industrial Area Extension, Jaipur",
  highlights: [
    "Comprehensive foundational coursework in Computer Science & Engineering (CSE Core).",
    "Active participation in coding labs, algorithmic problem-solving sessions, and technical workshops.",
    "Hands-on practice with structured programming in C, mathematical foundations of computing, and digital logic.",
    "Collaborative development using Git & GitHub for academic repositories and version-controlled coursework."
  ]
};

export const skillsData = [
  {
    category: "Programming Languages & Systems",
    summary: "Foundational programming, logic construction, and computational efficiency.",
    items: [
      { name: "C Programming", note: "Pointers, memory management, structured programming & algorithm implementation" },
      { name: "Python", note: "Core fundamentals, scripting, data handling, and automation utilities" }
    ]
  },
  {
    category: "Web Development & Frontend",
    summary: "Standards-based client-side architecture and interactive graphics.",
    items: [
      { name: "HTML5 & CSS3", note: "Semantic document hierarchy, CSS Grid, Flexbox, custom properties & responsive design" },
      { name: "Modern JavaScript", note: "ES6+ syntax, asynchronous programming, DOM manipulation & state patterns" },
      { name: "Web Development", note: "Component modularity, cross-browser performance, accessibility (a11y)" },
      { name: "Three.js & WebGL", note: "Interactive 3D scenes, PBR materials, procedural lighting & architectural rendering" }
    ]
  },
  {
    category: "Artificial Intelligence & Modern Tech",
    summary: "Conceptual foundations, AI tool augmentation, and workflow automation.",
    items: [
      { name: "AI Concepts", note: "Core paradigms of machine learning, neural architectures & intelligence systems" },
      { name: "Generative AI & Prompt Engineering", note: "System design, structured prompting, contextual retrieval & evaluation" },
      { name: "LLM Workflows & AI Tools", note: "Developer augmentation, workflow automation, and agentic tool exploration" }
    ]
  },
  {
    category: "Developer Tooling & Collaboration",
    summary: "Version control, engineering discipline, and workflow efficiency.",
    items: [
      { name: "Git & GitHub", note: "Branch management, commit hygiene, repository workflows, and code hosting" },
      { name: "Digital Productivity & Automation", note: "CLI scripting, workspace optimization, and structured documentation" }
    ]
  }
];

export const projectsData = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    badge: "Completed & Live",
    statusText: "Deployed · Interactive 3D Architectural Space",
    summary: "An interactive personal portfolio presenting my background, skills, technical interests and projects.",
    description: "Built with an architectural brutalist identity, custom 3D WebGL pavilion rendered in Three.js with realistic concrete, brushed metal, soft shadows, and subtle electric-orange accents. Features full responsive layout, zero external framework bloat, and editorial typography.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Three.js", "Vite"],
    interactiveType: "embedded-3d",
    features: [
      "Custom procedural 3D architectural pavilion with interactive orbit & lighting modes",
      "Two-column hero composition tested for 1366×768 & 1440×900 display viewports",
      "Live interactive simulators for student tools embedded directly into the page",
      "Accessible design with keyboard navigation and reduced-motion support"
    ]
  },
  {
    id: "expense-tracker",
    title: "Student Expense Tracker",
    badge: "Interactive Simulator Ready",
    statusText: "Functional Project · In Progress",
    summary: "A practical budgeting tool for students to record expenses, categorise spending and calculate totals.",
    description: "Engineered specifically for undergraduate financial management. Allows students to quickly record daily expenditures (books, hostel food, transit, stationery), assign them into distinct categories, filter records, view real-time totals, and retain data across browser sessions via LocalStorage.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
    interactiveType: "simulator-expense",
    features: [
      "Real-time expense creation with amount validation and category tagging",
      "Category-based filtering (Academic, Food, Travel, Utilities, Software)",
      "Instant automated calculation of total spend and transaction count",
      "Persistent state saved to browser LocalStorage with single-click record deletion"
    ]
  },
  {
    id: "study-planner",
    title: "Smart Study Planner",
    badge: "Interactive Simulator Ready",
    statusText: "Functional Project · In Progress",
    summary: "A student productivity tool for organising subjects, tasks, deadlines and study progress.",
    description: "Designed to keep engineering coursework on track. Facilitates scheduling of lab assignments, lecture review tasks, and project milestones across core subjects like C Programming, Discrete Math, and Web Architecture, with completion metrics and priority tagging.",
    tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
    interactiveType: "simulator-planner",
    features: [
      "Task creation with subject classification, deadline picker, and priority tags",
      "Interactive completion toggle with dynamic completion percentage calculation",
      "Status filter views: All tasks, Pending obligations, and Completed milestones",
      "Persistent task database stored locally without requiring external servers"
    ]
  }
];

export const learningPathData = {
  sectionTitle: "Currently Learning & Building",
  subtitle: "Honest progression pathways, academic explorations, and technical milestones currently in development.",
  cards: [
    {
      tag: "CORE ACADEMICS // C & SYSTEMS",
      title: "Data Structures & Memory Models in C",
      status: "In Progress",
      description: "Working through linear and non-linear data structures (linked lists, stacks, queues, trees) in C to build rock-solid intuition regarding memory allocation, pointers, and computational complexity."
    },
    {
      tag: "AI & COMPUTATIONAL TOOLS",
      title: "Applied Python for Machine Learning Concepts",
      status: "Active Exploration",
      description: "Progressing through Python numeric libraries (NumPy, Pandas) and exploring algorithmic foundations behind neural networks, optimization functions, and loss landscape dynamics."
    },
    {
      tag: "AGENTIC INTEGRATION",
      title: "LLM Orchestration & Botpress Chatbot Integration",
      status: "Architecture Prepared",
      description: "Engineering conversational integration hooks for personal AI assistants, evaluating Botpress APIs, and structuring prompt flows for automated knowledge assistance."
    },
    {
      tag: "WEB & SPATIAL COMPUTING",
      title: "Advanced WebGL Shaders & Performant Canvas Graphics",
      status: "Ongoing Study",
      description: "Experimenting with GLSL shaders, procedural noise textures, and optimized render loops in Three.js to craft lightweight, high-fidelity spatial digital interfaces."
    }
  ]
};
