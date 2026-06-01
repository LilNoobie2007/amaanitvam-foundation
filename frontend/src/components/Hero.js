export default class Hero {
  render() {
    return `
      <section id="home" class="relative w-full h-screen min-h-[650px] overflow-hidden flex items-center justify-start z-10 select-none">
        
        <!-- Full cover background image with slow breath animation -->
        <div class="absolute inset-0 z-0 overflow-hidden">
          <img src="/classroom-child.jpg" alt="Smiling child holding book in a classroom with a volunteer hand on her shoulder" class="w-full h-full object-cover animate-breath">
          
          <!-- Deep warm overlay to secure text readability and visual atmosphere -->
          <div class="absolute inset-0 bg-stone-950/60 md:bg-stone-950/50"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
        </div>

        <!-- Content Area -->
        <div class="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-start text-left pt-20">
          <div class="max-w-3xl flex flex-col items-start stagger-container">
            
            <!-- Letter-Opening style tagline badge -->
            <span class="font-display italic text-lg sm:text-xl text-amber-100/90 tracking-wide border-b border-white/10 pb-4 mb-8 max-w-lg block w-full select-none stagger-load">
              "What Are We, If Not for One Another?"
            </span>

            <!-- Short Human Statement (Emotional entry hook) -->
            <p class="font-sans font-light text-stone-300 text-sm uppercase tracking-[0.2em] mb-4 stagger-load select-none">
              Every meaningful change begins with someone choosing to care.
            </p>

            <!-- Playfair Display dominant serif title -->
            <h1 class="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6 stagger-load">
              Empowering Lives Through Education,<br class="hidden sm:inline"> Compassion, and Collective Action.
            </h1>

            <!-- Elegant subheadline -->
            <p class="font-sans text-stone-300 font-light text-base sm:text-lg max-w-xl leading-relaxed mb-10 stagger-load">
              A student-led movement inspiring learning, responsibility, and positive change for a stronger society.
            </p>

            <!-- Elegant pathways -->
            <div class="flex flex-wrap gap-4 items-center stagger-load">
              <a href="https://www.amaanitvam.org/donate/" target="_blank" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-8 py-4 rounded-md bg-gold-satin text-white hover:bg-gold-satin/95 shadow-sm transition-all duration-300">
                Donate Now
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#volunteer-form" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-8 py-4 rounded-md border border-white/40 text-white hover:bg-white hover:text-stone-900 transition-all duration-300">
                Get Involved
              </a>
            </div>

            <!-- Tertiary Certificate link -->
            <div class="mt-6 stagger-load">
              <a href="#verify-certificate" class="inline-flex items-center gap-1.5 font-interface font-semibold text-[10px] uppercase tracking-widest text-stone-400 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-white pb-0.5">
                Verify Certificate
              </a>
            </div>

          </div>
        </div>

      </section>
    `;
  }
}
