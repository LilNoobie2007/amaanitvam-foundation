import Navbar from '../components/Navbar.js';
import EventReportHero from '../components/events/report/EventReportHero.js';
import EventReportOverview from '../components/events/report/EventReportOverview.js';
import EventReportMetrics from '../components/events/report/EventReportMetrics.js';
import EventReportGallery from '../components/events/report/EventReportGallery.js';
import EventReportOutcomes from '../components/events/report/EventReportOutcomes.js';
import Footer from '../components/Footer.js';
import { eventReports } from '../mocks/eventReports.js';

export default class EventReportPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new EventReportHero();
    this.overview = new EventReportOverview();
    this.metrics = new EventReportMetrics();
    this.gallery = new EventReportGallery();
    this.outcomes = new EventReportOutcomes();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const slug = parts[parts.length - 1]; // E.g. community-awareness-workshop

    const report = eventReports.find(r => r.slug === slug);

    if (!report) {
      return `
        <div class="flex flex-col min-h-screen bg-stone-50 select-none">
          ${this.navbar.render()}
          <main class="flex-grow pt-32 text-center py-20">
            <h2 class="font-display font-semibold text-2xl text-stone-900 mb-2">Report Not Found</h2>
            <p class="font-sans text-text-muted mb-6">The requested campaign report does not match any items in the archive.</p>
            <a href="#/events" class="font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Return to Events Board
            </a>
          </main>
          ${this.footer.render()}
        </div>
      `;
    }

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        
        <!-- Header -->
        ${this.navbar.render()}
        
        <main class="flex-grow">
          
          <!-- Report Header details -->
          ${this.hero.render(report)}
          
          <!-- Objectives & Background context -->
          ${this.overview.render(report)}
          
          <!-- Numeric outcome statistics boxes -->
          ${this.metrics.render(report)}
          
          <!-- Retrospective photos -->
          ${this.gallery.render(report)}
          
          <!-- Key learnings and recommendations -->
          ${this.outcomes.render(report)}
          
        </main>

        <!-- Footer -->
        ${this.footer.render()}

      </div>
    `;
  }

  init() {
    Navbar.init();
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
