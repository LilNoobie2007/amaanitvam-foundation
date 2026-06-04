import AdminLayout from '../components/admin/AdminLayout.js';
import { people } from '../mocks/admin/people.js';
import { donations } from '../mocks/admin/donationsAdmin.js';
import { certificates } from '../mocks/admin/certificates.js';

export default class AdminAnalyticsPage {
  constructor() {
    this.currentTimelineFilter = "All Time";
  }

  render() {
    const totalDonationsSum = donations
      .filter(d => d.status === "Completed" || d.status === "Acknowledged")
      .reduce((sum, current) => sum + current.amount, 0);

    const certificateCount = certificates.length;
    const volunteerCount = people.filter(p => p.type === "Volunteer").length;
    const internCount = people.filter(p => p.type === "Intern").length;

    // Intent calculations
    const intents = {};
    donations.forEach(d => {
      intents[d.intent] = (intents[d.intent] || 0) + d.amount;
    });

    const intentListHTML = Object.keys(intents).map(intentName => {
      const amt = intents[intentName];
      const percent = totalDonationsSum > 0 ? ((amt / totalDonationsSum) * 100).toFixed(0) : 0;
      return `
        <div class="space-y-1 font-sans text-[12.5px]">
          <div class="flex justify-between text-text-muted">
            <span class="font-semibold text-text-dark">${intentName}</span>
            <span>INR ${amt.toLocaleString()} (${percent}%)</span>
          </div>
          <div class="w-full bg-stone-100 h-1.5 rounded overflow-hidden">
            <div class="bg-pink-ruby h-full" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
    }).join("");

    const analyticsHTML = `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Operations Analytics & Reports</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Explore volunteer retainment indexes, funding distributions, and cohort completion trends.</p>
          </div>
          
          <div class="flex items-center gap-3">
            <span class="text-[12px] font-bold text-text-light font-interface uppercase">Range:</span>
            <select id="analytics-timeline-select" class="px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans text-[12px]">
              <option value="All Time" ${this.currentTimelineFilter === "All Time" ? "selected" : ""}>All Time</option>
              <option value="Summer Cohort" ${this.currentTimelineFilter === "Summer Cohort" ? "selected" : ""}>Summer 2026</option>
              <option value="Previous Month" ${this.currentTimelineFilter === "Previous Month" ? "selected" : ""}>May 2026</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Treasury Funding Pool</span>
            <span class="font-display font-bold text-2xl text-text-dark">INR ${(totalDonationsSum).toLocaleString()}</span>
            <span class="block text-[11px] text-emerald-600 font-sans mt-2">&uarr; 15% vs previous cycle</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Volunteers Registered</span>
            <span class="font-display font-bold text-2xl text-text-dark">${volunteerCount} Desk Profiles</span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Active Delhi NCR chapters</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Active Intern Roster</span>
            <span class="font-display font-bold text-2xl text-text-dark">${internCount} Interns</span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Summer 2026 Cohort cycle</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Issued Qualifications</span>
            <span class="font-display font-bold text-2xl text-text-dark">${certificateCount} Verifiable Certs</span>
            <span class="block text-[11px] text-emerald-600 font-sans mt-2">100% database verification matches</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Intents Allocation -->
          <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-4 lg:col-span-2">
            <h4 class="font-display font-semibold text-base text-text-dark pb-2 border-b border-stone-100">Donation Allocation by Intent</h4>
            <div class="space-y-4">
              ${intentListHTML}
            </div>
          </div>

          <!-- Retention Metric panel -->
          <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-4 text-left">
            <h4 class="font-display font-semibold text-base text-text-dark pb-2 border-b border-stone-100">Participant Retainment Index</h4>
            
            <div class="space-y-3 font-sans text-[12.5px] text-text-muted">
              <div class="flex justify-between items-center py-2 border-b border-stone-50">
                <span>Volunteer Consecutive Drives</span>
                <strong class="font-bold text-text-dark">88%</strong>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-stone-50">
                <span>Intern Deliverables Acceptance</span>
                <strong class="font-bold text-text-dark">92%</strong>
              </div>
              <div class="flex justify-between items-center py-2">
                <span>Alumni Re-engagement rate</span>
                <strong class="font-bold text-text-dark">74%</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    return AdminLayout.render(analyticsHTML, "dashboard");
  }

  init() {
    AdminLayout.init();

    const select = document.getElementById('analytics-timeline-select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentTimelineFilter = e.target.value;
        alert(`Verification: Refreshing analytics dataset filter to "${this.currentTimelineFilter}"`);
        
        // Repaint
        const appElement = document.querySelector('#app');
        if (appElement) {
          appElement.innerHTML = this.render();
          this.init();
        }
      });
    }
  }
}
