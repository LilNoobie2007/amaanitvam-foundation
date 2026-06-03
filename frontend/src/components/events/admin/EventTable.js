import { events } from '../../../mocks/events.js';

export default class EventTable {
  render() {
    const rows = events.map(evt => {
      let statusColor = 'bg-stone-50 text-stone-600 border-stone-200';
      if (evt.status === 'Open') statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      else if (evt.status === 'Closing Soon') statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
      else if (evt.status === 'Full') statusColor = 'bg-rose-50 text-rose-800 border-rose-200';
      else if (evt.status === 'Completed') statusColor = 'bg-stone-200 text-stone-700 border-stone-300';
      else if (evt.status === 'Draft') statusColor = 'bg-stone-100 text-stone-500 border-stone-250';
      else if (evt.status === 'Cancelled') statusColor = 'bg-rose-100 text-rose-800 border-rose-300';

      const seatsLeft = evt.capacity - evt.registeredCount;

      let actionButtons = '';
      if (evt.status === 'Completed') {
        actionButtons = `
          <a href="#/admin/events/report?eventId=${evt.id}" class="inline-block text-[9.5px] font-interface font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-pink-ruby text-pink-ruby hover:bg-pink-blush transition-colors">
            Publish Report
          </a>
          <a href="#/admin/events?attendance=${evt.id}" class="inline-block text-[9.5px] font-interface font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors">
            Attendance
          </a>
        `;
      } else if (evt.status !== 'Draft' && evt.status !== 'Cancelled') {
        actionButtons = `
          <a href="#/admin/events?manage=${evt.id}" class="inline-block text-[9.5px] font-interface font-semibold uppercase tracking-widest px-2.5 py-1 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 transition-all shadow-sm">
            Roster
          </a>
          <a href="#/admin/events?attendance=${evt.id}" class="inline-block text-[9.5px] font-interface font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors">
            Check-In
          </a>
        `;
      } else {
        actionButtons = `
          <span class="text-[11px] text-text-light font-sans font-light">No action needed</span>
        `;
      }

      return `
        <tr class="border-b border-stone-150 hover:bg-stone-50/50 transition-colors" data-category="${evt.category}" data-status="${evt.status}" data-title="${evt.title.toLowerCase()}">
          <td class="py-4 pr-4">
            <h4 class="font-display font-semibold text-[15px] text-text-dark">${evt.title}</h4>
            <span class="block text-[11px] text-text-light font-sans mt-0.5">${evt.location.split(',')[0]}</span>
          </td>
          <td class="py-4 px-4 font-sans text-[13.5px] text-text-muted">${evt.category}</td>
          <td class="py-4 px-4 font-sans text-[13.5px] text-text-muted">${evt.date}</td>
          <td class="py-4 px-4 font-interface text-[12px]">
            <span class="font-bold text-text-dark">${evt.registeredCount}</span>
            <span class="text-text-light">/ ${evt.capacity}</span>
            <span class="block text-[10px] text-text-light mt-0.5">${seatsLeft} left</span>
          </td>
          <td class="py-4 px-4">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${evt.status}
            </span>
          </td>
          <td class="py-4 pl-4 text-right">
            <div class="flex flex-wrap gap-2 justify-end">
              ${actionButtons}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left scroll-reveal revealed">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Event Control Ledger</h3>
          
          <!-- Search & Filter Controls -->
          <div class="flex flex-wrap items-center gap-3">
            <input type="text" id="admin-event-search" placeholder="Search events..." class="font-sans text-[13px] px-4 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all">
            
            <select id="admin-event-filter-cat" class="font-sans text-[13px] px-3 py-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
              <option value="all">All Categories</option>
              <option value="Workshop">Workshops</option>
              <option value="Community Outreach">Outreach</option>
              <option value="Volunteer Gathering">Gatherings</option>
              <option value="Awareness Campaign">Campaigns</option>
              <option value="Training Session">Training</option>
              <option value="Educational Event">Educational</option>
            </select>

            <select id="admin-event-filter-status" class="font-sans text-[13px] px-3 py-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closing Soon">Closing Soon</option>
              <option value="Full">Full</option>
              <option value="Completed">Completed</option>
              <option value="Draft">Draft</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[8px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-2.5 pr-4">Event Details</th>
                <th class="pb-2.5 px-4">Category</th>
                <th class="pb-2.5 px-4">Date</th>
                <th class="pb-2.5 px-4">Roster Capacity</th>
                <th class="pb-2.5 px-4">Status</th>
                <th class="pb-2.5 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-event-tbody">
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static init() {
    const searchInput = document.getElementById('admin-event-search');
    const catSelect = document.getElementById('admin-event-filter-cat');
    const statusSelect = document.getElementById('admin-event-filter-status');
    const tbody = document.getElementById('admin-event-tbody');
    if (!tbody) return;
    const rows = tbody.children;

    let searchVal = '';
    let selectedCat = 'all';
    let selectedStatus = 'all';

    const applyFilters = () => {
      for (const row of rows) {
        if (!row.dataset) continue;
        const rowTitle = row.dataset.title || '';
        const rowCat = row.dataset.category || '';
        const rowStatus = row.dataset.status || '';

        const matchesSearch = searchVal === '' || rowTitle.includes(searchVal);
        const matchesCat = selectedCat === 'all' || rowCat === selectedCat;
        const matchesStatus = selectedStatus === 'all' || rowStatus === selectedStatus;

        if (matchesSearch && matchesCat && matchesStatus) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        selectedCat = e.target.value;
        applyFilters();
      });
    }

    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        applyFilters();
      });
    }
  }
}
