export default class InternDashboardHero {
  render(intern, applicant, mentor, cohort) {
    if (!intern || !applicant) return '';

    return `
      <section class="relative bg-stone-900 text-white pt-12 pb-16 px-6 md:px-12 select-none overflow-hidden text-left border-b border-white/5">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-950 opacity-80 z-0"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest bg-pink-ruby text-white px-2.5 py-0.5 rounded border border-pink-ruby/30">
                Intern Workspace
              </span>
              <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest bg-white/10 text-stone-300 px-2.5 py-0.5 rounded border border-white/10">
                ${cohort ? cohort.name : 'Summer 2026 Cohort'}
              </span>
            </div>
            
            <h1 class="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Welcome Back, ${applicant.fullName}
            </h1>
            <p class="font-sans text-[15px] text-stone-300 max-w-xl mt-2 leading-relaxed font-light">
              Assigned Domain: <strong class="text-white font-medium">${applicant.domain}</strong>
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-y-4 gap-x-8 font-interface text-[12px] text-stone-300">
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Assigned Mentor</span>
              <span class="text-white font-medium">${mentor ? mentor.name : 'Preeti Goyal'} (${mentor ? mentor.role : 'Operations Lead'})</span>
            </div>
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Placement Status</span>
              <span class="inline-block text-[9.5px] uppercase font-bold text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">
                ${intern.status}
              </span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
