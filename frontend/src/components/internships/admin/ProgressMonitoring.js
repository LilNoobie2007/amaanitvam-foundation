import { progress as progressMock } from '../../../mocks/progress.js';
import { interns } from '../../../mocks/interns.js';
import { applicants } from '../../../mocks/applicants.js';
import { deliverables } from '../../../mocks/deliverables.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';

export default class ProgressMonitoring {
  render() {
    const listHTML = progressMock.map(p => {
      const intern = interns.find(i => i.id === p.internId) || {};
      const applicant = applicants.find(ap => ap.id === intern.applicantId) || {};
      const opportunity = internshipOpportunities.find(opp => opp.id === intern.opportunityId) || {};
      
      // Calculate deliverables
      const internDels = deliverables.filter(d => d.internId === p.internId);
      const submittedCount = internDels.filter(d => d.status === "Submitted" || d.status === "Approved").length;
      const approvedCount = internDels.filter(d => d.status === "Approved").length;

      // Check if any weekly logs have blockers
      const hasBlockers = p.weeklyLogs.some(log => log.blockers && log.blockers.toLowerCase() !== 'none' && log.blockers.toLowerCase() !== 'none.');

      // Phase completion counts
      const phases = [
        { label: "Onboarding", done: p.onboarding },
        { label: "Learning", done: p.learning },
        { label: "Execution", done: p.execution },
        { label: "Submission", done: p.finalSubmission },
        { label: "Completion", done: p.completion }
      ];

      const phaseBubblesHTML = phases.map(phase => `
        <div class="flex items-center gap-1.5 bg-stone-50 border border-stone-200/60 rounded px-2.5 py-1 text-[11px] font-sans">
          <span class="h-2 w-2 rounded-full ${phase.done ? 'bg-emerald-500' : 'bg-stone-300'}"></span>
          <span class="${phase.done ? 'text-text-dark font-medium' : 'text-text-light font-light'}">${phase.label}</span>
        </div>
      `).join('');

      const logsHTML = p.weeklyLogs.map((log, index) => `
        <div class="border-l-2 border-stone-200 pl-4 py-1.5 space-y-2 relative">
          <span class="absolute -left-1.5 top-2.5 h-3 w-3 rounded-full border border-white ${log.blockers && log.blockers.toLowerCase() !== 'none' ? 'bg-amber-500' : 'bg-stone-300'}"></span>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h5 class="font-interface font-bold text-[12.5px] text-text-dark">${log.week}</h5>
            ${log.blockers && log.blockers.toLowerCase() !== 'none' ? `
              <span class="inline-flex self-start sm:self-auto items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-interface font-semibold px-2 py-0.5 rounded border border-amber-200/60 uppercase tracking-wider">
                ⚠️ Blocker Active
              </span>
            ` : ''}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-[13px] text-text-muted leading-relaxed">
            <div class="space-y-1">
              <span class="block text-[10.5px] font-interface font-bold uppercase tracking-wide text-text-light">Achievements</span>
              <p class="font-light">${log.achievements}</p>
            </div>
            <div class="space-y-1">
              <span class="block text-[10.5px] font-interface font-bold uppercase tracking-wide text-text-light">Blockers</span>
              <p class="font-light ${log.blockers && log.blockers.toLowerCase() !== 'none' ? 'text-amber-800 font-semibold' : ''}">${log.blockers || 'None.'}</p>
            </div>
          </div>

          <div class="mt-2 bg-stone-50 border border-stone-150 rounded-lg p-3 space-y-2">
            <span class="block text-[10.5px] font-interface font-bold uppercase tracking-wide text-text-light">Mentor Supervisor Feedback</span>
            <p class="font-sans text-[13px] italic text-text-muted font-light comment-text" data-intern-id="${p.internId}" data-log-index="${index}">
              "${log.mentorComments || 'No feedback submitted yet.'}"
            </p>
            
            <div class="feedback-input-box hidden mt-3 space-y-2">
              <textarea rows="2" class="w-full font-sans text-[13px] p-2 rounded border border-stone-200 resize-none feedback-textarea" placeholder="Write feedback comment...">${log.mentorComments || ''}</textarea>
              <div class="flex gap-2">
                <button class="save-feedback-btn font-interface font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded bg-pink-ruby text-white shadow" data-intern-id="${p.internId}" data-log-index="${index}">Save</button>
                <button class="cancel-feedback-btn font-interface font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50" data-intern-id="${p.internId}" data-log-index="${index}">Cancel</button>
              </div>
            </div>

            <button class="add-feedback-btn font-interface font-bold text-[9px] uppercase tracking-widest text-pink-ruby hover:underline mt-1" data-intern-id="${p.internId}" data-log-index="${index}">
              ${log.mentorComments ? 'Edit Feedback' : '+ Add Feedback'}
            </button>
          </div>
        </div>
      `).join('');

      return `
        <!-- Intern Roster Log Row -->
        <div class="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col" data-row-intern="${p.internId}">
          
          <!-- Summary Header -->
          <div class="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-stone-100">
            
            <div class="text-left space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-display font-semibold text-[17px] text-text-dark">${applicant.fullName}</h4>
                <span class="font-sans text-[11px] px-2 py-0.5 rounded font-semibold ${intern.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' : 'bg-stone-100 text-stone-600 border border-stone-200'}">
                  ${intern.status || 'Active'}
                </span>
                ${hasBlockers ? `
                  <span class="bg-amber-100 text-amber-800 text-[10.5px] font-sans font-semibold px-2 py-0.5 rounded border border-amber-200 animate-pulse">
                    ⚠️ Blocker flagged
                  </span>
                ` : ''}
              </div>
              <p class="font-sans text-[12.5px] text-text-muted font-light">${opportunity.title} • Deliverables: <strong class="text-text-dark font-semibold">${submittedCount}/${internDels.length}</strong> submitted (${approvedCount} approved)</p>
            </div>

            <!-- Steps & Toggle Button -->
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-1.5 flex-wrap">
                ${phaseBubblesHTML}
              </div>
              
              <button class="toggle-logs-btn font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2 border border-stone-200 rounded hover:bg-stone-50 transition-colors" data-intern-id="${p.internId}">
                Show Logs
              </button>
            </div>

          </div>

          <!-- Collapsible Detailed Section -->
          <div class="logs-container hidden bg-stone-50/50 p-6 border-t border-stone-100/60 text-left space-y-5">
            <h4 class="font-interface font-bold text-[10.5px] uppercase tracking-widest text-text-light">
              Weekly Progress Journal & Retros
            </h4>
            
            <div class="space-y-6">
              ${logsHTML}
            </div>
          </div>

        </div>
      `;
    }).join('');

    return `
      <div class="space-y-6 text-left select-none scroll-reveal revealed">
        <div>
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Weekly Progress Monitoring</h3>
          <p class="font-sans text-[13px] text-text-light">Inspect weekly submissions and add mentor supervision guidelines directly into feedback entries.</p>
        </div>

        <div class="space-y-6">
          ${listHTML}
        </div>
      </div>
    `;
  }

  static init() {
    // Toggles for collapsibles
    const toggleBtns = document.querySelectorAll('.toggle-logs-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('[data-row-intern]');
        const logsContainer = row.querySelector('.logs-container');
        if (logsContainer) {
          const isHidden = logsContainer.classList.contains('hidden');
          if (isHidden) {
            logsContainer.classList.remove('hidden');
            btn.innerText = 'Hide Logs';
          } else {
            logsContainer.classList.add('hidden');
            btn.innerText = 'Show Logs';
          }
        }
      });
    });

    // Feedback actions
    const addFeedbackBtns = document.querySelectorAll('.add-feedback-btn');
    addFeedbackBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const box = btn.closest('.bg-stone-50').querySelector('.feedback-input-box');
        const text = btn.closest('.bg-stone-50').querySelector('.comment-text');
        if (box) {
          box.classList.remove('hidden');
          btn.classList.add('hidden');
          if (text) text.classList.add('hidden');
        }
      });
    });

    const cancelBtns = document.querySelectorAll('.cancel-feedback-btn');
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const bgBox = btn.closest('.bg-stone-50');
        const box = bgBox.querySelector('.feedback-input-box');
        const addBtn = bgBox.querySelector('.add-feedback-btn');
        const text = bgBox.querySelector('.comment-text');
        if (box && addBtn && text) {
          box.classList.add('hidden');
          addBtn.classList.remove('hidden');
          text.classList.remove('hidden');
        }
      });
    });

    const saveBtns = document.querySelectorAll('.save-feedback-btn');
    saveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const internId = btn.dataset.internId;
        const logIndex = parseInt(btn.dataset.logIndex);
        
        const bgBox = btn.closest('.bg-stone-50');
        const textarea = bgBox.querySelector('.feedback-textarea');
        const text = bgBox.querySelector('.comment-text');
        const box = bgBox.querySelector('.feedback-input-box');
        const addBtn = bgBox.querySelector('.add-feedback-btn');

        const val = textarea.value.trim();

        // Update mock array in-memory
        const p = progressMock.find(prog => prog.internId === internId);
        if (p && p.weeklyLogs[logIndex]) {
          p.weeklyLogs[logIndex].mentorComments = val;
          if (text) text.innerText = val ? `"${val}"` : `"No feedback submitted yet."`;
          alert('Verification: Weekly mentor feedback comments updated in mock progress records.');
          
          if (box && addBtn && text) {
            box.classList.add('hidden');
            addBtn.classList.remove('hidden');
            addBtn.innerText = val ? 'Edit Feedback' : '+ Add Feedback';
            text.classList.remove('hidden');
          }
        }
      });
    });
  }
}
