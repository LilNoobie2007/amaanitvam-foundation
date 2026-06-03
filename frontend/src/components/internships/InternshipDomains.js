export default class InternshipDomains {
  render() {
    const domains = [
      {
        slug: "web-development",
        title: "Web Development",
        description: "Develop volunteer portals, state registries, and front-end architectures using JavaScript, HTML, and CSS.",
        icon: "💻"
      },
      {
        slug: "ui-ux-design",
        title: "UI/UX Design",
        description: "Create high-fidelity wireframes, mapping user journeys for scholars, donors, and field coordinators.",
        icon: "🎨"
      },
      {
        slug: "graphic-design",
        title: "Graphic Design",
        description: "Illustrate worksheets templates, develop social campaign visuals, and draft official credential layouts.",
        icon: "📐"
      },
      {
        slug: "content-writing",
        title: "Content Writing",
        description: "Publish detailed event retrospectives, draft donor newsletters, and write compelling impact stories.",
        icon: "✍️"
      },
      {
        slug: "data-analysis",
        title: "Data Analysis",
        description: "Compile demographic data sheets, analyze field checkup results, and calculate program success metrics.",
        icon: "📊"
      },
      {
        slug: "community-outreach",
        title: "Community Outreach",
        description: "Manage regional learning drives, coordinate local center logistics, and lead hygiene awareness drives.",
        icon: "📢"
      },
      {
        slug: "operations",
        title: "Operations & HR",
        description: "Track onboarding flows, coordinate mentor-intern sync schedules, and organize project milestones.",
        icon: "⚙️"
      },
      {
        slug: "marketing",
        title: "Campaign Marketing",
        description: "Plan social outreach calendars, coordinate press releases, and grow digital presence across channels.",
        icon: "🚀"
      },
      {
        slug: "research",
        title: "Social Research",
        description: "Conduct community survey analysis, benchmark local welfare schemes eligibility, and research education methods.",
        icon: "🔍"
      }
    ];

    const cards = domains.map(dom => {
      return `
        <a href="#/internships/domain/${dom.slug}" class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left stagger-load revealed">
          <div>
            <span class="text-3xl block mb-4">${dom.icon}</span>
            <h3 class="font-display font-semibold text-[18px] text-text-dark mb-2">
              ${dom.title}
            </h3>
            <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light mb-4">
              ${dom.description}
            </p>
          </div>
          <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby flex items-center gap-1">
            Explore Domain 
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
          </span>
        </a>
      `;
    }).join('');

    return `
      <section class="py-16 px-6 bg-stone-50 select-none">
        <div class="max-w-6xl mx-auto">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-250 mb-12 scroll-reveal revealed">
            <div class="text-left">
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Specializations</span>
              <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Internship Domains</h2>
            </div>
            <p class="font-sans text-[14.5px] text-text-muted mt-2 md:mt-0 font-light max-w-sm">
              Discover specialized roles, tools used, and curriculum schedules across our program pathways.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
            ${cards}
          </div>

        </div>
      </section>
    `;
  }
}
