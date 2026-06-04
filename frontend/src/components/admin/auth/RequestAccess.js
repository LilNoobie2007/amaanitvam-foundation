export default class RequestAccess {
  render() {
    return `
      <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm max-w-sm mx-auto text-left space-y-6" id="request-access-box">
        <div>
          <h3 class="font-display font-semibold text-2xl text-text-dark">Request Console Access</h3>
          <p class="font-sans text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Submit your role coordinates. All requests are verified by the operations panel within 24 hours.
          </p>
        </div>

        <form id="admin-request-form" class="space-y-4 font-sans text-[13.5px]">
          <div class="flex flex-col">
            <label for="req-name" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Full Name *</label>
            <input type="text" id="req-name" required placeholder="Preeti Goyal" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-col">
            <label for="req-email" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Official Email *</label>
            <input type="email" id="req-email" required placeholder="preeti@amaanitvam.org" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-col">
            <label for="req-role" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Proposed Foundation Role *</label>
            <select id="req-role" required class="px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
              <option value="" disabled selected>Select Role Title</option>
              <option value="Volunteer Lead">Volunteer Lead Coordinator</option>
              <option value="Internship Coordinator">Internship Coordinator</option>
              <option value="Events Manager">Events Campaign Manager</option>
              <option value="Certificate Manager">Credentials Registry Officer</option>
              <option value="Super Admin">System Administrator</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="req-reason" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Justification for Access *</label>
            <textarea id="req-reason" required rows="3" placeholder="Explain your core operational duties..." class="px-3.5 py-2.5 rounded border border-stone-200 resize-none focus:outline-none focus:border-pink-ruby"></textarea>
          </div>

          <button type="submit" class="w-full font-interface font-bold text-[10px] uppercase tracking-widest py-3 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded shadow transition-colors mt-2">
            Submit Request
          </button>
        </form>

        <div class="pt-4 border-t border-stone-100 text-center text-[12px]">
          <a href="#/admin/login" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline">← Back to Login</a>
        </div>
      </div>
    `;
  }

  static init() {
    const form = document.getElementById('admin-request-form');
    const box = document.getElementById('request-access-box');

    if (form && box) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('req-name').value;
        const role = document.getElementById('req-role').value;

        box.innerHTML = `
          <div class="text-center py-6 space-y-4 font-sans">
            <div class="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              ✓
            </div>
            <h4 class="font-display font-semibold text-lg text-text-dark">Request Submitted</h4>
            <p class="text-[13.5px] text-text-muted leading-relaxed font-light">
              Thank you, <strong class="font-semibold text-text-dark">${name}</strong>. Your request for <strong class="font-semibold text-text-dark">${role}</strong> rights has been logged in the audit queue.
            </p>
            <p class="text-[11px] text-text-light font-light leading-normal">
              Systems admins will review matching LDAP directories and authorize credentials shortly.
            </p>
            <a href="#/admin/login" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline block pt-2">Return to Login</a>
          </div>
        `;
      });
    }
  }
}
