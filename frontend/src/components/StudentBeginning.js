export default class StudentBeginning {
  render() {
    return `
      <section id="beginning" class="relative py-28 bg-white overflow-hidden z-20">
        <!-- Vertical connector line -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/80 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-5xl mx-auto px-6 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <!-- Left Side: Large Quote (5 cols) -->
            <div class="lg:col-span-6 text-left scroll-reveal">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-4 block">The Origin</span>
              
              <h2 class="font-display italic text-3xl md:text-4xl text-stone-800 leading-relaxed font-light">
                "Every meaningful change begins when someone chooses to care."
              </h2>
            </div>

            <!-- Right Side: Narrative Paragraph (6 cols, 1 spacer) -->
            <div class="lg:col-span-5 lg:col-start-8 text-left stagger-container">
              <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-4 stagger-load">
                A Student-Led Beginning
              </h4>
              
              <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light mb-6 stagger-load">
                Amaanitvam Foundation was founded by a group of passionate students who realized that structural social gaps could not be solved by distant charity alone. We believed that true change is direct, localized, and led by the youth.
              </p>

              <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light stagger-load">
                Driven by personal responsibility, we set out to build a highly transparent student pipeline—connecting learning excellence, hands-on professional mentorship, and direct community support. What began as a local effort soon expanded into a coordinated channel of care, powered entirely by active citizenship.
              </p>
            </div>

          </div>
        </div>
      </section>
    `;
  }
}
