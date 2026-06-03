import Navbar from '../components/Navbar.js';
import EventOverview from '../components/events/admin/EventOverview.js';
import EventTable from '../components/events/admin/EventTable.js';
import RegistrationManager from '../components/events/admin/RegistrationManager.js';
import AttendanceTracker from '../components/events/admin/AttendanceTracker.js';
import Footer from '../components/Footer.js';

export default class AdminEventsPage {
  constructor() {
    this.navbar = new Navbar();
    this.overview = new EventOverview();
    this.table = new EventTable();
    this.roster = new RegistrationManager();
    this.ledger = new AttendanceTracker();
    this.footer = new Footer();
  }

  render() {
    // Parse query options e.g. #/admin/events?manage=evt-1
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

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none text-left">
        ${this.navbar.render()}

        <main class="flex-grow pt-20 md:pt-24">
          <!-- Page Header Console Banner -->
          <section class="bg-stone-900 text-white py-12 px-6">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span class="inline-block font-interface font-semibold text-[10px] uppercase tracking-widest text-gold-satin mb-2">
                  Console Space
                </span>
                <h1 class="font-display font-bold text-3xl sm:text-4xl text-white">
                  Events & Activities Management
                </h1>
              </div>
              <div class="flex flex-wrap gap-3">
                <a href="#/admin/events/new" class="inline-flex items-center justify-center font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Create Event
                </a>
                <a href="#/admin/certificates" class="inline-flex items-center justify-center font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-2.5 rounded border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-colors">
                  Certificate Console
                </a>
              </div>
            </div>
          </section>

          <!-- Core stats section -->
          <section class="py-8 px-6 max-w-7xl mx-auto space-y-8">
            ${this.overview.render()}
            
            <div class="pt-4">
              ${subViewHTML}
            </div>
          </section>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

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

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(el => revealObserver.observe(el));
  }
}
