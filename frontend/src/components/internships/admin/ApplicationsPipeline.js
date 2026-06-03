import { internshipApplications } from '../../../mocks/applications.js';
import { applicants } from '../../../mocks/applicants.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';

export default class ApplicationsPipeline {
  render() {
    return `
      <div class="space-y-6 text-left select-none scroll-reveal revealed">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="font-display font-semibold text-[20px] text-text-dark">Recruitment Kanban Board</h3>
            <p class="font-sans text-[13px] text-text-light">Drag cards between stages or click the stage tag to transition applicants.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-interface text-[11px] font-bold uppercase tracking-widest text-text-light">Interactive Pipeline</span>
          </div>
        </div>

        <div id="kanban-board" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 select-none">
          <!-- Columns will be injected here by init/draw -->
        </div>
      </div>
    `;
  }

  static draw() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    const stages = [
      { key: "Applied", label: "Applied", color: "border-stone-300 bg-stone-50/60" },
      { key: "Shortlisted", label: "Shortlisted", color: "border-pink-medium bg-pink-blush/40" },
      { key: "Interview Scheduled", label: "Interview", color: "border-gold-satin bg-gold-light/40" },
      { key: "Offer Sent", label: "Offer Sent", color: "border-purple-300 bg-purple-50/30" },
      { key: "Offer Accepted", label: "Accepted", color: "border-emerald-300 bg-emerald-50/30" },
      { key: "Rejected", label: "Rejected", color: "border-red-300 bg-red-50/30" }
    ];

    board.innerHTML = stages.map(stage => {
      // Filter applications for this stage
      const stageApps = internshipApplications.filter(app => app.status === stage.key);
      
      const cardsHTML = stageApps.map(app => {
        const applicant = applicants.find(ap => ap.id === app.applicantId) || {};
        const opportunity = internshipOpportunities.find(opp => opp.id === app.opportunityId) || {};
        const score = app.evaluation ? app.evaluation.overall : 0;
        
        return `
          <div 
            draggable="true" 
            data-id="${app.id}" 
            class="kanban-card bg-white border border-stone-200 hover:border-pink-ruby rounded-lg p-3.5 shadow-sm hover:shadow transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col justify-between min-h-[135px]"
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="font-interface text-[9.5px] font-bold text-text-light uppercase tracking-wider">${app.applicationId}</span>
                <span class="font-sans text-[11px] font-bold text-text-dark bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200/50">${score ? `★ ${score}/10` : '—'}</span>
              </div>
              <h4 class="font-interface font-semibold text-[13.5px] text-text-dark leading-tight mb-1 truncate">${applicant.fullName || 'Unknown Candidate'}</h4>
              <p class="font-sans text-[11.5px] text-text-muted font-light mb-2 truncate">${opportunity.title || 'N/A'}</p>
            </div>
            
            <div class="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
              <a href="#/admin/internships/applicant/${app.id}" class="font-interface font-bold text-[9px] uppercase tracking-widest text-pink-ruby hover:text-pink-ruby/80">
                Evaluate →
              </a>
              <select class="stage-jump-select font-interface text-[9.5px] text-text-light border-0 bg-transparent py-0.5 focus:outline-none cursor-pointer" data-id="${app.id}">
                <option value="" disabled selected>Move...</option>
                ${stages.map(st => `<option value="${st.key}">${st.label}</option>`).join('')}
              </select>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div 
          data-stage="${stage.key}" 
          class="kanban-column flex flex-col border border-stone-200/80 rounded-xl p-3 min-h-[450px] ${stage.color}"
        >
          <div class="flex items-center justify-between mb-3.5 pb-2 border-b border-stone-200/60 px-1">
            <h4 class="font-interface font-bold text-[11px] uppercase tracking-widest text-text-dark">${stage.label}</h4>
            <span class="font-interface text-[10px] font-bold text-text-light bg-white border border-stone-200 px-2 py-0.5 rounded-full">${stageApps.length}</span>
          </div>
          <div class="kanban-cards-area flex-grow flex flex-col gap-3">
            ${cardsHTML || `
              <div class="flex-grow flex items-center justify-center border border-dashed border-stone-300/60 rounded-lg p-4 text-center">
                <span class="font-sans text-[11px] text-text-light italic font-light">Empty Stage</span>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Setup event listeners
    ApplicationsPipeline.bindEvents();
  }

  static bindEvents() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-column');
    const selectJumps = document.querySelectorAll('.stage-jump-select');

    // Drag-and-Drop Handlers
    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.id);
        card.classList.add('opacity-40');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('opacity-40');
      });
    });

    columns.forEach(column => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('border-pink-ruby', 'bg-pink-blush/10');
      });

      column.addEventListener('dragleave', () => {
        column.classList.remove('border-pink-ruby', 'bg-pink-blush/10');
      });

      column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('border-pink-ruby', 'bg-pink-blush/10');
        const id = e.dataTransfer.getData('text/plain');
        const targetStage = column.dataset.stage;
        
        if (id && targetStage) {
          const app = internshipApplications.find(a => a.id === id);
          if (app && app.status !== targetStage) {
            app.status = targetStage;
            // Redraw Kanban board
            ApplicationsPipeline.draw();
          }
        }
      });
    });

    // Dropdown Stage Selector (Accessible alternative)
    selectJumps.forEach(select => {
      select.addEventListener('change', (e) => {
        const id = select.dataset.id;
        const targetStage = e.target.value;
        if (id && targetStage) {
          const app = internshipApplications.find(a => a.id === id);
          if (app) {
            app.status = targetStage;
            ApplicationsPipeline.draw();
          }
        }
      });
    });
  }

  static init() {
    ApplicationsPipeline.draw();
  }
}
