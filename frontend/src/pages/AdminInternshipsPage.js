import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import InternshipOverview from '../components/internships/admin/InternshipOverview.js';
import OpportunityManager from '../components/internships/admin/OpportunityManager.js';
import ApplicationsPipeline from '../components/internships/admin/ApplicationsPipeline.js';
import MentorAssignment from '../components/internships/admin/MentorAssignment.js';
import ProgressMonitoring from '../components/internships/admin/ProgressMonitoring.js';

export default class AdminInternshipsPage {
  constructor() {
    this.navbar = new Navbar();
    this.overview = new InternshipOverview();
    this.oppManager = new OpportunityManager();
    this.pipeline = new ApplicationsPipeline();
    this.mentors = new MentorAssignment();
    this.progress = new ProgressMonitoring();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-10 px-6">
          <div class="max-w-6xl mx-auto space-y-8">
            
            <!-- Admin Roster Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-stone-200 pb-5">
              <div>
                <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Executive Console</span>
                <h2 class="font-display font-semibold text-3xl text-text-dark mt-1 tracking-tight">Internship Management System</h2>
              </div>
              
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-pink-ruby"></span>
                <span class="font-interface text-[11px] font-bold uppercase tracking-widest text-text-light">Administrator Workspace</span>
              </div>
            </div>

            <!-- Tab Buttons Row -->
            <div class="flex flex-wrap border-b border-stone-200 gap-1.5 select-none font-interface text-[12px] font-bold uppercase tracking-wider">
              <button data-tab="tab-overview" class="admin-tab-btn py-3 px-4.5 border-b-2 border-pink-ruby text-pink-ruby">
                Overview
              </button>
              <button data-tab="tab-openings" class="admin-tab-btn py-3 px-4.5 border-b-2 border-transparent text-text-light hover:text-text-dark">
                Job Openings
              </button>
              <button data-tab="tab-pipeline" class="admin-tab-btn py-3 px-4.5 border-b-2 border-transparent text-text-light hover:text-text-dark">
                Recruitment Board
              </button>
              <button data-tab="tab-mentors" class="admin-tab-btn py-3 px-4.5 border-b-2 border-transparent text-text-light hover:text-text-dark">
                Mentor Assignments
              </button>
              <button data-tab="tab-progress" class="admin-tab-btn py-3 px-4.5 border-b-2 border-transparent text-text-light hover:text-text-dark">
                Progress Logs
              </button>
            </div>

            <!-- Tab Contents Container -->
            <div class="py-4">
              
              <!-- Tab 1: Overview -->
              <section id="tab-overview" class="admin-tab-content">
                ${this.overview.render()}
              </section>

              <!-- Tab 2: Job Openings Form -->
              <section id="tab-openings" class="admin-tab-content hidden">
                ${this.oppManager.render()}
              </section>

              <!-- Tab 3: Pipeline Kanban Board -->
              <section id="tab-pipeline" class="admin-tab-content hidden">
                ${this.pipeline.render()}
              </section>

              <!-- Tab 4: Mentor Assignment Grid -->
              <section id="tab-mentors" class="admin-tab-content hidden">
                ${this.mentors.render()}
              </section>

              <!-- Tab 5: Progress Monitoring Weekly logs -->
              <section id="tab-progress" class="admin-tab-content hidden">
                ${this.progress.render()}
              </section>

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
    OpportunityManager.init();
    ApplicationsPipeline.init();
    MentorAssignment.init();
    ProgressMonitoring.init();

    // Tab controller logic
    const tabs = document.querySelectorAll('.admin-tab-btn');
    const contents = document.querySelectorAll('.admin-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Toggle buttons class
        tabs.forEach(t => {
          t.classList.remove('border-pink-ruby', 'text-pink-ruby');
          t.classList.add('border-transparent', 'text-text-light');
        });
        tab.classList.add('border-pink-ruby', 'text-pink-ruby');
        tab.classList.remove('border-transparent', 'text-text-light');

        // Toggle contents class
        contents.forEach(c => {
          if (c.id === targetTab) {
            c.classList.remove('hidden');
          } else {
            c.classList.add('hidden');
          }
        });
      });
    });
  }
}
