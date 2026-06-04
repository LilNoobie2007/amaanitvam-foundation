import { faqs } from '../../mocks/faqs.js';

export default class ContactFAQ {
  render() {
    return `
      <section class="py-16 bg-stone-50 select-none">
        <div class="max-w-4xl mx-auto px-6 space-y-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-250 pb-5 text-left">
            <div>
              <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Knowledge Base</span>
              <h2 class="font-display font-semibold text-3xl text-text-dark mt-2 tracking-tight">Frequently Asked Questions</h2>
            </div>
            <p class="font-sans text-[13.5px] text-text-muted mt-2 md:mt-0 font-light max-w-xs">
              Quick answers about tax exemption, operations, student credits, and volunteer tracks.
            </p>
          </div>

          <!-- Search & Filter Header -->
          <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm text-left">
            <div class="flex-grow max-w-md">
              <input type="text" id="faq-search-input" placeholder="Search by tag, keyword (e.g. 80g, stipend, office)..." class="w-full font-sans text-[13px] px-3.5 py-2 border border-stone-200 rounded focus:outline-none focus:border-pink-ruby">
            </div>
            
            <div class="flex items-center gap-1.5 overflow-x-auto py-1 text-[11.5px] font-interface font-bold uppercase tracking-wider">
              <button class="faq-cat-btn px-3 py-1 rounded bg-stone-100 text-pink-ruby border border-stone-250" data-cat="All">All</button>
              <button class="faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50" data-cat="Contact">Contact</button>
              <button class="faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50" data-cat="Donate">Donate</button>
              <button class="faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50" data-cat="Volunteer">Volunteer</button>
              <button class="faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50" data-cat="Internship">Internship</button>
              <button class="faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50" data-cat="Partnership">Partnership</button>
            </div>
          </div>

          <!-- Accordion List Container -->
          <div id="faq-accordion-list" class="space-y-3.5">
            <!-- Items injected by init/draw -->
          </div>

        </div>
      </section>
    `;
  }

  static draw(category = "All", query = "") {
    const list = document.getElementById('faq-accordion-list');
    if (!list) return;

    let filteredFaqs = faqs;

    // Filter by Category
    if (category !== "All") {
      filteredFaqs = filteredFaqs.filter(f => f.category === category);
    }

    // Filter by Search Query
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      filteredFaqs = filteredFaqs.filter(f => {
        const matchesQuestion = f.question.toLowerCase().includes(q);
        const matchesAnswer = f.answer.toLowerCase().includes(q);
        const matchesTags = f.tags.some(t => t.toLowerCase().includes(q));
        const matchesCat = f.category.toLowerCase().includes(q);
        return matchesQuestion || matchesAnswer || matchesTags || matchesCat;
      });
    }

    if (filteredFaqs.length === 0) {
      list.innerHTML = `
        <div class="bg-white border border-stone-200/80 rounded-xl p-8 text-center shadow-sm">
          <p class="font-sans text-[13.5px] text-text-light italic font-light">No FAQs match your search tags. Please try another keyword.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filteredFaqs.map(f => {
      const tagsHTML = f.tags.map(tag => `
        <span class="bg-stone-50 text-[10px] border border-stone-200 text-text-light px-2 py-0.5 rounded font-mono">#${tag}</span>
      `).join(' ');

      return `
        <div class="faq-item bg-white border border-stone-200/80 rounded-xl overflow-hidden shadow-sm text-left transition-colors hover:border-stone-300">
          
          <button class="faq-toggle-trigger w-full flex items-center justify-between p-5 focus:outline-none cursor-pointer" data-faq-id="${f.id}">
            <div class="space-y-1.5 flex-grow pr-4">
              <div class="flex items-center gap-2">
                <span class="font-interface font-bold text-[9px] uppercase tracking-widest text-pink-ruby">${f.category}</span>
                <div class="flex gap-1.5">${tagsHTML}</div>
              </div>
              <h4 class="font-interface font-bold text-[14.5px] text-text-dark leading-snug">${f.question}</h4>
            </div>
            
            <!-- Open/Close Plus Metaphor -->
            <span class="faq-icon text-[18px] text-stone-400 font-mono transition-transform duration-200">+</span>
          </button>
          
          <div class="faq-body hidden border-t border-stone-100 p-5 bg-stone-50/50">
            <p class="font-sans text-[13.5px] text-text-muted font-light leading-relaxed select-text">
              ${f.answer}
            </p>
          </div>

        </div>
      `;
    }).join('');

    // Bind item accordion toggles
    ContactFAQ.bindAccordion();
  }

  static bindAccordion() {
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

  static init() {
    let currentCat = "All";
    let currentSearch = "";

    const searchInput = document.getElementById('faq-search-input');
    const catBtns = document.querySelectorAll('.faq-cat-btn');

    const update = () => {
      ContactFAQ.draw(currentCat, currentSearch);
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        update();
      });
    }

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle selected state styling
        catBtns.forEach(b => {
          b.className = "faq-cat-btn px-3 py-1 rounded text-text-light hover:bg-stone-50";
        });
        btn.className = "faq-cat-btn px-3 py-1 rounded bg-stone-100 text-pink-ruby border border-stone-250";

        currentCat = btn.dataset.cat;
        update();
      });
    });

    // Initial render
    update();
  }
}
