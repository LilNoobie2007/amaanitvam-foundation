export default class DonationImpact {
  render() {
    const categories = [
      {
        title: "Support Learning Initiatives",
        scope: "Project Manthan & Shiksha",
        desc: "Equip local center classrooms with primary alphabet/math worksheets, language books, educational toys, and digital tablets to facilitate coding exercises."
      },
      {
        title: "Enable Community Activities",
        scope: "Health & Hygiene Camps",
        desc: "Provide sanitary packages, soap bars, dental kits, and nutrition packets during regional field clinics organized by student groups."
      },
      {
        title: "Strengthen Outreach Programs",
        scope: "Project Pravah Advocacy",
        desc: "Fund survey tools, field logs, local printing, and mapping assets used by volunteers to identify drop-out students in outer Delhi areas."
      },
      {
        title: "Expand Volunteer-Led Efforts",
        scope: "Training & Logistics Support",
        desc: "Support program materials, local travel coordinates for regional tutors, and volunteer center registries to optimize coordination."
      },
      {
        title: "Help Build Sustainable Impact",
        scope: "Classroom Infrastructure",
        desc: "Fund writing desks, study blackboards, lighting fixtures, and fans to create safe, comfortable study environments at community centers."
      }
    ];

    const cardsHTML = categories.map(c => `
      <div class="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-3 hover:border-pink-ruby/60 transition-colors text-left flex flex-col justify-between min-h-[190px]">
        <div class="space-y-1.5">
          <span class="font-interface font-bold text-[9px] uppercase tracking-widest text-pink-ruby block">${c.scope}</span>
          <h4 class="font-display font-semibold text-[17px] text-text-dark">${c.title}</h4>
          <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light">${c.desc}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="py-16 bg-stone-50 border-t border-b border-stone-200/50 select-none">
        <div class="max-w-5xl mx-auto px-6 space-y-8">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Outcomes</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Donation Impact Areas</h2>
            <p class="font-sans text-[14.5px] text-text-muted font-light mt-3 max-w-xl">
              We operate on a restricted-giving architecture. You can select exactly which initiative your contribution supports during donation setup.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${cardsHTML}
          </div>

        </div>
      </section>
    `;
  }
}
