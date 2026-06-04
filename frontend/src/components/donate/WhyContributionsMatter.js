export default class WhyContributionsMatter {
  render() {
    return `
      <section class="py-16 bg-stone-50 select-none">
        <div class="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center text-left">
          
          <div class="md:col-span-5 space-y-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Approach</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark tracking-tight leading-tight">
              A Direct Pipeline to the Field
            </h2>
            <div class="h-1 w-8 bg-pink-ruby"></div>
          </div>

          <div class="md:col-span-7 font-sans text-[14.5px] text-text-muted leading-relaxed font-light space-y-4">
            <p>
              At Amaanitvam, we believe that contributions are not merely financial transactions—they are investments in community potential. Our student-led operational structure ensures that resources flow directly from donors to programs without leaking into administrative overhead.
            </p>
            <p>
              By sponsoring learning materials for <strong class="font-semibold text-text-dark">Project Manthan</strong> centers, digital coding modules for <strong class="font-semibold text-text-dark">Project Shiksha</strong> classrooms, or survey toolkits for <strong class="font-semibold text-text-dark">Project Pravah</strong> advocacy, you empower our volunteer network to conduct consistent field operations.
            </p>
            <p>
              Every rupee donated is mapped to specific tangible outcomes, helping us maintain a transparent registry of civic service and youth engagement.
            </p>
          </div>

        </div>
      </section>
    `;
  }
}
