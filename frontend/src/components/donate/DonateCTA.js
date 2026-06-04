export default class DonateCTA {
  render() {
    return `
      <section class="py-16 bg-stone-900 text-stone-200 select-none relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02),transparent)] pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div class="space-y-3">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Participate</span>
            <h2 class="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">Help Build A More Inclusive Future</h2>
            <p class="font-sans text-[14.5px] text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
              Every contribution, large or small, directly fuels our digital learning portals, study centers, and community outreach operations.
            </p>
          </div>

          <div class="pt-2">
            <a href="#donation-workspace" class="inline-block font-interface font-bold text-[11px] uppercase tracking-widest px-8 py-3.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Support Our Mission
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
