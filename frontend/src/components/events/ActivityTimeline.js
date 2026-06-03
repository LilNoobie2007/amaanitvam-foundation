export default class ActivityTimeline {
  render() {
    return `
      <section class="py-16 px-6 max-w-4xl mx-auto select-none">
        <div class="text-center mb-16 scroll-reveal revealed">
          <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Calendar Rhythm</span>
          <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Our Operational Rhythm</h2>
          <p class="font-sans text-[14.5px] text-text-muted mt-3 font-light max-w-xl mx-auto leading-relaxed">
            A constant cadence of community workshops, outreach activities, and volunteer orientation meetings.
          </p>
        </div>

        <div class="relative pl-8 sm:pl-32 border-l border-stone-200 py-2 text-left space-y-12">
          
          <!-- Month Item 1 -->
          <div class="relative stagger-load revealed">
            <!-- Timeline dot -->
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-pink-ruby border-4 border-white shadow-sm"></div>
            <!-- Month Label (Desktop sidebar) -->
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-xs uppercase tracking-widest text-pink-ruby">April 2026</span>
            </div>
            
            <div class="sm:hidden mb-1">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">April 2026</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Project Shiksha Launch</h4>
            <p class="font-sans text-[14.5px] text-text-muted mt-2 leading-relaxed font-light">
              Mobilized reading circles in Rangpuri slum areas. Checked literacy baselines for 120 children and onboarded student leaders to maintain weekly study tables.
            </p>
          </div>

          <!-- Month Item 2 -->
          <div class="relative stagger-load revealed">
            <!-- Timeline dot -->
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-pink-ruby border-4 border-white shadow-sm"></div>
            <!-- Month Label -->
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-xs uppercase tracking-widest text-pink-ruby">May 2026</span>
            </div>
            
            <div class="sm:hidden mb-1">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">May 2026</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Digital Literacy & Banking Drive</h4>
            <p class="font-sans text-[14.5px] text-text-muted mt-2 leading-relaxed font-light">
              Hosted a multi-session elder care seminar at the Mehrauli Lead Center. Trained community elders in mobile bank authentication security.
            </p>
          </div>

          <!-- Month Item 3 -->
          <div class="relative stagger-load revealed">
            <!-- Timeline dot -->
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-gold-satin border-4 border-white shadow-sm animate-pulse"></div>
            <!-- Month Label -->
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-xs uppercase tracking-widest text-gold-satin">June 2026</span>
            </div>
            
            <div class="sm:hidden mb-1">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-gold-satin">June 2026</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark flex items-center gap-2">
              Life-Skills Orientations <span class="inline-block text-[9px] font-interface uppercase tracking-widest bg-gold-light text-gold-ochre border border-gold-satin/30 px-2 py-0.5 rounded">Active</span>
            </h4>
            <p class="font-sans text-[14.5px] text-text-muted mt-2 leading-relaxed font-light">
              Preparing volunteers and primary teachers for secondary syllabus alignment workshops and hygiene awareness campaigns in our target centers.
            </p>
          </div>

          <!-- Month Item 4 -->
          <div class="relative opacity-60 stagger-load revealed">
            <!-- Timeline dot -->
            <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-white shadow-sm"></div>
            <!-- Month Label -->
            <div class="hidden sm:block absolute -left-32 top-0.5 w-24 text-right">
              <span class="font-interface font-bold text-xs uppercase tracking-widest text-stone-400">July 2026</span>
            </div>
            
            <div class="sm:hidden mb-1">
              <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400">July 2026</span>
            </div>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">Technology Mentorship Training</h4>
            <p class="font-sans text-[14.5px] text-text-muted mt-2 leading-relaxed font-light">
              Bootcamps for digital literacy trainers to prepare lesson maps on basic computing, online security, and creative writing.
            </p>
          </div>

        </div>
      </section>
    `;
  }
}
