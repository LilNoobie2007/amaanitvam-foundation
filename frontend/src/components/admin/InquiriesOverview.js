import { inquiries } from '../../mocks/inquiries.js';

export default class InquiriesOverview {
  render() {
    const total = inquiries.length;
    const newCount = inquiries.filter(i => i.status === "New").length;
    const inReview = inquiries.filter(i => i.status === "In Review").length;
    const resolved = inquiries.filter(i => i.status === "Resolved" || i.status === "Closed").length;

    // Calculate most common category
    const catFreq = {};
    inquiries.forEach(i => {
      catFreq[i.category] = (catFreq[i.category] || 0) + 1;
    });
    let topCat = "General Inquiry";
    let maxFreq = 0;
    Object.entries(catFreq).forEach(([cat, count]) => {
      if (count > maxFreq) {
        maxFreq = count;
        topCat = cat;
      }
    });

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left select-none scroll-reveal revealed">
        
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Total Tickets
          </span>
          <span class="font-display font-bold text-3xl text-text-dark" id="metric-total-inq">
            ${total}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Logged in system registry</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Unassigned / New
          </span>
          <span class="font-display font-bold text-3xl text-pink-ruby" id="metric-new-inq">
            ${newCount}
          </span>
          <span class="block text-[11px] text-pink-ruby font-sans mt-2">Awaiting initial triage</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            In Dispatch
          </span>
          <span class="font-display font-bold text-3xl text-gold-ochre" id="metric-review-inq">
            ${inReview}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Currently being routed</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Resolved Tickets
          </span>
          <span class="font-display font-bold text-3xl text-emerald-800" id="metric-resolved-inq">
            ${resolved}
          </span>
          <span class="block text-[11px] text-emerald-600 font-sans mt-2">Queries closed successfully</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Common Category
          </span>
          <span class="block font-interface font-bold text-[13.5px] text-text-dark mt-1 truncate" title="${topCat}" id="metric-top-cat">
            ${topCat}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-4">Highest query load desk</span>
        </div>

      </div>
    `;
  }
}
