import AdminLayout from '../components/admin/AdminLayout.js';
import InternshipOverview from '../components/internships/admin/InternshipOverview.js';
import OpportunityManager from '../components/internships/admin/OpportunityManager.js';
import ApplicationsPipeline from '../components/internships/admin/ApplicationsPipeline.js';
import MentorAssignment from '../components/internships/admin/MentorAssignment.js';
import ProgressMonitoring from '../components/internships/admin/ProgressMonitoring.js';

export default class AdminInternshipsPage {
  constructor() {
    this.overview = new InternshipOverview();
    this.oppManager = new OpportunityManager();
    this.pipeline = new ApplicationsPipeline();
    this.mentors = new MentorAssignment();
    this.progress = new ProgressMonitoring();
    this.currentActiveTab = "tab-overview";
  }

  render() {
    const isTabActive = (tabId) => this.currentActiveTab === tabId ? "" : "hidden";
    const tabClass = (tabId) => this.currentActiveTab === tabId
      ? "border-pink-ruby text-pink-ruby font-bold"
      : "border-transparent text-text-light hover:text-text-dark";

    const internshipsHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Page Header -->
        <div>
          <h2 class="font-display font-bold text-2xl text-text-dark">Internship Operations Platform</h2>
          <p class="text-[12.5px] text-text-light font-sans mt-0.5">Control recruitment pipelines, manage active domains, and oversee cohort milestones.</p>
        </div>

        <!-- Tab Buttons Row -->
        <div class="flex flex-wrap border-b border-stone-200 gap-1.5 font-interface text-[11.5px] font-semibold uppercase tracking-wider">
          <button data-tab="tab-overview" class="admin-tab-btn py-3 px-4.5 border-b-2 transition-colors ${tabClass("tab-overview")}">
            Overview
          </button>
          <button data-tab="tab-openings" class="admin-tab-btn py-3 px-4.5 border-b-2 transition-colors ${tabClass("tab-openings")}">
            Job Openings
          </button>
          <button data-tab="tab-pipeline" class="admin-tab-btn py-3 px-4.5 border-b-2 transition-colors ${tabClass("tab-pipeline")}">
            Recruitment Board
          </button>
          <button data-tab="tab-mentors" class="admin-tab-btn py-3 px-4.5 border-b-2 transition-colors ${tabClass("tab-mentors")}">
            Mentor Assignments
          </button>
          <button data-tab="tab-progress" class="admin-tab-btn py-3 px-4.5 border-b-2 transition-colors ${tabClass("tab-progress")}">
            Progress Logs
          </button>
        </div>

        <!-- Tab Contents Container -->
        <div class="py-2">
          
          <section id="tab-overview" class="admin-tab-content ${isTabActive("tab-overview")}">
            ${this.overview.render()}
          </section>

          <section id="tab-openings" class="admin-tab-content ${isTabActive("tab-openings")}">
            ${this.oppManager.render()}
          </section>

          <section id="tab-pipeline" class="admin-tab-content ${isTabActive("tab-pipeline")}">
            ${this.pipeline.render()}
          </section>

          <section id="tab-mentors" class="admin-tab-content ${isTabActive("tab-mentors")}">
            ${this.mentors.render()}
          </section>

          <section id="tab-progress" class="admin-tab-content ${isTabActive("tab-progress")}">
            ${this.progress.render()}
          </section>

        </div>
      </div>
    `;

    return AdminLayout.render(internshipsHTML, "internships");
  }

  init() {
    AdminLayout.init();
    
    // Call sub-component initializations
    OpportunityManager.init();
    ApplicationsPipeline.init();
    MentorAssignment.init();
    ProgressMonitoring.init();

    // Tab controller logic
    const tabs = document.querySelectorAll('.admin-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentActiveTab = tab.dataset.tab;
        
        // Repaint the tabs container without full router change
        const appElement = document.querySelector('#app');
        if (appElement) {
          appElement.innerHTML = this.render();
          this.init();
        }
      });
    });
  }
}
