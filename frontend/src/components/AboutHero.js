export default class AboutHero {
  render() {
    return `
      <section id="about-hero" class="relative py-32 bg-stone-50 overflow-hidden flex items-center justify-center select-none border-b border-stone-200/50 z-10 pt-40">
        
        <!-- Faint background visual curves representing compassion ripple -->
        <div class="absolute -top-[10%] -left-[10%] w-[450px] h-[450px] bg-gradient-to-br from-pink-quartz/20 to-transparent rounded-full filter blur-3xl pointer-events-none z-0"></div>
        <div class="absolute -bottom-[10%] -right-[10%] w-[450px] h-[450px] bg-gradient-to-br from-amber-200/10 to-transparent rounded-full filter blur-3xl pointer-events-none z-0"></div>
        
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div class="flex flex-col items-center stagger-container">
            
            <!-- Tagline Badge narrative stamp -->
            <span class="font-display italic text-base md:text-lg text-pink-ruby tracking-wide mb-6 block select-none stagger-load">
              "What Are We, If Not for One Another?"
            </span>

            <!-- Main Title in serif Playfair Display -->
            <h1 class="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-text-dark tracking-tight leading-tight mb-6 stagger-load">
              About Amaanitvam Foundation
            </h1>

            <div class="w-12 h-px bg-pink-ruby/20 mb-8 stagger-load"></div>

            <!-- Legible explanatory subtitle -->
            <p class="font-sans text-text-muted font-light text-base md:text-lg max-w-2xl leading-relaxed stagger-load">
              A student-led movement inspiring learning, responsibility, and positive change for a stronger society.
            </p>

          </div>
        </div>

      </section>
    `;
  }
}
