import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { events } from '../mocks/events.js';

export default class EventDetailsPage {
  constructor() {
    this.navbar = new Navbar();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const slug = parts[parts.length - 1]; // E.g. community-learning-session

    const event = events.find(e => e.slug === slug);

    if (!event) {
      return `
        <div class="flex flex-col min-h-screen bg-stone-50 select-none">
          ${this.navbar.render()}
          <main class="flex-grow pt-32 text-center py-20">
            <h2 class="font-display font-semibold text-2xl text-stone-900 mb-2">Event Not Found</h2>
            <p class="font-sans text-text-muted mb-6">The requested upcoming campaign details are not available.</p>
            <a href="#/events" class="font-interface font-semibold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Return to Events Board
            </a>
          </main>
          ${this.footer.render()}
        </div>
      `;
    }

    let statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-250';
    if (event.status === 'Closing Soon') statusBadge = 'bg-amber-50 text-amber-800 border-amber-250';
    else if (event.status === 'Full') statusBadge = 'bg-rose-50 text-rose-800 border-rose-250';

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none text-left">
        ${this.navbar.render()}

        <main class="flex-grow pt-20 md:pt-24">
          <!-- Banner Hero Image -->
          <section class="relative h-96 bg-stone-950">
            <img src="${event.coverImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'}" alt="${event.title}" class="w-full h-full object-cover opacity-60">
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-950/20 to-transparent"></div>
            
            <div class="absolute bottom-10 left-0 w-full px-6">
              <div class="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest bg-pink-ruby text-white px-2.5 py-0.5 rounded-full border border-pink-ruby/30">
                      ${event.category}
                    </span>
                    <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full ${statusBadge}">
                      Status: ${event.status}
                    </span>
                  </div>
                  <h1 class="font-display font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                    ${event.title}
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <!-- Core Details Section -->
          <section class="py-16 px-6 max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <!-- Left Side Content: Story & Agenda (col span 7) -->
              <div class="lg:col-span-7 space-y-8">
                <div>
                  <h3 class="font-display font-semibold text-[22px] text-text-dark pb-3 border-b border-stone-200 mb-4">
                    Opportunity Story & Context
                  </h3>
                  <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify">
                    ${event.description}
                  </p>
                  <p class="font-sans text-[15.5px] text-text-muted leading-relaxed font-light text-justify mt-4">
                    Our team seeks to distribute baseline life-skills worksheets and implement secondary syllabus alignment lessons during this campaign. Participating volunteers will contribute directly to tracking child progress and organizing resource materials.
                  </p>
                </div>

                <div>
                  <h3 class="font-display font-semibold text-[22px] text-text-dark pb-3 border-b border-stone-200 mb-4">
                    Event Agenda
                  </h3>
                  <div class="space-y-4 font-sans text-[14.5px] text-text-muted font-light">
                    <div class="flex items-start gap-4">
                      <span class="font-interface font-bold text-pink-ruby text-[11px] tracking-wider uppercase mt-1 shrink-0 w-20">Session 1</span>
                      <p><strong class="font-semibold text-text-dark">Introduction & Diagnostic Check (30 mins):</strong> Introduction circle to break the ice with learners, conducting spelling quizzes to check literacy levels.</p>
                    </div>
                    <div class="flex items-start gap-4">
                      <span class="font-interface font-bold text-pink-ruby text-[11px] tracking-wider uppercase mt-1 shrink-0 w-20">Session 2</span>
                      <p><strong class="font-semibold text-text-dark">Breakout Learning Modules (60 mins):</strong> Partition children into smaller, age-aligned circles to cover mathematics calculations and literacy worksheets.</p>
                    </div>
                    <div class="flex items-start gap-4">
                      <span class="font-interface font-bold text-pink-ruby text-[11px] tracking-wider uppercase mt-1 shrink-0 w-20">Session 3</span>
                      <p><strong class="font-semibold text-text-dark">Outcome Review & Resource Distribution (30 mins):</strong> Hand out supplemental nutritional packets and learning books to children, wrapping up the session with feedback.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Side: Logistics & Roster Sign up (col span 5) -->
              <div class="lg:col-span-5 space-y-6">
                <!-- Logistics Card -->
                <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
                  <h4 class="font-interface font-bold text-xs uppercase tracking-widest text-text-dark border-b border-stone-100 pb-2">
                    Campaign Details
                  </h4>
                  
                  <div class="space-y-3 font-sans text-[14px] text-text-muted">
                    <div class="flex items-center gap-3">
                      <svg class="w-4 h-4 text-pink-ruby shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <div>
                        <span class="text-text-light text-[11px] block">Date</span>
                        <strong class="font-semibold text-text-dark">${event.date}</strong>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <svg class="w-4 h-4 text-pink-ruby shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <div>
                        <span class="text-text-light text-[11px] block">Time Slot</span>
                        <strong class="font-semibold text-text-dark">${event.time}</strong>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <svg class="w-4 h-4 text-pink-ruby shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.244a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <div>
                        <span class="text-text-light text-[11px] block">Location</span>
                        <strong class="font-semibold text-text-dark">${event.location}</strong>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <svg class="w-4 h-4 text-pink-ruby shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                      <div>
                        <span class="text-text-light text-[11px] block">Registry Link</span>
                        <strong class="font-semibold text-text-dark">${event.certificateEligible ? 'Verifiable Certificate Eligible' : 'Participation Hours Only'}</strong>
                      </div>
                    </div>
                  </div>

                  <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-[12px] font-interface uppercase tracking-wider">
                    <span>Capacity: ${event.capacity} total</span>
                    <span class="text-pink-ruby font-semibold">${event.remainingSeats} Seats Left</span>
                  </div>
                </div>

                <!-- Simulated Signup Form -->
                ${event.status !== 'Full' ? `
                  <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
                    <h4 class="font-display font-semibold text-lg text-text-dark">Apply for Roster Slot</h4>
                    <p class="font-sans text-[13px] text-text-light font-light leading-relaxed">
                      Enter your volunteer credentials below. If selected, our campaign leader will confirm your placement via email.
                    </p>

                    <form id="details-signup-form" class="space-y-4 font-sans text-left">
                      <div>
                        <label for="user-name" class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light mb-1">Full Name</label>
                        <input type="text" id="user-name" required placeholder="Aarav Mehta" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
                      </div>

                      <div>
                        <label for="user-email" class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light mb-1">Email Address</label>
                        <input type="email" id="user-email" required placeholder="aarav@gmail.com" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
                      </div>

                      <button type="submit" class="w-full font-interface font-semibold text-[10.5px] uppercase tracking-widest py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                        Confirm Registration
                      </button>
                    </form>
                  </div>
                ` : `
                  <div class="bg-stone-100 border border-stone-200 rounded-xl p-6 text-center">
                    <p class="font-sans text-[15px] text-text-muted font-light">Registration Closed. Roster capacity is currently full for this campaign.</p>
                  </div>
                `}
              </div>

            </div>
          </section>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    const form = document.getElementById('details-signup-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification: Roster registration request received. Status marked: Approved.');
        form.reset();
      });
    }

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(el => revealObserver.observe(el));
  }
}
