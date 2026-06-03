import { internshipOpportunities } from '../../mocks/opportunities.js';
import { cohorts } from '../../mocks/cohorts.js';

export default class OpenOpportunities {
  render() {
    // Only display Open opportunities
    const openRoles = internshipOpportunities.filter(opp => opp.status === 'Open');

    const cards = openRoles.map(opp => {
      const cohort = cohorts.find(c => c.id === opp.cohortId);
      const cohortName = cohort ? cohort.name.split(' ')[0] + ' ' + cohort.name.split(' ')[1] : 'Summer 2026';

      return `
        <div class="bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-6 stagger-load revealed">
          <div>
            <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider mb-3">
              <span class="bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded border border-stone-200/60">${cohortName}</span>
              <span class="font-semibold text-pink-ruby">${opp.mode}</span>
            </div>
            
            <h3 class="font-display font-semibold text-[20px] text-text-dark leading-snug mb-3">
              ${opp.title}
            </h3>
            
            <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light line-clamp-3 mb-4">
              ${opp.description}
            </p>
          </div>

          <div class="space-y-4 pt-4 border-t border-stone-100">
            <!-- Seating metrics -->
            <div class="flex items-center justify-between text-[13px] font-interface">
              <span class="text-text-light uppercase tracking-wider">Seats Filled</span>
              <span class="font-bold text-text-dark">${opp.filledSeats} / ${opp.totalSeats} <span class="text-xs font-normal text-text-light">(${opp.remainingSeats} Left)</span></span>
            </div>

            <div class="flex items-center justify-between text-[12px] font-sans text-text-muted">
              <span>Deadline: <strong>${opp.deadline}</strong></span>
              <span>Duration: <strong>${opp.duration}</strong></span>
            </div>

            <!-- Action buttons -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <a href="#/internships/opportunity/${opp.slug}" class="text-center font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-2.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
                View Details
              </a>
              <a href="#/internships/apply?opportunityId=${opp.id}" class="text-center font-interface font-semibold text-[10px] uppercase tracking-widest px-3 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow-sm transition-colors">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="py-16 px-6 max-w-6xl mx-auto select-none" id="openings-section">
        <div class="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-250 mb-12 scroll-reveal revealed">
          <div class="text-left">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Opportunities</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Active Opportunities</h2>
          </div>
          <p class="font-sans text-[14.5px] text-text-muted mt-2 md:mt-0 font-light max-w-sm">
            Apply to secure a placement in our Summer 2026 Cohort cycle. Reviews occur on a rolling basis.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
          ${cards.length > 0 ? cards : `
            <div class="col-span-full text-center py-16 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
              <p class="font-sans text-[16px] text-text-light">No open slots available at the moment.</p>
            </div>
          `}
        </div>
      </section>
    `;
  }
}
