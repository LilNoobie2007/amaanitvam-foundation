import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ApplicationForm from '../components/internships/apply/ApplicationForm.js';

export default class InternshipApplicationPage {
  constructor() {
    this.navbar = new Navbar();
    this.form = new ApplicationForm();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-12 px-6">
          <div class="max-w-4xl mx-auto">
            
            <!-- Breadcrumbs -->
            <div class="text-left font-interface text-[11px] uppercase tracking-widest text-text-light mb-6">
              <a href="#/internships" class="hover:text-pink-ruby">Internships</a> / <span class="text-text-dark">Apply</span>
            </div>

            <!-- Renders Form Component -->
            ${this.form.render()}

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();
    
    // Initialize Form logic
    this.form.init();
  }
}
