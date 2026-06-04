export default class CommunityCTA {
  render() {
    return `
      <section class="py-16 bg-stone-900 text-stone-200 select-none relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02),transparent)] pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div class="space-y-3">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Take Action</span>
            <h2 class="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight leading-tight">Join The Journey</h2>
            <p class="font-sans text-[14.5px] text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
              Every hour volunteered, every campaign organized, and every contribution made translates directly into classroom support for underprivileged children.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 font-interface">
            <a href="#/volunteer" class="w-full sm:w-auto font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Volunteer
            </a>
            
            <a href="#/internships" class="w-full sm:w-auto font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded border border-stone-700 text-stone-300 hover:bg-stone-800 transition-colors">
              Internships
            </a>

            <a href="#/donate" class="w-full sm:w-auto font-bold text-[11px] uppercase tracking-widest px-8 py-3 rounded bg-white text-text-dark hover:bg-stone-100 transition-colors">
              Donate Support
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
