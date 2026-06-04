import { auditLogs } from '../../../mocks/admin/auditLogs.js';

export default class RecentActivityFeed {
  render() {
    const getModuleColorClass = (module) => {
      switch (module) {
        case "Certificates":
          return "bg-pink-blush text-pink-ruby border-pink-quartz/45";
        case "Donations":
          return "bg-gold-light text-gold-ochre border-gold-satin/20";
        case "Inquiries":
          return "bg-stone-100 text-text-dark border-stone-200";
        case "Internships":
          return "bg-blue-50 text-blue-800 border-blue-100";
        case "Projects":
          return "bg-emerald-50 text-emerald-800 border-emerald-100";
        default:
          return "bg-stone-50 text-text-light border-stone-100";
      }
    };

    const itemsHTML = auditLogs.slice(0, 5).map(log => `
      <div class="flex items-start justify-between gap-4 p-3 rounded-lg border border-stone-100 hover:bg-stone-50 transition-colors text-left text-[12.5px] font-sans">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-text-dark">${log.action}</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getModuleColorClass(log.module)}">${log.module}</span>
          </div>
          <p class="text-text-light text-[11px]">By <span class="font-semibold text-text-muted">${log.operator}</span> &bull; ${log.result}</p>
        </div>
        <span class="text-[10px] text-text-light font-interface shrink-0 whitespace-nowrap">${log.timestamp.split(' ')[1] || log.timestamp}</span>
      </div>
    `).join("");

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-stone-100">
          <h4 class="font-display font-semibold text-lg text-text-dark text-left">
            Traceability Audit Feed
          </h4>
          <a href="#/admin/audit-logs" class="font-interface font-bold text-[10.5px] uppercase tracking-wider text-pink-ruby hover:underline">
            View All Log Entries &rarr;
          </a>
        </div>
        <div class="space-y-3">
          ${itemsHTML}
        </div>
      </div>
    `;
  }

  static init() {}
}
