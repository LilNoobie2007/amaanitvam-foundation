import { events } from '../../mocks/events.js';

export default class UpcomingEvents {
  render() {
    // Filter active upcoming events (status is Open, Closing Soon, or Full, and date is future)
    const upcoming = events.filter(evt => evt.status !== 'Completed' && evt.status !== 'Draft' && evt.status !== 'Cancelled');

    const cards = upcoming.map(evt => {
      let statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (evt.status === 'Closing Soon') {
        statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
      } else if (evt.status === 'Full') {
        statusColor = 'bg-rose-50 text-rose-800 border-rose-200';
      }

      const seatsBadge = evt.status === 'Full' 
        ? `<span class="text-rose-600 font-semibold">Event Full</span>`
        : `<span class="text-stone-600 font-medium">${evt.remainingSeats} seats left</span>`;

      return `
        <div class="bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col stagger-load revealed">
          <div class="h-48 overflow-hidden relative">
            <img src="${evt.coverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'}" alt="${evt.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
            <span class="absolute top-4 left-4 inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor} bg-white/90 backdrop-blur-sm shadow-sm">
              ${evt.status}
            </span>
            <span class="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-sm text-white font-interface font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">
              ${evt.category}
            </span>
          </div>

          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 text-[12px] font-interface text-text-light uppercase tracking-wider mb-2">
                <span>${evt.date}</span>
                <span>•</span>
                <span>${evt.location.split(',')[0]}</span>
              </div>
              <h3 class="font-display font-semibold text-[20px] text-text-dark leading-snug mb-3">
                ${evt.title}
              </h3>
              <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light line-clamp-3 mb-4">
                ${evt.description}
              </p>
            </div>

            <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div class="font-interface text-[11px] uppercase tracking-widest">
                ${seatsBadge} <span class="text-stone-400">/ ${evt.capacity} total</span>
              </div>
              <div class="flex gap-2">
                <a href="#/events/view/${evt.slug}" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="py-16 px-6 max-w-6xl mx-auto select-none">
        <div class="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200/60 mb-12 scroll-reveal revealed">
          <div class="text-left">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Participate</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Active Upcoming Opportunities</h2>
          </div>
          <p class="font-sans text-[14.5px] text-text-muted mt-2 md:mt-0 font-light max-w-sm">
            Sign up to join our regional drives, interactive sessions, and collaborative workdays.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
          ${cards.length > 0 ? cards : `
            <div class="col-span-full text-center py-16 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
              <p class="font-sans text-[16px] text-text-light">No active upcoming events scheduled at this moment.</p>
            </div>
          `}
        </div>
      </section>
    `;
  }
}
