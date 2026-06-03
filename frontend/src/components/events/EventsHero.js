export default class EventsHero {
  render() {
    return `
      <section class="relative bg-stone-900 text-white pt-32 pb-24 px-6 md:px-12 select-none overflow-hidden">
        <!-- Abstract layout lines for editorial feel -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-stone-950 opacity-80 z-0"></div>
        <div class="absolute top-0 right-1/4 w-px h-full bg-white/5 pointer-events-none z-0 hidden md:block"></div>
        <div class="absolute top-0 left-1/3 w-px h-full bg-white/5 pointer-events-none z-0 hidden md:block"></div>
        
        <div class="max-w-6xl mx-auto relative z-10 text-left scroll-reveal revealed">
          <span class="inline-block font-interface font-semibold text-[11px] uppercase tracking-widest text-gold-satin mb-4">
            Operational Log
          </span>
          <h1 class="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] max-w-4xl tracking-tight">
            Moments That Bring Communities Together
          </h1>
          <p class="font-sans text-[18px] md:text-[20px] text-stone-300 max-w-2xl mt-6 leading-[1.7] font-light">
            Workshops, outreach drives, awareness campaigns, volunteer gatherings, and learning experiences across our journey.
          </p>
        </div>
      </section>
    `;
  }
}
