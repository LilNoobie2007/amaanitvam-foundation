import { people } from '../../mocks/admin/people.js';
import { projects } from '../../mocks/admin/projects.js';
import { certificates } from '../../mocks/admin/certificates.js';
import { donations } from '../../mocks/admin/donationsAdmin.js';
import { inquiries } from '../../mocks/admin/inquiriesAdmin.js';

export default class GlobalSearch {
  constructor() {
    this.searchQuery = "";
  }

  render() {
    // Parse query parameter from URL hash (e.g. #/admin/search?q=Arjun)
    const hash = window.location.hash || "";
    const queryIndex = hash.indexOf('?q=');
    if (queryIndex !== -1) {
      this.searchQuery = decodeURIComponent(hash.substring(queryIndex + 3));
    }

    const q = this.searchQuery.toLowerCase().trim();

    let peopleMatches = [];
    let projectMatches = [];
    let certMatches = [];
    let donationMatches = [];
    let inquiryMatches = [];

    if (q.length > 0) {
      peopleMatches = people.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.email.toLowerCase().includes(q) || 
        p.type.toLowerCase().includes(q) ||
        p.roleTitle?.toLowerCase().includes(q)
      );

      projectMatches = projects.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      );

      certMatches = certificates.filter(c => 
        c.id.toLowerCase().includes(q) || 
        c.recipientName.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
      );

      donationMatches = donations.filter(d => 
        d.id.toLowerCase().includes(q) || 
        d.donorName.toLowerCase().includes(q) ||
        d.intent.toLowerCase().includes(q) ||
        d.status.toLowerCase().includes(q)
      );

      inquiryMatches = inquiries.filter(i => 
        i.inquiryId.toLowerCase().includes(q) || 
        i.name.toLowerCase().includes(q) || 
        i.subject.toLowerCase().includes(q) || 
        i.message.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q)
      );
    }

    const totalResults = peopleMatches.length + projectMatches.length + certMatches.length + donationMatches.length + inquiryMatches.length;

    let resultsHTML = "";
    if (q.length === 0) {
      resultsHTML = `
        <div class="text-center py-12 text-text-light font-sans bg-stone-50 border border-stone-200 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-stone-300 mb-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-sm font-semibold">Enter a query to search across the operations registry.</p>
        </div>
      `;
    } else if (totalResults === 0) {
      resultsHTML = `
        <div class="text-center py-12 text-text-light font-sans bg-stone-50 border border-stone-200 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-stone-300 mb-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm font-semibold">No results match "${this.searchQuery}". Try searching for names, projects, or transaction IDs.</p>
        </div>
      `;
    } else {
      resultsHTML = `
        <div class="space-y-6">
          <div class="text-left text-[13px] font-sans text-text-light font-semibold">
            Found ${totalResults} matching records in database:
          </div>

          <!-- People Segment -->
          ${peopleMatches.length > 0 ? `
            <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3 text-left">
              <h4 class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light pb-2 border-b border-stone-100">People Operations (${peopleMatches.length})</h4>
              <div class="divide-y divide-stone-100">
                ${peopleMatches.map(p => `
                  <div class="py-3 flex justify-between items-center text-[12.5px] font-sans">
                    <div>
                      <a href="#/admin/people/${p.id}" class="font-bold text-text-dark hover:text-pink-ruby hover:underline">${p.name}</a>
                      <span class="ml-2 text-[10.5px] text-text-light italic">(${p.type} &bull; ${p.status})</span>
                      <p class="text-[11px] text-text-light mt-0.5">${p.roleTitle || "No Active Role"} &bull; ${p.email}</p>
                    </div>
                    <a href="#/admin/people/${p.id}" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">360 View</a>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Projects Segment -->
          ${projectMatches.length > 0 ? `
            <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3 text-left">
              <h4 class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light pb-2 border-b border-stone-100">Campaign Projects (${projectMatches.length})</h4>
              <div class="divide-y divide-stone-100">
                ${projectMatches.map(proj => `
                  <div class="py-3 flex justify-between items-center text-[12.5px] font-sans">
                    <div>
                      <strong class="font-semibold text-text-dark">${proj.title}</strong>
                      <span class="ml-2 px-1.5 py-0.5 rounded text-[9.5px] border bg-emerald-50 text-emerald-800 border-emerald-100">${proj.status}</span>
                      <p class="text-[11.5px] text-text-light mt-0.5">${proj.description}</p>
                    </div>
                    <a href="#/admin/projects" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">Manage</a>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Certificates Segment -->
          ${certMatches.length > 0 ? `
            <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3 text-left">
              <h4 class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light pb-2 border-b border-stone-100">Certificates Queue (${certMatches.length})</h4>
              <div class="divide-y divide-stone-100">
                ${certMatches.map(c => `
                  <div class="py-3 flex justify-between items-center text-[12.5px] font-sans">
                    <div>
                      <strong class="text-text-dark">${c.id}</strong> - <span class="font-semibold text-text-dark">${c.recipientName}</span>
                      <span class="ml-2 px-1.5 py-0.5 rounded text-[9.5px] border bg-pink-blush text-pink-ruby border-pink-quartz/40">${c.status}</span>
                      <p class="text-[11px] text-text-light mt-0.5">${c.type} &bull; Date: ${c.issueDate || "Pending"}</p>
                    </div>
                    <a href="#/admin/certificates" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">Certificates</a>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Support Inquiries Segment -->
          ${inquiryMatches.length > 0 ? `
            <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3 text-left">
              <h4 class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light pb-2 border-b border-stone-100">Support Inquiries (${inquiryMatches.length})</h4>
              <div class="divide-y divide-stone-100">
                ${inquiryMatches.map(inq => `
                  <div class="py-3 flex justify-between items-center text-[12.5px] font-sans">
                    <div class="max-w-xl">
                      <strong class="text-text-dark">${inq.inquiryId}</strong>: <span class="font-semibold text-text-dark">${inq.subject}</span>
                      <span class="ml-2 text-[10px] text-pink-ruby font-bold">(${inq.status} &bull; SLA: ${inq.slaStatus})</span>
                      <p class="text-[11px] text-text-muted mt-0.5 italic">"${inq.message.substring(0, 100)}..."</p>
                    </div>
                    <a href="#/admin/inquiries" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">Tickets</a>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Donations Treasury Segment -->
          ${donationMatches.length > 0 ? `
            <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-3 text-left">
              <h4 class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light pb-2 border-b border-stone-100">Donations Treasury (${donationMatches.length})</h4>
              <div class="divide-y divide-stone-100">
                ${donationMatches.map(d => `
                  <div class="py-3 flex justify-between items-center text-[12.5px] font-sans">
                    <div>
                      <strong class="font-semibold text-text-dark">${d.donorName}</strong> - <span class="font-bold text-text-dark">INR ${d.amount.toLocaleString()}</span>
                      <span class="ml-2 text-[10px] text-emerald-700">(${d.status})</span>
                      <p class="text-[11px] text-text-light mt-0.5">Intent: ${d.intent} &bull; Method: ${d.method} &bull; Date: ${d.date}</p>
                    </div>
                    <a href="#/admin/donations" class="text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline font-interface">Treasury</a>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}

        </div>
      `;
    }

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div>
          <h2 class="font-display font-bold text-2xl text-text-dark">Global Operations Search</h2>
          <p class="text-[12.5px] text-text-light font-sans mt-0.5">Find people, projects, donations, certifications, and ticket records in one search.</p>
        </div>

        <!-- Search Bar -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm">
          <form id="global-search-form" class="flex gap-3">
            <div class="relative flex-1">
              <input type="text" id="global-search-input" value="${this.searchQuery}" placeholder="Search registry records... (e.g. Arjun, Project, don-1, Karan)" class="w-full pl-10 pr-3 py-2 text-[13.5px] border border-stone-200 rounded focus:outline-none focus:border-pink-ruby font-sans" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-light absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button type="submit" class="px-5 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded font-interface font-bold text-[11px] uppercase tracking-wider transition-colors shrink-0">
              Query Search
            </button>
          </form>
        </div>

        <!-- Search Results -->
        <div id="global-search-results">
          ${resultsHTML}
        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    const form = document.getElementById('global-search-form');
    const input = document.getElementById('global-search-input');

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        window.location.hash = `#/admin/search?q=${encodeURIComponent(val)}`;
      });
    }
  }
}
