import Navbar from '../components/Navbar.js';
import ReportPublisher from '../components/events/admin/ReportPublisher.js';
import Footer from '../components/Footer.js';
import { events } from '../mocks/events.js';

export default class EventReportPublisherPage {
  constructor() {
    this.navbar = new Navbar();
    this.publisher = new ReportPublisher();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const queryPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const params = new URLSearchParams(queryPart);
    const eventId = params.get('eventId');

    const event = events.find(e => e.id === eventId);
    const eventTitle = event ? event.title : "Completed Campaign";

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
                  Publish Campaign Report
                </h1>
                <p class="font-sans text-[14.5px] text-stone-300 mt-1">
                  Draft and file the operational records for: <strong class="text-white">${eventTitle}</strong>
                </p>
              </div>
              <div>
                <a href="#/admin/events" class="inline-flex items-center justify-center font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-2.5 rounded border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 transition-colors">
                  Return to Control Ledger
                </a>
              </div>
            </div>
          </section>

          <!-- Core report publisher section -->
          <section class="py-12 px-6 max-w-7xl mx-auto">
            ${this.publisher.render()}
          </section>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    
    const hash = window.location.hash;
    const queryPart = hash.includes('?') ? hash.substring(hash.indexOf('?')) : '';
    const params = new URLSearchParams(queryPart);
    const eventId = params.get('eventId');
    const event = events.find(e => e.id === eventId);
    const eventTitle = event ? event.title : "Completed Campaign";

    ReportPublisher.init(eventTitle);
    Footer.init();

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
