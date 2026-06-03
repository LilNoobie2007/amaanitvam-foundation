import { cohorts } from '../../../mocks/cohorts.js';
import { mentors } from '../../../mocks/mentors.js';

export default class MyInternship {
  render(intern, applicant, opportunity) {
    if (!intern || !applicant) return '';

    const cohort = cohorts.find(c => c.id === intern.cohortId);
    const mentor = mentors.find(m => m.id === intern.mentorId);

    const feedItems = [
      {
        id: "feed-1",
        date: "2026-06-03",
        title: "Certificate Eligibility Updated",
        desc: "Your attendance rate threshold checks have passed successfully (Rate: 92%). Deliverables tracking is currently at 66% completion.",
        icon: "📜"
      },
      {
        id: "feed-2",
        date: "2026-06-02",
        title: "Deliverable Approved",
        desc: "Your task 'Draft Schema JSON definitions' has been reviewed and approved by Operations Lead Preeti Goyal.",
        icon: "✓"
      },
      {
        id: "feed-3",
        date: "2026-05-28",
        title: "Mentor Feedback Submitted",
        desc: "Mentor commented on Week 2 Retro: 'Strong conceptual analysis. The separation boundaries were finalized.'",
        icon: "💬"
      },
      {
        id: "feed-4",
        date: "2026-05-15",
        title: "Internship Onboarding Finalized",
        desc: "Document checklists, Slack channels invitations, and Git hooks alignments were completed.",
        icon: "⚙️"
      }
    ];

    const feedHTML = feedItems.map(item => {
      return `
        <div class="flex items-start gap-4 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
          <div class="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-interface text-[14px] shrink-0">
            ${item.icon}
          </div>
          <div>
            <h5 class="font-display font-semibold text-[14.5px] text-text-dark">${item.title}</h5>
            <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light mt-0.5">${item.desc}</p>
            <span class="block text-[9.5px] text-text-light font-mono mt-1">${item.date}</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Placement Information</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/internship/profile
          </span>
        </div>

        <!-- Details grid -->
        <div class="grid grid-cols-2 gap-4 font-sans text-[13.5px] text-text-muted leading-relaxed border-b border-stone-100 pb-6 select-none">
          <div>
            <span class="text-text-light text-[10px] uppercase tracking-wider block font-interface font-bold">Duration</span>
            <strong class="font-semibold text-text-dark">${opportunity ? opportunity.duration : '3 Months'}</strong>
          </div>
          <div>
            <span class="text-text-light text-[10px] uppercase tracking-wider block font-interface font-bold">Working Mode</span>
            <strong class="font-semibold text-text-dark">${opportunity ? opportunity.mode : 'Remote'}</strong>
          </div>
          <div>
            <span class="text-text-light text-[10px] uppercase tracking-wider block font-interface font-bold">Start Term Date</span>
            <span class="text-text-dark">${cohort ? cohort.startDate : '2026-05-15'}</span>
          </div>
          <div>
            <span class="text-text-light text-[10px] uppercase tracking-wider block font-interface font-bold">End Term Date</span>
            <span class="text-text-dark">${cohort ? cohort.endDate : '2026-08-15'}</span>
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="space-y-4">
          <h4 class="font-display font-semibold text-lg text-text-dark">Recent Workspace Updates</h4>
          <div class="space-y-4">
            ${feedHTML}
          </div>
        </div>

      </div>
    `;
  }
}
