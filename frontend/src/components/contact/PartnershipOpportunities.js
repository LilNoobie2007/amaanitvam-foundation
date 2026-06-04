import { partnerships } from '../../mocks/partnerships.js';

export default class PartnershipOpportunities {
  render() {
    const cardsHTML = partnerships.map(p => `
      <div class="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3 hover:border-pink-ruby/60 transition-all text-left flex flex-col justify-between min-h-[220px]">
        <div class="space-y-2">
          <span class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz/65">
            ${p.audience}
          </span>
          <h4 class="font-display font-semibold text-[17px] text-text-dark">${p.title}</h4>
          <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light">${p.description}</p>
        </div>
        <div class="pt-3 border-t border-stone-100/60 font-sans text-[11px] text-text-light">
          <strong class="font-medium text-text-dark block mb-0.5">Focus Value:</strong>
          ${p.value}
        </div>
      </div>
    `).join('');

    return `
      <section id="partnership-section" class="py-16 bg-stone-50 border-t border-b border-stone-200/50 select-none">
        <div class="max-w-5xl mx-auto px-6 space-y-12">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Collaborations</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Partner With Us</h2>
            <p class="font-sans text-[14.5px] text-text-muted font-light mt-3 max-w-xl">
              We collaborate with colleges, corporates, and communities to integrate structured educational frameworks and auditable resource pathways.
            </p>
          </div>

          <!-- Opportunities Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${cardsHTML}
          </div>

          <!-- Partnership Intake Form -->
          <div class="bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto text-left space-y-6 mt-8" id="part-form-box">
            <div>
              <h3 class="font-display font-semibold text-xl text-text-dark">Partnership Interest Intake</h3>
              <p class="font-sans text-[13px] text-text-muted font-light mt-1">
                Enter your organization metrics. An alliances coordinator will review goals and sync coordinates within 5 business days.
              </p>
            </div>

            <form id="partnership-intake-form" class="space-y-4 font-sans text-[13.5px]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <label for="part-org-name" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Organization Name *</label>
                  <input type="text" id="part-org-name" required placeholder="e.g. N.S.U.T. College Chapter" class="px-3.5 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
                </div>

                <div class="flex flex-col">
                  <label for="part-org-type" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Organization Type *</label>
                  <select id="part-org-type" required class="px-3 py-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                    <option value="" disabled selected>Select Sector Type</option>
                    <option value="Educational">Educational Institution</option>
                    <option value="Corporate">Corporate / CSR Committee</option>
                    <option value="NGO">Registered NGO / Trust</option>
                    <option value="Community">Community Group / RWA</option>
                    <option value="Sponsor">Private Philanthropy</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <label for="part-rep" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Authorized Representative *</label>
                  <input type="text" id="part-rep" required placeholder="Dr. Aarav Roy" class="px-3.5 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
                </div>

                <div class="flex flex-col">
                  <label for="part-email" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Official Contact Email *</label>
                  <input type="email" id="part-email" required placeholder="alliances@org.com" class="px-3.5 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
                </div>
              </div>

              <div class="flex flex-col">
                <label for="part-goal" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Collaboration Goal *</label>
                <input type="text" id="part-goal" required placeholder="e.g. Conduct clean energy awareness drive, sponsor learning devices..." class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div class="flex flex-col">
                <label for="part-msg" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Proposal Details *</label>
                <textarea id="part-msg" required rows="3" placeholder="Outline specific timelines, student count, or financial restricted guidelines..." class="px-3.5 py-2.5 rounded border border-stone-200 resize-none focus:outline-none focus:border-pink-ruby"></textarea>
              </div>

              <button type="submit" class="w-full font-interface font-semibold text-xs uppercase tracking-widest py-3 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded shadow transition-colors mt-2">
                Start Partnership Discussion
              </button>
            </form>
          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const form = document.getElementById('partnership-intake-form');
    const formBox = document.getElementById('part-form-box');

    if (form && formBox) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const orgName = document.getElementById('part-org-name').value;
        const repName = document.getElementById('part-rep').value;

        // Render success verification box
        formBox.innerHTML = `
          <div class="text-center py-6 space-y-4">
            <div class="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              ✓
            </div>
            <h4 class="font-display font-semibold text-lg text-text-dark">Proposal Acknowledged</h4>
            <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light max-w-md mx-auto">
              Thank you, <strong class="font-semibold text-text-dark">${repName}</strong>. The partnership interest profile for <strong class="font-semibold text-text-dark">${orgName}</strong> has been logged in our partnerships pipeline registry.
            </p>
            <div class="text-[11px] text-text-light font-sans font-light">
              Our regional coordinator will conduct a background check and respond within 5 business days.
            </div>
            <button onclick="window.location.reload()" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-pink-ruby hover:underline">Submit Another Interest Form</button>
          </div>
        `;
      });
    }
  }
}
