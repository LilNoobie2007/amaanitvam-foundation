import Navbar from '../components/Navbar.js';
import InternshipHero from '../components/internships/InternshipHero.js';
import WhyInternAtAmaanitvam from '../components/internships/WhyInternAtAmaanitvam.js';
import InternshipDomains from '../components/internships/InternshipDomains.js';
import OpenOpportunities from '../components/internships/OpenOpportunities.js';
import InternshipJourney from '../components/internships/InternshipJourney.js';
import Footer from '../components/Footer.js';

export default class InternshipsPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new InternshipHero();
    this.why = new WhyInternAtAmaanitvam();
    this.domains = new InternshipDomains();
    this.opportunities = new OpenOpportunities();
    this.journey = new InternshipJourney();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        <!-- Shared Header Navigation -->
        ${this.navbar.render()}

        <main class="flex-grow">
          <!-- Hero Section -->
          ${this.hero.render()}

          <!-- Value Pillars -->
          ${this.why.render()}

          <!-- Domain Catalog Grid -->
          ${this.domains.render()}

          <!-- Openings with Live Seats math -->
          ${this.opportunities.render()}

          <!-- Process Journey Path -->
          ${this.journey.render()}
        </main>

        <!-- Official Footer -->
        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    // Trigger visual scroll animations
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(el => observer.observe(el));
  }
}
