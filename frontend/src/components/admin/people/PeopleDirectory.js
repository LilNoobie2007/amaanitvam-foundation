import { people } from '../../../mocks/admin/people.js';
import { cohorts } from '../../../mocks/admin/cohorts.js';

export default class PeopleDirectory {
  constructor() {
    this.currentFilter = "All";
    this.selectedIds = new Set();
  }

  render() {
    const filteredPeople = this.currentFilter === "All" 
      ? people 
      : people.filter(p => p.type === this.currentFilter);

    const rowsHTML = filteredPeople.map(p => {
      const isChecked = this.selectedIds.has(p.id) ? "checked" : "";
      
      let badgeColor = "bg-stone-100 text-text-dark border-stone-200";
      if (p.status === "Active") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-100";
      else if (p.status === "Completed") badgeColor = "bg-blue-50 text-blue-800 border-blue-100";
      else if (p.status === "Pending") badgeColor = "bg-pink-blush text-pink-ruby border-pink-quartz/45";

      let typeBadge = "bg-stone-100 text-text-light";
      if (p.type === "Volunteer") typeBadge = "bg-pink-blush text-pink-ruby border border-pink-quartz/40";
      else if (p.type === "Intern") typeBadge = "bg-blue-50 text-blue-800 border border-blue-100";
      else if (p.type === "Alumni") typeBadge = "bg-emerald-50 text-emerald-800 border border-emerald-100";
      else if (p.type === "Donor") typeBadge = "bg-gold-light text-gold-ochre border border-gold-satin/20";

      return `
        <tr class="hover:bg-stone-50/80 transition-colors border-b border-stone-100 text-[12.5px] font-sans text-text-muted">
          <td class="px-4 py-3">
            <input type="checkbox" class="people-row-select h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" data-id="${p.id}" ${isChecked} />
          </td>
          <td class="px-4 py-3 font-semibold text-text-dark font-sans">
            <a href="#/admin/people/${p.id}" class="hover:text-pink-ruby hover:underline transition-colors">${p.name}</a>
          </td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${typeBadge}">${p.type}</span>
          </td>
          <td class="px-4 py-3 text-text-light font-interface">${p.email}</td>
          <td class="px-4 py-3 text-text-light font-interface">${p.phone}</td>
          <td class="px-4 py-3 font-medium text-text-muted">${p.roleTitle || "N/A"}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColor}">${p.status}</span>
          </td>
          <td class="px-4 py-3 text-right">
            <a href="#/admin/people/${p.id}" class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline">
              360&deg; Profile &rarr;
            </a>
          </td>
        </tr>
      `;
    }).join("");

    const filterTabs = ["All", "Volunteer", "Intern", "Alumni", "Donor"].map(type => {
      const activeClass = this.currentFilter === type 
        ? "border-pink-ruby text-pink-ruby font-bold" 
        : "border-transparent text-text-light hover:text-text-dark";
      const displayLabel = type === "All" ? "All Records" : type + "s";
      return `
        <button class="people-filter-tab px-3 py-2 border-b-2 font-interface font-semibold text-[11.5px] uppercase tracking-wider transition-colors ${activeClass}" data-filter="${type}">
          ${displayLabel}
        </button>
      `;
    }).join("");

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">People Operations Directory</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Central database indexing volunteers, interns, alumni, and donors.</p>
          </div>
          
          <div class="flex gap-2">
            <button id="bulk-export-btn" class="px-4 py-2 border border-stone-200 hover:border-text-dark rounded-lg text-text-dark bg-white font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Selection
            </button>
            <button id="bulk-cohort-btn" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Assign Cohort
            </button>
          </div>
        </div>

        <!-- Filter tabs & Search -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 gap-4">
            <div class="flex gap-2">
              ${filterTabs}
            </div>
            
            <div class="relative w-full md:w-72">
              <input type="text" id="people-directory-search" placeholder="Search directory records..." class="w-full pl-8 pr-3 py-1.5 text-[12px] border border-stone-200 rounded focus:outline-none focus:border-pink-ruby font-sans" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-text-light absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-left font-interface text-[9.5px] uppercase tracking-widest text-text-light">
                  <th class="px-4 py-3 w-10">
                    <input type="checkbox" id="people-select-all" class="h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" />
                  </th>
                  <th class="px-4 py-3">Full Name</th>
                  <th class="px-4 py-3">Record Type</th>
                  <th class="px-4 py-3">Email Address</th>
                  <th class="px-4 py-3">Contact Phone</th>
                  <th class="px-4 py-3">Current Role</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="people-directory-rows">
                ${rowsHTML || `<tr><td colspan="8" class="text-center py-8 text-text-light font-sans">No matching records found.</td></tr>`}
              </tbody>
            </table>
          </div>
          
          <!-- Bulk actions status message -->
          <div id="bulk-selection-bar" class="hidden flex items-center justify-between bg-stone-50 border border-stone-200 rounded-lg p-3 text-[12px] font-sans">
            <span class="font-semibold text-text-muted"><span id="selected-count">0</span> items selected</span>
            <div class="flex gap-2">
              <button id="bulk-action-active" class="px-3 py-1 bg-white border border-stone-200 hover:border-stone-400 rounded font-semibold text-[11px] text-text-muted">Set Active</button>
              <button id="bulk-action-completed" class="px-3 py-1 bg-white border border-stone-200 hover:border-stone-400 rounded font-semibold text-[11px] text-text-muted">Set Completed</button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    const tabs = document.querySelectorAll('.people-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentFilter = e.currentTarget.dataset.filter;
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    });

    const searchInput = document.getElementById('people-directory-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#people-directory-rows tr');
        rows.forEach(row => {
          const nameCol = row.querySelector('td:nth-child(2)');
          const emailCol = row.querySelector('td:nth-child(4)');
          if (nameCol && emailCol) {
            const matches = nameCol.textContent.toLowerCase().includes(query) || emailCol.textContent.toLowerCase().includes(query);
            row.style.display = matches ? "" : "none";
          }
        });
      });
    }

    const selectAllCheckbox = document.getElementById('people-select-all');
    const rowCheckboxes = document.querySelectorAll('.people-row-select');
    const selectionBar = document.getElementById('bulk-selection-bar');
    const selectedCountSpan = document.getElementById('selected-count');

    const updateSelectionBar = () => {
      if (this.selectedIds.size > 0) {
        selectionBar.classList.remove('hidden');
        selectedCountSpan.textContent = this.selectedIds.size;
      } else {
        selectionBar.classList.add('hidden');
      }
    };

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        rowCheckboxes.forEach(cb => {
          const id = cb.dataset.id;
          cb.checked = checked;
          if (checked) this.selectedIds.add(id);
          else this.selectedIds.delete(id);
        });
        updateSelectionBar();
      });
    }

    rowCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) this.selectedIds.add(id);
        else {
          this.selectedIds.delete(id);
          if (selectAllCheckbox) selectAllCheckbox.checked = false;
        }
        updateSelectionBar();
      });
    });

    // Export Selection
    const exportBtn = document.getElementById('bulk-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 0) {
          alert("Please select one or more people rows to export.");
          return;
        }
        const selectedPeople = people.filter(p => this.selectedIds.has(p.id));
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedPeople, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `amaanitvam_people_export_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        alert(`Successfully exported ${this.selectedIds.size} records.`);
      });
    }

    // Assign Cohort Dialog Mock
    const cohortBtn = document.getElementById('bulk-cohort-btn');
    if (cohortBtn) {
      cohortBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 0) {
          alert("Please select one or more people rows to assign a cohort.");
          return;
        }
        const cohortOptions = cohorts.map(c => `${c.name} (${c.status})`).join("\n - ");
        const targetCohort = prompt(`Available Cohort Cycles:\n - ${cohortOptions}\n\nEnter the Cohort ID to assign to these ${this.selectedIds.size} users (e.g. coh-summer-2026):`);
        
        if (targetCohort) {
          const matchCohort = cohorts.find(c => c.id === targetCohort);
          if (!matchCohort) {
            alert(`Error: Cohort "${targetCohort}" does not exist in the system registry.`);
            return;
          }

          people.forEach(p => {
            if (this.selectedIds.has(p.id)) {
              p.cohortId = targetCohort;
              if (p.type === "Volunteer") p.type = "Intern"; // transition state
            }
          });

          alert(`Successfully assigned cohort ${matchCohort.name} to ${this.selectedIds.size} records.`);
          this.selectedIds.clear();
          if (this.onStateChange) this.onStateChange();
        }
      });
    }

    // Bulk status changes
    const btnActive = document.getElementById('bulk-action-active');
    const btnCompleted = document.getElementById('bulk-action-completed');

    if (btnActive) {
      btnActive.addEventListener('click', () => {
        people.forEach(p => {
          if (this.selectedIds.has(p.id)) p.status = "Active";
        });
        alert(`Marked selected users as Active.`);
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    }

    if (btnCompleted) {
      btnCompleted.addEventListener('click', () => {
        people.forEach(p => {
          if (this.selectedIds.has(p.id)) p.status = "Completed";
        });
        alert(`Marked selected users as Completed.`);
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    }
  }
}
