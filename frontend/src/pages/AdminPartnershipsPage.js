import AdminLayout from '../components/admin/AdminLayout.js';
import { partnerships } from '../mocks/admin/partnershipsAdmin.js';
import { people } from '../mocks/admin/people.js';

export default class AdminPartnershipsPage {
  render() {
    const coordinators = people.filter(p => p.type === "Volunteer" || p.type === "Intern");

    const rowsHTML = partnerships.map(p => {
      const coord = people.find(c => c.id === p.assignedCoordinatorId) || { name: "Unassigned Desk" };
      
      let badgeColor = "bg-stone-100 text-text-dark border-stone-200";
      if (p.status === "Active") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-100";
      else if (p.status === "Discussion") badgeColor = "bg-blue-50 text-blue-800 border-blue-100";
      else if (p.status === "New") badgeColor = "bg-pink-blush text-pink-ruby border-pink-quartz/45";
      else if (p.status === "Proposal") badgeColor = "bg-gold-light text-gold-ochre border border-gold-satin/20";

      return `
        <tr class="hover:bg-stone-50/80 transition-colors border-b border-stone-100 text-[12.5px] font-sans text-text-muted">
          <td class="px-4 py-3 font-semibold text-text-dark">${p.orgName}</td>
          <td class="px-4 py-3">${p.category}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColor}">${p.status}</span>
          </td>
          <td class="px-4 py-3">
            <select class="part-coord-select px-2 py-1 border border-stone-200 bg-stone-50 rounded text-[12px] font-sans text-text-dark" data-id="${p.id}">
              <option value="">Choose Coordinator...</option>
              ${coordinators.map(c => `
                <option value="${c.id}" ${c.id === p.assignedCoordinatorId ? "selected" : ""}>${c.name}</option>
              `).join("")}
            </select>
          </td>
          <td class="px-4 py-3 font-interface text-text-light">
            <input type="date" class="part-followup-date border border-stone-200 bg-stone-50 px-2 py-0.5 rounded text-[11.5px]" value="${p.nextFollowUpDate}" data-id="${p.id}" />
          </td>
          <td class="px-4 py-3 text-right">
            <button class="part-save-btn px-2.5 py-1 bg-pink-ruby text-white hover:bg-pink-ruby/90 text-[10.5px] font-interface font-bold uppercase tracking-wider rounded" data-id="${p.id}">
              Save
            </button>
          </td>
        </tr>
      `;
    }).join("");

    const partnershipsHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Header -->
        <div class="flex justify-between items-center pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Partnerships Desk</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Oversee external corporate alliances, academic student chapters, and local NGO partnerships.</p>
          </div>
          <button id="add-partnership-btn" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider transition-all">
            + New Alliance
          </button>
        </div>

        <!-- Table Container -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-left font-interface text-[9.5px] uppercase tracking-widest text-text-light">
                  <th class="px-4 py-3">Organization Name</th>
                  <th class="px-4 py-3">Alliance Category</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Assigned Desk Coordinator</th>
                  <th class="px-4 py-3">Next Follow-Up Date</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHTML || `<tr><td colspan="6" class="text-center py-8 text-text-light font-sans">No alliances listed.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    return AdminLayout.render(partnershipsHTML, "donations");
  }

  init() {
    AdminLayout.init();

    // Save modifications
    const saveBtns = document.querySelectorAll('.part-save-btn');
    saveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const row = e.target.closest('tr');
        if (row) {
          const coordSelect = row.querySelector('.part-coord-select');
          const dateInput = row.querySelector('.part-followup-date');
          
          const match = partnerships.find(p => p.id === id);
          if (match) {
            match.assignedCoordinatorId = coordSelect.value;
            match.nextFollowUpDate = dateInput.value;
            alert(`Partnership for ${match.orgName} updated successfully.`);
            
            // Trigger repaint
            const appElement = document.querySelector('#app');
            if (appElement) {
              appElement.innerHTML = this.render();
              this.init();
            }
          }
        }
      });
    });

    // Add Partnership button
    const addBtn = document.getElementById('add-partnership-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const orgName = prompt("Enter Organization Name:");
        if (!orgName) return;
        const category = prompt("Enter Alliance Category (e.g. Educational, Corporate, NGO):", "Corporate");
        if (!category) return;
        
        const coordinators = people.filter(p => p.type === "Volunteer" || p.type === "Intern");
        const listStr = coordinators.map((c, idx) => `${idx + 1}. ${c.name}`).join("\n");
        const answer = prompt(`Choose coordinator to assign:\n${listStr}`);
        
        if (answer) {
          const idx = parseInt(answer, 10) - 1;
          const coord = coordinators[idx];
          if (coord) {
            const nextFollowUpDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 7 days from now
            partnerships.push({
              id: `part-${Date.now()}`,
              orgName,
              category,
              status: "New",
              assignedCoordinatorId: coord.id,
              nextFollowUpDate
            });
            alert(`Alliance with ${orgName} registered successfully.`);
            
            // Trigger repaint
            const appElement = document.querySelector('#app');
            if (appElement) {
              appElement.innerHTML = this.render();
              this.init();
            }
          } else {
            alert("Invalid coordinator selected.");
          }
        }
      });
    }
  }
}
