import './styles/main.css';
import { skillsData, learningPathData } from './data/portfolioData.js';
import { initArchitecturalScene } from './three/architecturalScene.js';
import { initExpenseTracker } from './components/expenseTracker.js';
import { initStudyPlanner } from './components/studyPlanner.js';
import { initBotpressHook } from './components/botpressHook.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Architectural Scene
  const canvasContainer = document.getElementById('hero-3d-container');
  let sceneController = null;

  if (canvasContainer) {
    try {
      sceneController = initArchitecturalScene(canvasContainer);
    } catch (e) {
      console.error('Failed to init 3D scene:', e);
    }
  }

  // 3D Scene UI Controls
  const toggleLightBtn = document.getElementById('btn-toggle-lighting');
  if (toggleLightBtn && sceneController) {
    toggleLightBtn.addEventListener('click', () => {
      const isDusk = sceneController.toggleLighting();
      toggleLightBtn.textContent = isDusk ? 'Lighting: Dusk Ember' : 'Lighting: Studio Daylight';
    });
  }

  const resetViewBtn = document.getElementById('btn-reset-view');
  if (resetViewBtn && sceneController) {
    resetViewBtn.addEventListener('click', () => {
      sceneController.resetView();
    });
  }

  // 3D Hover Inspection Readout Callback
  const readoutTitle = document.getElementById('readout-title');
  const readoutDesc = document.getElementById('readout-desc');
  window.__onArchitecturalHover = (partData) => {
    if (!readoutTitle || !readoutDesc) return;
    if (partData) {
      readoutTitle.textContent = partData.name || 'Structural Geometry';
      readoutDesc.textContent = partData.detail || 'Precision architectural component';
    } else {
      readoutTitle.textContent = 'Interactive Architectural Pavilion';
      readoutDesc.textContent = 'Hover structural components to inspect materials and load-bearing geometries.';
    }
  };

  // 2. Render Technical Skills
  const skillsMount = document.getElementById('skills-grid-mount');
  if (skillsMount) {
    skillsMount.innerHTML = skillsData.map(cat => `
      <div class="skill-category-card">
        <div class="cat-header">
          <h3 class="cat-title">${cat.category}</h3>
          <p class="cat-summary">${cat.summary}</p>
        </div>
        <div class="skill-items-list">
          ${cat.items.map(item => `
            <div class="skill-item-row">
              <div class="skill-name-row">
                <span class="skill-name">${item.name}</span>
              </div>
              <p class="skill-note">${item.note}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // 3. Render Learning & Building Pathways
  const pathwayMount = document.getElementById('pathway-grid-mount');
  if (pathwayMount) {
    pathwayMount.innerHTML = learningPathData.cards.map(card => `
      <div class="pathway-card">
        <div class="pathway-top-meta">
          <span class="pathway-tag">${card.tag}</span>
          <span class="pathway-status">${card.status}</span>
        </div>
        <h3 class="pathway-title">${card.title}</h3>
        <p class="pathway-desc">${card.description}</p>
      </div>
    `).join('');
  }

  // 4. Initialize Interactive Project Simulators
  initExpenseTracker('expense-tracker-mount');
  initStudyPlanner('study-planner-mount');

  // 5. Initialize Botpress Integration Hook
  initBotpressHook('botpress-mount');

  // 6. Navigation Smooth Scroll & Active Link Observer
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-toggle-btn');
  const mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('menu-open');
      menuBtn.textContent = mainNav.classList.contains('menu-open') ? 'CLOSE' : 'MENU';
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('menu-open');
        menuBtn.textContent = 'MENU';
      });
    });
  }

  // 7. Copy Email Button Action
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('anshul.292007@gmail.com').then(() => {
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Email copy failed', err);
      });
    });
  }

  // 8. Back to Top Button
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
