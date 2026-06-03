import { interns } from '../../../mocks/interns.js';
import { applicants } from '../../../mocks/applicants.js';
import { mentors } from '../../../mocks/mentors.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';
import { cohorts } from '../../../mocks/cohorts.js';

export default class MentorAssignment {
  render() {
    const activeInterns = interns.filter(i => i.status === "Active");

    const internMentorCardsHTML = activeInterns.map(intern => {
      const applicant = applicants.find(ap => ap.id === intern.applicantId) || {};
      const opportunity = internshipOpportunities.find(opp => opp.id === intern.opportunityId) || {};
      const currentMentor = mentors.find(m => m.id === intern.mentorId) || { name: "Unassigned", role: "N/A" };
      const cohort = cohorts.find(c => c.id === intern.cohortId) || {};

      const mentorOptionsHTML = mentors.map(m => `
        <option value="${m.id}" ${m.id === intern.mentorId ? 'selected' : ''}>
          ${m.name} (${m.role})
        </option>
      `).join('');

      return `
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6" data-intern-id="${intern.id}">
          <div class="space-y-1.5 text-left md:max-w-md">
            <div class="flex items-center gap-2">
              <span class="font-interface text-[11px] font-bold text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz/60">
                ${cohort.name || 'Summer 2026'}
              </span>
              <span class="font-sans text-[11px] text-text-light font-light">ID: ${intern.id}</span>
            </div>
            
            <h4 class="font-display font-semibold text-[18px] text-text-dark leading-snug">
              ${applicant.fullName}
            </h4>
            
            <p class="font-sans text-[13px] text-text-muted">
              Role: <strong class="text-text-dark font-medium">${opportunity.title}</strong>
            </p>
            
            <p class="font-sans text-[12px] text-text-light">
              Current Mentor: <strong class="mentor-display text-text-dark font-semibold">${currentMentor.name}</strong> (${currentMentor.role})
            </p>
          </div>

          <!-- Assignment Form Control -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="flex flex-col gap-1 text-left">
              <label class="font-interface font-bold text-[9px] uppercase tracking-widest text-text-light pl-0.5">Assign Advisor</label>
              <select class="mentor-select font-sans text-[13px] px-3 py-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby" data-intern-id="${intern.id}">
                ${mentorOptionsHTML}
              </select>
            </div>
            
            <button class="btn-save-assignment font-interface font-bold text-[9.5px] uppercase tracking-widest px-4 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors self-end sm:self-auto" data-intern-id="${intern.id}">
              Update
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="space-y-6 text-left select-none scroll-reveal revealed">
        <div>
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Mentor Allocations Board</h3>
          <p class="font-sans text-[13px] text-text-light">Select and assign educational coordinators or operations leads for each active intern.</p>
        </div>

        <div class="space-y-4">
          ${internMentorCardsHTML || `
            <div class="bg-white border border-stone-200 rounded-xl p-8 text-center shadow-sm">
              <p class="font-sans text-[14.5px] text-text-light italic font-light">No active interns requiring mentor assignments.</p>
            </div>
          `}
        </div>
      </div>
    `;
  }

  static init() {
    const cards = document.querySelectorAll('[data-intern-id]');

    cards.forEach(card => {
      const internId = card.dataset.internId;
      const select = card.querySelector('.mentor-select');
      const saveBtn = card.querySelector('.btn-save-assignment');
      const mentorDisplay = card.querySelector('.mentor-display');

      if (saveBtn && select && mentorDisplay) {
        saveBtn.addEventListener('click', () => {
          const selectedMentorId = select.value;
          const intern = interns.find(i => i.id === internId);
          const newMentor = mentors.find(m => m.id === selectedMentorId);

          if (intern && newMentor) {
            intern.mentorId = selectedMentorId;
            mentorDisplay.innerText = newMentor.name;
            alert(`Verification: Mentor reassignment saved. ${newMentor.name} is now supervising Intern ID ${internId}.`);
          }
        });
      }
    });
  }
}
