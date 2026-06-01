export default class CoreValues {
  render() {
    return `
      <section id="values" class="relative py-28 bg-stone-50/50 overflow-hidden border-b border-stone-200/20 z-20 select-none">
        
        <!-- Background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <!-- Left Side: Section Intro (5 cols) -->
            <div class="lg:col-span-5 text-left scroll-reveal">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Pillars</span>
              <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight">
                Core Values
              </h2>
              <p class="font-sans text-[14.5px] text-text-muted mt-4 font-light leading-relaxed max-w-sm">
                Amaanitvam Foundation operates on six institutional pillars that turn compassion into structured, transparent civic action.
              </p>
            </div>

            <!-- Right Side: Institutional Vertical Value Pillars (7 cols) -->
            <div class="lg:col-span-7 flex flex-col gap-10 text-left stagger-container">
              
              <!-- Value 1: Compassion -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Compassion</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Active empathy driving immediate civic support and human care.
                </p>
              </div>

              <!-- Value 2: Responsibility -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Responsibility</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Owning our shared civic duties to uplift underserved sectors.
                </p>
              </div>

              <!-- Value 3: Education -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Education</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Providing active tools and learning environments to inspire growth.
                </p>
              </div>

              <!-- Value 4: Equality -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Equality</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Bridging opportunity divides so everyone has access to learn and thrive.
                </p>
              </div>

              <!-- Value 5: Community Engagement -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Community Engagement</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Fostering collective action at the local, grassroots level.
                </p>
              </div>

              <!-- Value 6: Active Citizenship -->
              <div class="stagger-load">
                <h3 class="font-display italic text-xl text-text-dark mb-2 tracking-wide font-medium">Active Citizenship</h3>
                <div class="w-full h-px bg-stone-300/60 mb-3"></div>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Inspiring youth leadership and responsible social leadership.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    `;
  }
}
