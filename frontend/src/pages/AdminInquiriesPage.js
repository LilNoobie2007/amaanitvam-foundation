import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import InquiriesOverview from '../components/admin/InquiriesOverview.js';
import InquiryTable from '../components/admin/InquiryTable.js';

export default class AdminInquiriesPage {
  constructor() {
    this.navbar = new Navbar();
    this.overview = new InquiriesOverview();
    this.table = new InquiryTable();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-10 px-6">
          <div class="max-w-6xl mx-auto space-y-8">
            
            <!-- Page Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-stone-200 pb-5">
              <div>
                <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Executive Ticketing Desk</span>
                <h2 class="font-display font-semibold text-3xl text-text-dark mt-1 tracking-tight">Support Inquiries Manager</h2>
              </div>
              
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-pink-ruby"></span>
                <span class="font-interface text-[11px] font-bold uppercase tracking-widest text-text-light">Operational Console</span>
              </div>
            </div>

            <!-- Overview widgets -->
            ${this.overview.render()}

            <!-- Interactive Table log -->
            ${this.table.render()}

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();
    
    // Sub-component initializations
    InquiryTable.init();
  }
}
