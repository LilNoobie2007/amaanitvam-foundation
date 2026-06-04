import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ContactHero from '../components/contact/ContactHero.js';
import GetInvolvedHub from '../components/contact/GetInvolvedHub.js';
import WaysToConnect from '../components/contact/WaysToConnect.js';
import ContactInformation from '../components/contact/ContactInformation.js';
import ContactForm from '../components/contact/ContactForm.js';
import PartnershipOpportunities from '../components/contact/PartnershipOpportunities.js';
import ContactFAQ from '../components/contact/ContactFAQ.js';
import CommunityCTA from '../components/contact/CommunityCTA.js';

export default class ContactPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new ContactHero();
    this.involvedHub = new GetInvolvedHub();
    this.ways = new WaysToConnect();
    this.info = new ContactInformation();
    this.form = new ContactForm();
    this.partnerships = new PartnershipOpportunities();
    this.faq = new ContactFAQ();
    this.cta = new CommunityCTA();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow">
          <!-- Hero Section -->
          ${this.hero.render()}

          <!-- central Decision Tree Hub -->
          ${this.involvedHub.render()}

          <!-- Ways to Connect -->
          ${this.ways.render()}

          <!-- Information and Inquiries Form Section -->
          <section class="py-16 bg-white border-t border-stone-200/40 select-none">
            <div class="max-w-5xl mx-auto px-6">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: official coordinates details (col span 5) -->
                <div class="lg:col-span-5">
                  ${this.info.render()}
                </div>

                <!-- Right: Ticket Submissions Desk (col span 7) -->
                <div class="lg:col-span-7">
                  ${this.form.render()}
                </div>

              </div>
            </div>
          </section>

          <!-- Partnership Intake Forms -->
          ${this.partnerships.render()}

          <!-- Knowledge Base FAQs -->
          ${this.faq.render()}

          <!-- End CTAs -->
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
    ContactForm.init();
    PartnershipOpportunities.init();
    ContactFAQ.init();

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
