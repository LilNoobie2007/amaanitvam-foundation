export default class DonationMethods {
  render() {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left select-none scroll-reveal revealed" id="donation-workspace">
        
        <!-- Left Side: Configurator (col span 7) -->
        <div class="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h3 class="font-display font-semibold text-[22px] text-text-dark pb-3 border-b border-stone-100">
              Configure Donation Intent
            </h3>
            <p class="font-sans text-[13px] text-text-muted mt-2 font-light">
              Customize your giving targets. Our accounts system restricts funds to the chosen program.
            </p>
          </div>

          <form id="donation-intent-form" class="space-y-5 font-sans text-[13.5px]">
            
            <!-- Frequency Switch -->
            <div>
              <span class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2.5">Giving Rhythm</span>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-freq-onetime" class="flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-pink-ruby bg-pink-blush text-pink-ruby text-center transition-colors">
                  One-Time Support
                </button>
                <button type="button" id="btn-freq-monthly" class="flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-stone-200 bg-white text-text-light hover:bg-stone-50 text-center transition-colors">
                  Monthly Support
                </button>
              </div>
            </div>

            <!-- Intent Selector -->
            <div>
              <label for="don-intent" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Restricted Support Target *</label>
              <select id="don-intent" class="w-full px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                <option value="General Support">General Support (Area of Greatest Need)</option>
                <option value="Education Programs">Education Programs (Project Manthan & Shiksha)</option>
                <option value="Community Outreach">Community Outreach (Hygiene & Health Camps)</option>
                <option value="Events">Events & Regional Campaigns</option>
                <option value="Volunteer Initiatives">Volunteer Training & Registries</option>
              </select>
            </div>

            <!-- Amount Options -->
            <div class="space-y-2">
              <label class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light">Gift Amount (INR) *</label>
              <div class="grid grid-cols-4 gap-2">
                <button type="button" class="amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors" data-amt="1000">₹1,000</button>
                <button type="button" class="amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors" data-amt="2500">₹2,500</button>
                <button type="button" class="amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors" data-amt="5000">₹5,000</button>
                <button type="button" class="amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors" data-amt="10000">₹10,000</button>
              </div>
              <input type="number" id="don-custom-amount" placeholder="Or enter custom amount..." min="100" class="w-full px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <!-- Donor Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="don-name" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Full Name *</label>
                <input type="text" id="don-name" required placeholder="Dia Sen" class="w-full px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div>
                <label for="don-email" class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light mb-2">Email Address *</label>
                <input type="email" id="don-email" required placeholder="dia.sen@example.com" class="w-full px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>

            <div class="pt-3 border-t border-stone-150 flex items-center justify-between flex-wrap gap-4">
              <div class="text-[12px] text-text-light font-sans font-light">
                Need details before contribution? <a href="#/contact" class="text-pink-ruby hover:underline font-semibold font-interface">Contact Alliances Team →</a>
              </div>
              
              <button type="submit" class="font-interface font-bold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                Generate Guidelines
              </button>
            </div>
          </form>
        </div>

        <!-- Right Side: Details Summary (col span 5) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <span class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light text-left pl-1">
            Giving Channel Verification (UPI / Banking)
          </span>

          <div class="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col p-6 text-left justify-between min-h-[420px]" id="guidelines-card">
            <div class="space-y-5">
              <div>
                <span class="font-interface font-semibold text-[9.5px] uppercase tracking-wider text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz/65" id="sum-frequency">One-Time Support</span>
                <h4 class="font-display font-semibold text-[20px] text-text-dark mt-2" id="sum-intent">General Support</h4>
              </div>

              <!-- Impact visual text -->
              <blockquote class="border-l-3 border-pink-ruby bg-stone-50 p-3.5 text-[12.5px] font-sans text-text-muted leading-relaxed font-light rounded-r">
                "Contributions fund educational worksheets and local center logistics."
              </blockquote>

              <div class="space-y-4 pt-3 border-t border-stone-100">
                <div class="flex items-center justify-between text-[13.5px]">
                  <span class="text-text-light font-interface uppercase tracking-wider text-[10px] font-bold">Configured Amount</span>
                  <span class="font-bold text-text-dark text-lg" id="sum-amount">₹2,500 INR</span>
                </div>
              </div>
            </div>

            <!-- Payment instructions -->
            <div class="space-y-4 border-t border-stone-100 pt-5 mt-4">
              <span class="block font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light">Transfer Coordinates</span>

              <!-- Tabbed details -->
              <div class="space-y-3 font-sans text-[12.5px] text-text-muted">
                <!-- UPI -->
                <div class="bg-stone-50 border border-stone-200/80 rounded-lg p-3">
                  <span class="block text-[10px] uppercase font-interface text-text-light font-bold">UPI VPA Option</span>
                  <p class="text-text-dark font-semibold font-mono text-[13px] select-all mt-1">amaanitvamfoundation@hdfcbank</p>
                  <span class="text-[10px] text-text-light block mt-0.5 font-light">Scan code or pay using any UPI application.</span>
                </div>

                <!-- Bank transfer -->
                <div class="bg-stone-50 border border-stone-200/80 rounded-lg p-3 space-y-1">
                  <span class="block text-[10px] uppercase font-interface text-text-light font-bold">Bank NEFT/IMPS Coordinates</span>
                  <div class="text-[11.5px] leading-relaxed text-text-dark font-light">
                    Bank: <strong class="font-semibold text-text-dark">HDFC Bank Ltd</strong><br>
                    Account: <strong class="font-semibold text-text-dark select-all font-mono">50200085461942</strong><br>
                    IFSC: <strong class="font-semibold text-text-dark select-all font-mono">HDFC0000240</strong><br>
                    Branch: Mehrauli, Delhi
                  </div>
                </div>
              </div>
            </div>

            <div class="text-[10px] text-text-light font-sans font-light mt-4 pt-3 border-t border-stone-100 leading-normal">
              * Note: Please email bank confirmation transaction screens to accounts@amaanitvam.org to verify logs.
            </div>
          </div>
        </div>

      </div>
    `;
  }

  static init() {
    const form = document.getElementById('donation-intent-form');
    const freqOneTime = document.getElementById('btn-freq-onetime');
    const freqMonthly = document.getElementById('btn-freq-monthly');
    const intentSelect = document.getElementById('don-intent');
    const customAmount = document.getElementById('don-custom-amount');
    const presetBtns = document.querySelectorAll('.amt-preset-btn');

    // Summaries
    const sumFreq = document.getElementById('sum-frequency');
    const sumIntent = document.getElementById('sum-intent');
    const sumAmount = document.getElementById('sum-amount');
    const guidelinesCard = document.getElementById('guidelines-card');

    let selectedFrequency = "One-Time";
    let selectedAmount = 2500;

    const formatCurrency = (val) => {
      return `₹${Number(val).toLocaleString('en-IN')} INR`;
    };

    const updateSummary = () => {
      if (sumFreq) sumFreq.innerText = `${selectedFrequency} Support`;
      if (sumIntent && intentSelect) sumIntent.innerText = intentSelect.value;
      if (sumAmount) sumAmount.innerText = formatCurrency(selectedAmount);
    };

    if (freqOneTime && freqMonthly) {
      freqOneTime.addEventListener('click', () => {
        selectedFrequency = "One-Time";
        freqOneTime.className = "flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-pink-ruby bg-pink-blush text-pink-ruby text-center transition-colors";
        freqMonthly.className = "flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-stone-200 bg-white text-text-light hover:bg-stone-50 text-center transition-colors";
        updateSummary();
      });

      freqMonthly.addEventListener('click', () => {
        selectedFrequency = "Monthly";
        freqMonthly.className = "flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-pink-ruby bg-pink-blush text-pink-ruby text-center transition-colors";
        freqOneTime.className = "flex-grow font-interface font-bold text-[11px] uppercase tracking-wider py-2.5 rounded border border-stone-200 bg-white text-text-light hover:bg-stone-50 text-center transition-colors";
        updateSummary();
      });
    }

    if (intentSelect) {
      intentSelect.addEventListener('change', updateSummary);
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle selected styling
        presetBtns.forEach(b => {
          b.className = "amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors";
        });
        btn.className = "amt-preset-btn font-interface font-bold text-[12px] py-2 rounded border border-pink-ruby bg-pink-blush text-pink-ruby transition-colors";

        selectedAmount = parseInt(btn.dataset.amt);
        if (customAmount) customAmount.value = "";
        updateSummary();
      });
    });

    if (customAmount) {
      customAmount.addEventListener('input', (e) => {
        // Clear preset highlights
        presetBtns.forEach(b => {
          b.className = "amt-preset-btn font-interface font-semibold text-[12px] py-2 rounded border border-stone-200 bg-white text-text-dark hover:border-pink-ruby/65 transition-colors";
        });
        selectedAmount = parseInt(e.target.value) || 0;
        updateSummary();
      });
    }

    if (form && guidelinesCard) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('don-name').value;
        const email = document.getElementById('don-email').value;
        const intent = intentSelect.value;

        // Render mock transfer confirmation guidelines
        guidelinesCard.innerHTML = `
          <div class="text-center py-6 space-y-5">
            <div class="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold mx-auto">
              ✓
            </div>
            
            <div class="space-y-1">
              <h4 class="font-display font-semibold text-lg text-text-dark">Guidelines Generated</h4>
              <p class="font-sans text-[13px] text-text-muted leading-relaxed font-light max-w-xs mx-auto">
                Donor profile configured for <strong class="font-semibold text-text-dark">${name}</strong>. Transfer references are ready.
              </p>
            </div>

            <!-- Target metrics -->
            <div class="bg-stone-50 border border-stone-200 rounded-lg p-3 text-[11.5px] font-sans text-text-muted space-y-1">
              <div class="flex justify-between"><span>Gift Frequency</span><strong class="text-text-dark font-semibold">${selectedFrequency}</strong></div>
              <div class="flex justify-between"><span>Intent Area</span><strong class="text-text-dark font-semibold">${intent}</strong></div>
              <div class="flex justify-between pt-1 border-t border-stone-200"><span>Support Amount</span><strong class="text-pink-ruby font-bold">${formatCurrency(selectedAmount)}</strong></div>
            </div>

            <div class="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-[11px] leading-relaxed font-light text-left">
              ⚠️ <strong class="font-semibold text-amber-900">Next Step:</strong> Open your banking or UPI app, input the coordinates on the left, and complete the transfer of ${formatCurrency(selectedAmount)}.
            </div>

            <p class="text-[11px] text-text-light leading-normal max-w-xs mx-auto font-light">
              Email your transaction receipt screen to <strong class="text-text-dark font-medium font-interface select-all">accounts@amaanitvam.org</strong>. Accounts will update your record to "Acknowledged" within 24 hours.
            </p>

            <button onclick="window.location.reload()" class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-pink-ruby hover:underline block mx-auto">Configure Another Contribution</button>
          </div>
        `;
      });
    }

    // Default update
    updateSummary();
  }
}
