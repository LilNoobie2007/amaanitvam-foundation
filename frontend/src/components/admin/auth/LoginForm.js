export default class LoginForm {
  render() {
    return `
      <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm max-w-sm mx-auto text-left space-y-6">
        <div>
          <h3 class="font-display font-semibold text-2xl text-text-dark">Admin Console Login</h3>
          <p class="font-sans text-[13px] text-text-muted font-light mt-1.5 leading-relaxed">
            Enter administrative credentials to log in to the operations center.
          </p>
        </div>

        <form id="admin-login-form" class="space-y-4 font-sans text-[13.5px]">
          <div class="flex flex-col">
            <label for="admin-email" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-1.5">Official Email *</label>
            <input type="email" id="admin-email" required placeholder="coordinator@amaanitvam.org" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <div class="flex flex-col">
            <div class="flex justify-between items-center mb-1.5">
              <label for="admin-password" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light">Password *</label>
              <a href="#/admin/forgot-password" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-pink-ruby hover:underline">Forgot?</a>
            </div>
            <input type="password" id="admin-password" required placeholder="••••••••" class="px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
          </div>

          <button type="submit" class="w-full font-interface font-bold text-[10px] uppercase tracking-widest py-3 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded shadow transition-colors mt-2">
            Login to Console
          </button>
        </form>

        <div class="pt-4 border-t border-stone-100 text-center text-[12px]">
          <span class="text-text-light">Need access credentials?</span> 
          <a href="#/admin/request-access" class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby hover:underline ml-1">Request Access →</a>
        </div>
      </div>
    `;
  }

  static init() {
    const form = document.getElementById('admin-login-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification: Access verified. Redirecting to Operations Dashboard...');
        window.location.hash = '#/admin';
      });
    }
  }
}
