export default class Verification {
  render() {
    return `
      <section id="verify-certificate" class="relative py-24 bg-stone-50 overflow-hidden border-t border-stone-200/50 z-20">
        <!-- Thin gray vertical thread background connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div class="max-w-2xl mx-auto flex flex-col items-center scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby mb-4">Trust Systems</span>
            
            <h2 class="font-display font-semibold text-3xl text-text-dark tracking-tight mb-6">
              Academic & Operational Registry Integrity
            </h2>
            
            <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light mb-8 max-w-xl">
              To secure absolute professional trust and combat certificate forgery, all credentials, internships, and volunteer certifications issued by the Amaanitvam Foundation are digitally signed and archived in our secure registry vault. Prospective employers and institutional partners can verify certificate tracking IDs directly.
            </p>

            <a href="https://www.amaanitvam.org/verify/" target="_blank" class="inline-flex items-center gap-2 font-interface font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-md bg-stone-900 text-white hover:bg-stone-800 shadow-sm transition-all duration-300">
              Verify Certificate Registry
              <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}
