export default class AdminLayout {
  static render(contentHTML, activeSegment) {
    const navItems = [
      { id: "dashboard", label: "Executive Dashboard", link: "#/admin", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/></svg>` },
      { id: "search", label: "Global Search", link: "#/admin/search", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>` },
      { id: "people", label: "People Directory", link: "#/admin/people", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>` },
      { id: "projects", label: "Campaign Projects", link: "#/admin/projects", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>` },
      { id: "certificates", label: "Certificates Queue", link: "#/admin/certificates", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
      { id: "volunteers", label: "Volunteers Desk", link: "#/admin/volunteers", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>` },
      { id: "internships", label: "Internships Kanban", link: "#/admin/internships", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>` },
      { id: "events", label: "Events Operations", link: "#/admin/events", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"/></svg>` },
      { id: "donations", label: "Treasury (Donations)", link: "#/admin/donations", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 8h4m-4 8h4"/></svg>` },
      { id: "inquiries", label: "Inquiries Ticketing", link: "#/admin/inquiries", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` },
      { id: "audit-logs", label: "Audit Logs", link: "#/admin/audit-logs", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>` },
      { id: "system-health", label: "System Health", link: "#/admin/system-health", icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>` }
    ];

    const sidebarItemsHTML = navItems.map(item => {
      const isActive = item.id === activeSegment;
      const textClass = isActive 
        ? "bg-pink-blush text-pink-ruby border-l-4 border-pink-ruby font-bold" 
        : "text-text-muted hover:bg-stone-50 hover:text-text-dark font-medium";

      return `
        <a href="${item.link}" class="flex items-center gap-3.5 px-4 py-3 text-[12.5px] font-sans transition-all ${textClass}">
          <span class="${isActive ? "text-pink-ruby" : "text-text-light"}">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `;
    }).join("");

    return `
      <div class="min-h-screen bg-stone-50 flex flex-col font-sans select-none">
        
        <!-- Top bar (fixed) -->
        <header class="bg-white border-b border-stone-200/80 h-16 shrink-0 flex items-center justify-between px-6 z-30 sticky top-0">
          <div class="flex items-center gap-6">
            <!-- Brand -->
            <a href="#/" class="flex items-center gap-2">
              <img src="/amaanitvam-logo.png" alt="Lotus logo" class="h-6 w-auto filter contrast-125">
              <span class="font-display font-bold text-text-dark text-base">Amaanitvam</span>
              <span class="px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider bg-pink-blush text-pink-ruby border border-pink-quartz/40 font-interface">Operations Center</span>
            </a>
          </div>

          <div class="flex items-center gap-6">
            <!-- Top Search bar shortcut -->
            <div class="relative w-48 sm:w-64 hidden sm:block">
              <input type="text" id="top-bar-search" placeholder="Quick Search (e.g. Arjun)..." class="w-full pl-8 pr-3 py-1 text-[11.5px] border border-stone-200 rounded focus:outline-none focus:border-pink-ruby font-sans" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-text-light absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <!-- Profile Info dropdown -->
            <div class="flex items-center gap-2">
              <div class="h-7 w-7 rounded-full bg-pink-blush border border-pink-quartz flex items-center justify-center font-display font-bold text-[11px] text-pink-ruby">
                AD
              </div>
              <span class="text-[11.5px] font-bold text-text-dark font-sans hidden md:inline">Admin Desk</span>
              <button id="admin-logout-btn" class="text-[11.5px] font-semibold text-text-light hover:text-text-dark font-sans ml-2">Logout</button>
            </div>
          </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
          
          <!-- Sidebar Nav (sticky/scrollable) -->
          <aside class="w-64 bg-white border-r border-stone-200/80 shrink-0 hidden lg:flex flex-col justify-between py-4 overflow-y-auto">
            <nav class="flex flex-col gap-0.5">
              <span class="px-4 text-[9px] font-bold uppercase tracking-widest text-text-light mb-2 font-interface">CRM / ERP Operations</span>
              ${sidebarItemsHTML}
            </nav>
            
            <div class="px-4 pt-4 border-t border-stone-100 text-[11px] text-text-light font-sans">
              <span>Platform Version 1.2.0</span>
              <span class="block mt-0.5">Mocks Sandbox Active</span>
            </div>
          </aside>

          <!-- Main Content Area -->
          <main class="flex-grow overflow-y-auto p-6 md:p-8 space-y-6">
            
            <!-- Mobile Navigation Strip (Visible on smaller screens) -->
            <div class="lg:hidden bg-white border border-stone-200/80 rounded-xl p-3 flex flex-wrap gap-2 justify-center shadow-sm">
              <a href="#/admin" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "dashboard" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Dashboard</a>
              <a href="#/admin/people" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "people" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">People</a>
              <a href="#/admin/projects" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "projects" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Projects</a>
              <a href="#/admin/certificates" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "certificates" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Certificates</a>
              <a href="#/admin/volunteers" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "volunteers" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Volunteers</a>
              <a href="#/admin/internships" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "internships" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Internships</a>
              <a href="#/admin/events" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "events" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Events</a>
              <a href="#/admin/inquiries" class="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${activeSegment === "inquiries" ? "bg-pink-blush text-pink-ruby" : "text-text-muted"}">Tickets</a>
            </div>

            <!-- Inject page template content -->
            ${contentHTML}

          </main>

        </div>

      </div>
    `;
  }

  static init() {
    // Top bar quick search handler
    const topSearch = document.getElementById('top-bar-search');
    if (topSearch) {
      topSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = topSearch.value.trim();
          window.location.hash = `#/admin/search?q=${encodeURIComponent(val)}`;
        }
      });
    }

    // Logout trigger
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        alert("Verification: Logging out from operations desk...");
        window.location.hash = '#/admin/login';
      });
    }
  }
}
