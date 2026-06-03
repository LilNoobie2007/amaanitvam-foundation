import { internshipStats } from '../../../mocks/internshipStats.js';

export default class InternshipOverview {
  render() {
    const s = internshipStats;

    const domainHTML = Object.entries(s.applicationsByDomain).map(([domain, count]) => {
      const percentage = (count / s.applications) * 100;
      return `
        <div class="space-y-1">
          <div class="flex justify-between text-[12.5px] font-sans text-text-muted">
            <span>${domain}</span>
            <strong class="font-semibold text-text-dark">${count} applications (${Math.round(percentage)}%)</strong>
          </div>
          <div class="w-full bg-stone-100 h-2 rounded overflow-hidden">
            <div class="bg-pink-ruby h-full" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="space-y-8 select-none text-left scroll-reveal revealed">
        
        <!-- Summary Cards Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          
          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Active Openings
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${s.openOpportunities}
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Open recruitment channels</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Applications
            </span>
            <span class="font-display font-bold text-3xl text-pink-ruby">
              ${s.applications}
            </span>
            <span class="block text-[11px] text-pink-ruby font-sans mt-2">Roster profiles submitted</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Active Interns
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${s.activeInterns}
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Currently in training</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Acceptance Rate
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${s.acceptanceRate}%
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Selectivity ratio</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Active Mentors
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${s.activeMentors}
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Assigned coordinators</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm lg:col-span-1">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Completion Rate
            </span>
            <span class="font-display font-bold text-3xl text-emerald-800">
              ${s.completionRate}%
            </span>
            <span class="block text-[11px] text-emerald-600 font-sans mt-2">Alumni exit release index</span>
          </div>

        </div>

        <!-- Domain Distribution Panel -->
        <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm max-w-2xl text-left">
          <h4 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100 mb-4">
            Application Distribution by Domain
          </h4>
          <div class="space-y-4">
            ${domainHTML}
          </div>
        </div>

      </div>
    `;
  }
}
