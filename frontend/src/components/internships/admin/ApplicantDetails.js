import { internshipApplications } from '../../../mocks/applications.js';
import { applicants } from '../../../mocks/applicants.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';

export default class ApplicantDetails {
  constructor(appId) {
    this.appId = appId;
    this.app = internshipApplications.find(a => a.id === appId) || {};
    this.applicant = applicants.find(ap => ap.id === this.app.applicantId) || {};
    this.opportunity = internshipOpportunities.find(opp => opp.id === this.app.opportunityId) || {};
  }

  render() {
    if (!this.app.id) {
      return `
        <div class="bg-white border border-stone-200 rounded-xl p-8 text-center max-w-xl mx-auto shadow-sm">
          <p class="font-sans text-[15px] text-text-muted">Application profile not found.</p>
          <a href="#/admin/internships" class="inline-block mt-4 font-interface font-bold text-[11px] uppercase tracking-widest text-pink-ruby">Back to Dashboard</a>
        </div>
      `;
    }

    const app = this.app;
    const applicant = this.applicant;
    const opp = this.opportunity;
    const evalObj = app.evaluation || { communication: 5, technical: 5, motivation: 5, overall: 5 };

    const scorecardHTML = `
      <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-4">
        <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-2 border-b border-stone-100">
          Evaluation Scorecard
        </h4>
        
        <div class="space-y-4 font-sans text-[13.5px]">
          <div>
            <div class="flex justify-between mb-1.5">
              <span class="text-text-muted font-medium">Communication Skills</span>
              <strong id="val-communication" class="text-text-dark font-semibold">${evalObj.communication}/10</strong>
            </div>
            <input type="range" id="score-communication" min="1" max="10" value="${evalObj.communication}" class="w-full accent-pink-ruby cursor-pointer">
          </div>

          <div>
            <div class="flex justify-between mb-1.5">
              <span class="text-text-muted font-medium">Technical Competency</span>
              <strong id="val-technical" class="text-text-dark font-semibold">${evalObj.technical}/10</strong>
            </div>
            <input type="range" id="score-technical" min="1" max="10" value="${evalObj.technical}" class="w-full accent-pink-ruby cursor-pointer">
          </div>

          <div>
            <div class="flex justify-between mb-1.5">
              <span class="text-text-muted font-medium">Motivation & Alignment</span>
              <strong id="val-motivation" class="text-text-dark font-semibold">${evalObj.motivation}/10</strong>
            </div>
            <input type="range" id="score-motivation" min="1" max="10" value="${evalObj.motivation}" class="w-full accent-pink-ruby cursor-pointer">
          </div>

          <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
            <span class="text-text-dark font-bold">Overall Rating</span>
            <strong id="val-overall" class="text-lg text-pink-ruby font-bold font-interface">${evalObj.overall}/10</strong>
          </div>
        </div>

        <button id="save-scorecard-btn" class="w-full mt-4 font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
          Save Scorecard
        </button>
      </div>
    `;

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left select-none scroll-reveal revealed">
        
        <!-- Left Side: Profile info (col span 8) -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- Candidate Header -->
          <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <span class="font-interface text-[11px] font-bold text-text-light uppercase tracking-widest bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">${app.applicationId}</span>
                <span id="badge-status" class="font-sans text-[11px] font-semibold text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz/65">${app.status}</span>
              </div>
              <h3 class="font-display font-semibold text-[26px] text-text-dark leading-tight">${applicant.fullName}</h3>
              <p class="font-sans text-[14px] text-text-muted mt-1 font-light">${applicant.degree} • ${applicant.college} (${applicant.year})</p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-2">
              <a href="#/admin/internships" class="font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 border border-stone-200 rounded text-center text-text-dark hover:bg-stone-50 transition-colors">
                ← Back
              </a>
              <button id="btn-review-resume" class="font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded ${applicant.resumeReviewed ? 'bg-stone-100 text-stone-500 cursor-default border border-stone-200' : 'bg-gold-light text-gold-ochre border border-gold-satin/50 hover:bg-gold-light/95'} transition-colors">
                ${applicant.resumeReviewed ? 'Resume Reviewed' : 'Review Resume'}
              </button>
            </div>
          </div>

          <!-- Application Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Contact & Social Links -->
            <div class="bg-white border border-stone-200/60 rounded-xl p-5 shadow-sm space-y-4">
              <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-2 border-b border-stone-100">
                Contact & Portfolios
              </h4>
              <div class="space-y-3 font-sans text-[13px] text-text-muted">
                <div>
                  <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Email Address</span>
                  <a href="mailto:${applicant.email}" class="text-text-dark hover:underline font-medium">${applicant.email}</a>
                </div>
                <div>
                  <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Phone Number</span>
                  <span class="text-text-dark font-medium">${applicant.phone}</span>
                </div>
                <div class="flex flex-wrap gap-3 pt-2">
                  ${applicant.linkedin ? `<a href="${applicant.linkedin}" target="_blank" class="font-interface text-[11.5px] font-bold text-pink-ruby hover:underline">LinkedIn ↗</a>` : ''}
                  ${applicant.github ? `<a href="${applicant.github}" target="_blank" class="font-interface text-[11.5px] font-bold text-pink-ruby hover:underline">GitHub ↗</a>` : ''}
                  ${applicant.portfolio ? `<a href="${applicant.portfolio}" target="_blank" class="font-interface text-[11.5px] font-bold text-pink-ruby hover:underline">Portfolio ↗</a>` : ''}
                </div>
              </div>
            </div>

            <!-- Role Specification -->
            <div class="bg-white border border-stone-200/60 rounded-xl p-5 shadow-sm space-y-4">
              <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-2 border-b border-stone-100">
                Opportunity Details
              </h4>
              <div class="space-y-3 font-sans text-[13px] text-text-muted">
                <div>
                  <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Applying For</span>
                  <span class="text-text-dark font-bold text-[14px]">${opp.title}</span>
                </div>
                <div>
                  <span class="block text-[10.5px] uppercase font-interface text-text-light font-bold">Internship Domain</span>
                  <span class="text-text-dark font-semibold">${opp.domain}</span>
                </div>
                <div class="flex justify-between items-center text-[12px] pt-1">
                  <span>Duration: <strong class="text-text-dark">${opp.duration}</strong></span>
                  <span>Mode: <strong class="text-text-dark">${opp.mode}</strong></span>
                </div>
              </div>
            </div>

          </div>

          <!-- SOP Section -->
          <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm">
            <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-3 border-b border-stone-100 mb-4">
              Statement of Purpose (SOP)
            </h4>
            <blockquote class="font-sans text-[14.5px] text-text-muted leading-relaxed font-light italic bg-stone-50/70 border-l-3 border-pink-ruby p-4 rounded-r">
              "${applicant.sop || 'No SOP provided by candidate.'}"
            </blockquote>
          </div>

          <!-- Resume Attachment Preview -->
          <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm">
            <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-3 border-b border-stone-100 mb-4">
              Candidate Resume
            </h4>
            <div class="flex items-center justify-between border border-stone-200 rounded-lg p-4 bg-stone-50/50 hover:bg-stone-50 transition-colors">
              <div class="flex items-center gap-3">
                <!-- PDF Icon Metaphor -->
                <div class="bg-red-50 text-red-600 border border-red-200 rounded p-2.5 font-bold font-interface text-sm select-none">
                  PDF
                </div>
                <div class="text-left">
                  <span class="block font-interface font-semibold text-[13.5px] text-text-dark">${applicant.resumeFileName || 'resume.pdf'}</span>
                  <span class="block font-sans text-[11px] text-text-light font-light">Simulated PDF document asset</span>
                </div>
              </div>
              
              <button id="btn-download-resume" class="font-interface font-bold text-[9.5px] uppercase tracking-widest px-4 py-2 border border-stone-200 rounded hover:bg-white transition-colors bg-stone-50 shadow-sm">
                View & Download
              </button>
            </div>
          </div>

        </div>

        <!-- Right Side: Evaluation & Action Panel (col span 4) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Scorecard Panel -->
          ${scorecardHTML}

          <!-- Recruitment Transition Panel -->
          <div class="bg-white border border-stone-200/80 rounded-xl p-5 shadow-sm space-y-4">
            <h4 class="font-interface font-bold text-[11.5px] uppercase tracking-widest text-text-dark pb-2 border-b border-stone-100">
              Pipeline Operations
            </h4>

            <div class="flex flex-col gap-2.5">
              <button data-status="Shortlisted" class="btn-change-status font-sans text-[13px] font-semibold text-text-dark hover:text-pink-ruby px-4 py-2.5 rounded border border-stone-200 bg-white hover:border-pink-ruby/60 shadow-sm text-left transition-colors flex items-center justify-between">
                <span>Shortlist Candidate</span>
                <span class="font-interface text-[9px] uppercase font-bold text-text-light">Stage 2</span>
              </button>

              <button data-status="Interview Scheduled" class="btn-change-status font-sans text-[13px] font-semibold text-text-dark hover:text-gold-ochre px-4 py-2.5 rounded border border-stone-200 bg-white hover:border-gold-satin/60 shadow-sm text-left transition-colors flex items-center justify-between">
                <span>Schedule Interview</span>
                <span class="font-interface text-[9px] uppercase font-bold text-text-light">Stage 3</span>
              </button>

              <button data-status="Offer Sent" class="btn-change-status font-sans text-[13px] font-semibold text-text-dark hover:text-purple-700 px-4 py-2.5 rounded border border-stone-200 bg-white hover:border-purple-450 shadow-sm text-left transition-colors flex items-center justify-between">
                <span>Send Internship Offer</span>
                <span class="font-interface text-[9px] uppercase font-bold text-text-light">Stage 4</span>
              </button>

              <button data-status="Offer Accepted" class="btn-change-status font-sans text-[13px] font-semibold text-text-dark hover:text-emerald-700 px-4 py-2.5 rounded border border-stone-200 bg-white hover:border-emerald-500 shadow-sm text-left transition-colors flex items-center justify-between">
                <span>Accept Offer (Select)</span>
                <span class="font-interface text-[9px] uppercase font-bold text-text-light">Stage 5</span>
              </button>

              <button data-status="Rejected" class="btn-change-status font-sans text-[13px] font-semibold text-red-600 hover:bg-red-50/50 px-4 py-2.5 rounded border border-stone-200 bg-white hover:border-red-400/60 shadow-sm text-left transition-colors flex items-center justify-between">
                <span>Reject Application</span>
                <span class="font-interface text-[9px] uppercase font-bold text-red-500">Decline</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  init() {
    if (!this.app.id) return;

    // Sliders
    const scoreComm = document.getElementById('score-communication');
    const scoreTech = document.getElementById('score-technical');
    const scoreMotiv = document.getElementById('score-motivation');

    // Values labels
    const valComm = document.getElementById('val-communication');
    const valTech = document.getElementById('val-technical');
    const valMotiv = document.getElementById('val-motivation');
    const valOverall = document.getElementById('val-overall');

    const updateScores = () => {
      const comm = parseInt(scoreComm.value);
      const tech = parseInt(scoreTech.value);
      const motiv = parseInt(scoreMotiv.value);
      const overall = Math.round((comm + tech + motiv) / 3);

      if (valComm) valComm.innerText = `${comm}/10`;
      if (valTech) valTech.innerText = `${tech}/10`;
      if (valMotiv) valMotiv.innerText = `${motiv}/10`;
      if (valOverall) valOverall.innerText = `${overall}/10`;

      // Sync back to internal object
      this.app.evaluation = {
        communication: comm,
        technical: tech,
        motivation: motiv,
        overall: overall
      };
    };

    if (scoreComm) scoreComm.addEventListener('input', updateScores);
    if (scoreTech) scoreTech.addEventListener('input', updateScores);
    if (scoreMotiv) scoreMotiv.addEventListener('input', updateScores);

    // Save Scorecard button
    const saveBtn = document.getElementById('save-scorecard-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        alert(`Verification: Scorecard evaluations for ${this.applicant.fullName} successfully updated.`);
      });
    }

    // Review resume action
    const btnReviewResume = document.getElementById('btn-review-resume');
    if (btnReviewResume && !this.applicant.resumeReviewed) {
      btnReviewResume.addEventListener('click', () => {
        this.applicant.resumeReviewed = true;
        btnReviewResume.innerText = 'Resume Reviewed';
        btnReviewResume.className = 'font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded bg-stone-100 text-stone-500 cursor-default border border-stone-200 transition-colors';
        alert('Verification: Resume reviewed status saved successfully.');
      });
    }

    // Download resume action
    const btnDownloadResume = document.getElementById('btn-download-resume');
    if (btnDownloadResume) {
      btnDownloadResume.addEventListener('click', () => {
        alert(`Verification: Downloading mock asset file "${this.applicant.resumeFileName}"...`);
      });
    }

    // Change status actions
    const changeStatusButtons = document.querySelectorAll('.btn-change-status');
    const badgeStatus = document.getElementById('badge-status');

    changeStatusButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStatus = btn.dataset.status;
        this.app.status = targetStatus;
        if (badgeStatus) {
          badgeStatus.innerText = targetStatus;
        }
        alert(`Verification: Applicant status successfully shifted to "${targetStatus}".`);
      });
    });
  }
}
