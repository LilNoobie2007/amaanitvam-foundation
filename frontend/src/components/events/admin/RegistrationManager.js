import { registrations } from '../../../mocks/registrations.js';

export default class RegistrationManager {
  render(eventId) {
    const list = registrations.filter(r => r.eventId === eventId);

    const rows = list.map(reg => {
      let regStatusBadge = 'bg-stone-50 text-stone-600 border-stone-200';
      if (reg.registrationStatus === 'Approved') regStatusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-250';
      else if (reg.registrationStatus === 'Waitlisted') regStatusBadge = 'bg-amber-50 text-amber-800 border-amber-250';
      else if (reg.registrationStatus === 'Pending') regStatusBadge = 'bg-stone-100 text-stone-700 border-stone-250';
      else if (reg.registrationStatus === 'Cancelled') regStatusBadge = 'bg-rose-50 text-rose-800 border-rose-200';

      return `
        <tr class="border-b border-stone-150 hover:bg-stone-50/50 transition-colors" data-id="${reg.id}">
          <td class="py-3.5 pr-4 font-display font-semibold text-[14.5px] text-text-dark">${reg.name}</td>
          <td class="py-3.5 px-4 font-sans text-[13.5px] text-text-muted">${reg.email}</td>
          <td class="py-3.5 px-4 font-sans text-[13.5px] text-text-muted">${reg.date || '2026-06-03'}</td>
          <td class="py-3.5 px-4">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${regStatusBadge}">
              ${reg.registrationStatus}
            </span>
          </td>
          <td class="py-3.5 pl-4 text-right">
            <div class="flex gap-2 justify-end">
              <button class="btn-reg-approve font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded bg-emerald-700 text-white hover:bg-emerald-800 transition-colors" data-id="${reg.id}">
                Approve
              </button>
              <button class="btn-reg-waitlist font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors" data-id="${reg.id}">
                Waitlist
              </button>
              <button class="btn-reg-cancel font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded text-rose-700 hover:bg-rose-50 transition-colors" data-id="${reg.id}">
                Cancel
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left scroll-reveal revealed" id="roster-panel">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 class="font-display font-semibold text-[20px] text-text-dark">Registrant Roster</h3>
            <p class="font-sans text-[13px] text-text-light mt-0.5">Manage signup registries separate from check-in attendance.</p>
          </div>
          <a href="#/admin/events" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
            Close Roster
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[8px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-2.5 pr-4">Full Name</th>
                <th class="pb-2.5 px-4">Email</th>
                <th class="pb-2.5 px-4">Registration Date</th>
                <th class="pb-2.5 px-4">Status</th>
                <th class="pb-2.5 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${list.length > 0 ? rows : `
                <tr>
                  <td colspan="5" class="text-center py-10 font-sans text-text-light">No registrations mapped for this event.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static init() {
    const list = document.getElementById('roster-panel');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;

      if (target.classList.contains('btn-reg-approve')) {
        alert(`Success: Registration ${id} has been marked APPROVED.`);
      } else if (target.classList.contains('btn-reg-waitlist')) {
        alert(`Success: Registration ${id} has been marked WAITLISTED.`);
      } else if (target.classList.contains('btn-reg-cancel')) {
        alert(`Success: Registration ${id} has been marked CANCELLED.`);
      }
    });
  }
}
