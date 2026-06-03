export default class ReportPublisher {
  render() {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none text-left scroll-reveal revealed">
        
        <!-- Form Panel (col span 6) -->
        <div class="lg:col-span-6 bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm">
          <h3 class="font-display font-semibold text-[20px] text-text-dark pb-4 border-b border-stone-150 mb-6">
            Draft Campaign Report
          </h3>

          <form id="publish-report-form" class="space-y-4 font-sans">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="rep-author" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Author *</label>
                <input type="text" id="rep-author" required placeholder="e.g. Rohan Sen (Coordinator)" class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>

              <div>
                <label for="rep-reviewer" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Reviewer *</label>
                <input type="text" id="rep-reviewer" required placeholder="e.g. Dr. Smita Sharma (Executive Director)" class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>

            <div>
              <label for="rep-objective" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Campaign Objectives *</label>
              <textarea id="rep-objective" required rows="3" placeholder="Define the primary objective..." class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none"></textarea>
            </div>

            <div>
              <label for="rep-activities" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Activities Conducted *</label>
              <textarea id="rep-activities" required rows="3" placeholder="Describe the breakout sessions, operations..." class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none"></textarea>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <label for="m-part" class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Participants</label>
                <input type="number" id="m-part" required value="80" class="w-full text-[13.5px] p-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="m-vol" class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Volunteers</label>
                <input type="number" id="m-vol" required value="12" class="w-full text-[13.5px] p-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="m-hrs" class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Hours</label>
                <input type="number" id="m-hrs" required value="6" class="w-full text-[13.5px] p-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="m-reach" class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Centers</label>
                <input type="number" id="m-reach" required value="1" class="w-full text-[13.5px] p-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="m-res" class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Resources</label>
                <input type="number" id="m-res" required value="100" class="w-full text-[13.5px] p-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>

            <div>
              <label for="rep-outcomes" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Achieved Outcomes *</label>
              <textarea id="rep-outcomes" required rows="3" placeholder="List outcomes and metrics..." class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none"></textarea>
            </div>

            <div>
              <label for="rep-learnings" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Lessons Learned *</label>
              <textarea id="rep-learnings" required rows="3" placeholder="Provide lessons and retrospective observations..." class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none"></textarea>
            </div>

            <div>
              <label for="rep-tags" class="block font-interface font-bold text-[9px] uppercase tracking-widest text-text-light mb-1">Archive tags (comma-separated)</label>
              <input type="text" id="rep-tags" placeholder="e.g. Digital Literacy, Elder Care, Advocacy" class="w-full text-[13.5px] px-3 py-2 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
              <a href="#/admin/events" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-4 py-2.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
                Cancel
              </a>
              <button type="submit" class="font-interface font-semibold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                Publish Report
              </button>
            </div>
          </form>
        </div>

        <!-- Live Preview Panel (col span 6) -->
        <div class="lg:col-span-6 flex flex-col gap-4">
          <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light text-left pl-1">
            Live Document Preview (Knowledge Archive representation)
          </span>

          <div class="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col min-h-[600px] space-y-6 text-left">
            <div>
              <span class="inline-block font-interface font-semibold text-[9px] uppercase tracking-widest bg-pink-ruby text-white px-2 py-0.5 rounded-full mb-2">
                Preview Mode
              </span>
              <h4 id="pre-rep-title" class="font-display font-semibold text-xl text-text-dark">
                Event Report: Campaign Retrospective
              </h4>
              <p class="font-interface text-[11px] text-text-light mt-1">
                Authored by: <span id="pre-rep-author" class="font-semibold text-text-dark">Author Placeholder</span> | Reviewed by: <span id="pre-rep-reviewer" class="font-semibold text-text-dark">Reviewer Placeholder</span>
              </p>
            </div>

            <!-- Objectives block -->
            <div class="p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <span class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Objectives</span>
              <p id="pre-rep-obj" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                Add objectives details to see this content render.
              </p>
            </div>

            <!-- Activities conducted -->
            <div>
              <span class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Activities Conducted</span>
              <p id="pre-rep-act" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                Add activities details to see this content render.
              </p>
            </div>

            <!-- Metrics grid -->
            <div class="grid grid-cols-5 gap-2 border-y border-stone-150 py-3 text-center">
              <div>
                <span class="block text-[8px] text-text-light font-interface uppercase tracking-widest">Part</span>
                <span id="pre-m-part" class="font-display font-semibold text-[15px] text-text-dark">0</span>
              </div>
              <div>
                <span class="block text-[8px] text-text-light font-interface uppercase tracking-widest">Vols</span>
                <span id="pre-m-vol" class="font-display font-semibold text-[15px] text-pink-ruby">0</span>
              </div>
              <div>
                <span class="block text-[8px] text-text-light font-interface uppercase tracking-widest">Hours</span>
                <span id="pre-m-hrs" class="font-display font-semibold text-[15px] text-text-dark">0</span>
              </div>
              <div>
                <span class="block text-[8px] text-text-light font-interface uppercase tracking-widest">Reach</span>
                <span id="pre-m-reach" class="font-display font-semibold text-[15px] text-gold-ochre">0</span>
              </div>
              <div>
                <span class="block text-[8px] text-text-light font-interface uppercase tracking-widest">Res</span>
                <span id="pre-m-res" class="font-display font-semibold text-[15px] text-emerald-800">0</span>
              </div>
            </div>

            <!-- Outcomes block -->
            <div>
              <span class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Achieved Outcomes</span>
              <p id="pre-rep-out" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                Add outcomes details to see this content render.
              </p>
            </div>

            <!-- Learnings block -->
            <div>
              <span class="block font-interface font-bold text-[8px] uppercase tracking-widest text-text-light mb-1">Lessons Learned</span>
              <p id="pre-rep-learn" class="font-sans text-[13.5px] text-text-muted leading-relaxed font-light">
                Add lessons details to see this content render.
              </p>
            </div>

            <!-- Tags preview -->
            <div id="pre-rep-tags" class="flex flex-wrap gap-1.5 pt-2">
              <!-- Tags list here -->
            </div>
          </div>
        </div>

      </div>
    `;
  }

  static init(eventTitle = "Campaign Retrospective") {
    const form = document.getElementById('publish-report-form');
    
    // Inputs
    const authorIn = document.getElementById('rep-author');
    const reviewerIn = document.getElementById('rep-reviewer');
    const objectiveIn = document.getElementById('rep-objective');
    const activitiesIn = document.getElementById('rep-activities');
    const outcomesIn = document.getElementById('rep-outcomes');
    const learningsIn = document.getElementById('rep-learnings');
    const tagsIn = document.getElementById('rep-tags');

    const mPart = document.getElementById('m-part');
    const mVol = document.getElementById('m-vol');
    const mHrs = document.getElementById('m-hrs');
    const mReach = document.getElementById('m-reach');
    const mRes = document.getElementById('m-res');

    // Previews
    const preTitle = document.getElementById('pre-rep-title');
    const preAuthor = document.getElementById('pre-rep-author');
    const preReviewer = document.getElementById('pre-rep-reviewer');
    const preObj = document.getElementById('pre-rep-obj');
    const preAct = document.getElementById('pre-rep-act');
    const preOut = document.getElementById('pre-rep-out');
    const preLearn = document.getElementById('pre-rep-learn');
    const preTags = document.getElementById('pre-rep-tags');

    const preMPart = document.getElementById('pre-m-part');
    const preMVol = document.getElementById('pre-m-vol');
    const preMHrs = document.getElementById('pre-m-hrs');
    const preMReach = document.getElementById('pre-m-reach');
    const preMRes = document.getElementById('pre-m-res');

    if (preTitle && eventTitle) {
      preTitle.innerText = `Event Report: ${eventTitle}`;
    }

    const updatePreview = () => {
      if (preAuthor) preAuthor.innerText = authorIn.value || "Author Placeholder";
      if (preReviewer) preReviewer.innerText = reviewerIn.value || "Reviewer Placeholder";
      if (preObj) preObj.innerText = objectiveIn.value || "Add objectives details to see this content render.";
      if (preAct) preAct.innerText = activitiesIn.value || "Add activities details to see this content render.";
      if (preOut) preOut.innerText = outcomesIn.value || "Add outcomes details to see this content render.";
      if (preLearn) preLearn.innerText = learningsIn.value || "Add lessons details to see this content render.";
      
      if (preMPart) preMPart.innerText = mPart.value || "0";
      if (preMVol) preMVol.innerText = mVol.value || "0";
      if (preMHrs) preMHrs.innerText = (mHrs.value || "0") + "h";
      if (preMReach) preMReach.innerText = mReach.value || "0";
      if (preMRes) preMRes.innerText = mRes.value || "0";

      if (preTags) {
        const list = tagsIn.value.split(',').map(s => s.trim()).filter(Boolean);
        preTags.innerHTML = list.map(t => 
          `<span class="inline-block bg-stone-100 text-stone-600 font-interface font-semibold text-[8px] uppercase tracking-wider px-2 py-0.5 border rounded">${t}</span>`
        ).join(' ');
      }
    };

    const elements = [authorIn, reviewerIn, objectiveIn, activitiesIn, outcomesIn, learningsIn, tagsIn, mPart, mVol, mHrs, mReach, mRes];
    elements.forEach(el => {
      if (el) el.addEventListener('input', updatePreview);
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Success: Report has been compiled and published into the public Knowledge Archive.');
        window.location.hash = '#/admin/events';
      });
    }
  }
}
