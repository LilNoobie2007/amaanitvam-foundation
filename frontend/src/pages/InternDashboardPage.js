import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import InternDashboardHero from '../components/internships/intern/InternDashboardHero.js';
import MyInternship from '../components/internships/intern/MyInternship.js';
import AssignedProjects from '../components/internships/intern/AssignedProjects.js';
import MentorSection from '../components/internships/intern/MentorSection.js';
import ProgressTracker from '../components/internships/intern/ProgressTracker.js';
import InternshipCertificates from '../components/internships/intern/InternshipCertificates.js';

export default class InternDashboardPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new InternDashboardHero();
    this.myInternship = new MyInternship();
    this.projects = new AssignedProjects();
    this.mentor = new MentorSection();
    this.progress = new ProgressTracker();
    this.certificates = new InternshipCertificates();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-10 px-6">
          <div class="max-w-6xl mx-auto space-y-8">
            
            <!-- Dashboard Top Welcome Hero -->
            ${this.hero.render()}

            <!-- Main Workspace Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <!-- Left Content Space (col span 8) -->
              <div class="lg:col-span-8 space-y-8">
                <!-- Assigned Projects & Deliverable Submission forms -->
                ${this.projects.render()}

                <!-- Compliance Certificate checklist and generator -->
                ${this.certificates.render()}

                <!-- Weekly Retro Logs entries submissions -->
                ${this.progress.render()}
              </div>

              <!-- Right Content Space (col span 4) -->
              <div class="lg:col-span-4 space-y-8">
                <!-- Logistics detail cards -->
                ${this.myInternship.render()}

                <!-- Mentor Sync detail card -->
                ${this.mentor.render()}
              </div>

            </div>

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    // Call sub-component initializations
    InternDashboardHero.init();
    MyInternship.init();
    AssignedProjects.init();
    MentorSection.init();
    ProgressTracker.init();
    InternshipCertificates.init();
  }
}
