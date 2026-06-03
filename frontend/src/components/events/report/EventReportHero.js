export default class EventReportHero {
  render(report) {
    if (!report) return '';

    return `
      <section class="relative bg-stone-900 text-white pt-32 pb-20 px-6 md:px-12 select-none overflow-hidden text-left">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-950 opacity-80 z-0"></div>
        
        <div class="max-w-4xl mx-auto relative z-10 space-y-6">
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest bg-pink-ruby text-white px-2.5 py-0.5 rounded-full border border-pink-ruby/30">
              ${report.category}
            </span>
            <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest bg-white/10 text-stone-300 px-2.5 py-0.5 rounded-full border border-white/10">
              Program: ${report.programId ? report.programId.toUpperCase() : 'GENERAL'}
            </span>
          </div>

          <h1 class="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            ${report.title}
          </h1>

          <div class="flex flex-wrap items-center gap-y-4 gap-x-8 pt-4 border-t border-white/10 font-interface text-[12px] text-stone-300">
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Campaign Date</span>
              <span class="text-white font-medium">${report.date}</span>
            </div>
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Location</span>
              <span class="text-white font-medium">${report.location}</span>
            </div>
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Published By</span>
              <span class="text-white font-medium">${report.author}</span>
            </div>
            <div>
              <span class="text-stone-500 uppercase tracking-widest block text-[9px] font-bold">Reviewed By</span>
              <span class="text-white font-medium">${report.reviewedBy}</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
