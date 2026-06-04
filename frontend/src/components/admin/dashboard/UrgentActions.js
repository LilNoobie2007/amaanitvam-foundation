import { inquiries } from '../../../mocks/admin/inquiriesAdmin.js';
import { certificates } from '../../../mocks/admin/certificates.js';

export default class UrgentActions {
  render() {
    const pendingCerts = certificates.filter(c => c.status === "Pending");
    const urgentInqs = inquiries.filter(i => i.status !== "Resolved" && (i.priority === "High" || i.slaStatus === "Breached" || i.slaStatus === "Approaching"));

    let certAlertHTML = "";
    if (pendingCerts.length > 0) {
      certAlertHTML = `
        <div class="flex items-start gap-4 p-4 rounded-lg bg-pink-blush border border-pink-quartz text-left">
          <div class="p-2 rounded bg-pink-quartz text-pink-ruby">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div class="flex-1 space-y-1">
            <h5 class="font-interface font-bold text-[13px] text-text-dark uppercase tracking-wide">Pending Certificate Verification</h5>
            <p class="text-[12.5px] text-text-muted font-sans">${pendingCerts.length} certificates are waiting for coordinator verification before publication.</p>
            <div class="flex gap-2.5 mt-2">
              <a href="#/admin/certificates" class="font-sans font-bold text-[11px] text-pink-ruby hover:underline">Review Approvals Queue &rarr;</a>
            </div>
          </div>
        </div>
      `;
    }

    const inquiryAlertsHTML = urgentInqs.map(inq => {
      const slaColor = inq.slaStatus === "Breached" ? "bg-red-100 text-red-700 border-red-200" : "bg-gold-light text-gold-ochre border-gold-satin/20";
      return `
        <div class="flex items-start gap-4 p-4 rounded-lg bg-white border border-stone-200 text-left">
          <div class="p-2 rounded bg-stone-100 text-text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1 space-y-1">
            <div class="flex justify-between items-center">
              <h5 class="font-interface font-bold text-[13px] text-text-dark uppercase tracking-wide">${inq.inquiryId}: ${inq.category}</h5>
              <span class="px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider border ${slaColor}">${inq.slaStatus}</span>
            </div>
            <p class="text-[12.5px] text-text-muted font-sans">"${inq.subject}" - from ${inq.name} (Priority: ${inq.priority})</p>
            <div class="flex gap-3 mt-2">
              <a href="#/admin/inquiries" class="font-sans font-bold text-[11px] text-pink-ruby hover:underline">Respond Now</a>
              <button class="font-sans font-semibold text-[11px] text-text-light hover:text-text-dark resolve-inq-btn" data-id="${inq.id}">Dismiss</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-stone-100">
          <h4 class="font-display font-semibold text-lg text-text-dark text-left">
            Urgent Action Items
          </h4>
          <span class="px-2 py-0.5 rounded-full bg-pink-blush text-pink-ruby font-interface font-bold text-[10px] uppercase tracking-wider">
            ${pendingCerts.length + urgentInqs.length} Alerts
          </span>
        </div>
        
        <div class="space-y-4">
          ${certAlertHTML}
          ${inquiryAlertsHTML || `
            <div class="py-8 text-center text-text-light text-[12.5px] font-sans">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No high-priority inquiry tickets or breaches.
            </div>
          `}
        </div>
      </div>
    `;
  }

  static init() {
    document.querySelectorAll('.resolve-inq-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const inqId = e.target.dataset.id;
        const matching = inquiries.find(i => i.id === inqId);
        if (matching) {
          matching.status = "Resolved";
          matching.slaStatus = "Within SLA";
          alert(`Inquiry ${matching.inquiryId} marked as dismissed/resolved for mock testing.`);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
      });
    });
  }
}
