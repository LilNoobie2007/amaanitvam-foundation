import AdminLayout from '../components/admin/AdminLayout.js';
import InquiriesOverview from '../components/admin/InquiriesOverview.js';
import InquiryTable from '../components/admin/InquiryTable.js';

export default class AdminInquiriesPage {
  constructor() {
    this.overview = new InquiriesOverview();
    this.table = new InquiryTable();
  }

  render() {
    const inquiriesHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Page Header -->
        <div>
          <h2 class="font-display font-bold text-2xl text-text-dark">Support Inquiries Manager</h2>
          <p class="text-[12.5px] text-text-light font-sans mt-0.5">Manage incoming contact form submissions, track response SLAs, and allocate assignees.</p>
        </div>

        <!-- Overview stats -->
        ${this.overview.render()}

        <!-- Table Log -->
        ${this.table.render()}
      </div>
    `;

    return AdminLayout.render(inquiriesHTML, "inquiries");
  }

  init() {
    AdminLayout.init();
    InquiryTable.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
