import { eventReports } from '../../mocks/eventReports.js';

export default class EventReportsArchive {
  render() {
    // Collect all unique tags for filter tags list
    const allTags = [...new Set(eventReports.flatMap(rep => rep.tags || []))];

    const reportCards = eventReports.map(rep => {
      const tagsList = (rep.tags || []).map(t => 
        `<span class="inline-block bg-stone-100 text-stone-600 font-interface font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-stone-200/40">${t}</span>`
      ).join(' ');

      return `
        <div class="bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 stagger-load revealed" data-tags="${(rep.tags || []).join(',')}" data-program="${rep.programId}" data-title="${rep.title.toLowerCase()}">
          <div>
            <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider mb-2">
              <span>${rep.date}</span>
              <span>•</span>
              <span class="font-semibold text-pink-ruby">${rep.category}</span>
            </div>
            
            <h3 class="font-display font-semibold text-[20px] text-text-dark leading-snug mb-3">
              ${rep.title}
            </h3>
            
            <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light line-clamp-3 mb-4">
              ${rep.objective}
            </p>
            
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${tagsList}
            </div>
          </div>

          <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-[13px]">
            <div class="font-sans text-text-light font-light">
              <strong class="font-semibold text-text-dark">${rep.metrics?.participants || 0}</strong> Attendees
            </div>
            <a href="#/events/${rep.slug}" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:text-pink-ruby/80 transition-colors flex items-center gap-1">
              Read Report 
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');

    const tagsOptions = allTags.map(t => 
      `<button class="btn-filter-tag font-interface font-semibold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-stone-200 text-stone-500 hover:border-pink-ruby hover:text-pink-ruby transition-colors" data-tag="${t}">
        ${t}
      </button>`
    ).join('');

    return `
      <section class="py-16 px-6 max-w-6xl mx-auto select-none" id="archive-section">
        <div class="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200/60 mb-12 scroll-reveal revealed">
          <div class="text-left">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Repository</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Institutional Knowledge Archive</h2>
          </div>
          <p class="font-sans text-[14.5px] text-text-muted mt-2 md:mt-0 font-light max-w-sm">
            Review detailed reports, metric distributions, outcomes, and retrospective learnings from our completed campaigns.
          </p>
        </div>

        <!-- Search and Filter Panel -->
        <div class="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-10 flex flex-col gap-6 text-left scroll-reveal revealed">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <!-- Search bar -->
            <div class="md:col-span-6 relative">
              <input type="text" id="archive-search" placeholder="Search archive by title or keywords..." class="w-full font-sans text-[14px] pl-10 pr-4 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all duration-300">
              <svg class="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <!-- Program Filters -->
            <div class="md:col-span-6 flex flex-wrap gap-2 md:justify-end">
              <button class="btn-filter-program active-program font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border border-pink-ruby bg-pink-ruby text-white transition-all duration-300" data-program="all">
                All Programs
              </button>
              <button class="btn-filter-program font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border border-stone-200 text-stone-600 bg-white hover:bg-stone-50 transition-all duration-300" data-program="manthan">
                Manthan
              </button>
              <button class="btn-filter-program font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border border-stone-200 text-stone-600 bg-white hover:bg-stone-50 transition-all duration-300" data-program="shiksha">
                Shiksha
              </button>
              <button class="btn-filter-program font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border border-stone-200 text-stone-600 bg-white hover:bg-stone-50 transition-all duration-300" data-program="pravah">
                Pravah
              </button>
              <button class="btn-filter-program font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border border-stone-200 text-stone-600 bg-white hover:bg-stone-50 transition-all duration-300" data-program="general">
                General
              </button>
            </div>

          </div>

          <!-- Tags Filtering Row -->
          <div class="border-t border-stone-200/60 pt-4 flex flex-col gap-2">
            <span class="font-interface font-bold text-[9px] uppercase tracking-widest text-text-light">Filter by Tag</span>
            <div class="flex flex-wrap gap-2">
              ${tagsOptions}
            </div>
          </div>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="archive-grid">
          ${reportCards}
        </div>
      </section>
    `;
  }

  static init() {
    const searchInput = document.getElementById('archive-search');
    const programButtons = document.querySelectorAll('.btn-filter-program');
    const tagButtons = document.querySelectorAll('.btn-filter-tag');
    const grid = document.getElementById('archive-grid');
    if (!grid) return;
    const cards = grid.children;

    let searchVal = '';
    let selectedProgram = 'all';
    let selectedTags = new Set();

    const applyFilters = () => {
      let visibleCount = 0;
      for (const card of cards) {
        if (!card.dataset) continue;
        const cardTitle = card.dataset.title || '';
        const cardProgram = card.dataset.program || '';
        const cardTags = (card.dataset.tags || '').split(',');

        const matchesSearch = searchVal === '' || cardTitle.includes(searchVal);
        const matchesProgram = selectedProgram === 'all' || cardProgram === selectedProgram;
        
        let matchesTags = true;
        if (selectedTags.size > 0) {
          matchesTags = [...selectedTags].every(tag => cardTags.includes(tag));
        }

        if (matchesSearch && matchesProgram && matchesTags) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    programButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        programButtons.forEach(b => {
          b.classList.remove('active-program', 'bg-pink-ruby', 'text-white', 'border-pink-ruby');
          b.classList.add('bg-white', 'text-stone-600', 'border-stone-200');
        });
        btn.classList.add('active-program', 'bg-pink-ruby', 'text-white', 'border-pink-ruby');
        btn.classList.remove('bg-white', 'text-stone-600', 'border-stone-200');
        
        selectedProgram = btn.dataset.program;
        applyFilters();
      });
    });

    tagButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        if (selectedTags.has(tag)) {
          selectedTags.delete(tag);
          btn.classList.remove('bg-pink-blush', 'border-pink-ruby', 'text-pink-ruby');
          btn.classList.add('border-stone-200', 'text-stone-500');
        } else {
          selectedTags.add(tag);
          btn.classList.add('bg-pink-blush', 'border-pink-ruby', 'text-pink-ruby');
          btn.classList.remove('border-stone-200', 'text-stone-500');
        }
        applyFilters();
      });
    });
  }
}
