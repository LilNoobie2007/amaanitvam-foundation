export default class GetInvolvedHub {
  render() {
    const paths = [
      {
        title: "Volunteer",
        desc: "Dedicate your time and skills to support field education or platform engineering.",
        cta: "Join Roster",
        link: "#/volunteer",
        color: "border-pink-medium bg-pink-blush/30 hover:border-pink-ruby"
      },
      {
        title: "Apply for Internships",
        desc: "Join a structured cohort and acquire real-world project skills with active mentorship.",
        cta: "Explore Roles",
        link: "#/internships",
        color: "border-stone-200/80 bg-white hover:border-pink-ruby"
      },
      {
        title: "Attend Campaigns",
        desc: "Participate in local center awareness drives, education summits, or hygiene audits.",
        cta: "Browse Events",
        link: "#/events",
        color: "border-gold-light bg-gold-light/20 hover:border-gold-ochre"
      },
      {
        title: "Partner With Us",
        desc: "Connect corporate sponsorship or educational institutions to verify CSR impact.",
        cta: "Initiate Discussion",
        link: "#partnership-section",
        color: "border-stone-200/80 bg-white hover:border-pink-ruby"
      },
      {
        title: "Support Financially",
        desc: "Directly fund learning kits, hygiene materials, or digital classroom infrastructure.",
        cta: "Donate Support",
        link: "#/donate",
        color: "border-pink-medium bg-pink-blush/40 hover:border-pink-ruby"
      }
    ];

    const cardsHTML = paths.map(p => `
      <a href="${p.link}" class="border rounded-xl p-5 shadow-sm hover:shadow transition-all duration-300 flex flex-col justify-between min-h-[160px] text-left group ${p.color}">
        <div class="space-y-2">
          <h4 class="font-display font-semibold text-[17px] text-text-dark group-hover:text-pink-ruby transition-colors">${p.title}</h4>
          <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light">${p.desc}</p>
        </div>
        <span class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-pink-ruby flex items-center gap-1 mt-4">
          ${p.cta} 
          <svg class="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
      </a>
    `).join('');

    return `
      <section class="py-12 bg-stone-50 select-none">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Get Involved Hub</span>
            <h3 class="font-display font-semibold text-2xl text-text-dark mt-1 tracking-tight">How Would You Like to Contribute?</h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            ${cardsHTML}
          </div>
        </div>
      </section>
    `;
  }
}
