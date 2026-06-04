import { inquiries } from '../../mocks/inquiries.js';
import { contactCategories } from '../../mocks/contactCategories.js';

export default class InquiryTable {
  render() {
    const categoryOptionsHTML = contactCategories.map(cat => `
      <option value="${cat.name}">${cat.name}</option>
    `).join('');

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl shadow-sm text-left select-none scroll-reveal revealed">
        
        <!-- Filters Header -->
        <div class="p-5 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-50/40 rounded-t-xl">
          <div class="flex-grow max-w-sm">
            <input type="text" id="inq-search" placeholder="Search by name, email, keyword..." class="w-full font-sans text-[13px] px-3.5 py-2 border border-stone-200 bg-white rounded focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-wrap items-center gap-3 font-interface text-[11px] font-bold uppercase tracking-wider text-text-light">
            <div class="flex items-center gap-1.5">
              <span>Category</span>
              <select id="inq-filter-cat" class="px-2.5 py-1.5 border border-stone-200 bg-white rounded text-[12px] font-sans text-text-dark focus:outline-none focus:border-pink-ruby">
                <option value="All">All Categories</option>
                ${categoryOptionsHTML}
              </select>
            </div>

            <div class="flex items-center gap-1.5">
              <span>Status</span>
              <select id="inq-filter-status" class="px-2.5 py-1.5 border border-stone-200 bg-white rounded text-[12px] font-sans text-text-dark focus:outline-none focus:border-pink-ruby">
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table Grid -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] border-collapse font-sans text-[13px]">
            <thead>
              <tr class="bg-stone-50 border-b border-stone-150 text-[10px] uppercase font-interface tracking-widest text-text-light font-bold">
                <th class="px-6 py-4 text-left font-bold w-12"></th>
                <th class="px-6 py-4 text-left font-bold">Reference & Name</th>
                <th class="px-6 py-4 text-left font-bold">Category</th>
                <th class="px-6 py-4 text-left font-bold">Subject</th>
                <th class="px-6 py-4 text-left font-bold">Submitted</th>
                <th class="px-6 py-4 text-left font-bold">Status</th>
                <th class="px-6 py-4 text-right font-bold pr-8">Actions</th>
              </tr>
            </thead>
            <tbody id="inquiries-tbody">
              <!-- Injected by draw -->
            </tbody>
          </table>
        </div>

      </div>
    `;
  }

  static draw(search = "", category = "All", status = "All") {
    const tbody = document.getElementById('inquiries-tbody');
    if (!tbody) return;

    let filtered = inquiries;

    // Filters
    if (category !== "All") {
      filtered = filtered.filter(i => i.category === category);
    }
    if (status !== "All") {
      filtered = filtered.filter(i => i.status === status);
    }
    if (search.trim() !== "") {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(i => {
        return i.name.toLowerCase().includes(q) ||
               i.email.toLowerCase().includes(q) ||
               (i.subject && i.subject.toLowerCase().includes(q)) ||
               (i.message && i.message.toLowerCase().includes(q)) ||
               i.inquiryId.toLowerCase().includes(q);
      });
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="px-6 py-12 text-center text-text-light font-sans font-light italic bg-stone-50/20">
            No inquiries match the active search filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(i => {
      let badgeColor = "bg-stone-50 text-stone-600 border-stone-200";
      if (i.status === "New") badgeColor = "bg-pink-blush text-pink-ruby border-pink-quartz/65";
      else if (i.status === "In Review") badgeColor = "bg-gold-light text-gold-ochre border-gold-satin/50";
      else if (i.status === "Resolved") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200/50";

      // Action triggers
      let actionBtnHTML = "";
      if (i.status === "New") {
        actionBtnHTML = `
          <button data-id="${i.id}" data-action="review" class="inq-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-gold-satin bg-gold-light/40 text-gold-ochre hover:bg-gold-light rounded transition-colors mr-1">
            Dispatch
          </button>
        `;
      }
      if (i.status === "New" || i.status === "In Review") {
        actionBtnHTML += `
          <button data-id="${i.id}" data-action="resolve" class="inq-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow rounded transition-colors">
            Resolve
          </button>
        `;
      } else if (i.status === "Resolved") {
        actionBtnHTML = `
          <button data-id="${i.id}" data-action="close" class="inq-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-stone-200 text-text-light hover:bg-stone-50 rounded transition-colors">
            Close
          </button>
        `;
      } else if (i.status === "Closed") {
        actionBtnHTML = `
          <button data-id="${i.id}" data-action="reopen" class="inq-act-btn font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 border border-stone-200 text-text-dark hover:bg-stone-50 rounded transition-colors">
            Reopen
          </button>
        `;
      }

      return `
        <!-- Inquiry Row -->
        <tr class="border-b border-stone-100 hover:bg-stone-50/50 transition-colors cursor-pointer ticket-row" data-id="${i.id}">
          <td class="px-6 py-4 text-center font-interface font-bold text-[14px] text-stone-300 toggle-arrow">+</td>
          <td class="px-6 py-4 font-sans">
            <span class="block font-interface font-bold text-[10px] text-text-light uppercase tracking-wider">${i.inquiryId}</span>
            <strong class="font-semibold text-text-dark text-[13.5px]">${i.name}</strong>
            <span class="block text-[11px] text-text-light">${i.email}</span>
          </td>
          <td class="px-6 py-4 font-interface font-semibold text-[12px] text-text-dark">${i.category}</td>
          <td class="px-6 py-4 text-text-muted font-light truncate max-w-[200px]" title="${i.subject}">${i.subject}</td>
          <td class="px-6 py-4 font-sans text-[12px] text-text-light">${i.submittedDate}</td>
          <td class="px-6 py-4">
            <span class="inline-block px-2 py-0.5 rounded border text-[11px] font-semibold ${badgeColor}">
              ${i.status}
            </span>
          </td>
          <td class="px-6 py-4 text-right pr-8" onclick="event.stopPropagation()">
            ${actionBtnHTML}
          </td>
        </tr>

        <!-- Expanded Drawer Row -->
        <tr class="hidden expanded-drawer bg-stone-50/50 border-b border-stone-100" data-drawer-id="${i.id}">
          <td colspan="7" class="px-8 py-5 text-left">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              <!-- Message Box (col span 8) -->
              <div class="md:col-span-8 space-y-2">
                <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light">Ticket Message Details</span>
                <p class="font-sans text-[13.5px] text-text-muted bg-white border border-stone-200/80 rounded-xl p-4 leading-relaxed font-light italic">
                  "${i.message}"
                </p>
              </div>

              <!-- Logistics (col span 4) -->
              <div class="md:col-span-4 bg-white border border-stone-200 rounded-xl p-4.5 space-y-3 font-sans text-[12.5px] text-text-muted shadow-sm">
                <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light border-b border-stone-100 pb-1.5 mb-2">Ticket Dispatch Metadata</span>
                <div>
                  <span class="block text-[10px] uppercase font-interface text-text-light font-bold">Contact Phone</span>
                  <span class="text-text-dark font-medium">${i.phone || 'N/A'}</span>
                </div>
                <div>
                  <span class="block text-[10px] uppercase font-interface text-text-light font-bold">Routing Desk</span>
                  <span class="text-text-dark font-medium">${contactCategories.find(c => c.name === i.category)?.routingDept || 'General Operations'}</span>
                </div>
                <div>
                  <span class="block text-[10px] uppercase font-interface text-text-light font-bold">Expected SLA Response</span>
                  <span class="text-pink-ruby font-semibold">${contactCategories.find(c => c.name === i.category)?.slaDays || 3} Business Days</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind event listeners
    InquiryTable.bindEvents(search, category, status);
  }

  static bindEvents(search, category, status) {
    // Collapsible rows
    const rows = document.querySelectorAll('.ticket-row');
    rows.forEach(r => {
      r.addEventListener('click', () => {
        const id = r.dataset.id;
        const drawer = document.querySelector(`[data-drawer-id="${id}"]`);
        const arrow = r.querySelector('.toggle-arrow');

        if (drawer.classList.contains('hidden')) {
          drawer.classList.remove('hidden');
          arrow.innerText = '−';
          arrow.style.color = '#bf184a'; // Ruby-pink highlight
        } else {
          drawer.classList.add('hidden');
          arrow.innerText = '+';
          arrow.style.color = '';
        }
      });
    });

    // Action buttons
    const actBtns = document.querySelectorAll('.inq-act-btn');
    actBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const ticket = inquiries.find(inq => inq.id === id);

        if (ticket) {
          if (action === "review") {
            ticket.status = "In Review";
            alert(`Verification: Ticket ${ticket.inquiryId} is now under operational review.`);
          } else if (action === "resolve") {
            ticket.status = "Resolved";
            alert(`Verification: Ticket ${ticket.inquiryId} marked as Resolved.`);
          } else if (action === "close") {
            ticket.status = "Closed";
            alert(`Verification: Ticket ${ticket.inquiryId} securely closed in mock database.`);
          } else if (action === "reopen") {
            ticket.status = "New";
            alert(`Verification: Ticket ${ticket.inquiryId} reopened for triage.`);
          }

          // Redraw table
          InquiryTable.draw(search, category, status);

          // Update metrics (if page includes overview metrics cards)
          const metTotal = document.getElementById('metric-total-inq');
          const metNew = document.getElementById('metric-new-inq');
          const metReview = document.getElementById('metric-review-inq');
          const metResolved = document.getElementById('metric-resolved-inq');

          if (metTotal && metNew && metReview && metResolved) {
            metTotal.innerText = inquiries.length;
            metNew.innerText = inquiries.filter(i => i.status === "New").length;
            metReview.innerText = inquiries.filter(i => i.status === "In Review").length;
            metResolved.innerText = inquiries.filter(i => i.status === "Resolved" || i.status === "Closed").length;
          }
        }
      });
    });
  }

  static init() {
    let currentSearch = "";
    let currentCat = "All";
    let currentStatus = "All";

    const searchInput = document.getElementById('inq-search');
    const catSelect = document.getElementById('inq-filter-cat');
    const statusSelect = document.getElementById('inq-filter-status');

    const update = () => {
      InquiryTable.draw(currentSearch, currentCat, currentStatus);
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        update();
      });
    }

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        currentCat = e.target.value;
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
