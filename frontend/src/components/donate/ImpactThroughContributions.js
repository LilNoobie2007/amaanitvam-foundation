export default class ImpactThroughContributions {
  render() {
    const stats = [
      { count: "60+", label: "Children Supported", sub: "Through primary education centers" },
      { count: "45+", label: "Children Benefiting", sub: "From targeted learning toolkits" },
      { count: "23+", label: "Young Lives Reached", sub: "Through outreach campaigns" },
      { count: "30+", label: "Provided Clothing", sub: "Supporting physical dignity & care" },
      { count: "25+", label: "Students Engaged", sub: "In community awareness drives" }
    ];

    const gridHTML = stats.map(s => `
      <div class="border-l border-stone-200 pl-6 py-2 hover:border-pink-ruby transition-colors text-left">
        <span class="font-display font-bold text-4xl text-text-dark block">${s.count}</span>
        <h4 class="font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mt-2">${s.label}</h4>
        <p class="font-sans text-[12.5px] text-text-muted mt-1 font-light leading-normal">${s.sub}</p>
      </div>
    `).join('');

    return `
      <section class="py-16 bg-white select-none">
        <div class="max-w-5xl mx-auto px-6 space-y-10">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Audited Evidence</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Verified Ground Statistics</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            ${gridHTML}
          </div>

        </div>
      </section>
    `;
  }
}
