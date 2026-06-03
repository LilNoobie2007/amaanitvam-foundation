import Navbar from '../components/Navbar.js';
import DashboardHero from '../components/volunteer/dashboard/DashboardHero.js';
import MyContributions from '../components/volunteer/dashboard/MyContributions.js';
import MyImpact from '../components/volunteer/workspace/MyImpact.js';
import ActiveProjects from '../components/volunteer/workspace/ActiveProjects.js';
import MyTeam from '../components/volunteer/workspace/MyTeam.js';
import MyTasks from '../components/volunteer/workspace/MyTasks.js';
import MyApplications from '../components/volunteer/dashboard/MyApplications.js';
import EventAttendance from '../components/events/volunteer/EventAttendance.js';
import MyEvents from '../components/events/volunteer/MyEvents.js';
import NotificationsCenter from '../components/volunteer/workspace/NotificationsCenter.js';
import VolunteerCertificates from '../components/certificates/volunteer/VolunteerCertificates.js';
import ContributionTimeline from '../components/volunteer/workspace/ContributionTimeline.js';
import Profile from '../components/volunteer/dashboard/Profile.js';
import Footer from '../components/Footer.js';

export default class VolunteerDashboard {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new DashboardHero();
    this.contributions = new MyContributions();
    this.impact = new MyImpact();
    this.projects = new ActiveProjects();
    this.team = new MyTeam();
    this.tasks = new MyTasks();
    this.applications = new MyApplications();
    this.attendance = new EventAttendance();
    this.events = new MyEvents();
    this.notifications = new NotificationsCenter();
    this.certificates = new VolunteerCertificates();
    this.timeline = new ContributionTimeline();
    this.profile = new Profile();
    this.footer = new Footer();
  }

  render() {
    const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';

    // Route guard check
    if (!isLoggedIn) {
      setTimeout(() => {
        window.location.hash = '#/volunteer';
      }, 50);
      return `
        <div class="flex items-center justify-center min-h-screen bg-stone-50">
          <div class="text-center font-sans">
            <p class="text-text-light text-[18px] animate-pulse">Redirecting to login portal...</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        <!-- Header Navigation -->
        ${this.navbar.render()}

        <main class="flex-grow pt-20 md:pt-24">
          
          <!-- Dashboard Greeting Header -->
          ${this.hero.render()}

          <!-- Stats Strip -->
          ${this.contributions.render()}

          <!-- Multi-column Responsive Layout Grouping -->
          <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-reveal">
            
            <!-- Primary Workspace Content (col-span-8) -->
            <div class="lg:col-span-8 space-y-8">
              <!-- personal impact tracker -->
              ${this.impact.render()}

              <!-- active project workspace cards -->
              ${this.projects.render()}

              <!-- assignments tracker with toggles -->
              ${this.tasks.render()}

              <!-- application log status -->
              ${this.applications.render()}

              <!-- attendance rate stats and list -->
              ${this.attendance.render()}
            </div>

            <!-- Contextual Information Sidebar (col-span-4) -->
            <div class="lg:col-span-4 space-y-8">
              <!-- my assigned team metadata -->
              ${this.team.render()}

              <!-- calendar orientations -->
              ${this.events.render()}

              <!-- alerts with priority -->
              ${this.notifications.render()}

              <!-- credentials metadata -->
              ${this.certificates.render()}

              <!-- growth journey level status -->
              ${this.timeline.render()}

              <!-- demographic details -->
              ${this.profile.render()}
            </div>

          </div>
        </main>

        <!-- Footer -->
        ${this.footer.render()}

        <!-- Floating Mock Authentication Controller for Reviewers -->
        <div class="fixed bottom-6 right-6 z-50 bg-white border border-stone-200/80 shadow-2xl rounded p-4 flex flex-col gap-2 max-w-[250px] scroll-reveal revealed">
          <span class="font-interface font-bold text-[9px] uppercase tracking-widest text-text-light">
            Prototype Auth Switcher
          </span>
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span class="font-sans text-[13px] font-medium text-text-dark">
              Arjun Mehta (Logged In)
            </span>
          </div>
          <button id="btn-toggle-auth-dashboard" class="w-full font-interface font-semibold text-[10px] uppercase tracking-widest py-2 rounded bg-text-dark text-white hover:bg-text-dark/90 transition-all duration-300">
            Log Out
          </button>
        </div>
      </div>
    `;
  }

  init() {
    const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';
    if (!isLoggedIn) return;

    Navbar.init();
    DashboardHero.init();
    MyTasks.init();
    MyEvents.init();
    VolunteerCertificates.init();
    Footer.init();

    // Floating Auth toggle handler
    const authBtn = document.getElementById('btn-toggle-auth-dashboard');
    if (authBtn) {
      authBtn.addEventListener('click', () => {
        localStorage.setItem('amaanitvam_volunteer_logged_in', 'false');
        window.location.hash = '#/volunteer';
      });
    }

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });
    reveals.forEach(el => revealObserver.observe(el));
  }
}
