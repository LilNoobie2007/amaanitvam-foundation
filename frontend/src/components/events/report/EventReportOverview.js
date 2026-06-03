export default class EventReportOverview {
  render(report) {
    if (!report) return '';

    return `
      <section class="py-12 px-6 max-w-4xl mx-auto select-none text-left">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <!-- Column 1: Objectives (col span 5) -->
          <div class="md:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-xl space-y-4 scroll-reveal revealed">
            <h3 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark border-b border-stone-200 pb-2">
              Campaign Objectives
            </h3>
            <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light">
              ${report.objective}
            </p>
          </div>

          <!-- Column 2: Narrative background & Activities (col span 7) -->
          <div class="md:col-span-7 space-y-6 scroll-reveal revealed">
            <div>
              <h3 class="font-display font-semibold text-[20px] text-text-dark mb-3">
                Background Context
              </h3>
              <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
                Amaanitvam Foundation strives to build permanent community relationships. In leading up to this campaign, our team surveyed the region to identify local gaps, align coordinates with community leaders, and design structured engagement scripts.
              </p>
            </div>

            <div class="pt-4 border-t border-stone-100">
              <h3 class="font-display font-semibold text-[20px] text-text-dark mb-3">
                Activities Conducted
              </h3>
              <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
                ${report.activities}
              </p>
            </div>
          </div>

        </div>
      </section>
    `;
  }
}
