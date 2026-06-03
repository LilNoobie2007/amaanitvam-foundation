export default class OpportunityManager {
  render() {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none text-left scroll-reveal revealed">
        
        <!-- Form Setup (col span 7) -->
        <div class="lg:col-span-7 bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm">
          <h3 class="font-display font-semibold text-[20px] text-text-dark pb-4 border-b border-stone-150 mb-6">
            Configure Internship Opening
          </h3>

          <form id="create-opp-form" class="space-y-5">
            <div>
              <label for="opp-title" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Role Title *</label>
              <input type="text" id="opp-title" required placeholder="e.g. Web Development Intern" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="opp-domain" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Internship Domain *</label>
                <select id="opp-domain" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Operations">Operations & HR</option>
                </select>
              </div>

              <div>
                <label for="opp-cohort" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Cohort Term Cycle *</label>
                <select id="opp-cohort" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Summer 2026">Summer 2026 Cohort</option>
                  <option value="Autumn 2026">Autumn 2026 Cohort</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="opp-seats" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Total Seats *</label>
                <input type="number" id="opp-seats" required value="5" min="1" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div>
                <label for="opp-mode" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Mode *</label>
                <select id="opp-mode" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label for="opp-status" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Recruitment Status *</label>
                <select id="opp-status" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="opp-duration" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Duration *</label>
                <input type="text" id="opp-duration" required placeholder="e.g. 3 Months" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none">
              </div>

              <div>
                <label for="opp-deadline" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Deadline Date *</label>
                <input type="date" id="opp-deadline" required class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none">
              </div>
            </div>

            <div>
              <label for="opp-description" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Role Description *</label>
              <textarea id="opp-description" required rows="3" placeholder="Outline specific scopes and responsibilities..." class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 resize-none"></textarea>
            </div>

            <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
              <a href="#/admin/internships" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
                Cancel
              </a>
              <button type="submit" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                Publish Opening
              </button>
            </div>
          </form>
        </div>

        <!-- Live Preview Panel (col span 5) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light text-left pl-1">
            Live Opportunity Preview (Active Grid Representation)
          </span>

          <div class="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[380px] p-6 justify-between">
            <div class="text-left">
              <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider mb-3">
                <span id="pre-opp-cohort" class="bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded border border-stone-200/60">Summer 2026</span>
                <span id="pre-opp-mode" class="font-semibold text-pink-ruby">Remote</span>
              </div>
              
              <h3 id="pre-opp-title" class="font-display font-semibold text-[20px] text-text-dark leading-snug mb-3">
                Web Development Intern
              </h3>
              
              <p id="pre-opp-desc" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light line-clamp-4">
                Configure coordinates on the left to see this card preview update in real-time.
              </p>
            </div>

            <div class="space-y-4 pt-4 border-t border-stone-100 text-left">
              <div class="flex items-center justify-between text-[13px] font-interface">
                <span class="text-text-light uppercase tracking-wider">Seats Capacity</span>
                <span class="font-bold text-text-dark"><span id="pre-opp-seats">5</span> total <span class="text-xs font-normal text-text-light">(Available)</span></span>
              </div>

              <div class="flex items-center justify-between text-[12px] font-sans text-text-muted">
                <span>Deadline: <strong id="pre-opp-deadline">YYYY-MM-DD</strong></span>
                <span>Duration: <strong id="pre-opp-duration">3 Months</strong></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  static init() {
    const form = document.getElementById('create-opp-form');
    
    // Inputs
    const title = document.getElementById('opp-title');
    const domain = document.getElementById('opp-domain');
    const cohort = document.getElementById('opp-cohort');
    const seats = document.getElementById('opp-seats');
    const mode = document.getElementById('opp-mode');
    const status = document.getElementById('opp-status');
    const duration = document.getElementById('opp-duration');
    const deadline = document.getElementById('opp-deadline');
    const desc = document.getElementById('opp-description');

    // Previews
    const preCohort = document.getElementById('pre-opp-cohort');
    const preMode = document.getElementById('pre-opp-mode');
    const preTitle = document.getElementById('pre-opp-title');
    const preDesc = document.getElementById('pre-opp-desc');
    const preSeats = document.getElementById('pre-opp-seats');
    const preDeadline = document.getElementById('pre-opp-deadline');
    const preDuration = document.getElementById('pre-opp-duration');

    const update = () => {
      if (preTitle) preTitle.innerText = title.value || "Web Development Intern";
      if (preCohort) preCohort.innerText = cohort.value;
      if (preMode) preMode.innerText = mode.value;
      if (preDesc) preDesc.innerText = desc.value || "Configure coordinates on the left to see this card preview update in real-time.";
      if (preSeats) preSeats.innerText = seats.value || "5";
      if (preDeadline) preDeadline.innerText = deadline.value || "YYYY-MM-DD";
      if (preDuration) preDuration.innerText = duration.value || "3 Months";
    };

    const elements = [title, domain, cohort, seats, mode, status, duration, deadline, desc];
    elements.forEach(el => {
      if (el) el.addEventListener('input', update);
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification: Internship Opportunity successfully saved as Draft in mock database.');
        window.location.hash = '#/admin/internships';
      });
    }
  }
}
