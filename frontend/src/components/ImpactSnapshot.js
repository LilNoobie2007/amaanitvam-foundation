export default class ImpactSnapshot {
  render() {
    return `
      <section id="about-impact" class="relative py-24 bg-stone-50/50 overflow-hidden border-b border-stone-200/20 z-20 select-none">
        
        <!-- Background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          
          <div class="text-left mb-16 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Audited Evidence</span>
            <h2 class="font-display font-semibold text-2xl text-text-dark mt-2 tracking-tight">
              Approved Metrics Snapshot
            </h2>
            <p class="font-sans text-[13.5px] text-text-muted mt-2 font-light max-w-lg leading-relaxed">
              Every data point represents a verified, audited milestones achieved directly on the ground through sustained community support.
            </p>
          </div>

          <!-- Compact Refined Snapshot Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 select-none text-left stagger-container">
            
            <!-- Item 1 -->
            <div class="border-l border-stone-300 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-2xl text-text-dark">60+</span>
              <p class="font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-500 mt-2">Children Supported</p>
              <p class="font-sans text-[12.5px] text-text-muted font-light mt-1">Through education programs and active learning mentor tracks.</p>
            </div>

            <!-- Item 2 -->
            <div class="border-l border-stone-300 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-2xl text-text-dark">45+</span>
              <p class="font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-500 mt-2">Children Benefiting</p>
              <p class="font-sans text-[12.5px] text-text-muted font-light mt-1">From active learning initiatives and intellectual curiosity guidance.</p>
            </div>

            <!-- Item 3 -->
            <div class="border-l border-stone-300 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-2xl text-text-dark">23+</span>
              <p class="font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-500 mt-2">Young Lives Reached</p>
              <p class="font-sans text-[12.5px] text-text-muted font-light mt-1">Through community outreach, surveys, and Project Pravah activities.</p>
            </div>

            <!-- Item 4 -->
            <div class="border-l border-stone-300 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-2xl text-text-dark">30+</span>
              <p class="font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-500 mt-2">Essential Clothing</p>
              <p class="font-sans text-[12.5px] text-text-muted font-light mt-1">Provided seasonal clothing support and basic security resources.</p>
            </div>

            <!-- Item 5 -->
            <div class="border-l border-stone-300 pl-6 py-2 hover:border-pink-ruby transition-colors duration-300 stagger-load">
              <span class="font-display font-bold text-2xl text-text-dark">25+</span>
              <p class="font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-500 mt-2">Students Engaged</p>
              <p class="font-sans text-[12.5px] text-text-muted font-light mt-1">Through direct awareness, values-driven assemblies, and development meets.</p>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
