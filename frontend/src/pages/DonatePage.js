import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import DonateHero from '../components/donate/DonateHero.js';
import WhyContributionsMatter from '../components/donate/WhyContributionsMatter.js';
import WhyTrustAmaanitvam from '../components/donate/WhyTrustAmaanitvam.js';
import DonationImpact from '../components/donate/DonationImpact.js';
import ImpactThroughContributions from '../components/donate/ImpactThroughContributions.js';
import PostDonationJourney from '../components/donate/PostDonationJourney.js';
import DonationMethods from '../components/donate/DonationMethods.js';
import DonorFAQ from '../components/donate/DonorFAQ.js';
import DonateCTA from '../components/donate/DonateCTA.js';

export default class DonatePage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new DonateHero();
    this.why = new WhyContributionsMatter();
    this.trust = new WhyTrustAmaanitvam();
    this.impact = new DonationImpact();
    this.stats = new ImpactThroughContributions();
    this.journey = new PostDonationJourney();
    this.methods = new DonationMethods();
    this.faq = new DonorFAQ();
    this.cta = new DonateCTA();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow">
          <!-- Hero Section -->
          ${this.hero.render()}

          <!-- Narrative cost path -->
          ${this.why.render()}

          <!-- Governance trust indicators -->
          ${this.trust.render()}

          <!-- Impact Outcome areas -->
          ${this.impact.render()}

          <!-- Ground stats metrics -->
          ${this.stats.render()}

          <!-- Contribution tracker lifecycle -->
          ${this.journey.render()}

          <!-- Configurator Calculator Form -->
          <section class="py-16 bg-white border-t border-stone-200/40 select-none">
            <div class="max-w-5xl mx-auto px-6">
              ${this.methods.render()}
            </div>
          </section>

          <!-- Donor FAQ accordion -->
          ${this.faq.render()}

          <!-- Bottom CTAs -->
          ${this.cta.render()}
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    // Sub-component initializations
    DonationMethods.init();
    DonorFAQ.init();

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
