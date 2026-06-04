export default class PostDonationJourney {
  render() {
    const steps = [
      {
        num: "01",
        title: "Contribute & Direct",
        desc: "Make your UPI or bank transaction and choose which program intent to restricted-fund (General, Education, Outreach, or Campaigns)."
      },
      {
        num: "02",
        title: "Accounts Acknowledged",
        desc: "Our accounts desk audits the transaction, updates registry status, and sends a formal email receipt with Section 80G tax details."
      },
      {
        num: "03",
        title: "Field Deployment",
        desc: "Tutors purchase student kits or setup center desks. Operations uploads field photos and outcome metrics to the event report."
      },
      {
        num: "04",
        title: "Ongoing Engagement",
        desc: "Receive monthly newsletters summarizing student evaluations, and get invitations to attend community sync webinars."
      }
    ];

    const timelineHTML = steps.map(s => `
      <div class="space-y-3 text-left border-l-2 border-stone-200 pl-6 py-2 relative">
        <span class="absolute -left-3 top-2 h-6.5 w-6.5 rounded-full bg-pink-ruby text-white font-interface font-bold text-[10.5px] flex items-center justify-center border-4 border-stone-50 select-none">
          ${s.num}
        </span>
        
        <h4 class="font-display font-semibold text-[16px] text-text-dark pt-0.5">${s.title}</h4>
        <p class="font-sans text-[13px] text-text-muted leading-relaxed font-light">${s.desc}</p>
      </div>
    `).join('');

    return `
      <section class="py-16 bg-stone-50 select-none">
        <div class="max-w-5xl mx-auto px-6 space-y-10">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Journey Roadmap</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">What Happens After You Contribute?</h2>
            <p class="font-sans text-[14.5px] text-text-muted font-light mt-3 max-w-xl">
              We close the loop by tracing contributions from bank deposit to physical classroom verification.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${timelineHTML}
          </div>

        </div>
      </section>
    `;
  }
}
