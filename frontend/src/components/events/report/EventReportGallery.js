import { gallery } from '../../../mocks/gallery.js';

export default class EventReportGallery {
  render(report) {
    if (!report) return '';

    // Filter images matching this event
    const eventImages = gallery.filter(img => img.eventId === report.id);
    if (eventImages.length === 0) return '';

    const imageCards = eventImages.map(img => {
      return `
        <div class="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm flex flex-col stagger-load revealed">
          <div class="h-64 overflow-hidden">
            <img src="${img.image}" alt="${img.caption}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
          </div>
          <div class="p-4 text-left border-t border-stone-100">
            <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
              ${img.caption}
            </p>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="py-12 px-6 max-w-4xl mx-auto select-none">
        <div class="text-left mb-8 border-b border-stone-200/60 pb-4">
          <span class="font-interface font-semibold text-[10px] uppercase tracking-widest text-pink-ruby">Gallery</span>
          <h3 class="font-display font-semibold text-[22px] text-text-dark mt-1">Campaign Photography</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${imageCards}
        </div>
      </section>
    `;
  }
}
