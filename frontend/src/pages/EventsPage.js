import Navbar from '../components/Navbar.js';
import EventsHero from '../components/events/EventsHero.js';
import FeaturedEvent from '../components/events/FeaturedEvent.js';
import UpcomingEvents from '../components/events/UpcomingEvents.js';
import EventReportsArchive from '../components/events/EventReportsArchive.js';
import EventGallery from '../components/events/EventGallery.js';
import ActivityTimeline from '../components/events/ActivityTimeline.js';
import Footer from '../components/Footer.js';

export default class EventsPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new EventsHero();
    this.featured = new FeaturedEvent();
    this.upcoming = new UpcomingEvents();
    this.archive = new EventReportsArchive();
    this.gallery = new EventGallery();
    this.timeline = new ActivityTimeline();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        
        <!-- Navbar Header Navigation -->
        ${this.navbar.render()}
        
        <main class="flex-grow">
          
          <!-- Editorial Events Hero -->
          ${this.hero.render()}
          
          <!-- Active Upcoming grid list -->
          ${this.upcoming.render()}
          
          <!-- Magazine-style spotlight featured section -->
          ${this.featured.render()}
          
          <!-- Narrative Knowledge Archive for past reports -->
          ${this.archive.render()}
          
          <!-- Filterable media photography grid -->
          ${this.gallery.render()}
          
          <!-- chronological vertical rhythm timeline -->
          ${this.timeline.render()}
          
        </main>

        <!-- Footer -->
        ${this.footer.render()}

      </div>
    `;
  }

  init() {
    Navbar.init();
    EventReportsArchive.init();
    EventGallery.init();
    Footer.init();

    // Intersection observers for animations
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

    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-load');
      const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, idx) => {
              setTimeout(() => {
                item.classList.add('revealed');
              }, idx * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      staggerObserver.observe(container);
    });
  }
}
