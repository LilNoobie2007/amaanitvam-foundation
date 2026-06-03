export default class EventReportMetrics {
  render(report) {
    if (!report || !report.metrics) return '';
    const m = report.metrics;

    return `
      <section class="py-12 px-6 bg-stone-50 border-y border-stone-200/60 select-none">
        <div class="max-w-4xl mx-auto">
          
          <div class="text-left mb-8">
            <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-pink-ruby">Impact Logs</span>
            <h3 class="font-display font-semibold text-[22px] text-text-dark mt-1">Quantified Outcome Metrics</h3>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center stagger-container">
            
            <div class="bg-white border border-stone-200/80 rounded-xl p-4 stagger-load revealed">
              <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Participants</span>
              <span class="font-display font-bold text-2xl md:text-3xl text-text-dark">${m.participants}</span>
            </div>

            <div class="bg-white border border-stone-200/80 rounded-xl p-4 stagger-load revealed">
              <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Volunteers</span>
              <span class="font-display font-bold text-2xl md:text-3xl text-pink-ruby">${m.volunteers}</span>
            </div>

            <div class="bg-white border border-stone-200/80 rounded-xl p-4 stagger-load revealed">
              <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Hours Logged</span>
              <span class="font-display font-bold text-2xl md:text-3xl text-text-dark">${m.hoursContributed} hrs</span>
            </div>

            <div class="bg-white border border-stone-200/80 rounded-xl p-4 stagger-load revealed">
              <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Reach</span>
              <span class="font-display font-bold text-2xl md:text-3xl text-gold-ochre">${m.communitiesReached} Center${m.communitiesReached > 1 ? 's' : ''}</span>
            </div>

            <div class="bg-white border border-stone-200/80 rounded-xl p-4 col-span-2 md:col-span-1 stagger-load revealed">
              <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Resources</span>
              <span class="font-display font-bold text-2xl md:text-3xl text-emerald-800">${m.resourcesDistributed || 0} units</span>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
