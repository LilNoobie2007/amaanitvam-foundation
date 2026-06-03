import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ApplicationStatusTracker from '../components/internships/status/ApplicationStatusTracker.js';

export default class ApplicationStatusPage {
  constructor() {
    this.navbar = new Navbar();
    this.tracker = new ApplicationStatusTracker();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-12 px-6">
          <div class="max-w-3xl mx-auto space-y-8">
            
            <!-- Breadcrumbs -->
            <div class="text-left font-interface text-[11px] uppercase tracking-widest text-text-light">
              <a href="#/internships" class="hover:text-pink-ruby">Internships</a> / <span class="text-text-dark">Status Tracker</span>
            </div>

            <!-- Renders Tracker Component -->
            ${this.tracker.render()}

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();
    
    // Initialize Tracker Logic
    this.tracker.init();
  }
}
