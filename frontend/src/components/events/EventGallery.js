import { gallery } from '../../mocks/gallery.js';

export default class EventGallery {
  render() {
    const categories = ['All', 'Workshop', 'Outreach', 'Awareness', 'Volunteer Activity', 'Community Engagement'];

    const items = gallery.map(item => {
      return `
        <div class="gallery-item overflow-hidden rounded-xl border border-stone-200/60 bg-white shadow-sm flex flex-col stagger-load revealed" data-category="${item.category}">
          <div class="h-60 overflow-hidden relative">
            <img src="${item.image}" alt="${item.caption}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
            <span class="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-sm text-white font-interface font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
              ${item.category}
            </span>
          </div>
          <div class="p-4 text-left">
            <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
              ${item.caption}
            </p>
          </div>
        </div>
      `;
    }).join('');

    const filterButtons = categories.map((cat, idx) => {
      const activeClass = idx === 0 ? 'bg-pink-ruby text-white border-pink-ruby active-gallery-cat' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50';
      return `
        <button class="btn-gallery-cat font-interface font-semibold text-[9px] uppercase tracking-widest px-4 py-2.5 rounded border ${activeClass} transition-all duration-300" data-cat="${cat}">
          ${cat === 'Volunteer Activity' ? 'Volunteer Activities' : cat === 'Awareness' ? 'Awareness Campaigns' : cat === 'Outreach' ? 'Community Outreach' : cat === 'Workshop' ? 'Workshops' : cat}
        </button>
      `;
    }).join('');

    return `
      <section class="py-16 px-6 bg-stone-50 select-none" id="gallery-section">
        <div class="max-w-6xl mx-auto">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200/60 mb-12 scroll-reveal revealed">
            <div class="text-left">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Visuals</span>
              <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Moments in Action</h2>
            </div>
            
            <!-- Filters row -->
            <div class="flex flex-wrap gap-2 mt-4 md:mt-0">
              ${filterButtons}
            </div>
          </div>

          <!-- Masonry Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
            ${items}
          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const buttons = document.querySelectorAll('.btn-gallery-cat');
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const items = grid.querySelectorAll('.gallery-item');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-pink-ruby', 'text-white', 'border-pink-ruby', 'active-gallery-cat');
          b.classList.add('bg-white', 'text-stone-600', 'border-stone-200');
        });
        btn.classList.add('bg-pink-ruby', 'text-white', 'border-pink-ruby', 'active-gallery-cat');
        btn.classList.remove('bg-white', 'text-stone-600', 'border-stone-200');

        const cat = btn.dataset.cat;
        
        items.forEach(item => {
          const itemCat = item.dataset.category;
          if (cat === 'All' || itemCat === cat) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }
}
