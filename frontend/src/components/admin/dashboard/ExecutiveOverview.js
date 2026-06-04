import { inquiries } from '../../../mocks/admin/inquiriesAdmin.js';
import { donations } from '../../../mocks/admin/donationsAdmin.js';
import { people } from '../../../mocks/admin/people.js';
import { certificates } from '../../../mocks/admin/certificates.js';

export default class ExecutiveOverview {
  render() {
    const activeVols = people.filter(p => p.type === "Volunteer" && p.status === "Active").length;
    const activeInts = people.filter(p => p.type === "Intern" && p.status === "Active").length;
    const openInqs = inquiries.filter(i => i.status === "New" || i.status === "In Review").length;
    const certsIssued = certificates.filter(c => c.status === "Issued").length;
    const donationsCount = donations.length;

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        
        <!-- Role Switcher Strip -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-pink-ruby animate-pulse"></span>
            <span class="font-interface text-[11px] font-bold uppercase tracking-widest text-text-dark">Operational Persona Switcher</span>
          </div>

          <div class="flex items-center gap-2 font-interface text-[11.5px] font-bold uppercase tracking-wider text-text-light">
            <span>Viewing As:</span>
            <select id="role-persona-select" class="px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans font-semibold">
              <option value="Super Admin">Super Admin</option>
              <option value="Volunteer Lead">Volunteer Lead</option>
              <option value="Internship Coordinator">Internship Coordinator</option>
              <option value="Events Manager">Events Manager</option>
              <option value="Certificate Manager">Certificate Manager</option>
            </select>
          </div>
        </div>

        <!-- Metric Grid Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6" id="dashboard-metric-grid">
          
          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Volunteer Lead">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Active Volunteers
            </span>
            <span class="font-display font-bold text-3xl text-text-dark" id="vol-count-val">
              ${activeVols + 40} <!-- Mocked count plus active directory -->
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Active in Delhi NCR</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Internship Coordinator">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Active Interns
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${activeInts}
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Summer 2026 Cohort</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Events Manager">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Upcoming Campaigns
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              2
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">Scheduled field drives</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Certificate Manager">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Certificates Issued
            </span>
            <span class="font-display font-bold text-3xl text-emerald-800">
              ${certsIssued}
            </span>
            <span class="block text-[11px] text-emerald-600 font-sans mt-2">Verifiable credentials</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Super Admin">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Open Inquiries
            </span>
            <span class="font-display font-bold text-3xl text-pink-ruby">
              ${openInqs}
            </span>
            <span class="block text-[11px] text-pink-ruby font-sans mt-2">Awaiting coordinator response</span>
          </div>

          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm block-card" data-role="Super Admin">
            <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
              Donations Logged
            </span>
            <span class="font-display font-bold text-3xl text-text-dark">
              ${donationsCount}
            </span>
            <span class="block text-[11px] text-text-light font-sans mt-2">UPI & Bank transfer receipts</span>
          </div>

        </div>

      </div>
    `;
  }

  static init() {
    const selector = document.getElementById('role-persona-select');
    const cards = document.querySelectorAll('.block-card');

    if (selector) {
      selector.addEventListener('change', (e) => {
        const role = e.target.value;
        alert(`Verification: Switching dashboard view persona to "${role}". Mapped metrics will highlight focus columns.`);

        cards.forEach(card => {
          const cardRole = card.dataset.role;
          if (role === "Super Admin") {
            card.classList.remove('opacity-40', 'border-pink-ruby/40');
          } else if (cardRole === role) {
            card.classList.remove('opacity-40');
            card.classList.add('border-pink-ruby/40', 'scale-[1.02]');
          } else {
            card.classList.add('opacity-40');
            card.classList.remove('border-pink-ruby/40', 'scale-[1.02]');
          }
        });
      });
    }
  }
}
