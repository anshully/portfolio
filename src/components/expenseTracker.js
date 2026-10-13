/**
 * Interactive Student Expense Tracker Simulator
 * Built with vanilla JS & LocalStorage for academic portfolio demonstration.
 */

const STORAGE_KEY = 'anshul_portfolio_expenses_v1';

const DEFAULT_EXPENSES = [
  {
    id: 'exp-1',
    title: 'DSA Core Reference Textbook',
    amount: 850,
    category: 'Academic',
    date: '2026-10-04'
  },
  {
    id: 'exp-2',
    title: 'Jaipur Metro Student SmartCard Recharge',
    amount: 500,
    category: 'Transport',
    date: '2026-10-08'
  },
  {
    id: 'exp-3',
    title: 'Campus Canteen Weekly Refreshment',
    amount: 420,
    category: 'Food',
    date: '2026-10-11'
  },
  {
    id: 'exp-4',
    title: 'Engineering Lab Notebooks & Stationery',
    amount: 280,
    category: 'Academic',
    date: '2026-10-12'
  }
];

export function initExpenseTracker(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let expenses = loadExpenses();
  let currentFilter = 'All';

  function loadExpenses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage read error', e);
    }
    return [...DEFAULT_EXPENSES];
  }

  function saveExpenses() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.warn('LocalStorage write error', e);
    }
  }

  function render() {
    const filtered = currentFilter === 'All'
      ? expenses
      : expenses.filter(item => item.category === currentFilter);

    const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const filteredAmount = filtered.reduce((sum, item) => sum + Number(item.amount), 0);

    const categories = ['All', 'Academic', 'Food', 'Transport', 'Utilities', 'Software'];

    container.innerHTML = `
      <div class="simulator-wrapper expense-simulator">
        <div class="sim-header">
          <div class="sim-title-group">
            <span class="sim-badge">LIVE JS SIMULATOR</span>
            <h4 class="sim-title">Student Expense Tracker</h4>
            <p class="sim-desc">Practical budgeting tool with real-time totals, category filtering & LocalStorage persistence.</p>
          </div>
          <div class="sim-stats">
            <div class="stat-card">
              <span class="stat-label">TOTAL EXPENSES</span>
              <span class="stat-val">₹${totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">TRANSACTIONS</span>
              <span class="stat-val">${expenses.length}</span>
            </div>
          </div>
        </div>

        <!-- Add Expense Form -->
        <form class="sim-form" id="expense-add-form">
          <div class="form-row">
            <div class="form-field flex-2">
              <label for="exp-title">Expense Title / Item</label>
              <input type="text" id="exp-title" placeholder="e.g. C Programming Lab Manual" required />
            </div>
            <div class="form-field flex-1">
              <label for="exp-amount">Amount (₹)</label>
              <input type="number" id="exp-amount" min="1" step="1" placeholder="₹ Amount" required />
            </div>
            <div class="form-field flex-1">
              <label for="exp-category">Category</label>
              <select id="exp-category">
                <option value="Academic">Academic</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div class="form-action">
              <button type="submit" class="btn btn-primary btn-sm">+ Add Expense</button>
            </div>
          </div>
        </form>

        <!-- Category Filter Pills -->
        <div class="sim-filter-bar">
          <span class="filter-label">Filter Category:</span>
          <div class="filter-pills">
            ${categories.map(cat => `
              <button type="button" class="pill-btn ${currentFilter === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
          <button type="button" class="btn-text-link" id="reset-expenses-btn" title="Reset to default sample dataset">
            Reset Sample Data
          </button>
        </div>

        <!-- Expense Records List -->
        <div class="sim-list-container">
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <p>No expense records found in <strong>${currentFilter}</strong> category.</p>
            </div>
          ` : `
            <div class="expense-table-header">
              <span>DESCRIPTION</span>
              <span>CATEGORY</span>
              <span>DATE</span>
              <span class="text-right">AMOUNT</span>
              <span class="text-right">ACTION</span>
            </div>
            <ul class="sim-records-list">
              ${filtered.map(item => `
                <li class="expense-record-row" data-id="${item.id}">
                  <span class="record-title">${escapeHTML(item.title)}</span>
                  <span class="record-tag tag-${item.category.toLowerCase()}">${item.category}</span>
                  <span class="record-date">${item.date || 'Recent'}</span>
                  <span class="record-amount text-right">₹${Number(item.amount).toLocaleString('en-IN')}</span>
                  <span class="record-actions text-right">
                    <button type="button" class="btn-delete" data-del="${item.id}" aria-label="Delete ${escapeHTML(item.title)}">
                      &times;
                    </button>
                  </span>
                </li>
              `).join('')}
            </ul>
          `}
        </div>

        <div class="sim-footer-note">
          <span>Persisted automatically to your browser's LocalStorage API</span>
          <span>Showing ${filtered.length} of ${expenses.length} records · Subtotal: ₹${filteredAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Form submit
    const form = container.querySelector('#expense-add-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = container.querySelector('#exp-title');
        const amountInput = container.querySelector('#exp-amount');
        const catSelect = container.querySelector('#exp-category');

        const title = titleInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = catSelect.value;

        if (!title || isNaN(amount) || amount <= 0) return;

        const newRecord = {
          id: 'exp-' + Date.now(),
          title,
          amount,
          category,
          date: new Date().toISOString().split('T')[0]
        };

        expenses.unshift(newRecord);
        saveExpenses();
        render();
      });
    }

    // Category filters
    container.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-cat');
        render();
      });
    });

    // Delete buttons
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-del');
        expenses = expenses.filter(item => item.id !== id);
        saveExpenses();
        render();
      });
    });

    // Reset button
    const resetBtn = container.querySelector('#reset-expenses-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        expenses = [...DEFAULT_EXPENSES];
        currentFilter = 'All';
        saveExpenses();
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
