import { attendanceSummary, attendanceLogs } from '../../../mocks/attendance.js';

export default class EventAttendance {
  render() {
    const logRows = attendanceLogs.map(log => {
      let statusColor = 'bg-stone-100 text-stone-500 border-stone-200';
      if (log.attendanceStatus === 'Present') {
        statusColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      } else if (log.attendanceStatus === 'Absent') {
        statusColor = 'bg-rose-50 text-rose-800 border-rose-200';
      } else if (log.attendanceStatus === 'Excused') {
        statusColor = 'bg-amber-50 text-amber-800 border-amber-200';
      }

      return `
        <tr class="border-b border-stone-150 hover:bg-stone-50/50 transition-colors">
          <td class="py-3 pr-4 font-display font-semibold text-[14px] text-text-dark">${log.activity}</td>
          <td class="py-3 px-4 font-sans text-[13px] text-text-muted">${log.date}</td>
          <td class="py-3 pl-4 text-right">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusColor}">
              ${log.attendanceStatus}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm text-left">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Attendance & Participation</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/volunteer/attendance
          </span>
        </div>

        <!-- Summary Metric Badges -->
        <div class="grid grid-cols-3 gap-4 p-4 bg-stone-50 border border-stone-200 rounded mb-6 text-center select-none">
          <div>
            <span class="block text-[8px] uppercase tracking-widest text-text-light mb-1">Attendance Rate</span>
            <span class="font-display font-bold text-xl sm:text-2xl text-text-dark">${attendanceSummary.attendanceRate}%</span>
          </div>
          <div class="border-x border-stone-200">
            <span class="block text-[8px] uppercase tracking-widest text-text-light mb-1">Attended</span>
            <span class="font-display font-bold text-xl sm:text-2xl text-emerald-700">${attendanceSummary.sessionsAttended} Sessions</span>
          </div>
          <div>
            <span class="block text-[8px] uppercase tracking-widest text-text-light mb-1">Missed</span>
            <span class="font-display font-bold text-xl sm:text-2xl text-rose-700">${attendanceSummary.sessionsMissed} Sessions</span>
          </div>
        </div>

        <!-- Logs Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-stone-200 text-[8px] uppercase tracking-widest text-text-light font-interface font-bold">
                <th class="pb-2 pr-4">Session Activity</th>
                <th class="pb-2 px-4">Date</th>
                <th class="pb-2 pl-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              ${logRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
