import { faqs } from '../../mocks/faqs.js';

export default class DonorFAQ {
  render() {
    const donateFaqs = faqs.filter(f => f.category === "Donate");

    const accordionHTML = donateFaqs.map(f => `
      <div class="faq-item bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-sm text-left">
        
        <button class="faq-toggle-trigger w-full flex items-center justify-between p-5 focus:outline-none cursor-pointer">
          <h4 class="font-interface font-bold text-[14.5px] text-text-dark leading-snug pr-4">${f.question}</h4>
          <span class="faq-icon text-[18px] text-stone-400 font-mono transition-transform duration-200">+</span>
        </button>
        
        <div class="faq-body hidden border-t border-stone-100 p-5 bg-stone-50/50">
          <p class="font-sans text-[13.5px] text-text-muted font-light leading-relaxed select-text">
            ${f.answer}
          </p>
        </div>

      </div>
    `).join('');

    return `
      <section class="py-16 bg-stone-50 select-none">
        <div class="max-w-4xl mx-auto px-6 space-y-8">
          
          <div class="text-left mb-8 border-b border-stone-200 pb-4">
            <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">FAQ</span>
            <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Donor Policy FAQs</h2>
          </div>

          <div class="space-y-3.5">
            ${accordionHTML}
          </div>

        </div>
      </section>
    `;
  }

  static init() {
    const triggers = document.querySelectorAll('.faq-toggle-trigger');
    triggers.forEach(tr => {
      tr.addEventListener('click', () => {
        const item = tr.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const icon = tr.querySelector('.faq-icon');

        if (body.classList.contains('hidden')) {
          body.classList.remove('hidden');
          icon.innerText = '−';
          icon.style.transform = 'rotate(180deg)';
        } else {
          body.classList.add('hidden');
          icon.innerText = '+';
          icon.style.transform = '';
        }
      });
    });
  }
}
