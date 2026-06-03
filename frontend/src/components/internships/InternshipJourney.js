export default class InternshipJourney {
  render() {
    return `
      <section class="py-16 px-6 max-w-4xl mx-auto select-none">
        <div class="text-center mb-16 scroll-reveal revealed">
          <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Milestones</span>
          <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">The Program Lifecycle</h2>
          <p class="font-sans text-[14.5px] text-text-muted mt-3 font-light max-w-xl mx-auto leading-relaxed">
            From submitting your educational history to drafting deliverables and entering our alumni registry network.
          </p>
        </div>

        <div class="relative pl-8 sm:pl-32 border-l border-stone-200 py-2 text-left space-y-10">
          
          <div class="relative stagger-load revealed">
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-pink-ruby border-4 border-white shadow-sm"></div>
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">Step 1</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Discover & Apply</h4>
            <p class="font-sans text-[14px] text-text-muted mt-1 leading-relaxed font-light">
              Explore open domains, check slot vacancies, upload your resume, and write your Statement of Purpose (SOP).
            </p>
          </div>

          <div class="relative stagger-load revealed">
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-pink-ruby border-4 border-white shadow-sm"></div>
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">Step 2</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Screening & Interview</h4>
            <p class="font-sans text-[14px] text-text-muted mt-1 leading-relaxed font-light">
              Our operations coordinators review SOPs and portfolio links. Shortlisted candidates schedule technical evaluations.
            </p>
          </div>

          <div class="relative stagger-load revealed">
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-pink-ruby border-4 border-white shadow-sm"></div>
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">Step 3</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Offer & Onboarding</h4>
            <p class="font-sans text-[14px] text-text-muted mt-1 leading-relaxed font-light">
              Selected candidates accept placement offers and complete documentation, get introduced to their mentor, and align project task maps.
            </p>
          </div>

          <div class="relative stagger-load revealed">
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-gold-satin border-4 border-white shadow-sm"></div>
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-gold-ochre">Step 4</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Execution & Weekly Reviews</h4>
            <p class="font-sans text-[14px] text-text-muted mt-1 leading-relaxed font-light">
              Develop system architectures, write reports, and draft illustrations. Review blockers and file logs weekly with assigned mentors.
            </p>
          </div>

          <div class="relative stagger-load revealed">
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-white shadow-sm"></div>
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400">Step 5</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Completion & Alumni Network</h4>
            <p class="font-sans text-[14px] text-text-muted mt-1 leading-relaxed font-light">
              Submit final deliverables and pass compliance rules (attendance and submissions) to get verified credentials. Transition into the Amaanitvam Alumni Registry Network.
            </p>
          </div>

        </div>
      </section>
    `;
  }
}
