import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ApplicantDetails from '../components/internships/admin/ApplicantDetails.js';

export default class ApplicantDetailsPage {
  constructor() {
    this.navbar = new Navbar();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const id = parts[parts.length - 1];
    
    // Create evaluator instance dynamically for the specified application ID
    this.details = new ApplicantDetails(id);

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-12 px-6">
          <div class="max-w-5xl mx-auto">
            
            <!-- Breadcrumbs -->
            <div class="text-left font-interface text-[11px] uppercase tracking-widest text-text-light mb-6">
              <a href="#/admin/internships" class="hover:text-pink-ruby">Internships Console</a> / 
              <span class="text-text-dark">Evaluator Scorecard</span>
            </div>

            <!-- Renders Details Evaluator Component -->
            ${this.details.render()}

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();
    
    // Initialize the profile evaluation triggers
    if (this.details) {
      this.details.init();
    }
  }
}
