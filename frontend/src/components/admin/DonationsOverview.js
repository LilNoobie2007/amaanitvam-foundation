import { donations } from '../../mocks/donations.js';
import { donationStats } from '../../mocks/donationStats.js';

export default class DonationsOverview {
  render() {
    const s = donationStats;
    
    // Calculate total sum of completed/acknowledged donations dynamically
    const verifiedDonations = donations.filter(d => d.status === "Completed" || d.status === "Acknowledged");
    const totalSum = verifiedDonations.reduce((acc, curr) => acc + curr.amount, 0);

    const recurringCount = verifiedDonations.filter(d => d.frequency === "Monthly").length;
    const oneTimeCount = verifiedDonations.filter(d => d.frequency === "One-Time").length;

    // Calculate most used payment method
    const methodFreq = {};
    verifiedDonations.forEach(d => {
      methodFreq[d.method] = (methodFreq[d.method] || 0) + 1;
    });
    let topMethod = "Payment Gateway";
    let maxFreq = 0;
    Object.entries(methodFreq).forEach(([method, count]) => {
      if (count > maxFreq) {
        maxFreq = count;
        topMethod = method;
      }
    });

    const formatCurrency = (val) => {
      return `₹${Number(val).toLocaleString('en-IN')}`;
    };

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left select-none scroll-reveal revealed">
        
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Total Contributions
          </span>
          <span class="font-display font-bold text-3xl text-emerald-800" id="metric-total-sum">
            ${formatCurrency(totalSum)}
          </span>
          <span class="block text-[11px] text-emerald-600 font-sans mt-2">Verified ground funding sum</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Average Gift
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${formatCurrency(s.averageGift)}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Per transaction benchmark</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Giving Rhythms
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${recurringCount}<span class="text-lg font-sans font-light text-text-light">M</span> / ${oneTimeCount}<span class="text-lg font-sans font-light text-text-light">O</span>
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Monthly vs One-Time channels</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Transactions Audit
          </span>
          <span class="font-display font-bold text-3xl text-text-dark">
            ${s.successfulTransactions}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-2">Completed receipts catalog</span>
        </div>

        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <span class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">
            Preferred Method
          </span>
          <span class="block font-interface font-bold text-[13.5px] text-text-dark mt-1 truncate" title="${topMethod}">
            ${topMethod}
          </span>
          <span class="block text-[11px] text-text-light font-sans mt-4">Highest transaction frequency</span>
        </div>

      </div>
    `;
  }
}
