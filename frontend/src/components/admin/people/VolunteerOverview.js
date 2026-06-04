import { people } from '../../../mocks/admin/people.js';
import { projects } from '../../../mocks/admin/projects.js';

export default class VolunteerOverview {
  constructor() {
    this.selectedIds = new Set();
  }

  render() {
    const volunteers = people.filter(p => p.type === "Volunteer");

    const rowsHTML = volunteers.map(v => {
      const isChecked = this.selectedIds.has(v.id) ? "checked" : "";
      
      // Determine mock hours based on growthTier
      let hours = 12;
      if (v.growthTier === "Lead Volunteer") hours = 84;
      else if (v.growthTier === "Active Contributor") hours = 36;

      const domain = v.roleTitle || "Outreach Support";

      let tierBadge = "bg-stone-50 text-text-light";
      if (v.growthTier === "Lead Volunteer") tierBadge = "bg-pink-blush text-pink-ruby border border-pink-quartz/40";
      else if (v.growthTier === "Active Contributor") tierBadge = "bg-blue-50 text-blue-800 border border-blue-100";
      else if (v.growthTier === "New Contributor") tierBadge = "bg-stone-100 text-text-muted border border-stone-200";

      return `
        <tr class="hover:bg-stone-50/80 transition-colors border-b border-stone-100 text-[12.5px] font-sans text-text-muted">
          <td class="px-4 py-3">
            <input type="checkbox" class="vol-row-select h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" data-id="${v.id}" ${isChecked} />
          </td>
          <td class="px-4 py-3 font-semibold text-text-dark">
            <a href="#/admin/people/${v.id}" class="hover:text-pink-ruby hover:underline transition-colors">${v.name}</a>
          </td>
          <td class="px-4 py-3 text-text-light font-interface">${v.email}</td>
          <td class="px-4 py-3 font-semibold text-text-dark font-interface">${hours} hrs</td>
          <td class="px-4 py-3 font-medium text-text-muted">${domain}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tierBadge}">${v.growthTier}</span>
          </td>
          <td class="px-4 py-3 text-right space-x-2">
            <button class="vol-elevate-btn px-2 py-0.5 border border-stone-200 hover:border-text-dark rounded text-[11px] font-semibold text-text-muted" data-id="${v.id}">
              Elevate
            </button>
            <a href="#/admin/people/${v.id}" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">
              Profile
            </a>
          </td>
        </tr>
      `;
    }).join("");

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div class="flex justify-between items-center pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Volunteers Management Desk</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Track service contribution hours, elevate engagement tiers, and direct regional campaigners.</p>
          </div>
          <button id="vol-bulk-assign-project" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider transition-all">
            Assign Selected to Project
          </button>
        </div>

        <!-- Table Container -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-left font-interface text-[9.5px] uppercase tracking-widest text-text-light">
                  <th class="px-4 py-3 w-10">
                    <input type="checkbox" id="vol-select-all" class="h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" />
                  </th>
                  <th class="px-4 py-3">Volunteer Name</th>
                  <th class="px-4 py-3">Email Address</th>
                  <th class="px-4 py-3">Service Hours</th>
                  <th class="px-4 py-3">Domain Focus</th>
                  <th class="px-4 py-3">Growth Tier</th>
                  <th class="px-4 py-3 text-right">Operations</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHTML || `<tr><td colspan="7" class="text-center py-8 text-text-light font-sans">No volunteers listed in database.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    const selectAllCheckbox = document.getElementById('vol-select-all');
    const rowCheckboxes = document.querySelectorAll('.vol-row-select');

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        rowCheckboxes.forEach(cb => {
          cb.checked = checked;
          const id = cb.dataset.id;
          if (checked) this.selectedIds.add(id);
          else this.selectedIds.delete(id);
        });
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
      });
    });

    // Elevate Tier Button
    const elevateBtns = document.querySelectorAll('.vol-elevate-btn');
    elevateBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const v = people.find(p => p.id === id);
        if (v) {
          if (v.growthTier === "New Contributor") {
            v.growthTier = "Active Contributor";
          } else if (v.growthTier === "Active Contributor") {
            v.growthTier = "Lead Volunteer";
          } else {
            alert(`${v.name} is already at the highest Volunteer tier ("Lead Volunteer").`);
            return;
          }
          alert(`Elevated ${v.name} to "${v.growthTier}" status.`);
          if (this.onStateChange) this.onStateChange();
        }
      });
    });

    // Bulk Project Assignment
    const bulkBtn = document.getElementById('vol-bulk-assign-project');
    if (bulkBtn) {
      bulkBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 0) {
          alert("Please select one or more volunteers using checksheet checkboxes.");
          return;
        }

        const projectList = projects.map((p, idx) => `${idx + 1}. ${p.title} (${p.id})`).join("\n");
        const answer = prompt(`Available Projects:\n${projectList}\n\nEnter the number of the project to assign these ${this.selectedIds.size} volunteers to:`);
        
        if (answer) {
          const idx = parseInt(answer, 10) - 1;
          const targetProj = projects[idx];
          if (targetProj) {
            people.forEach(p => {
              if (this.selectedIds.has(p.id)) {
                if (!p.relatedRecords.projects) p.relatedRecords.projects = [];
                if (!p.relatedRecords.projects.some(rp => rp.id === targetProj.id)) {
                  p.relatedRecords.projects.push({ id: targetProj.id, name: targetProj.title, status: targetProj.status });
                }
                if (!targetProj.contributors.includes(p.id)) {
                  targetProj.contributors.push(p.id);
                }
              }
            });
            alert(`Assigned selected volunteers to "${targetProj.title}" successfully.`);
            this.selectedIds.clear();
            if (this.onStateChange) this.onStateChange();
          } else {
            alert("Invalid project index selected.");
          }
        }
      });
    }
  }
}
