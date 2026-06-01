export default class ImpactProcess {
  render() {
    return `
      <section id="impact-process" class="relative py-28 bg-white overflow-hidden border-b border-stone-200/20 z-20 select-none">
        
        <!-- Background vertical thread connector -->
        <div class="absolute top-0 left-1/2 w-px h-full bg-stone-200/40 -translate-x-1/2 pointer-events-none z-0"></div>

        <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <div class="max-w-2xl mx-auto mb-16 scroll-reveal">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Our Model</span>
            <h2 class="font-display font-semibold text-3xl md:text-4xl text-text-dark mt-2 tracking-tight">
              How We Create Impact
            </h2>
            <p class="font-sans text-[14.5px] text-text-muted mt-3 font-light leading-relaxed">
              Empathy becomes structured execution through our four-stage operational logic. Click the programs below to see how our values translate into verified on-ground outcomes.
            </p>
          </div>

          <!-- Interactive Tabs -->
          <div class="flex flex-wrap items-center justify-center gap-4 mb-16 scroll-reveal select-none" id="process-tabs">
            <button class="process-tab px-6 py-3 font-interface font-semibold text-[11px] uppercase tracking-widest rounded-md border border-stone-200 text-stone-600 bg-white hover:border-pink-ruby/40 hover:text-pink-ruby transition-all duration-300 cursor-pointer active-tab-btn" data-program="manthan">
              Project Manthan
            </button>
            <button class="process-tab px-6 py-3 font-interface font-semibold text-[11px] uppercase tracking-widest rounded-md border border-stone-200 text-stone-600 bg-white hover:border-pink-ruby/40 hover:text-pink-ruby transition-all duration-300 cursor-pointer" data-program="shiksha">
              Project Shiksha
            </button>
            <button class="process-tab px-6 py-3 font-interface font-semibold text-[11px] uppercase tracking-widest rounded-md border border-stone-200 text-stone-600 bg-white hover:border-pink-ruby/40 hover:text-pink-ruby transition-all duration-300 cursor-pointer" data-program="pravah">
              Project Pravah
            </button>
          </div>

          <!-- Flowchart Nodes Sequence Grid (Need -> Program -> Action -> Outcome) -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto relative z-10 text-left stagger-container" id="process-flow">
            
            <!-- Stage 1: Need -->
            <div class="p-6 bg-stone-50 border border-stone-200/60 rounded-xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 relative group stagger-load">
              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">01. Need</span>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light mt-2" id="node-need">
                  Underprivileged children lacking support and guidance.
                </p>
              </div>
            </div>

            <!-- Stage 2: Program -->
            <div class="p-6 bg-stone-50 border border-stone-200/60 rounded-xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 relative group stagger-load">
              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">02. Program</span>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light mt-2" id="node-program">
                  Project Manthan Educational Mentorship
                </p>
              </div>
            </div>

            <!-- Stage 3: Action -->
            <div class="p-6 bg-stone-50 border border-stone-200/60 rounded-xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 relative group stagger-load">
              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">03. Action</span>
                <p class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light mt-2" id="node-action">
                  Providing educational support and learning classes.
                </p>
              </div>
            </div>

            <!-- Stage 4: Outcome -->
            <div class="p-6 bg-pink-blush/40 border border-pink-ruby/15 rounded-xl flex flex-col justify-between hover:shadow-sm transition-shadow duration-300 relative group stagger-load">
              <div>
                <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby mb-2 block">04. Outcome</span>
                <p class="font-sans text-[13.5px] text-text-dark font-medium leading-relaxed mt-2" id="node-outcome">
                  Established active mentorship for 60+ children.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const tabs = document.querySelectorAll('.process-tab');
    const needText = document.getElementById('node-need');
    const programText = document.getElementById('node-program');
    const actionText = document.getElementById('node-action');
    const outcomeText = document.getElementById('node-outcome');

    if (!tabs.length || !needText || !programText || !actionText || !outcomeText) return;

    // Database details for the interactive flow
    const programData = {
      manthan: {
        need: 'Underprivileged children lacking support and structural guidance.',
        program: 'Project Manthan — Educational Mentorship',
        action: 'Providing active on-ground learning classes and educational mentorship support.',
        outcome: 'Established active, persistent mentorship for 60+ children.'
      },
      shiksha: {
        need: 'Lack of access to quality resources, library spaces, and intellectual tools.',
        program: 'Project Shiksha — Access & Learning Growth',
        action: 'Expanding opportunities, guidance, libraries, and intellectual curiosity campaigns.',
        outcome: 'Empowered intellectual interest and guidance for 45+ children.'
      },
      pravah: {
        need: 'Communities isolated from civic awareness and general development pathways.',
        program: 'Project Pravah — Outreach & Action',
        action: 'Reaching deep remote villages through awareness meets and social drives.',
        outcome: 'Expanded outreach and seasonal assistance to 23+ young lives.'
      }
    };

    // Apply initial active styling
    const applyActiveStyles = (activeBtn) => {
      tabs.forEach(btn => {
        btn.classList.remove('bg-pink-ruby', 'text-white', 'border-pink-ruby');
        btn.classList.add('bg-white', 'text-stone-600', 'border-stone-200');
      });
      activeBtn.classList.remove('bg-white', 'text-stone-600', 'border-stone-200');
      activeBtn.classList.add('bg-pink-ruby', 'text-white', 'border-pink-ruby');
    };

    // Set first active styling
    const manthanTab = document.querySelector('.process-tab[data-program="manthan"]');
    if (manthanTab) applyActiveStyles(manthanTab);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const prog = tab.getAttribute('data-program');
        const data = programData[prog];

        if (!data) return;

        applyActiveStyles(tab);

        // Subtle animation transition
        const flow = document.getElementById('process-flow');
        if (flow) {
          flow.style.opacity = '0.3';
          flow.style.transform = 'translateY(4px)';
          flow.style.transition = 'all 0.2s ease';
          
          setTimeout(() => {
            needText.textContent = data.need;
            programText.textContent = data.program;
            actionText.textContent = data.action;
            outcomeText.textContent = data.outcome;
            
            flow.style.opacity = '1';
            flow.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    });
  }
}
