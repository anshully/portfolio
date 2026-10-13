# Anshul Verma — Academic & Personal Portfolio Website

> **B.Tech CSE Student | Developer & AI Tech Enthusiast**  
> *JECRC University, Jaipur, Rajasthan, India*  
> Coordinates: `26.9124° N, 75.7873° E` · Timeline: `August 2026 – Present`

A modern, distinctive personal portfolio engineered with contemporary architectural brutalism, editorial typography, and an interactive 3D WebGL pavilion rendered in **Three.js**.

Designed specifically for undergraduate academic evaluation, GitHub hosting, and software engineering internship applications.

---

## 🏛️ Design Identity & Architecture

- **Visual Concept**: Inspired by contemporary architecture, digital art installations, brutalist structures, and high-end editorial publications.
- **Materiality & Surfaces**: Cast architectural concrete with tactile aggregate grain, brushed graphite steel, translucent fluted glass, and restrained electric-orange accent illumination (`#FF5500`).
- **Interactive 3D Pavilion**: Custom Three.js procedural scene featuring cantilevered platforms, monolith shear cores, steel pilotis, soft PCF shadows, interactive mouse parallax, lighting modes (*Studio Daylight* / *Dusk Ember*), and structural hover raycasting.
- **Responsive Viewport Composition**: Two-column layout tested and balanced for **1366×768** and **1440×900** laptop/desktop displays, ensuring all hero content and 3D architecture are immediately visible without requiring initial scrolling.
- **Accessibility & Performance**: Zero heavy UI frameworks, semantic HTML5, keyboard navigation, high-contrast typography, and `prefers-reduced-motion` compliance.

---

## 📂 Core Sections & Features

1. **Hero**: Prominent editorial typography, academic dossier tags, quick action buttons, and the interactive Three.js 3D pavilion.
2. **About Me**: First-person perspective highlighting core CS foundations, C and Python programming, AI and generative workflows, modern web standards, and digital automation.
3. **Education**: Structured architectural timeline panel detailing B.Tech in Computer Science and Engineering (CSE Core) at **JECRC University, Jaipur** (August 2026 – Present).
4. **Technical Skills**: Organized matrix covering Systems & Core Languages (C, Python), Web Development (HTML5, CSS3, JS, Three.js), AI & Prompt Engineering, and Developer Tooling (Git, GitHub, Automation).
5. **Projects with Working Simulators**:
   - **Personal Portfolio Website**: Live interactive 3D WebGL architectural portfolio.
   - **Student Expense Tracker**: Fully functional interactive client-side budgeting tool with real-time totals, category filtering (Academic, Food, Travel, Utilities, Software), and persistent `localStorage`.
   - **Smart Study Planner**: Working student productivity organizer for coursework tasks, syllabus progress tracking, priority tags, and persistent `localStorage`.
6. **Currently Learning & Building**: Transparent roadmap of ongoing academic explorations (Data Structures & Memory Models in C, Python AI foundations, WebGL Shaders, Botpress Conversational Agents).
7. **Future Botpress Integration Point**: Dedicated modular integration hook in `src/components/botpressHook.js` with architectural specs and script activation instructions for Anshul's upcoming conversational AI assistant.
8. **Direct Contact**: Verified contact channels including direct email (`anshul.292007@gmail.com`) with single-click clipboard copying, LinkedIn (`https://www.linkedin.com/in/anshully/`), and GitHub (`https://github.com/anshully`).

---

## 🛠️ Technology Stack

- **Core**: Semantic HTML5, Modular CSS3 (Custom Properties & Grid/Flexbox), Modern JavaScript (ES6+ Modules)
- **3D Graphics & Spatial Computing**: [Three.js](https://threejs.org/) (WebGL, PCF Soft Shadows, Procedural Canvas Textures)
- **Tooling & Bundling**: [Vite](https://vitejs.dev/)
- **Testing**: [Playwright](https://playwright.dev/) automated browser verification across desktop & mobile viewports

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/anshully/portfolio.git

# Navigate to project folder
cd portfolio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```
Generates production-optimized static files in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🤖 Activating Botpress AI Webchat

When your Botpress chatbot credentials are ready:
1. Open `src/components/botpressHook.js`
2. Set `enabled: true` and paste your `botId` and `clientId`:
   ```javascript
   export const BOTPRESS_CONFIG = {
     enabled: true,
     botId: "<YOUR_BOTPRESS_BOT_ID>",
     clientId: "<YOUR_BOTPRESS_CLIENT_ID>",
     hostUrl: "https://cdn.botpress.cloud/webchat/v1",
     messagingUrl: "https://messaging.botpress.cloud"
   };
   ```
3. Re-run `npm run build`. The webchat launcher will mount seamlessly without requiring any layout changes.

---

## 🌐 Deployment to Vercel

This repository is pre-configured for zero-config deployment on **Vercel**:
1. Push this repository to your GitHub account: `https://github.com/anshully/portfolio`
2. Log into [Vercel](https://vercel.com) and click **Add New Project** -> **Import Git Repository**.
3. Framework Preset: **Vite**
4. Root Directory: `./`
5. Click **Deploy**.

---

## 📜 Academic Integrity Note

All personal and academic details represent the genuine background of **Anshul Verma** as an undergraduate student pursuing B.Tech CSE (Core) at JECRC University, Jaipur (August 2026 – Present). No fabricated qualifications, unverified certifications, or simulated backends are utilized.
