import { contactCategories } from '../../mocks/contactCategories.js';
import { inquiries } from '../../mocks/inquiries.js';

export default class ContactForm {
  render() {
    const categoryOptionsHTML = contactCategories.map(cat => `
      <option value="${cat.name}" data-sla="${cat.slaDays}" data-dept="${cat.routingDept}">
        ${cat.name}
      </option>
    `).join('');

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-6 md:p-8 shadow-sm space-y-6 text-left" id="form-container">
        
        <!-- Form Info -->
        <div>
          <h3 class="font-display font-semibold text-2xl text-text-dark mb-1.5">Submit Support Ticket</h3>
          <p class="font-sans text-[13px] text-text-muted font-light leading-relaxed">
            Fill out the details below. Our ticketing manager will route your query to the appropriate operational unit.
          </p>
        </div>

        <form id="contact-ticket-form" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="ticket-name" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Your Name *</label>
              <input type="text" id="ticket-name" required placeholder="Aarav Sharma" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <div>
              <label for="ticket-email" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Email Address *</label>
              <input type="email" id="ticket-email" required placeholder="aarav.sharma@example.com" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="ticket-phone" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Phone Number *</label>
              <input type="tel" id="ticket-phone" required placeholder="+91 98765 43210" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <div>
              <label for="ticket-category" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Inquiry Category *</label>
              <select id="ticket-category" required class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                <option value="" disabled selected>Choose Topic Category</option>
                ${categoryOptionsHTML}
              </select>
            </div>
          </div>

          <!-- Dynamic Response SLA Banner -->
          <div id="sla-alert-banner" class="hidden bg-stone-50 border border-stone-200/80 rounded-lg p-3.5 space-y-1">
            <span class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light">Operational Dispatch Specifications</span>
            <div class="flex flex-col sm:flex-row sm:justify-between text-[12.5px] font-sans">
              <span class="text-text-muted">Routing Desk: <strong id="sla-routing-dept" class="text-text-dark font-semibold">General Support</strong></span>
              <span class="text-text-muted mt-1 sm:mt-0">Expected Response SLA: <strong id="sla-days" class="text-pink-ruby font-semibold">2 Business Days</strong></span>
            </div>
          </div>

          <div>
            <label for="ticket-subject" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Subject Header *</label>
            <input type="text" id="ticket-subject" required placeholder="Summarize your request in a short headline..." class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <div>
            <label for="ticket-message" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Detailed Message *</label>
            <textarea id="ticket-message" required rows="4" placeholder="Detail your query, request or proposal guidelines here..." class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 resize-none"></textarea>
          </div>

          <div class="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-4">
            <div class="text-[12px] text-text-light font-sans font-light">
              Need assistance with donations? <a href="#/donate" class="text-pink-ruby hover:underline font-semibold font-interface">Contact Accounts Support →</a>
            </div>
            
            <button type="submit" class="font-interface font-bold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    `;
  }

  static init() {
    const form = document.getElementById('contact-ticket-form');
    const categorySelect = document.getElementById('ticket-category');
    const slaAlert = document.getElementById('sla-alert-banner');
    const slaDept = document.getElementById('sla-routing-dept');
    const slaDays = document.getElementById('sla-days');
    const formContainer = document.getElementById('form-container');

    // Dynamic SLA check when category changes
    if (categorySelect && slaAlert && slaDept && slaDays) {
      categorySelect.addEventListener('change', () => {
        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const dept = selectedOption.dataset.dept;
        const days = selectedOption.dataset.sla;

        if (dept && days) {
          slaAlert.classList.remove('hidden');
          slaDept.innerText = dept;
          slaDays.innerText = `${days} Business Day${days > 1 ? 's' : ''}`;
        } else {
          slaAlert.classList.add('hidden');
        }
      });
    }

    if (form && formContainer) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Inputs
        const name = document.getElementById('ticket-name').value;
        const email = document.getElementById('ticket-email').value;
        const phone = document.getElementById('ticket-phone').value;
        const category = categorySelect.value;
        const subject = document.getElementById('ticket-subject').value;
        const message = document.getElementById('ticket-message').value;

        // Generate dynamic ticket ID
        const index = inquiries.length + 1;
        const newTicketId = `AMT-INQ-2026-${String(index).padStart(3, '0')}`;

        // Save into mock DB array in-memory
        const newInquiry = {
          id: `inq-${index}`,
          inquiryId: newTicketId,
          name,
          email,
          phone,
          category,
          subject,
          message,
          submittedDate: new Date().toISOString().split('T')[0],
          status: "New"
        };
        inquiries.push(newInquiry);

        // Transition form area into a secure receipt status card
        formContainer.innerHTML = `
          <div class="text-center py-8 space-y-6">
            <!-- Checkmark visual metaphor -->
            <div class="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-3xl font-bold mx-auto select-none">
              ✓
            </div>
            
            <div class="space-y-2">
              <h3 class="font-display font-semibold text-2xl text-text-dark">Support Ticket Logged</h3>
              <p class="font-sans text-[13.5px] text-text-muted font-light leading-relaxed max-w-md mx-auto">
                Thank you, <strong class="font-semibold text-text-dark">${name}</strong>. Your inquiry has been logged successfully and routed to the appropriate department.
              </p>
            </div>

            <!-- Reference Ticket Panel -->
            <div class="max-w-xs mx-auto bg-stone-50 border border-stone-200/80 rounded-xl p-4.5 space-y-3 shadow-sm">
              <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider">
                <span>Support Reference</span>
                <span class="text-pink-ruby font-semibold">Active Dispatch</span>
              </div>
              
              <div class="font-interface text-xl text-text-dark font-bold tracking-widest text-center select-all bg-white border border-stone-200 py-2 rounded">
                ${newTicketId}
              </div>

              <div class="text-[11px] font-sans text-text-light text-left leading-normal">
                Category: <strong class="font-semibold text-text-dark">${category}</strong><br>
                Expect responses at <strong class="font-semibold text-text-dark">${email}</strong> inside the expected SLA time limit.
              </div>
            </div>

            <div class="pt-4 border-t border-stone-100 max-w-sm mx-auto flex items-center justify-center gap-4 text-[12px] font-interface">
              <button onclick="window.location.reload()" class="font-bold text-pink-ruby hover:underline">Log Another Request</button>
              <span class="text-stone-300">|</span>
              <a href="#/" class="font-bold text-text-light hover:text-text-dark hover:underline">Return Home</a>
            </div>
          </div>
        `;
      });
    }
  }
}
