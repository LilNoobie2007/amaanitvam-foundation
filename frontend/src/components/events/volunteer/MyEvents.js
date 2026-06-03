import { events } from '../../../mocks/events.js';
import { registrations } from '../../../mocks/registrations.js';
import { attendanceLogs } from '../../../mocks/attendance.js';
import { volunteerContributions } from '../../../mocks/volunteerContributions.js';

export default class MyEvents {
  render() {
    // Current logged in volunteer email is arjun.mehta@amaanitvam.org
    const myEmail = "arjun.mehta@amaanitvam.org";
    
    // Get all registrations for this user
    const myRegs = registrations.filter(r => r.email === myEmail);
    
    // Map registered events with status
    const myEventsList = myRegs.map(reg => {
      const event = events.find(e => e.id === reg.eventId);
      if (!event) return null;

      // Find attendance if completed
      const att = attendanceLogs.find(a => a.eventId === event.id);
      
      // Find contribution if completed
      const contrib = volunteerContributions.find(c => c.eventId === event.id);

      return {
        ...event,
        registrationStatus: reg.registrationStatus,
        registrationDate: reg.date,
        attendanceStatus: att ? att.attendanceStatus : null,
        contributionRole: contrib ? contrib.role : null,
        contributionHours: contrib ? contrib.hoursContributed : null
      };
    }).filter(Boolean);

    // Split events by active (upcoming) vs completed/history
    const registeredActive = myEventsList.filter(e => e.status !== 'Completed' && e.registrationStatus === 'Approved');
    const waitlistedPending = myEventsList.filter(e => e.status !== 'Completed' && (e.registrationStatus === 'Waitlisted' || e.registrationStatus === 'Pending'));
    const completedHistory = myEventsList.filter(e => e.status === 'Completed');

    const renderCard = (evt) => {
      let regStatusBadge = 'bg-stone-50 text-stone-600 border-stone-200';
      if (evt.registrationStatus === 'Approved') regStatusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      else if (evt.registrationStatus === 'Waitlisted') regStatusBadge = 'bg-amber-50 text-amber-800 border-amber-200';
      else if (evt.registrationStatus === 'Pending') regStatusBadge = 'bg-stone-100 text-stone-700 border-stone-300';
      
      let attBadge = '';
      if (evt.status === 'Completed') {
        let attColor = 'bg-stone-150 text-stone-500';
        if (evt.attendanceStatus === 'Present') attColor = 'bg-emerald-100 text-emerald-800 border-emerald-250';
        else if (evt.attendanceStatus === 'Absent') attColor = 'bg-rose-100 text-rose-800 border-rose-200';
        else if (evt.attendanceStatus === 'Excused') attColor = 'bg-amber-100 text-amber-800 border-amber-250';

        attBadge = `
          <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2 py-0.5 border rounded-full ${attColor}">
            Attendance: ${evt.attendanceStatus || 'Not Logged'}
          </span>
        `;
      }

      // Certificate eligibility check
      let certificateButton = '';
      if (evt.status === 'Completed' && evt.attendanceStatus === 'Present' && evt.certificateEligible) {
        // Find a matching certificate code or fallback
        const mockCertCode = evt.id === 'evt-4' ? '7B92XQK3' : 'VER-MOCK' + evt.id.toUpperCase();
        certificateButton = `
          <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span class="text-[12px] text-text-light font-sans">Certificate Released</span>
            <a href="#/verify?code=${mockCertCode}" class="inline-flex items-center gap-1 font-interface font-semibold text-[9.5px] uppercase tracking-widest px-3 py-1.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              View Certificate
            </a>
          </div>
        `;
      }

      const roleBadge = evt.contributionRole 
        ? `<div class="mt-2 text-[12px] text-text-muted font-sans font-light">Role: <strong class="font-semibold text-text-dark">${evt.contributionRole}</strong> (${evt.contributionHours} hrs)</div>`
        : '';

      return `
        <div class="p-5 border border-stone-200/80 rounded-xl bg-white space-y-3 shadow-sm hover:shadow transition-shadow">
          <div class="flex items-center justify-between gap-2">
            <span class="inline-block font-interface font-semibold text-[8px] uppercase tracking-widest px-2 py-0.5 border rounded-full ${regStatusBadge}">
              Reg: ${evt.registrationStatus}
            </span>
            ${attBadge}
          </div>

          <div>
            <h4 class="font-display font-semibold text-[17px] text-text-dark leading-snug">
              ${evt.title}
            </h4>
            <div class="flex items-center gap-4 text-[12px] text-text-light font-sans mt-1">
              <span>Date: ${evt.date}</span>
              <span>•</span>
              <span>${evt.location.split(',')[0]}</span>
            </div>
            ${roleBadge}
          </div>

          ${certificateButton}
        </div>
      `;
    };

    const renderList = (list, type) => {
      if (list.length === 0) {
        return `
          <div class="text-center py-10 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
            <p class="font-sans text-[14px] text-text-light">No ${type} events in this log.</p>
          </div>
        `;
      }
      return `<div class="grid grid-cols-1 gap-4">${list.map(renderCard).join('')}</div>`;
    };

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm text-left">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">My Registered Activities</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/volunteer/registrations
          </span>
        </div>

        <!-- Custom tabs controller -->
        <div class="flex border-b border-stone-200 mb-6 text-[10px] font-interface uppercase tracking-widest font-semibold gap-4 select-none">
          <button class="tab-myevents-btn border-b-2 border-pink-ruby text-pink-ruby pb-2" data-tab="registered">
            Registered (${registeredActive.length})
          </button>
          <button class="tab-myevents-btn border-b-2 border-transparent text-text-light hover:text-text-dark pb-2" data-tab="waitlisted">
            Waitlisted / Pending (${waitlistedPending.length})
          </button>
          <button class="tab-myevents-btn border-b-2 border-transparent text-text-light hover:text-text-dark pb-2" data-tab="completed">
            History Completed (${completedHistory.length})
          </button>
        </div>

        <!-- Tabs Content containers -->
        <div class="tab-myevents-content" id="myevents-registered">
          ${renderList(registeredActive, 'upcoming active')}
        </div>

        <div class="tab-myevents-content hidden" id="myevents-waitlisted">
          ${renderList(waitlistedPending, 'waitlisted or pending')}
        </div>

        <div class="tab-myevents-content hidden" id="myevents-completed">
          ${renderList(completedHistory, 'completed past')}
        </div>
      </div>
    `;
  }

  static init() {
    const tabs = document.querySelectorAll('.tab-myevents-btn');
    const contents = document.querySelectorAll('.tab-myevents-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('border-pink-ruby', 'text-pink-ruby');
          t.classList.add('border-transparent', 'text-text-light');
        });
        tab.classList.add('border-pink-ruby', 'text-pink-ruby');
        tab.classList.remove('border-transparent', 'text-text-light');

        const target = tab.dataset.tab;
        contents.forEach(c => c.classList.add('hidden'));

        const targetEl = document.getElementById(`myevents-${target}`);
        if (targetEl) targetEl.classList.remove('hidden');
      });
    });
  }
}
