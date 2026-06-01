export default class TrustStrip {
  render() {
    return `
      <section id="trust-strip" class="relative py-12 bg-stone-950 text-stone-100 border-y border-stone-900 z-20">
        <div class="max-w-7xl mx-auto px-6">
          
          <div class="text-center mb-8 scroll-reveal">
            <span class="font-display italic text-base md:text-lg text-amber-100/80 tracking-wide">
              "Real impact, built through sustained community action."
            </span>
          </div>

          <!-- Compact Horizontal Ribbon -->
          <div class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-center justify-center divide-y md:divide-y-0 md:divide-x divide-stone-800 text-center select-none stagger-container">
            
            <!-- Metric 1 -->
            <div class="pt-4 md:pt-0 stagger-load">
              <div class="font-display font-bold text-3xl lg:text-4xl text-amber-100/90 tracking-tight">
                <span class="trust-counter" data-target="60" data-suffix="+">0</span>
              </div>
              <p class="font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-400 mt-1.5">Children Supported</p>
              <p class="font-sans text-[10px] text-stone-500 mt-0.5">Project Manthan mentorship</p>
            </div>

            <!-- Metric 2 -->
            <div class="pt-4 md:pt-0 md:pl-4 stagger-load">
              <div class="font-display font-bold text-3xl lg:text-4xl text-amber-100/90 tracking-tight">
                <span class="trust-counter" data-target="45" data-suffix="+">0</span>
              </div>
              <p class="font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-400 mt-1.5">Learning Beneficiaries</p>
              <p class="font-sans text-[10px] text-stone-500 mt-0.5">Project Shiksha classes</p>
            </div>

            <!-- Metric 3 -->
            <div class="pt-4 md:pt-0 md:pl-4 stagger-load">
              <div class="font-display font-bold text-3xl lg:text-4xl text-amber-100/90 tracking-tight">
                <span class="trust-counter" data-target="30" data-suffix="+">0</span>
              </div>
              <p class="font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-400 mt-1.5">Provided Clothing</p>
              <p class="font-sans text-[10px] text-stone-500 mt-0.5">Seasonal support drives</p>
            </div>

            <!-- Metric 4 -->
            <div class="pt-4 md:pt-0 md:pl-4 stagger-load">
              <div class="font-display font-bold text-3xl lg:text-4xl text-amber-100/90 tracking-tight">
                <span class="trust-counter" data-target="23" data-suffix="+">0</span>
              </div>
              <p class="font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-400 mt-1.5">Lives Reached</p>
              <p class="font-sans text-[10px] text-stone-500 mt-0.5">Project Pravah engagement</p>
            </div>

            <!-- Metric 5 -->
            <div class="pt-4 md:pt-0 md:pl-4 stagger-load">
              <div class="font-display font-bold text-3xl lg:text-4xl text-amber-100/90 tracking-tight">
                <span class="trust-counter" data-target="25" data-suffix="+">0</span>
              </div>
              <p class="font-interface font-semibold text-[11px] uppercase tracking-widest text-stone-400 mt-1.5">Students Engaged</p>
              <p class="font-sans text-[10px] text-stone-500 mt-0.5">Awareness activities</p>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const counters = document.querySelectorAll('.trust-counter');
    if (!counters.length) return;

    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const speed = 100;
      let current = 0;
      const increment = Math.ceil(target / speed);

      const update = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = current + suffix;
          requestAnimationFrame(update);
        }
      };
      update();
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => countUp(counter));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const section = document.getElementById('trust-strip');
    if (section) observer.observe(section);
  }
}
