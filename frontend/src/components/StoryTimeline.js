export default class StoryTimeline {
  render() {
    return `
      <section id="timeline" class="relative py-28 bg-stone-50/50 overflow-hidden border-y border-stone-200/30 z-20 select-none">
        
        <!-- Background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-4xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl text-left mb-20 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Origin Story</span>
            <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight font-medium">
              Chronicle of Growth
            </h2>
            <p class="font-sans text-[14.5px] text-text-muted mt-3 font-light max-w-xl leading-relaxed">
              Every ripple starts with a single step. Our progression represents a dedicated student-led effort to build transparent, on-ground pathways for civic service.
            </p>
          </div>

          <!-- Vertical Timeline Container -->
          <div class="relative pl-8 sm:pl-12 py-4 stagger-container select-none">
            
            <!-- Continuous Vertical Thread Line -->
            <div class="absolute left-3.5 sm:left-5 top-0 bottom-0 w-0.5 bg-stone-200 pointer-events-none z-0" id="timeline-line"></div>
            <!-- Active running progress line -->
            <div class="absolute left-3.5 sm:left-5 top-0 w-0.5 bg-gradient-to-b from-pink-ruby via-pink-ruby/80 to-amber-500 origin-top scale-y-0 transition-transform duration-1000 ease-out z-0" id="timeline-active-line"></div>

            <!-- Milestone 1 -->
            <div class="relative mb-16 timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="0"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Foundation Established
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  A student-led movement was born to inspire compassion, learning, and civic responsibility.
                </p>
              </div>
            </div>

            <!-- Milestone 2 -->
            <div class="relative mb-16 timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="1"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Vision & Mission Launched
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Outlined our strategic objectives for accessible educational support and community welfare.
                </p>
              </div>
            </div>

            <!-- Milestone 3 -->
            <div class="relative mb-16 timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="2"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Project Manthan Initiated
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Launched active mentorship and learning classes, supporting over 60 children on the ground.
                </p>
              </div>
            </div>

            <!-- Milestone 4 -->
            <div class="relative mb-16 timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="3"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Community Outreach Expansion
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Expanded Project Pravah to engage local communities and distribute seasonal drives.
                </p>
              </div>
            </div>

            <!-- Milestone 5 -->
            <div class="relative mb-16 timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="4"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Educational & Social Initiatives Introduced
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Unified Project Shiksha and community outreach to secure and uplift hundreds of young lives.
                </p>
              </div>
            </div>

            <!-- Milestone 6 -->
            <div class="relative timeline-item stagger-load select-none text-left">
              <!-- Active Node Dot -->
              <div class="absolute -left-[32px] sm:-left-[40px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white transition-all duration-500 ease-out z-10 timeline-dot" data-index="5"></div>
              
              <div class="max-w-2xl">
                <h3 class="font-display italic text-lg text-text-dark mb-2 tracking-wide font-medium">
                  Growing Impact Across Communities
                </h3>
                <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light">
                  Expanding our rural digital learning hubs and youth leadership networks nationwide.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const activeLine = document.getElementById('timeline-active-line');
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-dot');

    if (!items.length || !activeLine) return;

    // Observe scrolling heights to draw active line and light up dots sequentially
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const dot = item.querySelector('.timeline-dot');
          const index = parseInt(dot.getAttribute('data-index'), 10);
          
          // Light up dot
          dot.classList.remove('border-stone-300', 'bg-white');
          dot.classList.add('border-pink-ruby', 'bg-pink-ruby', 'scale-110');

          // Extend progress line
          const totalItems = items.length;
          const ratio = (index + 1) / totalItems;
          activeLine.style.transform = `scaleY(${ratio})`;
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });

    items.forEach(item => observer.observe(item));
  }
}
