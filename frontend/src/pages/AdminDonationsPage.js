import AdminLayout from '../components/admin/AdminLayout.js';
import DonationsOverview from '../components/admin/DonationsOverview.js';
import DonationsTable from '../components/admin/DonationsTable.js';

export default class AdminDonationsPage {
  constructor() {
    this.overview = new DonationsOverview();
    this.table = new DonationsTable();
  }

  render() {
    const donationsHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Page Header -->
        <div>
          <h2 class="font-display font-bold text-2xl text-text-dark">Treasury ledger</h2>
          <p class="text-[12.5px] text-text-light font-sans mt-0.5">Track financial donations, check transaction channels, and allocate funds.</p>
        </div>

        <!-- Overview stats -->
        ${this.overview.render()}

        <!-- Table Ledger -->
        ${this.table.render()}
      </div>
    `;

    return AdminLayout.render(donationsHTML, "donations");
  }

  init() {
    AdminLayout.init();
    DonationsTable.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
