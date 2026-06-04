import AdminLayout from '../components/admin/AdminLayout.js';
import ExecutiveOverview from '../components/admin/dashboard/ExecutiveOverview.js';
import OperationalHealth from '../components/admin/dashboard/OperationalHealth.js';
import UrgentActions from '../components/admin/dashboard/UrgentActions.js';
import RecentActivityFeed from '../components/admin/dashboard/RecentActivityFeed.js';
import QuickActions from '../components/admin/dashboard/QuickActions.js';

export default class AdminDashboardPage {
  constructor() {
    this.executiveOverview = new ExecutiveOverview();
    this.operationalHealth = new OperationalHealth();
    this.urgentActions = new UrgentActions();
    this.recentActivityFeed = new RecentActivityFeed();
    this.quickActions = new QuickActions();
  }

  render() {
    const dashboardHTML = `
      <div class="space-y-8 select-none text-left">
        
        <!-- Welcome strip -->
        <div>
          <h2 class="font-display font-bold text-2xl text-text-dark">Operations Center</h2>
          <p class="text-[12.5px] text-text-light font-sans mt-0.5">Relational ERP-CRM management dashboard for the Amaanitvam Foundation.</p>
        </div>

        <!-- Metric overview -->
        ${this.executiveOverview.render()}

        <!-- Core layout widgets -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            ${this.urgentActions.render()}
            ${this.quickActions.render()}
          </div>
          <div class="space-y-6">
            ${this.operationalHealth.render()}
            ${this.recentActivityFeed.render()}
          </div>
        </div>

      </div>
    `;

    return AdminLayout.render(dashboardHTML, "dashboard");
  }

  init() {
    AdminLayout.init();
    ExecutiveOverview.init();
    UrgentActions.init();
    RecentActivityFeed.init();
    QuickActions.init();
  }
}
