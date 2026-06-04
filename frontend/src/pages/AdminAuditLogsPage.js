import AdminLayout from '../components/admin/AdminLayout.js';
import { auditLogs } from '../mocks/admin/auditLogs.js';

export default class AdminAuditLogsPage {
  constructor() {
    this.currentFilter = "All";
  }

  render() {
    const filteredLogs = this.currentFilter === "All"
      ? auditLogs
      : auditLogs.filter(log => log.module === this.currentFilter);

    const rowsHTML = filteredLogs.map(log => `
      <tr class="hover:bg-stone-50/80 transition-colors border-b border-stone-100 text-[12.5px] font-sans text-text-muted">
        <td class="px-4 py-3 font-interface text-text-light">${log.timestamp}</td>
        <td class="px-4 py-3 font-semibold text-text-dark">${log.action}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border bg-stone-100 text-text-muted border-stone-200">${log.module}</span>
        </td>
        <td class="px-4 py-3 text-text-dark font-sans">${log.operator}</td>
        <td class="px-4 py-3">
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase tracking-widest">${log.result}</span>
        </td>
      </tr>
    `).join("");

    const modules = ["All", "Certificates", "Donations", "Internships", "Projects", "Inquiries", "Events"];

    const auditHTML = `
      <div class="space-y-6 select-none text-left">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">System Traceability Audit Trail</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Review chronological event logs of all administrative overrides, certificate issues, and financial inputs.</p>
          </div>
          
          <div class="flex items-center gap-3">
            <span class="text-[12px] font-bold text-text-light font-interface uppercase">Module:</span>
            <select id="audit-module-filter" class="px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans text-[12px]">
              ${modules.map(m => `
                <option value="${m}" ${this.currentFilter === m ? "selected" : ""}>${m}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Table Container -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-left font-interface text-[9.5px] uppercase tracking-widest text-text-light">
                  <th class="px-4 py-3">Timestamp</th>
                  <th class="px-4 py-3">Override Action</th>
                  <th class="px-4 py-3">Target Module</th>
                  <th class="px-4 py-3">Operator Name</th>
                  <th class="px-4 py-3">Result</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHTML || `<tr><td colspan="5" class="text-center py-8 text-text-light font-sans">No audit events match the selected module.</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    return AdminLayout.render(auditHTML, "audit-logs");
  }

  init() {
    AdminLayout.init();

    const select = document.getElementById('audit-module-filter');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentFilter = e.target.value;
        
        // Repaint
        const appElement = document.querySelector('#app');
        if (appElement) {
          appElement.innerHTML = this.render();
          this.init();
        }
      });
    }
  }
}
