/**
 * Interactive Smart Study Planner Simulator
 * Built with vanilla JS & LocalStorage for academic task tracking.
 */

const STORAGE_KEY = 'anshul_portfolio_planner_v1';

const DEFAULT_TASKS = [
  {
    id: 'task-1',
    subject: 'C Programming',
    title: 'Implement Binary Search Tree traversal algorithms (Inorder & Postorder)',
    deadline: '2026-10-18',
    priority: 'High',
    completed: true
  },
  {
    id: 'task-2',
    subject: 'Discrete Mathematics',
    title: 'Complete problem set on Propositional Logic and Mathematical Induction',
    deadline: '2026-10-20',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'task-3',
    subject: 'AI & Machine Learning',
    title: 'Study Loss Functions and Gradient Descent convergence in linear models',
    deadline: '2026-10-23',
    priority: 'High',
    completed: false
  },
  {
    id: 'task-4',
    subject: 'Web Technologies',
    title: 'Refactor Three.js lighting rig and test 60fps frame budget across mobile',
    deadline: '2026-10-25',
    priority: 'Normal',
    completed: true
  }
];

export function initStudyPlanner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let tasks = loadTasks();
  let statusFilter = 'All'; // 'All' | 'Pending' | 'Completed'

  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage read error', e);
    }
    return [...DEFAULT_TASKS];
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('LocalStorage write error', e);
    }
  }

  function render() {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const filtered = tasks.filter(t => {
      if (statusFilter === 'Pending') return !t.completed;
      if (statusFilter === 'Completed') return t.completed;
      return true;
    });

    const statusOptions = ['All', 'Pending', 'Completed'];

    container.innerHTML = `
      <div class="simulator-wrapper planner-simulator">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-badge">LIVE JS SIMULATOR</span>
            <h4 class="sim-title">Smart Study Planner</h4>
            <p class="sim-desc">Organise subjects, track engineering tasks & monitor academic syllabus progress.</p>
          </div>
          <div class="sim-progress-block">
            <div class="progress-labels">
              <span class="progress-title">SYLLABUS PROGRESS</span>
              <span class="progress-ratio">${completedCount} / ${totalCount} Done (${progressPercent}%)</span>
            </div>
            <div class="progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>

        <!-- Add Task Form -->
        <form class="sim-form" id="planner-add-form">
          <div class="form-row">
            <div class="form-field flex-2">
              <label for="task-title">Task Title / Lab Milestone</label>
              <input type="text" id="task-title" placeholder="e.g. Write Dynamic Memory Allocation in C" required />
            </div>
            <div class="form-field flex-1">
              <label for="task-subject">Subject</label>
              <select id="task-subject">
                <option value="C Programming">C Programming</option>
                <option value="Discrete Mathematics">Discrete Math</option>
                <option value="AI & Machine Learning">AI & ML</option>
                <option value="Web Technologies">Web Tech</option>
                <option value="CS Core Systems">CS Systems</option>
              </select>
            </div>
            <div class="form-field flex-1">
              <label for="task-deadline">Deadline</label>
              <input type="date" id="task-deadline" required />
            </div>
            <div class="form-field flex-1">
              <label for="task-priority">Priority</label>
              <select id="task-priority">
                <option value="High">High</option>
                <option value="Medium" selected>Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
            <div class="form-action">
              <button type="submit" class="btn btn-primary btn-sm">+ Add Task</button>
            </div>
          </div>
        </form>

        <!-- Status Filter Bar -->
        <div class="sim-filter-bar">
          <span class="filter-label">Filter Status:</span>
          <div class="filter-pills">
            ${statusOptions.map(st => `
              <button type="button" class="pill-btn ${statusFilter === st ? 'active' : ''}" data-status="${st}">
                ${st} ${st === 'Pending' ? `(${totalCount - completedCount})` : st === 'Completed' ? `(${completedCount})` : `(${totalCount})`}
              </button>
            `).join('')}
          </div>
          <button type="button" class="btn-text-link" id="reset-tasks-btn" title="Reset sample study tasks">
            Reset Sample Tasks
          </button>
        </div>

        <!-- Task List -->
        <div class="sim-list-container">
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <p>No study tasks found matching <strong>${statusFilter}</strong> status.</p>
            </div>
          ` : `
            <ul class="planner-task-list">
              ${filtered.map(task => `
                <li class="planner-task-card ${task.completed ? 'is-completed' : ''}" data-id="${task.id}">
                  <div class="task-checkbox-col">
                    <input type="checkbox" id="check-${task.id}" class="task-checkbox" ${task.completed ? 'checked' : ''} data-toggle="${task.id}" />
                    <label for="check-${task.id}" class="sr-only">Toggle task status</label>
                  </div>
                  <div class="task-content-col">
                    <div class="task-meta-top">
                      <span class="task-subject-tag">${escapeHTML(task.subject)}</span>
                      <span class="task-priority-tag priority-${task.priority.toLowerCase()}">${task.priority} Priority</span>
                      <span class="task-deadline">Due: ${task.deadline}</span>
                    </div>
                    <div class="task-title-text ${task.completed ? 'strikethrough' : ''}">
                      ${escapeHTML(task.title)}
                    </div>
                  </div>
                  <div class="task-actions-col">
                    <button type="button" class="btn-delete" data-del="${task.id}" aria-label="Delete ${escapeHTML(task.title)}">
                      &times;
                    </button>
                  </div>
                </li>
              `).join('')}
            </ul>
          `}
        </div>

        <div class="sim-footer-note">
          <span>Synced locally to browser storage · Built with semantic HTML & vanilla DOM state</span>
          <span>${completedCount} completed · ${totalCount - completedCount} pending</span>
        </div>
      </div>
    `;

    // Set default deadline in input to 7 days from today
    const deadlineInput = container.querySelector('#task-deadline');
    if (deadlineInput && !deadlineInput.value) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      deadlineInput.value = d.toISOString().split('T')[0];
    }

    attachEvents();
  }

  function attachEvents() {
    // Form submit
    const form = container.querySelector('#planner-add-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = container.querySelector('#task-title');
        const subjectSelect = container.querySelector('#task-subject');
        const deadlineInput = container.querySelector('#task-deadline');
        const prioritySelect = container.querySelector('#task-priority');

        const title = titleInput.value.trim();
        const subject = subjectSelect.value;
        const deadline = deadlineInput.value;
        const priority = prioritySelect.value;

        if (!title) return;

        const newTask = {
          id: 'task-' + Date.now(),
          subject,
          title,
          deadline: deadline || new Date().toISOString().split('T')[0],
          priority,
          completed: false
        };

        tasks.unshift(newTask);
        saveTasks();
        render();
      });
    }

    // Toggle complete
    container.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-toggle');
        const item = tasks.find(t => t.id === id);
        if (item) {
          item.completed = cb.checked;
          saveTasks();
          render();
        }
      });
    });

    // Delete buttons
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del');
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        render();
      });
    });

    // Filter pills
    container.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        statusFilter = btn.getAttribute('data-status');
        render();
      });
    });

    // Reset button
    const resetBtn = container.querySelector('#reset-tasks-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        tasks = [...DEFAULT_TASKS];
        statusFilter = 'All';
        saveTasks();
        render();
      });
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  render();
}
