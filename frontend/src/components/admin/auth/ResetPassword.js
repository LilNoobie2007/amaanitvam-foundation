export default class ResetPassword {
  render() {
    return `
      <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm max-w-sm mx-auto text-left space-y-6" id="reset-pass-box">
        <div>
          <h3 class="font-display font-semibold text-2xl text-text-dark">Create New Password</h3>
          <p class="font-sans text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Configure your new administrative security password.
          </p>
        </div>

        <form id="admin-reset-form" class="space-y-4 font-sans text-[13.5px]">
          <div class="flex flex-col">
            <label for="reset-pass" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">New Password *</label>
            <input type="password" id="reset-pass" required placeholder="••••••••" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-col">
            <label for="reset-pass-confirm" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Confirm Password *</label>
            <input type="password" id="reset-pass-confirm" required placeholder="••••••••" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <button type="submit" class="w-full font-interface font-bold text-[10px] uppercase tracking-widest py-3 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded shadow transition-colors mt-2">
            Update Password
          </button>
        </form>

        <div class="pt-4 border-t border-stone-100 text-center text-[12px]">
          <a href="#/admin/login" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline">← Cancel & Back to Login</a>
        </div>
      </div>
    `;
  }

  static init() {
    const form = document.getElementById('admin-reset-form');
    const box = document.getElementById('reset-pass-box');

    if (form && box) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const p1 = document.getElementById('reset-pass').value;
        const p2 = document.getElementById('reset-pass-confirm').value;

        if (p1 !== p2) {
          alert('Passwords do not match. Please verify.');
          return;
        }

        box.innerHTML = `
          <div class="text-center py-6 space-y-4 font-sans">
            <div class="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              ✓
            </div>
            <h4 class="font-display font-semibold text-lg text-text-dark">Password Updated</h4>
            <p class="text-[13.5px] text-text-muted leading-relaxed font-light">
              Your security password credentials have been successfully updated.
            </p>
            <a href="#/admin/login" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline block pt-2">Login to Console</a>
          </div>
        `;
      });
    }
  }
}
