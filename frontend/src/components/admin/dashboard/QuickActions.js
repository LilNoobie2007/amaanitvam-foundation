export default class QuickActions {
  render() {
    const actions = [
      {
        title: "Verify Credentials",
        desc: "Review and approve pending service certificates",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
        link: "#/admin/certificates",
        color: "hover:border-pink-ruby/40 hover:bg-pink-blush/40"
      },
      {
        title: "Deploy Event Campaign",
        desc: "Schedule and organize a new community field drive",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        link: "#/admin/events/new",
        color: "hover:border-gold-satin/40 hover:bg-gold-light/40"
      },
      {
        title: "Internship Kanban",
        desc: "Manage cohorts, review screens, and assign mentors",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`,
        link: "#/admin/internships",
        color: "hover:border-emerald-600/40 hover:bg-emerald-50"
      },
      {
        title: "System Diagnostics",
        desc: "Check resources load, API health meters, and uptime metrics",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>`,
        link: "#/admin/system-health",
        color: "hover:border-stone-400 hover:bg-stone-50"
      }
    ];

    const actionsHTML = actions.map(act => `
      <a href="${act.link}" class="flex items-start gap-3 p-4 rounded-xl border border-stone-200/80 bg-white transition-all duration-300 shadow-sm ${act.color} text-left font-sans group">
        <div class="p-2 rounded bg-stone-50 text-text-dark group-hover:text-pink-ruby transition-colors">
          ${act.icon}
        </div>
        <div>
          <h5 class="font-interface font-bold text-[13.5px] text-text-dark group-hover:text-pink-ruby transition-colors">${act.title}</h5>
          <p class="text-[11.5px] text-text-light mt-0.5">${act.desc}</p>
        </div>
      </a>
    `).join("");

    return `
      <div class="space-y-4">
        <h4 class="font-display font-semibold text-lg text-text-dark text-left pb-2">
          Operational Quick Actions
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${actionsHTML}
        </div>
      </div>
    `;
  }

  static init() {}
}
