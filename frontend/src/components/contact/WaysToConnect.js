export default class WaysToConnect {
  render() {
    const channels = [
      { name: "General Inquiries", route: "General communication & feedback", time: "2-3 business days", contact: "amaanitvamfoundation@gmail.com" },
      { name: "Volunteer Support", route: "Roster status, onboarding assistance", time: "1-2 business days", contact: "hr@amaanitvam.org" },
      { name: "Internship Queries", route: "Cohort applications, certificate audits", time: "2 business days", contact: "internships@amaanitvam.org" },
      { name: "Partnership Requests", route: "Institutional collaborations & sponsorships", time: "5 business days", contact: "partners@amaanitvam.org" },
      { name: "Media & Outreach", route: "Press kits, publication releases", time: "4 business days", contact: "media@amaanitvam.org" },
      { name: "Donations Support", route: "Bank receipts, tax exemptions queries", time: "1 business day", contact: "accounts@amaanitvam.org" }
    ];

    const gridHTML = channels.map(c => `
      <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-4 hover:border-pink-ruby/65 transition-colors">
        <div class="space-y-1">
          <h4 class="font-interface font-bold text-[14px] text-text-dark">${c.name}</h4>
          <p class="font-sans text-[12px] text-text-light font-light leading-normal">${c.route}</p>
        </div>
        
        <div class="pt-3 border-t border-stone-100 flex flex-col gap-1 text-[11px] font-sans">
          <div class="flex items-center justify-between">
            <span class="text-text-light">Response SLA</span>
            <strong class="text-text-dark font-medium">${c.time}</strong>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-text-light">Email Address</span>
            <a href="mailto:${c.contact}" class="text-pink-ruby hover:underline font-semibold font-interface select-all">${c.contact}</a>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <section class="py-12 bg-stone-50 select-none">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Ways to Connect</span>
            <h3 class="font-display font-semibold text-2xl text-text-dark mt-1 tracking-tight">Direct Response Channels</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${gridHTML}
          </div>
        </div>
      </section>
    `;
  }
}
