export default class ForgotPassword {
  render() {
    return `
      <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm max-w-sm mx-auto text-left space-y-6" id="forgot-pass-box">
        <div>
          <h3 class="font-display font-semibold text-2xl text-text-dark">Recover Credentials</h3>
          <p class="font-sans text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Enter your official email coordinates to transmit reset security tokens.
          </p>
        </div>

        <form id="admin-forgot-form" class="space-y-4 font-sans text-[13.5px]">
          <div class="flex flex-col">
            <label for="forgot-email" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Official Email *</label>
            <input type="email" id="forgot-email" required placeholder="coordinator@amaanitvam.org" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <button type="submit" class="w-full font-interface font-bold text-[10px] uppercase tracking-widest py-3 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded shadow transition-colors mt-2">
            Send Reset Token
          </button>
        </form>

        <div class="pt-4 border-t border-stone-100 text-center text-[12px]">
          <a href="#/admin/login" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline">← Back to Login</a>
        </div>
      </div>
    `;
  }

  static init() {
    const form = document.getElementById('admin-forgot-form');
    const box = document.getElementById('forgot-pass-box');

    if (form && box) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;

        box.innerHTML = `
          <div class="text-center py-6 space-y-4 font-sans">
            <div class="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              ✓
            </div>
            <h4 class="font-display font-semibold text-lg text-text-dark">Recovery Sent</h4>
            <p class="text-[13.5px] text-text-muted leading-relaxed font-light">
              We have dispatched security verification instructions to <strong class="font-semibold text-text-dark">${email}</strong>.
            </p>
            <a href="#/admin/reset-password" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline block pt-2">Proceed to Reset Password →</a>
          </div>
        `;
      });
    }
  }
}
