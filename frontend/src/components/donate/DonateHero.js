export default class DonateHero {
  render() {
    return `
      <section class="relative py-20 bg-stone-900 text-stone-200 overflow-hidden select-none">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent)] pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Support Us</span>
          <h1 class="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight leading-tight scroll-reveal revealed">
            Support Meaningful Change
          </h1>
          <p class="font-sans text-[16px] sm:text-[18px] text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
            Every contribution helps create opportunities for learning, growth, community engagement, and long-term impact.
          </p>
        </div>
      </section>
    `;
  }
}
