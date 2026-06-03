import { eventStats } from '../../../mocks/eventStats.js';

export default class EventOverview {
  render() {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 select-none text-left">
        
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Total Events
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${eventStats.totalEvents}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">All-time registry counts</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Active Upcoming
          </span>
          <span class="font-display font-bold text-3xl text-pink-ruby">
            ${eventStats.upcomingEvents}
          </span>
          <span class="block text-[11px] text-emerald-600 font-sans mt-2">Open or Closing Soon</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Completed Campaigns
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${eventStats.completedEvents}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Narratives published</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Total Registrations
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${eventStats.totalRegistrations}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Sign-up rosters</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Attendance Rate
          </span>
          <span class="font-display font-bold text-3xl text-emerald-800">
            ${eventStats.averageAttendanceRate}%
          </span>
          <span class="block text-[11px] text-emerald-600 font-sans mt-2">Avg participation checked</span>
        </div>

      </div>
    `;
  }
}
