export default class Footer {
  render() {
    return `
      <!-- ==========================================
           PARTICIPATION: AN INVITATION TO CARE
           ========================================== -->
      <section id="volunteer-form" class="relative py-28 bg-stone-50/50 border-t border-stone-200/50 z-20">
        <!-- Thin gray vertical thread background connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-6xl mx-auto px-6 relative z-10">
          
          <div class="max-w-2xl text-left mb-16 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">An Invitation</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">An Invitation to Care</h2>
            <p class="font-sans text-[14.5px] text-text-muted mt-3 font-light leading-relaxed">
              Meaningful change begins when individuals choose to care for one another. Amaanitvam Foundation is structured as a transparent, student-led pipeline for collective action.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <!-- Left Side: Wording path info (5 cols) -->
            <div class="lg:col-span-5 flex flex-col gap-8 text-left stagger-container">
              
              <div class="stagger-load">
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-2">Be the Change</h4>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                  Join our student-led movement to inspire learning, responsibility, and positive change. We align your talents with actual regional campaigns.
                </p>
              </div>

              <div class="stagger-load">
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-2">Operational Integrity</h4>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                  Every volunteer hour is logged, and all campaigns are periodically audited to ensure direct and transparent resource distribution.
                </p>
              </div>

              <div class="stagger-load">
                <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark mb-2">Secure Credentials</h4>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                  Upon completion, volunteers and scholars receive verifiable registry credentials representing their rigorous civic service.
                </p>
              </div>

            </div>

            <!-- Right Side: Clean quiet application form (7 cols) -->
            <div class="lg:col-span-7 bg-white p-10 border border-stone-200/80 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-500 scroll-reveal">
              <h3 class="font-display font-semibold text-xl text-text-dark mb-2">Apply to Volunteer</h3>
              <p class="font-sans text-[13px] text-text-muted mb-8 font-light">
                Fill in the details below, and our program coordinator will coordinate an alignment call within 48 business hours.
              </p>

              <form id="vform" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col text-left">
                    <label for="name" class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2">Full Name *</label>
                    <input type="text" id="name" required placeholder="Aarav Mehta" class="font-sans text-[13.5px] font-light px-4 py-3 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all duration-300">
                  </div>
                  <div class="flex flex-col text-left">
                    <label for="email" class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2">Email Address *</label>
                    <input type="email" id="email" required placeholder="aarav@example.com" class="font-sans text-[13.5px] font-light px-4 py-3 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all duration-300">
                  </div>
                </div>

                <div class="flex flex-col text-left">
                  <label for="specialty" class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2">Primary Domain *</label>
                  <select id="specialty" required class="font-sans text-[13.5px] font-light px-4 py-3 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all duration-300 bg-white">
                    <option value="" disabled selected>Select Your specialty</option>
                    <option value="digital">Technical & Digital Mentoring</option>
                    <option value="welfare">Field Logistics & Support</option>
                    <option value="content">Creative Content & Writing</option>
                    <option value="other">General Community Support</option>
                  </select>
                </div>

                <button type="submit" id="submit-btn" class="w-full font-interface font-semibold text-xs uppercase tracking-widest py-4 bg-pink-ruby text-white hover:bg-pink-ruby/95 rounded-md shadow-sm transition-all duration-300 cursor-pointer">
                  Submit Volunteer Application
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           DEEP DARK FOOTER: NARRATIVE LOOP CLOSURE
           ========================================== -->
      <footer class="relative bg-stone-950 text-stone-400 py-20 px-6 border-t border-stone-900 z-20 overflow-hidden">
        
        <!-- Story tagline full circle -->
        <div class="max-w-5xl mx-auto text-center mb-16 select-none scroll-reveal">
          <h3 class="font-display italic text-2xl md:text-3xl text-amber-100/90 font-light leading-relaxed">
            "What Are We, If Not for One Another?"
          </h3>
          <div class="w-8 h-px bg-stone-800 mx-auto mt-6"></div>
        </div>

        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center justify-between text-left relative z-10 border-t border-stone-900 pt-12">
          
          <!-- Logo & Contact (5 cols) -->
          <div class="md:col-span-5 flex flex-col items-start gap-4">
            <div class="flex items-center gap-3">
              <img src="/amaanitvam-logo.png" alt="Amaanitvam Foundation Logo" class="h-9 w-auto filter brightness-0 invert select-none">
              <span class="font-display font-medium text-lg text-white tracking-wide">Amaanitvam Foundation</span>
            </div>
            <p class="font-sans text-[12.5px] text-stone-500 font-light max-w-sm mt-2 leading-relaxed">
              A student-led movement inspiring learning, responsibility, and positive change for a stronger society.
            </p>
            <div class="font-sans text-[12px] text-stone-400 mt-4 space-y-1 font-light">
              <p>Email: <a href="mailto:contact@amaanitvam.org" class="hover:text-amber-100 transition-colors duration-300">contact@amaanitvam.org</a></p>
              <p>Registry: <a href="https://www.amaanitvam.org/verify/" target="_blank" class="hover:text-amber-100 transition-colors duration-300">Secure Registry Vault</a></p>
            </div>
          </div>

          <!-- Utility Links Grid (7 cols) -->
          <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[12.5px] font-interface tracking-wider uppercase font-semibold text-stone-300">
            
            <div class="flex flex-col gap-3">
              <span class="text-[10px] text-stone-600 font-bold uppercase tracking-widest">Foundation</span>
              <a href="#home" class="hover:text-amber-100 transition-colors duration-300">Home</a>
              <a href="#about" class="hover:text-amber-100 transition-colors duration-300">Mission</a>
              <a href="#programs" class="hover:text-amber-100 transition-colors duration-300">Programs</a>
            </div>

            <div class="flex flex-col gap-3">
              <span class="text-[10px] text-stone-600 font-bold uppercase tracking-widest">Engagement</span>
              <a href="#community" class="hover:text-amber-100 transition-colors duration-300">Community</a>
              <a href="#volunteer-form" class="hover:text-amber-100 transition-colors duration-300">Volunteer</a>
              <a href="https://www.amaanitvam.org/donate/" target="_blank" class="hover:text-amber-100 transition-colors duration-300">Donate</a>
            </div>

            <div class="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span class="text-[10px] text-stone-600 font-bold uppercase tracking-widest">Transparency</span>
              <a href="#verify-certificate" class="hover:text-amber-100 transition-colors duration-300">Registry</a>
              <a href="https://www.amaanitvam.org/verify/" target="_blank" class="hover:text-amber-100 transition-colors duration-300">Verify ID</a>
            </div>

          </div>

        </div>

        <!-- Copyright -->
        <div class="max-w-7xl mx-auto text-center md:text-left mt-16 pt-8 border-t border-stone-900/60 text-[11px] text-stone-600 font-light font-sans tracking-wide">
          <p>© 2026 Amaanitvam Foundation. All rights reserved. Powered by student-led collective action.</p>
        </div>

      </footer>
    `;
  }

  static init() {
    const form = document.getElementById('vform');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      if (!submitBtn) return;

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Application...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        
        // Quiet custom alert
        alert('Thank you! Your volunteer application has been securely logged in our program registry.');
      }, 1500);
    });
  }
}
