import { events } from '../../mocks/events.js';

export default class FeaturedEvent {
  render() {
    // Find featured event
    const featured = events.find(evt => evt.priority === 'Featured') || events[0];
    if (!featured) return '';

    return `
      <section class="py-16 px-6 bg-stone-900 text-white select-none">
        <div class="max-w-6xl mx-auto">
          
          <div class="text-left mb-12 border-b border-white/10 pb-6">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-gold-satin">Special Spotlight</span>
            <h2 class="font-display font-medium text-3xl sm:text-4xl text-white mt-2">Featured Initiative</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left Side: Wide Landscape Image (col-span-7) -->
            <div class="lg:col-span-7 h-96 sm:h-[450px] overflow-hidden rounded-xl border border-white/10 relative">
              <img src="${featured.featuredImage || featured.coverImage}" alt="${featured.title}" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span class="inline-block self-start bg-gold-satin/90 backdrop-blur-sm text-text-dark font-interface font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded mb-3">
                  ${featured.category}
                </span>
                <h3 class="font-display font-semibold text-2xl sm:text-3xl text-white leading-tight">
                  ${featured.title}
                </h3>
              </div>
            </div>

            <!-- Right Side: Narrative Editorial (col-span-5) -->
            <div class="lg:col-span-5 text-left space-y-6">
              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400">Context & Story</span>
                <p class="font-sans text-[15.5px] text-stone-300 leading-relaxed font-light mt-2 text-justify">
                  Amaanitvam Foundation's primary vision is teaching accountability through action. In this session, our coordinators and student instructors seek to address literacy boundaries and establish baseline skills in Hindi and Mathematics for first-generation learners.
                </p>
              </div>

              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400">Core Objectives</span>
                <ul class="font-sans text-[14.5px] text-stone-300 space-y-1.5 mt-2 font-light">
                  <li class="flex items-start gap-2">
                    <span class="text-gold-satin text-[16px]">•</span> 
                    <span>Assess literacy levels for 35+ primary school age children.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gold-satin text-[16px]">•</span> 
                    <span>Distribute educational materials and personalized worksheets.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gold-satin text-[16px]">•</span> 
                    <span>Onboard and train 5 local student teaching support assistants.</span>
                  </li>
                </ul>
              </div>

              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400">Expected Outcomes</span>
                <p class="font-sans text-[14.5px] text-stone-300 leading-relaxed font-light mt-2">
                  At the end of this workshop, each young scholar will receive a learning tracker booklet to monitor progress. Participating volunteers will contribute to setting up a weekly weekend mentoring curriculum.
                </p>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <span class="font-interface text-[12px] uppercase tracking-widest text-stone-400">
                  Date: <span class="text-white font-semibold">${featured.date}</span>
                </span>
                <a href="#/events/view/${featured.slug}" class="font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-3 rounded bg-gold-satin text-text-dark hover:bg-gold-satin/90 shadow transition-colors">
                  Join Initiative
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>
    `;
  }
}
