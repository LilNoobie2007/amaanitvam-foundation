import ResumeUpload from './ResumeUpload.js';
import ApplicationPreview from './ApplicationPreview.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';

export default class ApplicationForm {
  constructor() {
    this.resumeUploader = new ResumeUpload();
    this.preview = new ApplicationPreview();
    
    // Internal wizard states: 'form', 'preview', 'success'
    this.state = {
      step: 'form',
      formData: {
        fullName: '',
        email: '',
        phone: '',
        college: '',
        degree: '',
        year: '1st Year',
        domain: 'Web Development',
        linkedin: '',
        github: '',
        portfolio: '',
        sop: '',
        resumeFileName: ''
      },
      submittedId: ''
    };
  }

  render() {
    const opportunitiesOptions = internshipOpportunities
      .filter(o => o.status === 'Open')
      .map(o => `<option value="${o.domain}" ${this.state.formData.domain === o.domain ? 'selected' : ''}>${o.title} (${o.duration})</option>`)
      .join('');

    // Pre-populate opportunityId if passed in URL query
    const urlParams = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.substring(window.location.hash.indexOf('?')) : '');
    const preopp = urlParams.get('opportunityId');
    if (preopp && !this.state.formData.fullName && !this.state.formData.email) {
      const selectedOpp = internshipOpportunities.find(o => o.id === preopp);
      if (selectedOpp) {
        this.state.formData.domain = selectedOpp.domain;
      }
    }

    if (this.state.step === 'success') {
      return `
        <div class="bg-white border border-stone-200/80 rounded-xl p-8 max-w-2xl mx-auto shadow-sm text-center space-y-6 scroll-reveal revealed select-none">
          <span class="text-5xl block animate-bounce">🎉</span>
          <h3 class="font-display font-semibold text-2xl text-text-dark">Application Filed Successfully</h3>
          <p class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light">
            Thank you, <strong class="text-text-dark font-medium">${this.state.formData.fullName}</strong>. Your internship candidate profile has been initialized in our Summer 2026 registry databases.
          </p>

          <div class="bg-stone-50 border border-stone-200 rounded-xl p-6 max-w-md mx-auto space-y-3 font-sans text-left">
            <div class="flex justify-between items-center py-1.5 border-b border-stone-200/40">
              <span class="text-text-light text-[12px] font-interface uppercase tracking-wider">Application ID</span>
              <strong class="font-mono text-[14px] text-pink-ruby font-bold">${this.state.submittedId}</strong>
            </div>
            <div class="flex justify-between items-center py-1.5 border-b border-stone-200/40">
              <span class="text-text-light text-[12px] font-interface uppercase tracking-wider">Target Domain</span>
              <strong class="font-semibold text-text-dark text-[13.5px]">${this.state.formData.domain}</strong>
            </div>
            <div class="flex justify-between items-center py-1.5">
              <span class="text-text-light text-[12px] font-interface uppercase tracking-wider">Track Status URL</span>
              <a href="#/internships/status" class="text-pink-ruby hover:underline font-mono text-[13px] font-semibold">#/internships/status</a>
            </div>
          </div>

          <p class="text-[12.5px] text-text-light font-light leading-relaxed">
            Please bookmark your Application ID. You can verify pipeline movements, screening comments, and scheduling details at any point.
          </p>

          <div class="pt-4 flex gap-4 justify-center">
            <a href="#/internships/status?appId=${this.state.submittedId}" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-3 bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Track Status Now
            </a>
            <a href="#/internships" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-3 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
              Exit Board
            </a>
          </div>
        </div>
      `;
    }

    if (this.state.step === 'preview') {
      return `
        <div class="bg-white border border-stone-200/80 rounded-xl p-8 max-w-3xl mx-auto shadow-sm space-y-8 scroll-reveal revealed">
          ${this.preview.render(this.state.formData)}

          <div class="pt-6 border-t border-stone-150 flex items-center justify-between">
            <button id="btn-wizard-back" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-5 py-3 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
              Modify Form Details
            </button>
            <button id="btn-wizard-submit" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-6 py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Confirm & File Application
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="bg-white border border-stone-200/80 rounded-xl p-8 max-w-3xl mx-auto shadow-sm space-y-6 text-left scroll-reveal revealed">
        <h3 class="font-display font-semibold text-[22px] text-text-dark pb-3 border-b border-stone-200 mb-6">
          Internship Candidate Application
        </h3>

        <form id="apply-internship-form" class="space-y-6 font-sans">
          
          <!-- Section 1: Demographics -->
          <div class="space-y-4">
            <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light border-b border-stone-100 pb-1 mb-2">Personal Coordinates</span>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="apply-name" class="block text-[11px] font-medium text-text-muted mb-1.5">Full Name *</label>
                <input type="text" id="apply-name" required value="${this.state.formData.fullName}" placeholder="Aarav Sharma" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-email" class="block text-[11px] font-medium text-text-muted mb-1.5">Email Address *</label>
                <input type="email" id="apply-email" required value="${this.state.formData.email}" placeholder="aarav.sharma@gmail.com" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-phone" class="block text-[11px] font-medium text-text-muted mb-1.5">Phone Number *</label>
                <input type="tel" id="apply-phone" required value="${this.state.formData.phone}" placeholder="+91 98765 43210" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>
          </div>

          <!-- Section 2: Education -->
          <div class="space-y-4">
            <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light border-b border-stone-100 pb-1 mb-2">Academic Background</span>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="apply-college" class="block text-[11px] font-medium text-text-muted mb-1.5">College / University *</label>
                <input type="text" id="apply-college" required value="${this.state.formData.college}" placeholder="Delhi Technological University" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-degree" class="block text-[11px] font-medium text-text-muted mb-1.5">Degree Program *</label>
                <input type="text" id="apply-degree" required value="${this.state.formData.degree}" placeholder="B.Tech Computer Science" class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-year" class="block text-[11px] font-medium text-text-muted mb-1.5">Academic Year *</label>
                <select id="apply-year" class="w-full text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  <option value="1st Year" ${this.state.formData.year === '1st Year' ? 'selected' : ''}>1st Year</option>
                  <option value="2nd Year" ${this.state.formData.year === '2nd Year' ? 'selected' : ''}>2nd Year</option>
                  <option value="3rd Year" ${this.state.formData.year === '3rd Year' ? 'selected' : ''}>3rd Year</option>
                  <option value="4th Year" ${this.state.formData.year === '4th Year' ? 'selected' : ''}>4th Year</option>
                  <option value="Postgraduate" ${this.state.formData.year === 'Postgraduate' ? 'selected' : ''}>Postgraduate</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Section 3: Domain -->
          <div class="space-y-4">
            <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light border-b border-stone-100 pb-1 mb-2">Role & Domain Selection</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="apply-domain" class="block text-[11px] font-medium text-text-muted mb-1.5">Internship Slot *</label>
                <select id="apply-domain" class="w-full text-[13.5px] px-3 py-2.5 rounded border border-stone-200 bg-white focus:outline-none focus:border-pink-ruby">
                  ${opportunitiesOptions}
                </select>
              </div>
              
              <!-- Resume uploader placeholder -->
              <div>
                <label class="block text-[11px] font-medium text-text-muted mb-1.5">Resume Attachment *</label>
                ${this.resumeUploader.render(this.state.formData.resumeFileName)}
              </div>
            </div>
          </div>

          <!-- Section 4: Links -->
          <div class="space-y-4">
            <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light border-b border-stone-100 pb-1 mb-2">Professional Profiles</span>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="apply-linkedin" class="block text-[11px] font-medium text-text-muted mb-1.5">LinkedIn Profile Link</label>
                <input type="url" id="apply-linkedin" value="${this.state.formData.linkedin}" placeholder="https://linkedin.com/in/..." class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-github" class="block text-[11px] font-medium text-text-muted mb-1.5">GitHub Profile Link</label>
                <input type="url" id="apply-github" value="${this.state.formData.github}" placeholder="https://github.com/..." class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
              <div>
                <label for="apply-portfolio" class="block text-[11px] font-medium text-text-muted mb-1.5">Portfolio Link</label>
                <input type="url" id="apply-portfolio" value="${this.state.formData.portfolio}" placeholder="https://..." class="w-full text-[13.5px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
              </div>
            </div>
          </div>

          <!-- Section 5: SOP -->
          <div>
            <label for="apply-sop" class="block text-[11px] font-medium text-text-muted mb-1.5">Statement of Purpose (SOP) *</label>
            <textarea id="apply-sop" required rows="4" placeholder="Explain why you want to intern at Amaanitvam and what skills you seek to apply (min 50 words)..." class="w-full text-[13.5px] px-4 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby resize-none">${this.state.formData.sop}</textarea>
          </div>

          <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
            <a href="#/internships" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-4 py-2.5 border border-stone-200 rounded text-text-dark hover:bg-stone-50 transition-colors">
              Cancel
            </a>
            <button type="submit" class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-6 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Proceed to Review
            </button>
          </div>
        </form>
      </div>
    `;
  }

  init(onStateChangeCallback) {
    if (this.state.step === 'form') {
      const form = document.getElementById('apply-internship-form');
      
      // Initialize resume upload dragging events
      ResumeUpload.init((filename) => {
        this.state.formData.resumeFileName = filename;
        if (onStateChangeCallback) onStateChangeCallback();
      });

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          if (!this.state.formData.resumeFileName) {
            alert('Failure: Please upload a resume document before proceeding.');
            return;
          }

          // Read all form inputs into state
          this.state.formData.fullName = document.getElementById('apply-name').value;
          this.state.formData.email = document.getElementById('apply-email').value;
          this.state.formData.phone = document.getElementById('apply-phone').value;
          this.state.formData.college = document.getElementById('apply-college').value;
          this.state.formData.degree = document.getElementById('apply-degree').value;
          this.state.formData.year = document.getElementById('apply-year').value;
          
          const domainSelect = document.getElementById('apply-domain');
          this.state.formData.domain = domainSelect.options[domainSelect.selectedIndex].text.split(' (')[0];
          
          this.state.formData.linkedin = document.getElementById('apply-linkedin').value;
          this.state.formData.github = document.getElementById('apply-github').value;
          this.state.formData.portfolio = document.getElementById('apply-portfolio').value;
          this.state.formData.sop = document.getElementById('apply-sop').value;

          // Proceed to review
          this.state.step = 'preview';
          if (onStateChangeCallback) onStateChangeCallback();
        });
      }
    } else if (this.state.step === 'preview') {
      const backBtn = document.getElementById('btn-wizard-back');
      const submitBtn = document.getElementById('btn-wizard-submit');

      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.state.step = 'form';
          if (onStateChangeCallback) onStateChangeCallback();
        });
      }

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          // Generate a new Application ID
          const randomIdNum = Math.floor(Math.random() * 900) + 100; // E.g. 123
          this.state.submittedId = `AMT-INT-2026-${randomIdNum}`;

          // Transition to success screen
          this.state.step = 'success';
          if (onStateChangeCallback) onStateChangeCallback();
        });
      }
    }
  }
}
