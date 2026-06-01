export default class JoinJourney {
  render() {
    return `
      <section id="join-journey" class="relative py-32 bg-stone-950 overflow-hidden flex items-center justify-center min-h-[500px] z-20 select-none">
        
        <!-- Full cover background image of children on the hill sunset -->
        <div class="absolute inset-0 z-0">
          <img src="/field-children.jpg" alt="Children holding hands on sunset grassy hill" class="w-full h-full object-cover opacity-50">
          <!-- Deep gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40"></div>
        </div>

        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center select-none">
          <div class="max-w-2xl flex flex-col items-center scroll-reveal">
            
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-amber-200/90 mb-4 block">The Invitation</span>
            
            <h2 class="font-display font-medium text-4xl text-white tracking-tight leading-tight mb-6">
              Join the Journey
            </h2>
            
            <p class="font-sans text-stone-300 font-light text-[14.5px] leading-relaxed max-w-lg mb-10">
              One act of care creates many ripples. Be a part of our student-led movement to inspire learning, responsibility, and collective progress across underserved communities.
            </p>

            <!-- Centered minimal pathways -->
            <div class="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.amaanitvam.org/donate/" target="_blank" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-8 py-4 rounded-md bg-gold-satin text-white hover:bg-gold-satin/95 shadow-sm transition-all duration-300">
                Donate Now
              </a>
              <a href="#volunteer-form" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-8 py-4 rounded-md border border-white/40 text-white hover:bg-white hover:text-stone-950 transition-all duration-300">
                Volunteer
              </a>
              <a href="#volunteer-form" class="inline-flex items-center gap-2 font-interface font-semibold text-[11px] uppercase tracking-widest px-8 py-4 rounded-md border border-white/40 text-white hover:bg-white hover:text-stone-950 transition-all duration-300">
                Get Involved
              </a>
            </div>

          </div>
        </div>

      </section>
    `;
  }
}
