export default class WhyTrustAmaanitvam {
  render() {
    const pillars = [
      {
        title: "Student-Led Initiative",
        desc: "Governed entirely by active college chapters and student leaders. Administrative overhead is capped at 0%, meaning 100% of donor funds reach programs."
      },
      {
        title: "Community Driven",
        desc: "All activities are based on regional surveys conducted under Project Pravah. We only build centers and distribute assets where direct local need is verified."
      },
      {
        title: "Transparent Operations",
        desc: "Every volunteer hour, internship project deliverable, and campaign outcome is cataloged on our public blockchain-style verification registry."
      },
      {
        title: "Impact Focused",
        desc: "We publish comprehensive event reports and outcomes dashboard updates. Contributors receive regular progress narratives showing the direct path of their support."
      }
    ];

    const columnsHTML = pillars.map(p => `
      <div class="space-y-2 text-left">
        <div class="flex items-center gap-2.5">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          <h4 class="font-interface font-bold text-[14.5px] text-text-dark">${p.title}</h4>
        </div>
        <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light pl-4.5">${p.desc}</p>
      </div>
    `).join('');

    return `
      <section class="py-16 bg-white select-none">
        <div class="max-w-5xl mx-auto px-6 space-y-10">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Trust & Governance</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Why Trust Amaanitvam</h2>
            <p class="font-sans text-[14.5px] text-text-muted font-light mt-3 max-w-xl">
              We build trust through operational compliance, structured timelines, and transparent metrics dashboards.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            ${columnsHTML}
          </div>

        </div>
      </section>
    `;
  }
}
