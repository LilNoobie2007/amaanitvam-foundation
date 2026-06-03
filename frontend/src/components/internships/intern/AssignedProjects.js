import { internProjects } from '../../../mocks/internProjects.js';
import { deliverables as mockDeliverables } from '../../../mocks/deliverables.js';

export default class AssignedProjects {
  constructor() {
    this.deliverablesList = [...mockDeliverables];
  }

  render(intern) {
    if (!intern) return '';

    const myProjects = internProjects.filter(p => p.internId === intern.id);
    const myDeliverables = this.deliverablesList.filter(d => d.internId === intern.id);

    const projectRows = myProjects.map(proj => {
      let statusColor = 'bg-stone-50 text-stone-600 border-stone-200';
      if (proj.status === 'Completed') statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-250';
      else if (proj.status === 'In Progress') statusColor = 'bg-pink-blush text-pink-ruby border-pink-quartz';
      else if (proj.status === 'To Do') statusColor = 'bg-stone-100 text-stone-700 border-stone-300';

      return `
        <div class="p-5 border border-stone-200/80 rounded-xl bg-white space-y-3 shadow-sm select-none hover:shadow transition-shadow">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${proj.status}
            </span>
            <span class="font-sans text-[12px] text-text-light">Due Date: ${proj.dueDate}</span>
          </div>

          <h4 class="font-display font-semibold text-[17px] text-text-dark leading-snug">
            ${proj.title}
          </h4>
          <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
            ${proj.description}
          </p>
        </div>
      `;
    }).join('');

    const deliverableRows = myDeliverables.map(del => {
      let statusColor = 'bg-stone-50 text-stone-600 border-stone-200';
      if (del.status === 'Approved') statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-250';
      else if (del.status === 'Submitted') statusColor = 'bg-amber-50 text-amber-800 border-amber-250';
      else if (del.status === 'Pending') statusColor = 'bg-rose-50 text-rose-800 border-rose-250';
      else if (del.status === 'Reviewed') statusColor = 'bg-pink-blush text-pink-ruby border-pink-quartz';

      let actionHTML = '';
      if (del.status === 'Pending') {
        actionHTML = `
          <div class="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <input type="url" id="sub-url-${del.id}" placeholder="Enter submission link (GitHub PR, Figma, etc.)..." class="w-full sm:max-w-xs font-sans text-[12px] px-3 py-1.5 rounded border border-stone-200 focus:outline-none">
            <button class="btn-submit-deliverable font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow-sm shrink-0" data-id="${del.id}">
              Submit Work
            </button>
          </div>
        `;
      } else if (del.submissionLink) {
        actionHTML = `
          <div class="mt-2 text-[12px] font-sans">
            <span class="text-text-light">Submission:</span> 
            <a href="${del.submissionLink}" target="_blank" class="text-pink-ruby hover:underline font-mono text-[11.5px]">${del.submissionLink}</a>
            ${del.feedback ? `<div class="mt-2 p-2 bg-stone-50 border border-stone-200 rounded text-text-muted text-[12px] font-light"><strong>Mentor Feedback:</strong> ${del.feedback}</div>` : ''}
          </div>
        `;
      }

      return `
        <div class="p-5 border border-stone-200/80 rounded-xl bg-white space-y-3 shadow-sm hover:shadow transition-shadow">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${del.status}
            </span>
            <span class="font-sans text-[12px] text-text-light">Deadline: ${del.dueDate}</span>
          </div>

          <h4 class="font-display font-semibold text-[17px] text-text-dark leading-snug">
            ${del.title}
          </h4>
          
          ${actionHTML}
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left space-y-6" id="projects-workspace">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Assigned Projects & Deliverables</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/internship/projects
          </span>
        </div>

        <!-- Custom tabs controller -->
        <div class="flex border-b border-stone-200 text-[10px] font-interface uppercase tracking-widest font-semibold gap-4 select-none">
          <button class="tab-projects-btn border-b-2 border-pink-ruby text-pink-ruby pb-2" data-tab="projects">
            Active Projects (${myProjects.length})
          </button>
          <button class="tab-projects-btn border-b-2 border-transparent text-text-light hover:text-text-dark pb-2" data-tab="deliverables">
            Task Deliverables (${myDeliverables.length})
          </button>
        </div>

        <!-- Tab content boxes -->
        <div class="tab-projects-content" id="projects-list-tab">
          <div class="grid grid-cols-1 gap-6">
            ${projectRows.length > 0 ? projectRows : `
              <div class="text-center py-10 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
                <p class="font-sans text-[14px] text-text-light">No projects assigned.</p>
              </div>
            `}
          </div>
        </div>

        <div class="tab-projects-content hidden" id="deliverables-list-tab">
          <div class="grid grid-cols-1 gap-6">
            ${deliverableRows.length > 0 ? deliverableRows : `
              <div class="text-center py-10 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
                <p class="font-sans text-[14px] text-text-light">No deliverables mapped.</p>
              </div>
            `}
          </div>
        </div>

      </div>
    `;
  }

  static init(intern, onStateChangeCallback) {
    const tabs = document.querySelectorAll('.tab-projects-btn');
    const contents = document.querySelectorAll('.tab-projects-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('border-pink-ruby', 'text-pink-ruby');
          t.classList.add('border-transparent', 'text-text-light');
        });
        tab.classList.add('border-pink-ruby', 'text-pink-ruby');
        tab.classList.remove('border-transparent', 'text-text-light');

        const target = tab.dataset.tab;
        contents.forEach(c => c.classList.add('hidden'));

        const targetEl = document.getElementById(`${target}-list-tab`);
        if (targetEl) targetEl.classList.remove('hidden');
      });
    });

    const workspace = document.getElementById('projects-workspace');
    if (workspace) {
      workspace.addEventListener('click', (e) => {
        const btn = e.target;
        if (!btn.classList.contains('btn-submit-deliverable')) return;

        const id = btn.dataset.id;
        if (!id) return;

        const input = document.getElementById(`sub-url-${id}`);
        if (!input || !input.value.trim()) {
          alert('Failure: Please enter a valid submission URL.');
          return;
        }

        alert(`Success: Deliverable ${id} submitted. Status updated to Submitted.`);
        
        // Find deliverable in list and update
        const del = mockDeliverables.find(d => d.id === id);
        if (del) {
          del.status = 'Submitted';
          del.submissionLink = input.value.trim();
        }

        if (onStateChangeCallback) onStateChangeCallback();
      });
    }
  }
}
