import { projects } from '../../mocks/admin/projects.js';
import { people } from '../../mocks/admin/people.js';

export default class ProjectsManager {
  render() {
    const projectsHTML = projects.map(proj => {
      const owner = people.find(p => p.id === proj.ownerId) || { name: "Amaanitvam Coordinator" };
      const contributorsList = (proj.contributors || []).map(cid => {
        const match = people.find(p => p.id === cid);
        return match ? match.name : cid;
      });

      const assignablePeople = people.filter(p => !(proj.contributors || []).includes(p.id));

      const assignOptions = assignablePeople.map(p => `
        <option value="${p.id}">${p.name} (${p.type})</option>
      `).join("");

      return `
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-4 text-left font-sans block" data-id="${proj.id}">
          <div class="flex justify-between items-start gap-4">
            <div>
              <h4 class="font-display font-semibold text-base text-text-dark">${proj.title}</h4>
              <p class="text-[12px] text-text-light font-sans mt-0.5">${proj.description}</p>
            </div>
            
            <select class="proj-status-select px-2.5 py-1 border border-stone-200 bg-stone-50 text-[11.5px] text-text-dark rounded focus:outline-none focus:border-pink-ruby font-semibold" data-id="${proj.id}">
              <option value="To Do" ${proj.status === "To Do" ? "selected" : ""}>To Do</option>
              <option value="In Progress" ${proj.status === "In Progress" ? "selected" : ""}>In Progress</option>
              <option value="Completed" ${proj.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
          </div>

          <!-- Progress Section -->
          <div class="space-y-1.5">
            <div class="flex justify-between text-[11.5px] font-semibold text-text-muted">
              <span>Progress Metric</span>
              <span class="proj-pct-val">${proj.progressPercent}%</span>
            </div>
            <div class="flex items-center gap-3">
              <input type="range" min="0" max="100" value="${proj.progressPercent}" class="proj-progress-slider w-full h-1 bg-stone-150 rounded-lg appearance-none cursor-pointer accent-pink-ruby" data-id="${proj.id}" />
            </div>
          </div>

          <!-- Contributors & Owner -->
          <div class="pt-3 border-t border-stone-100 flex flex-col md:flex-row justify-between gap-4 text-[12px]">
            <div>
              <span class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light">Owner</span>
              <span class="font-semibold text-text-dark">${owner.name}</span>
            </div>
            
            <div class="flex-1 max-w-md">
              <span class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light mb-1">Active Team Contributors</span>
              <div class="flex flex-wrap gap-1.5">
                ${contributorsList.map(c => `
                  <span class="px-2 py-0.5 bg-stone-50 border border-stone-200/80 rounded text-[11px] font-medium text-text-muted">
                    ${c}
                  </span>
                `).join("") || `<span class="text-[11px] text-text-light italic">No contributors assigned</span>`}
              </div>
            </div>

            <!-- Add contributor -->
            <div class="flex flex-col gap-1.5">
              <span class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light">Assign Partner</span>
              <div class="flex gap-1.5">
                <select class="proj-contributor-select px-2.5 py-1 border border-stone-200 bg-stone-50 text-[11px] text-text-muted rounded focus:outline-none focus:border-pink-ruby max-w-[150px]" data-id="${proj.id}">
                  <option value="">Choose User...</option>
                  ${assignOptions}
                </select>
                <button class="proj-add-contrib-btn px-2.5 py-1 bg-pink-ruby text-white hover:bg-pink-ruby/90 text-[11px] font-bold rounded" data-id="${proj.id}">Add</button>
              </div>
            </div>

          </div>

        </div>
      `;
    }).join("");

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div class="flex justify-between items-center pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Operational Campaign Projects</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Manage administrative tasks, set milestones, track execution percentages, and coordinate staffing assignments.</p>
          </div>
          <button id="add-project-btn" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all">
            + New Project
          </button>
        </div>

        <!-- Project Roster List -->
        <div class="grid grid-cols-1 gap-6">
          ${projectsHTML}
        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    // Project Status update
    const statusSelects = document.querySelectorAll('.proj-status-select');
    statusSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const status = e.target.value;
        const proj = projects.find(p => p.id === id);
        if (proj) {
          proj.status = status;
          if (status === "Completed") {
            proj.progressPercent = 100;
          } else if (status === "To Do" && proj.progressPercent > 20) {
            proj.progressPercent = 10;
          }
          alert(`Project status updated to "${status}".`);
          if (this.onStateChange) this.onStateChange();
        }
      });
    });

    // Slider input change
    const sliders = document.querySelectorAll('.proj-progress-slider');
    sliders.forEach(slider => {
      slider.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const val = parseInt(e.target.value, 10);
        const proj = projects.find(p => p.id === id);
        if (proj) {
          proj.progressPercent = val;
          if (val === 100) {
            proj.status = "Completed";
          } else if (val === 0) {
            proj.status = "To Do";
          } else {
            proj.status = "In Progress";
          }
          if (this.onStateChange) this.onStateChange();
        }
      });

      // Update text label on input drag
      slider.addEventListener('input', (e) => {
        const id = e.target.dataset.id;
        const card = e.target.closest(`[data-id="${id}"]`);
        if (card) {
          const pctVal = card.querySelector('.proj-pct-val');
          if (pctVal) pctVal.textContent = `${e.target.value}%`;
        }
      });
    });

    // Assign Contributor
    const addBtns = document.querySelectorAll('.proj-add-contrib-btn');
    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const card = e.target.closest(`[data-id="${id}"]`);
        if (card) {
          const select = card.querySelector('.proj-contributor-select');
          const contribId = select.value;
          if (!contribId) {
            alert("Please choose a valid user first.");
            return;
          }

          const proj = projects.find(p => p.id === id);
          if (proj) {
            if (!proj.contributors) proj.contributors = [];
            if (!proj.contributors.includes(contribId)) {
              proj.contributors.push(contribId);
              
              // Also sync into people records
              const person = people.find(p => p.id === contribId);
              if (person) {
                if (!person.relatedRecords.projects) person.relatedRecords.projects = [];
                if (!person.relatedRecords.projects.some(rp => rp.id === id)) {
                  person.relatedRecords.projects.push({ id: proj.id, name: proj.title, status: proj.status });
                }
              }

              alert(`Assigned contributor successfully.`);
              if (this.onStateChange) this.onStateChange();
            }
          }
        }
      });
    });

    // Add New Project button
    const addProjBtn = document.getElementById('add-project-btn');
    if (addProjBtn) {
      addProjBtn.addEventListener('click', () => {
        const title = prompt("Enter Project Title:");
        if (!title) return;
        const description = prompt("Enter Project Description:");
        if (!description) return;
        
        const projectCoordinators = people.filter(p => p.type === "Volunteer" || p.type === "Intern");
        const listStr = projectCoordinators.map((p, idx) => `${idx + 1}. ${p.name} (${p.id})`).join("\n");
        const ownerIdx = prompt(`Choose project owner (enter number):\n${listStr}`);
        
        if (ownerIdx) {
          const idx = parseInt(ownerIdx, 10) - 1;
          const owner = projectCoordinators[idx];
          if (owner) {
            const newProj = {
              id: `proj-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
              title,
              description,
              ownerId: owner.id,
              contributors: [owner.id],
              status: "To Do",
              progressPercent: 0
            };
            projects.push(newProj);
            
            // Sync project relation to owner's record
            if (!owner.relatedRecords.projects) owner.relatedRecords.projects = [];
            owner.relatedRecords.projects.push({ id: newProj.id, name: newProj.title, status: "To Do" });

            alert(`Successfully deployed project "${title}" assigned to ${owner.name}.`);
            if (this.onStateChange) this.onStateChange();
          } else {
            alert("Invalid owner choice.");
          }
        }
      });
    }
  }
}
