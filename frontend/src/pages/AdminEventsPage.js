import AdminLayout from '../components/admin/AdminLayout.js';
import EventOverview from '../components/events/admin/EventOverview.js';
import EventTable from '../components/events/admin/EventTable.js';
import RegistrationManager from '../components/events/admin/RegistrationManager.js';
import AttendanceTracker from '../components/events/admin/AttendanceTracker.js';

export default class AdminEventsPage {
  constructor() {
    this.overview = new EventOverview();
    this.table = new EventTable();
    this.roster = new RegistrationManager();
    this.ledger = new AttendanceTracker();
  }

  render() {
    const hash = window.location.hash;
    const queryPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const params = new URLSearchParams(queryPart);
    const manageId = params.get('manage');
    const attendanceId = params.get('attendance');

    let subViewHTML = '';
    if (manageId) {
      subViewHTML = this.roster.render(manageId);
    } else if (attendanceId) {
      subViewHTML = this.ledger.render(attendanceId);
    } else {
      subViewHTML = this.table.render();
    }

    const eventsHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Page Header -->
        <div class="flex justify-between items-center pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Events Operations Center</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Control regional drives, coordinate volunteer check-ins, and publish event reports.</p>
          </div>
          <div class="flex gap-2">
            <a href="#/admin/events/new" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all">
              Create Event
            </a>
          </div>
        </div>

        <!-- Overview stats -->
        ${this.overview.render()}

        <!-- Dynamic Subview -->
        <div class="pt-2">
          ${subViewHTML}
        </div>
      </div>
    `;

    return AdminLayout.render(eventsHTML, "events");
  }

  init() {
    AdminLayout.init();

    const hash = window.location.hash;
    const queryPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const params = new URLSearchParams(queryPart);
    const manageId = params.get('manage');
    const attendanceId = params.get('attendance');

    if (manageId) {
      RegistrationManager.init();
    } else if (attendanceId) {
      AttendanceTracker.init();
    } else {
      EventTable.init();
    }
  }
}
