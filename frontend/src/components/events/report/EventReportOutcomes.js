export default class EventReportOutcomes {
  render(report) {
    if (!report) return '';

    return `
      <section class="py-12 px-6 max-w-4xl mx-auto select-none text-left">
        <div class="space-y-8">
          
          <!-- Section 1: Outcomes -->
          <div class="scroll-reveal revealed">
            <h3 class="font-display font-semibold text-[22px] text-text-dark border-l-4 border-pink-ruby pl-3 mb-3">
              Outcomes & Achieved Impact
            </h3>
            <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
              ${report.outcomes}
            </p>
          </div>

          <!-- Section 2: Key Learnings -->
          <div class="scroll-reveal revealed">
            <h3 class="font-display font-semibold text-[22px] text-text-dark border-l-4 border-gold-satin pl-3 mb-3">
              Key Retrospective Learnings
            </h3>
            <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
              ${report.lessonsLearned}
            </p>
          </div>

          <!-- Section 3: Future Directions -->
          <div class="scroll-reveal revealed">
            <h3 class="font-display font-semibold text-[22px] text-text-dark border-l-4 border-stone-800 pl-3 mb-3">
              Future Recommendations & Action Steps
            </h3>
            <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
              Based on the results, we will establish weekly follow-up reading circles for the identified out-of-school students. We will also coordinate with municipal representatives to streamline documentation and make registration centers accessible for elders.
            </p>
          </div>

        </div>
      </section>
    `;
  }
}
