import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { internshipOpportunities } from '../mocks/opportunities.js';
import { cohorts } from '../mocks/cohorts.js';

export default class InternshipOpportunityPage {
  constructor() {
    this.navbar = new Navbar();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const slug = parts[parts.length - 1];

    const opp = internshipOpportunities.find(o => o.slug === slug) || internshipOpportunities[0];
    const cohort = cohorts.find(c => c.id === opp.cohortId) || { name: "Summer 2026 Cohort" };

    const filledPercent = (opp.filledSeats / opp.totalSeats) * 100;

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-12 px-6">
          <div class="max-w-4xl mx-auto space-y-10">
            
            <!-- Breadcrumbs -->
            <div class="text-left font-interface text-[11px] uppercase tracking-widest text-text-light">
              <a href="#/internships" class="hover:text-pink-ruby">Internships</a> / 
              <a href="#/internships/domain/${opp.domain.toLowerCase().replace(' ', '-')}" class="hover:text-pink-ruby">${opp.domain}</a> / 
              <span class="text-text-dark">${opp.title}</span>
            </div>

            <!-- Opportunity Card -->
            <div class="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm text-left space-y-6 scroll-reveal revealed">
              
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
                <div class="space-y-2">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-interface text-[10px] font-bold text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz/60">
                      ${cohort.name}
                    </span>
                    <span class="font-sans text-[11.5px] text-text-light font-medium bg-stone-50 border border-stone-200 px-2 py-0.5 rounded">
                      ${opp.mode}
                    </span>
                  </div>
                  <h2 class="font-display font-semibold text-3xl text-text-dark tracking-tight">
                    ${opp.title}
                  </h2>
                </div>

                <div class="text-left md:text-right space-y-1">
                  <span class="block font-interface text-[10px] uppercase font-bold text-text-light">Application Deadline</span>
                  <span class="font-sans text-[14px] text-text-dark font-semibold">${opp.deadline}</span>
                </div>
              </div>

              <!-- Main Specifications Details -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left py-2">
                <div class="space-y-1">
                  <span class="block font-interface text-[9.5px] uppercase font-bold text-text-light tracking-wide">Duration</span>
                  <span class="font-sans text-[14px] text-text-dark font-semibold">${opp.duration}</span>
                </div>
                <div class="space-y-1">
                  <span class="block font-interface text-[9.5px] uppercase font-bold text-text-light tracking-wide">Stipend Details</span>
                  <span class="font-sans text-[14px] text-emerald-800 font-semibold">Unpaid (Educational/Volunteer)</span>
                </div>
                <div class="space-y-1">
                  <span class="block font-interface text-[9.5px] uppercase font-bold text-text-light tracking-wide">Eligibility Check</span>
                  <span class="font-sans text-[14px] text-text-dark font-semibold">Pursuing Bachelor's or Master's</span>
                </div>
              </div>

              <!-- Content Description -->
              <div class="space-y-3 pt-3 border-t border-stone-100">
                <h4 class="font-display font-semibold text-lg text-text-dark">Job Description & Scope</h4>
                <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light">
                  ${opp.description} 
                  At Amaanitvam, we build frameworks that directly impact educational centers and field resources. In this role, you will collaborate with lead advisors to implement production-quality code/layouts/visuals depending on weekly targets, taking ownership of components within a structured lifecycle.
                </p>
              </div>

              <!-- Seating Status tracker -->
              <div class="bg-stone-50 border border-stone-150 rounded-xl p-5 space-y-3">
                <div class="flex items-center justify-between font-interface text-[12.5px]">
                  <span class="text-text-muted">Seats Filled Metrics</span>
                  <span class="font-bold text-text-dark">${opp.filledSeats} / ${opp.totalSeats} seats filled (${opp.remainingSeats} remaining)</span>
                </div>
                <div class="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-pink-ruby h-full transition-all duration-500" style="width: ${filledPercent}%"></div>
                </div>
              </div>

              <!-- Learning Outcomes / Requirements checklist -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                <div class="space-y-3">
                  <h4 class="font-interface font-bold text-[11px] uppercase tracking-widest text-text-light">Expectations & Prerequisites</h4>
                  <ul class="space-y-2 text-[13.5px] font-sans text-text-muted leading-relaxed font-light">
                    <li class="flex items-start gap-2"><span class="text-pink-ruby font-bold mt-0.5">•</span> Stable internet and laptop for remote coordination</li>
                    <li class="flex items-start gap-2"><span class="text-pink-ruby font-bold mt-0.5">•</span> Commit minimum 15-20 hours per week</li>
                    <li class="flex items-start gap-2"><span class="text-pink-ruby font-bold mt-0.5">•</span> Prior knowledge/portfolios in domain specializations</li>
                  </ul>
                </div>

                <div class="space-y-3">
                  <h4 class="font-interface font-bold text-[11px] uppercase tracking-widest text-text-light">What we offer</h4>
                  <ul class="space-y-2 text-[13.5px] font-sans text-text-muted leading-relaxed font-light">
                    <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold mt-0.5">✓</span> Certificate of Internship on compliance completion</li>
                    <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold mt-0.5">✓</span> Weekly mentorship syncs with industry coordinators</li>
                    <li class="flex items-start gap-2"><span class="text-emerald-600 font-bold mt-0.5">✓</span> Direct community impact visual proofs</li>
                  </ul>
                </div>
              </div>

              <!-- Apply CTA Button -->
              <div class="pt-6 border-t border-stone-150 flex items-center justify-between flex-wrap gap-4">
                <div class="text-[12.5px] text-text-light font-sans">
                  * Submission takes approx 5 minutes. Resume PDF required.
                </div>
                
                ${opp.remainingSeats > 0 && opp.status === 'Open' ? `
                  <button id="btn-apply-cta" class="font-interface font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow-md transition-colors">
                    Apply for this Role
                  </button>
                ` : `
                  <button disabled class="font-interface font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300">
                    Seats Full / Closed
                  </button>
                `}
              </div>

            </div>

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    const applyBtn = document.getElementById('btn-apply-cta');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const hash = window.location.hash;
        const parts = hash.split('/');
        const slug = parts[parts.length - 1];
        const opp = internshipOpportunities.find(o => o.slug === slug) || internshipOpportunities[0];
        
        // Save selected opportunity in localStorage
        localStorage.setItem('selected_internship_opportunity_id', opp.id);
        
        // Redirect to application form
        window.location.hash = '#/internships/apply';
      });
    }
  }
}
