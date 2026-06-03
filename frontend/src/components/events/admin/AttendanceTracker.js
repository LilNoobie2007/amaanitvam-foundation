import { eventAttendance } from '../../../mocks/attendance.js';

export default class AttendanceTracker {
  render(eventId) {
    const list = eventAttendance.filter(ea => ea.eventId === eventId);

    const rows = list.map(item => {
      let statusColor = 'bg-stone-100 text-stone-500 border-stone-200';
      if (item.attendanceStatus === 'Present') {
        statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-250';
      } else if (item.attendanceStatus === 'Absent') {
        statusColor = 'bg-rose-50 text-rose-800 border-rose-200';
      } else if (item.attendanceStatus === 'Excused') {
        statusColor = 'bg-amber-50 text-amber-800 border-amber-250';
      }

      return `
        <tr class="border-b border-stone-150 hover:bg-stone-50/50 transition-colors" data-id="${item.id}">
          <td class="py-3.5 pr-4 font-display font-semibold text-[14.5px] text-text-dark">${item.attendeeName}</td>
          <td class="py-3.5 px-4">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${item.attendanceStatus}
            </span>
          </td>
          <td class="py-3.5 pl-4 text-right">
            <div class="flex gap-2 justify-end">
              <button class="btn-att-present font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded bg-emerald-700 text-white hover:bg-emerald-800 transition-colors" data-id="${item.id}">
                Present
              </button>
              <button class="btn-att-absent font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-rose-300 text-rose-700 hover:bg-rose-50 transition-colors" data-id="${item.id}">
                Absent
              </button>
              <button class="btn-att-excused font-interface font-semibold text-[9px] uppercase tracking-widest px-2 py-1 rounded border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors" data-id="${item.id}">
                Excused
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left scroll-reveal revealed" id="attendance-panel">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 class="font-display font-semibold text-[20px] text-text-dark">Attendance Sheet</h3>
            <p class="font-sans text-[13px] text-text-light mt-0.5">Check-in registry ledger for marking participant participation statuses.</p>
          </div>
          <a href="#/admin/events" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
            Close Sheet
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[8px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-2.5 pr-4">Attendee Name</th>
                <th class="pb-2.5 px-4">Attendance Status</th>
                <th class="pb-2.5 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${list.length > 0 ? rows : `
                <tr>
                  <td colspan="3" class="text-center py-10 font-sans text-text-light">No attendance logs mapped for this event.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static init() {
    const list = document.getElementById('attendance-panel');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const target = e.target;
      const id = target.dataset.id;
      if (!id) return;

      if (target.classList.contains('btn-att-present')) {
        alert(`Success: Check-in ${id} marked PRESENT.`);
      } else if (target.classList.contains('btn-att-absent')) {
        alert(`Success: Check-in ${id} marked ABSENT.`);
      } else if (target.classList.contains('btn-att-excused')) {
        alert(`Success: Check-in ${id} marked EXCUSED.`);
      }
    });
  }
}
