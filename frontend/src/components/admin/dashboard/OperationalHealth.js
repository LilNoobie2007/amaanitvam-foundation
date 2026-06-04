export default class OperationalHealth {
  render() {
    const healthMetrics = [
      { name: "Volunteer Retention Index", percent: 88, color: "bg-emerald-600", desc: "Coordinators completing >3 consecutive campaigns" },
      { name: "Internship Completion Rate", percent: 92, color: "bg-emerald-600", desc: "Cohort interns completing deliverables guidelines" },
      { name: "Event Attendance Rate", percent: 84, color: "bg-gold-satin", desc: "Registered volunteers checking in at regional drives" },
      { name: "Inquiry Resolution SLA", percent: 78, color: "bg-pink-ruby", desc: "Support inquiries resolved within category SLA targets" },
      { name: "Credential Integrity Check", percent: 100, color: "bg-emerald-600", desc: "Valid certificates issued matching active registries" }
    ];

    const elementsHTML = healthMetrics.map(m => `
      <div class="space-y-1.5 text-left font-sans">
        <div class="flex justify-between text-[12.5px]">
          <div>
            <strong class="font-semibold text-text-dark">${m.name}</strong>
            <span class="block text-[10.5px] text-text-light font-light mt-0.5">${m.desc}</span>
          </div>
          <span class="font-interface font-bold text-text-dark text-[14px]">${m.percent}%</span>
        </div>
        <div class="w-full bg-stone-100 h-2 rounded overflow-hidden">
          <div class="${m.color} h-full" style="width: ${m.percent}%"></div>
        </div>
      </div>
    `).join('');

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
        <h4 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100 text-left">
          Operational Health & Compliance SLA
        </h4>
        <div class="space-y-4">
          ${elementsHTML}
        </div>
      </div>
    `;
  }
}
