export default class TrustMetrics {
  render() {
    return `
      <!-- ==========================================
           REFLECTIVE: WHY WE EXIST SECTION
           ========================================== -->
      <section id="about" class="py-20 bg-pink-blush/15 relative z-20 border-y border-pink-blush/35">
        <div class="max-w-6xl mx-auto px-6">
          
          <div class="max-w-xl text-left mb-12">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Why We Exist</span>
            <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight">The Quiet Force of Collective progress</h2>
          </div>

          <!-- Present Purpose and Future Envisioned Society -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
            
            <!-- Column 1: Present Purpose (Mission) -->
            <div class="flex flex-col items-start border-l-2 border-pink-ruby/25 pl-6 py-1">
              <span class="font-interface font-bold text-[12px] uppercase tracking-widest text-pink-ruby mb-3">Our Present Purpose</span>
              <p class="font-sans text-[15px] text-text-muted leading-relaxed">
                At Amaanitvam Foundation, we strive to inspire compassion, responsibility, and active citizenship. Through education, mentorship, awareness, and community engagement, we empower individuals to create meaningful change and contribute to a more inclusive, equitable, and compassionate society where everyone has the opportunity to learn, grow, and thrive.
              </p>
            </div>

            <!-- Column 2: Future Envisioned Society (Vision) -->
            <div class="flex flex-col items-start border-l-2 border-pink-ruby/25 pl-6 py-1">
              <span class="font-interface font-bold text-[12px] uppercase tracking-widest text-pink-ruby mb-3">The Future We Seek to Build</span>
              <p class="font-sans text-[15px] text-text-muted leading-relaxed">
                Amaanitvam Foundation envisions a brighter and more inclusive India where every individual has access to opportunities for learning, growth, and self-development. Through education, mentorship, and community-driven action, we aim to nurture confident, responsible, and compassionate citizens who contribute positively to society and inspire lasting change.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           ACTIVE PATHS: THREE PATHS OF ACTION
           ========================================== -->
      <section id="programs" class="py-24 bg-white relative z-20">
        <div class="max-w-6xl mx-auto px-6">
          
          <div class="max-w-xl text-left mb-16">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Progression</span>
            <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight">Three Chapters of Active Care</h2>
            <p class="font-sans text-[15px] text-text-muted mt-3">
              We translate empathy into systematic channels of civic progress. Each program represents a progressive chapter in our shared story of support.
            </p>
          </div>

          <!-- Editorial Chapter Progress Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
            
            <!-- Chapter I: Project Manthan -->
            <div class="flex flex-col items-start text-left p-8 rounded border border-pink-blush hover:border-pink-ruby/30 transition-all duration-300 relative group">
              <div class="font-display italic text-5xl text-pink-blush group-hover:text-pink-ruby/10 transition-colors duration-300 leading-none mb-4 select-none">01</div>
              <h3 class="font-interface font-bold text-[15px] uppercase tracking-widest text-text-dark mb-3">Project Manthan</h3>
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-6">
                Providing educational support, awareness, and mentorship to help underprivileged children build brighter futures through learning. This is our foundation, supporting **60+ children** with active learning classes and mentor networks.
              </p>
              
              <!-- Emphasis Footer Badge -->
              <span class="mt-auto font-interface font-semibold text-[10px] uppercase tracking-wider text-pink-ruby bg-pink-blush px-3 py-1 rounded">
                Focus: Learning & Support
              </span>
            </div>

            <!-- Chapter II: Project Shiksha -->
            <div class="flex flex-col items-start text-left p-8 rounded border border-pink-blush hover:border-pink-ruby/30 transition-all duration-300 relative group">
              <div class="font-display italic text-5xl text-pink-blush group-hover:text-pink-ruby/10 transition-colors duration-300 leading-none mb-4 select-none">02</div>
              <h3 class="font-interface font-bold text-[15px] uppercase tracking-widest text-text-dark mb-3">Project Shiksha</h3>
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-6">
                Expanding access to quality learning opportunities and empowering young minds through education and guidance. Built on the belief that education is a powerful tool, we inspire curiosity and access for **45+ children**.
              </p>
              
              <!-- Emphasis Footer Badge -->
              <span class="mt-auto font-interface font-semibold text-[10px] uppercase tracking-wider text-gold-ochre bg-gold-light px-3 py-1 rounded">
                Focus: Access & Growth
              </span>
            </div>

            <!-- Chapter III: Project Pravah -->
            <div class="flex flex-col items-start text-left p-8 rounded border border-pink-blush hover:border-pink-ruby/30 transition-all duration-300 relative group">
              <div class="font-display italic text-5xl text-pink-blush group-hover:text-pink-ruby/10 transition-colors duration-300 leading-none mb-4 select-none">03</div>
              <h3 class="font-interface font-bold text-[15px] uppercase tracking-widest text-text-dark mb-3">Project Pravah</h3>
              <p class="font-sans text-[13.5px] text-text-muted leading-relaxed mb-6">
                Reaching communities through awareness, engagement, and social development initiatives that encourage positive change. We expand outreach to **23+ young lives** to foster civic responsibility and community action.
              </p>
              
              <!-- Emphasis Footer Badge -->
              <span class="mt-auto font-interface font-semibold text-[10px] uppercase tracking-wider text-pink-ruby bg-pink-blush px-3 py-1 rounded">
                Focus: Outreach & Action
              </span>
            </div>

          </div>

        </div>
      </section>
    `;
  }
}
