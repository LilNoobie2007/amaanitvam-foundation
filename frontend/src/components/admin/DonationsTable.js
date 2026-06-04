import { donations } from '../../mocks/donations.js';

export default class DonationsTable {
  render() {
    return `
      <div class="bg-white border border-stone-200/80 rounded-xl shadow-sm text-left select-none scroll-reveal revealed">
        
        <!-- Filters Header -->
        <div class="p-5 border-b border-stone-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-50/40 rounded-t-xl">
          <div class="flex-grow max-w-sm">
            <input type="text" id="don-search" placeholder="Search by donor name..." class="w-full font-sans text-[13px] px-3.5 py-2 border border-stone-200 bg-white rounded focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-wrap items-center gap-3 font-interface text-[11px] font-bold uppercase tracking-wider text-text-light">
            <div class="flex items-center gap-1.5">
              <span>Method</span>
              <select id="don-filter-method" class="px-2.5 py-1.5 border border-stone-200 bg-white rounded text-[12px] font-sans text-text-dark focus:outline-none focus:border-pink-ruby">
                <option value="All">All Methods</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Payment Gateway">Payment Gateway</option>
                <option value="Corporate Sponsorship">Corporate</option>
              </select>
            </div>

            <div class="flex items-center gap-1.5">
              <span>Intent</span>
              <select id="don-filter-intent" class="px-2.5 py-1.5 border border-stone-200 bg-white rounded text-[12px] font-sans text-text-dark focus:outline-none focus:border-pink-ruby">
                <option value="All">All Intents</option>
                <option value="General Support">General Support</option>
                <option value="Education Programs">Education</option>
                <option value="Community Outreach">Outreach</option>
                <option value="Events">Events</option>
                <option value="Volunteer Initiatives">Volunteer</option>
              </select>
            </div>

            <div class="flex items-center gap-1.5">
              <span>Status</span>
              <select id="don-filter-status" class="px-2.5 py-1.5 border border-stone-200 bg-white rounded text-[12px] font-sans text-text-dark focus:outline-none focus:border-pink-ruby">
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table Grid -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] border-collapse font-sans text-[13px]">
            <thead>
              <tr class="bg-stone-50 border-b border-stone-150 text-[10px] uppercase font-interface tracking-widest text-text-light font-bold">
                <th class="px-6 py-4 text-left font-bold">Donor Details</th>
                <th class="px-6 py-4 text-left font-bold">Payment Method</th>
                <th class="px-6 py-4 text-left font-bold">Target Intent</th>
                <th class="px-6 py-4 text-left font-bold">Frequency</th>
                <th class="px-6 py-4 text-left font-bold">Date</th>
                <th class="px-6 py-4 text-left font-bold">Amount</th>
                <th class="px-6 py-4 text-left font-bold">Status</th>
                <th class="px-6 py-4 text-right font-bold pr-8">Actions</th>
              </tr>
            </thead>
            <tbody id="donations-tbody">
              <!-- Injected by draw -->
            </tbody>
          </table>
        </div>

      </div>
    `;
  }

  static draw(search = "", method = "All", intent = "All", status = "All") {
    const tbody = document.getElementById('donations-tbody');
    if (!tbody) return;

    let filtered = donations;

    // Filters
    if (method !== "All") {
      filtered = filtered.filter(d => d.method === method);
    }
    if (intent !== "All") {
      filtered = filtered.filter(d => d.intent === intent);
    }
    if (status !== "All") {
      filtered = filtered.filter(d => d.status === status);
    }
    if (search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(d => d.donorName.toLowerCase().includes(q));
    }

    const formatCurrency = (val) => {
      return `₹${Number(val).toLocaleString('en-IN')}`;
    };

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="px-6 py-12 text-center text-text-light font-sans font-light italic bg-stone-50/20">
            No transactions match the active filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(d => {
      let badgeColor = "bg-stone-50 text-stone-600 border-stone-250";
      if (d.status === "Pending") badgeColor = "bg-gold-light text-gold-ochre border-gold-satin/50";
      else if (d.status === "Completed") badgeColor = "bg-blue-50 text-blue-800 border-blue-200/50";
      else if (d.status === "Acknowledged") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200/50";
      else if (d.status === "Failed") badgeColor = "bg-red-50 text-red-700 border-red-200/60";

      // Action triggers
      let actionBtnHTML = "";
      if (d.status === "Completed") {
        actionBtnHTML = `
          <button data-id="${d.id}" data-action="acknowledge" class="don-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow rounded transition-colors">
            Acknowledge
          </button>
        `;
      } else if (d.status === "Pending") {
        actionBtnHTML = `
          <button data-id="${d.id}" data-action="confirm" class="don-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 shadow rounded transition-colors mr-1">
            Confirm
          </button>
          <button data-id="${d.id}" data-action="fail" class="don-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-red-400 text-red-600 hover:bg-red-50 rounded transition-colors">
            Fail
          </button>
        `;
      } else {
        actionBtnHTML = `<span class="font-sans text-[11.5px] text-text-light italic font-light">Audit locked</span>`;
      }

      return `
        <tr class="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
          <td class="px-6 py-4 font-sans font-bold text-[13.5px] text-text-dark">${d.donorName}</td>
          <td class="px-6 py-4 font-sans text-text-muted">${d.method}</td>
          <td class="px-6 py-4 font-interface font-semibold text-[12.5px] text-text-dark">${d.intent}</td>
          <td class="px-6 py-4 font-sans text-text-muted">${d.frequency}</td>
          <td class="px-6 py-4 font-sans text-[12px] text-text-light">${d.date}</td>
          <td class="px-6 py-4 font-interface font-bold text-[14px] text-text-dark">${formatCurrency(d.amount)}</td>
          <td class="px-6 py-4">
            <span class="inline-block px-2 py-0.5 rounded border text-[11px] font-semibold ${badgeColor}">
              ${d.status}
            </span>
          </td>
          <td class="px-6 py-4 text-right pr-8">
            ${actionBtnHTML}
          </td>
        </tr>
      `;
    }).join('');

    // Bind action listeners
    DonationsTable.bindEvents(search, method, intent, status);
  }

  static bindEvents(search, method, intent, status) {
    const actBtns = document.querySelectorAll('.don-act-btn');
    actBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const transaction = donations.find(don => don.id === id);

        if (transaction) {
          if (action === "acknowledge") {
            transaction.status = "Acknowledged";
            alert(`Verification: Acknowledgment recorded for ${transaction.donorName}. Formal Section 80G tax receipt has been emailed.`);
          } else if (action === "confirm") {
            transaction.status = "Completed";
            alert(`Verification: Transaction confirmed. Deposit has been verified by the bank logs.`);
          } else if (action === "fail") {
            transaction.status = "Failed";
            alert(`Verification: Transaction status updated to Failed.`);
          }

          // Redraw Table
          DonationsTable.draw(search, method, intent, status);

          // Update metrics (if page includes total sums metric card)
          const metTotal = document.getElementById('metric-total-sum');
          if (metTotal) {
            const verified = donations.filter(d => d.status === "Completed" || d.status === "Acknowledged");
            const sum = verified.reduce((acc, curr) => acc + curr.amount, 0);
            metTotal.innerText = `₹${sum.toLocaleString('en-IN')}`;
          }
        }
      });
    });
  }

  static init() {
    let currentSearch = "";
    let currentMethod = "All";
    let currentIntent = "All";
    let currentStatus = "All";

    const searchInput = document.getElementById('don-search');
    const methodSelect = document.getElementById('don-filter-method');
    const intentSelect = document.getElementById('don-filter-intent');
    const statusSelect = document.getElementById('don-filter-status');

    const update = () => {
      DonationsTable.draw(currentSearch, currentMethod, currentIntent, currentStatus);
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        update();
      });
    }

    if (methodSelect) {
      methodSelect.addEventListener('change', (e) => {
        currentMethod = e.target.value;
        update();
      });
    }

    if (intentSelect) {
      intentSelect.addEventListener('change', (e) => {
        currentIntent = e.target.value;
        update();
      });
    }

    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        currentStatus = e.target.value;
        update();
      });
    }

    // Initial draw
    update();
  }
}
