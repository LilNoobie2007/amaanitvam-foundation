export default class ContactInformation {
  render() {
    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-6 text-left">
        <div>
          <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-2 border-b border-stone-100 mb-4">
            Official Registry Coordinates
          </h4>
          
          <div class="space-y-4 font-sans text-[13.5px] text-text-muted">
            <div class="space-y-1">
              <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Foundation Head Office</span>
              <p class="text-text-dark font-light leading-relaxed">
                H. No 269 W.NO2, Gadaipur, Mehrauli,<br>
                South Delhi - 110030, Delhi, India
              </p>
            </div>

            <div class="space-y-1">
              <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Operational Hours</span>
              <p class="text-text-dark font-light leading-relaxed">
                Monday to Saturday: <strong class="font-semibold">9:30 AM – 6:00 PM IST</strong><br>
                Sunday: Closed
              </p>
            </div>

            <div class="space-y-1">
              <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Contact Coordinates</span>
              <p class="text-text-dark font-light leading-relaxed">
                Phone: <strong class="font-semibold">+91 98999 23266</strong><br>
                Email: <a href="mailto:amaanitvamfoundation@gmail.com" class="text-pink-ruby hover:underline">amaanitvamfoundation@gmail.com</a>
              </p>
            </div>

            <div class="space-y-1">
              <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Government Accreditations</span>
              <p class="text-text-dark font-light leading-relaxed">
                NGO Darpan Unique ID: <strong class="font-semibold select-all text-xs font-mono">DL/2025/0817469</strong>
              </p>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-100 text-left">
          <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold mb-3">Connect Globally</span>
          <div class="flex gap-4 font-interface text-[12px] font-bold text-pink-ruby">
            <a href="#" class="hover:underline">LinkedIn ↗</a>
            <a href="#" class="hover:underline">Instagram ↗</a>
            <a href="#" class="hover:underline">GitHub ↗</a>
          </div>
        </div>
      </div>
    `;
  }
}
