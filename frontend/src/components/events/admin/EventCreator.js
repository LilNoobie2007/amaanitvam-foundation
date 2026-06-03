export default class EventCreator {
  render() {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none text-left scroll-reveal revealed">
        
        <!-- Form Panel (col span 7) -->
        <div class="lg:col-span-7 bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm">
          <h3 class="font-display font-semibold text-[20px] text-text-dark pb-4 border-b border-stone-150 mb-6">
            Configure Event Coordinates
          </h3>

          <form id="create-event-form" class="space-y-5">
            <div>
              <label for="evt-title" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Event Title *</label>
              <input type="text" id="evt-title" required placeholder="e.g. Life Skills Mentorship Bootcamp" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby focus:ring-1 focus:ring-pink-ruby transition-all">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="evt-cat" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Category *</label>
                <select id="evt-cat" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Workshop">Workshop</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Volunteer Gathering">Volunteer Gathering</option>
                  <option value="Awareness Campaign">Awareness Campaign</option>
                  <option value="Training Session">Training Session</option>
                  <option value="Educational Event">Educational Event</option>
                </select>
              </div>

              <div>
                <label for="evt-program" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Program Association *</label>
                <select id="evt-program" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="general">General Foundation</option>
                  <option value="manthan">Project Manthan</option>
                  <option value="shiksha">Project Shiksha</option>
                  <option value="pravah">Project Pravah</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="evt-date" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Event Date *</label>
                <input type="date" id="evt-date" required class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div>
                <label for="evt-time" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Time Slot *</label>
                <input type="text" id="evt-time" required placeholder="e.g. 10:30 AM - 12:30 PM" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="evt-capacity" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Capacity *</label>
                <input type="number" id="evt-capacity" required value="30" min="1" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div>
                <label for="evt-priority" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Priority *</label>
                <select id="evt-priority" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Normal">Normal</option>
                  <option value="Highlighted">Highlighted</option>
                  <option value="Featured">Featured</option>
                </select>
              </div>

              <div>
                <label for="evt-status" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Lifecycle Status *</label>
                <select id="evt-status" class="w-full font-sans text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closing Soon">Closing Soon</option>
                  <option value="Full">Full</option>
                </select>
              </div>
            </div>

            <div>
              <label for="evt-location" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Location *</label>
              <input type="text" id="evt-location" required placeholder="e.g. Manthan Center, Vasant Kunj" class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <div>
              <label for="evt-description" class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-2">Description Story *</label>
              <textarea id="evt-description" required rows="3" placeholder="Explain the story context and purpose of the event..." class="w-full font-sans text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none"></textarea>
            </div>

            <!-- Registry Integration Toggles -->
            <div class="border-t border-stone-150 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label class="flex items-center gap-2 font-sans text-[13px] text-text-dark font-medium cursor-pointer">
                <input type="checkbox" id="evt-homepage" class="rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby cursor-pointer">
                <span>Show on Homepage</span>
              </label>

              <label class="flex items-center gap-2 font-sans text-[13px] text-text-dark font-medium cursor-pointer col-span-2">
                <input type="checkbox" id="evt-cert-eligible" class="rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby cursor-pointer">
                <span>Eligible for Registry Certificate</span>
              </label>
            </div>

            <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
              <a href="#/admin/events" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
                Cancel
              </a>
              <button type="submit" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                Save & Initialize Event
              </button>
            </div>
          </form>
        </div>

        <!-- Live Preview Panel (col span 5) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light text-left pl-1">
            Live Card Preview (Active Card representation)
          </span>

          <div class="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
            <div class="h-44 bg-stone-100 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800" alt="Preview Background" class="w-full h-full object-cover opacity-80">
              
              <span id="preview-status" class="absolute top-4 left-4 inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full bg-emerald-50 text-emerald-800 border-emerald-200">
                Draft
              </span>
              
              <span id="preview-cat" class="absolute bottom-4 right-4 bg-stone-900/80 text-white font-interface font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded">
                Category
              </span>
            </div>

            <div class="p-5 flex-grow flex flex-col justify-between text-left">
              <div>
                <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider mb-2">
                  <span id="preview-date">Date Placeholder</span>
                  <span>•</span>
                  <span id="preview-location">Location Placeholder</span>
                </div>
                
                <h4 id="preview-title" class="font-display font-semibold text-[18px] text-text-dark leading-snug mb-2 line-clamp-2">
                  Life Skills Mentorship Bootcamp
                </h4>
                
                <p id="preview-desc" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light line-clamp-4">
                  Fill out the form details on the left to see this card update in real-time.
                </p>
              </div>

              <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-interface">
                <div class="text-text-light uppercase tracking-widest">
                  <span id="preview-capacity">30</span> seats total
                </div>
                <span class="text-pink-ruby font-bold uppercase tracking-wider">Preview Only</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  static init() {
    const form = document.getElementById('create-event-form');
    
    // Inputs
    const titleIn = document.getElementById('evt-title');
    const catIn = document.getElementById('evt-cat');
    const programIn = document.getElementById('evt-program');
    const dateIn = document.getElementById('evt-date');
    const timeIn = document.getElementById('evt-time');
    const capacityIn = document.getElementById('evt-capacity');
    const priorityIn = document.getElementById('evt-priority');
    const statusIn = document.getElementById('evt-status');
    const locationIn = document.getElementById('evt-location');
    const descIn = document.getElementById('evt-description');

    // Previews
    const preTitle = document.getElementById('preview-title');
    const preCat = document.getElementById('preview-cat');
    const preStatus = document.getElementById('preview-status');
    const preDate = document.getElementById('preview-date');
    const preLoc = document.getElementById('preview-location');
    const preDesc = document.getElementById('preview-desc');
    const preCap = document.getElementById('preview-capacity');

    const updatePreview = () => {
      if (preTitle) preTitle.innerText = titleIn.value || "Life Skills Mentorship Bootcamp";
      if (preCat) preCat.innerText = catIn.value;
      if (preStatus) {
        preStatus.innerText = statusIn.value;
        preStatus.className = "absolute top-4 left-4 inline-block font-interface font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-full bg-white/90 backdrop-blur-sm shadow-sm";
        if (statusIn.value === 'Open') preStatus.classList.add('bg-emerald-50', 'text-emerald-800', 'border-emerald-250');
        else if (statusIn.value === 'Closing Soon') preStatus.classList.add('bg-amber-50', 'text-amber-800', 'border-amber-250');
        else if (statusIn.value === 'Full') preStatus.classList.add('bg-rose-50', 'text-rose-800', 'border-rose-250');
        else preStatus.classList.add('bg-stone-50', 'text-stone-600', 'border-stone-200');
      }
      if (preDate) preDate.innerText = dateIn.value || "Date Placeholder";
      if (preLoc) preLoc.innerText = (locationIn.value || "Location Placeholder").split(',')[0];
      if (preDesc) preDesc.innerText = descIn.value || "Fill out the form details on the left to see this card update in real-time.";
      if (preCap) preCap.innerText = capacityIn.value || "30";
    };

    const elements = [titleIn, catIn, programIn, dateIn, timeIn, capacityIn, priorityIn, statusIn, locationIn, descIn];
    elements.forEach(el => {
      if (el) el.addEventListener('input', updatePreview);
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Verification: Event has been successfully drafted and added to local mock records.');
        window.location.hash = '#/admin/events';
      });
    }
  }
}
