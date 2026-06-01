export default class Programs {
  render() {
    return `
      <section id="programs" class="relative py-28 bg-white overflow-hidden z-20">
        <!-- Thin background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl text-left mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Progression</span>
            <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight">
              Chapters of Action
            </h2>
            <p class="font-sans text-[15px] text-text-muted mt-3 font-light max-w-xl">
              We translate empathy into systematic channels of civic progress. Each program represents a progressive chapter in our shared story of support.
            </p>
          </div>

          <!-- Editorial Chapter Progression Flow -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch relative stagger-container">
            
            <!-- Connector line on desktop -->
            <div class="hidden lg:block absolute top-[5.5rem] left-[15%] right-[15%] h-px bg-gradient-to-r from-pink-ruby/30 via-gold-ochre/30 to-pink-ruby/30 pointer-events-none z-0"></div>

            <!-- Chapter I: Learn (Project Manthan) -->
            <div class="flex flex-col items-start text-left p-8 rounded-xl border border-stone-200/70 hover:border-pink-ruby/30 transition-all duration-300 relative group bg-white stagger-load">
              <!-- Progression Node -->
              <div class="flex items-center gap-3 mb-6 relative z-10">
                <span class="w-10 h-10 rounded-full bg-pink-blush flex items-center justify-center font-display italic text-sm text-pink-ruby font-semibold">01</span>
                <span class="font-interface font-bold text-xs uppercase tracking-widest text-stone-400 group-hover:text-pink-ruby transition-colors duration-300">Learn</span>
              </div>
              
              <h3 class="font-interface font-bold text-base uppercase tracking-wider text-text-dark mb-4 group-hover:text-pink-ruby transition-colors duration-300">Project Manthan</h3>
              
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-8 font-light flex-grow">
                Providing educational support, awareness, and mentorship to help underprivileged children build brighter futures through learning. This is our foundation, supporting 60+ children with active learning classes and mentor networks.
              </p>
              
              <!-- Focus Badge -->
              <span class="font-interface font-semibold text-[10px] uppercase tracking-wider text-pink-ruby bg-pink-blush px-3 py-1 rounded-md mt-auto">
                Focus: Learning & Support
              </span>
            </div>

            <!-- Chapter II: Grow (Project Shiksha) -->
            <div class="flex flex-col items-start text-left p-8 rounded-xl border border-stone-200/70 hover:border-gold-ochre/30 transition-all duration-300 relative group bg-white stagger-load">
              <!-- Progression Node -->
              <div class="flex items-center gap-3 mb-6 relative z-10">
                <span class="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center font-display italic text-sm text-gold-ochre font-semibold">02</span>
                <span class="font-interface font-bold text-xs uppercase tracking-widest text-stone-400 group-hover:text-gold-ochre transition-colors duration-300">Grow</span>
              </div>
              
              <h3 class="font-interface font-bold text-base uppercase tracking-wider text-text-dark mb-4 group-hover:text-gold-ochre transition-colors duration-300">Project Shiksha</h3>
              
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-8 font-light flex-grow">
                Expanding access to quality learning opportunities and empowering young minds through education and guidance. Built on the belief that education is a powerful tool, we inspire curiosity and access for 45+ children.
              </p>
              
              <!-- Focus Badge -->
              <span class="font-interface font-semibold text-[10px] uppercase tracking-wider text-gold-ochre bg-gold-light px-3 py-1 rounded-md mt-auto">
                Focus: Access & Growth
              </span>
            </div>

            <!-- Chapter III: Act (Project Pravah) -->
            <div class="flex flex-col items-start text-left p-8 rounded-xl border border-stone-200/70 hover:border-pink-ruby/30 transition-all duration-300 relative group bg-white stagger-load">
              <!-- Progression Node -->
              <div class="flex items-center gap-3 mb-6 relative z-10">
                <span class="w-10 h-10 rounded-full bg-pink-blush flex items-center justify-center font-display italic text-sm text-pink-ruby font-semibold">03</span>
                <span class="font-interface font-bold text-xs uppercase tracking-widest text-stone-400 group-hover:text-pink-ruby transition-colors duration-300">Act</span>
              </div>
              
              <h3 class="font-interface font-bold text-base uppercase tracking-wider text-text-dark mb-4 group-hover:text-pink-ruby transition-colors duration-300">Project Pravah</h3>
              
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-8 font-light flex-grow">
                Reaching communities through awareness, engagement, and social development initiatives that encourage positive change. We expand outreach to 23+ young lives to foster civic responsibility and community action.
              </p>
              
              <!-- Focus Badge -->
              <span class="font-interface font-semibold text-[10px] uppercase tracking-wider text-pink-ruby bg-pink-blush px-3 py-1 rounded-md mt-auto">
                Focus: Outreach & Action
              </span>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
