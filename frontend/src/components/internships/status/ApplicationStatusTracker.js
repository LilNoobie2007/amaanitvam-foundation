import { internshipApplications } from '../../../mocks/applications.js';
import { applicants } from '../../../mocks/applicants.js';
import { internshipOpportunities } from '../../../mocks/opportunities.js';

export default class ApplicationStatusTracker {
  constructor() {
    this.searchResult = null;
    this.hasSearched = false;
    this.searchedId = '';
  }

  render() {
    // Check if redirect parameters exist in URL query e.g. ?appId=AMT-INT-2026-004
    const urlParams = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.substring(window.location.hash.indexOf('?')) : '');
    const redirectAppId = urlParams.get('appId');
    if (redirectAppId && !this.hasSearched) {
      this.searchedId = redirectAppId;
      const app = internshipApplications.find(a => a.applicationId === redirectAppId);
      if (app) {
        const applicant = applicants.find(ap => ap.id === app.applicantId);
        const opportunity = internshipOpportunities.find(o => o.id === app.opportunityId);
        this.searchResult = { app, applicant, opportunity };
      }
      this.hasSearched = true;
    }

    let resultHTML = '';
    if (this.hasSearched) {
      if (this.searchResult) {
        const { app, applicant, opportunity } = this.searchResult;
        
        // Define timeline indices
        const stages = [
          "Applied",
          "Screening",
          "Shortlisted",
          "Interview Scheduled",
          "Interview Completed",
          "Selected",
          "Offer Sent",
          "Offer Accepted"
        ];
        
        const currentIdx = stages.indexOf(app.status);

        const timelineSteps = stages.map((st, idx) => {
          let stepColor = 'border-stone-200 text-text-light';
          let dotColor = 'bg-stone-200';
          
          if (idx < currentIdx) {
            stepColor = 'border-emerald-600 text-emerald-800';
            dotColor = 'bg-emerald-600';
          } else if (idx === currentIdx) {
            if (app.status === 'Rejected') {
              stepColor = 'border-rose-500 text-rose-700 font-semibold';
              dotColor = 'bg-rose-500';
            } else {
              stepColor = 'border-pink-ruby text-pink-ruby font-semibold';
              dotColor = 'bg-pink-ruby animate-pulse';
            }
          }

          let nameStr = st;
          if (st === 'Offer Accepted' && app.status === 'Offer Declined') nameStr = 'Offer Declined';
          if (st === 'Offer Accepted' && app.status === 'Offer Sent' && idx === 6) nameStr = 'Offer Sent (Pending)';

          return `
            <div class="relative pl-8 border-l-2 ${stepColor} pb-8 last:border-0 last:pb-0 select-none">
              <!-- Dot marker -->
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full ${dotColor} border-2 border-white shadow-sm"></div>
              <h5 class="font-interface font-semibold text-[13.5px] uppercase tracking-wider">${nameStr}</h5>
              <p class="font-sans text-[12.5px] font-light text-text-light mt-1">
                ${idx < currentIdx ? 'Completed step' : idx === currentIdx ? 'Current Stage' : 'Pending review'}
              </p>
            </div>
          `;
        }).join('');

        let extraDetails = '';
        if (app.status === 'Interview Scheduled') {
          extraDetails = `
            <div class="mt-6 p-4 bg-pink-blush/40 border border-pink-quartz text-pink-ruby rounded-xl font-sans text-[13.5px] leading-relaxed">
              <strong class="font-semibold">Schedule Note:</strong> An online interview has been scheduled for this candidate on <strong>June 10 at 11:30 AM</strong> via Google Meet. The calendar link has been sent to your email.
            </div>
          `;
        } else if (app.status === 'Offer Sent') {
          extraDetails = `
            <div class="mt-6 p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl font-sans text-[13.5px] leading-relaxed">
              <strong class="font-semibold">Offer Released:</strong> Amaanitvam Foundation has sent you a formal Summer 2026 placement offer. Please review documentation guidelines in your email and click accept below to confirm onboarding.
              <div class="mt-4 flex gap-3">
                <button id="btn-mock-accept-offer" class="font-interface font-bold text-[9px] uppercase tracking-widest px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800">
                  Accept Offer
                </button>
                <button id="btn-mock-decline-offer" class="font-interface font-bold text-[9px] uppercase tracking-widest px-4 py-2 border border-stone-300 text-stone-600 rounded bg-white hover:bg-stone-50">
                  Decline
                </button>
              </div>
            </div>
          `;
        } else if (app.status === 'Rejected') {
          extraDetails = `
            <div class="mt-6 p-4 bg-stone-100 border border-stone-250 text-text-muted rounded-xl font-sans text-[13.5px] leading-relaxed">
              <strong class="font-semibold">Candidate Status:</strong> Unfortunately, due to high slot constraints and domain ratios in this cohort, we are unable to accept your application at this moment. We have filed your profile in our databases for future openings.
            </div>
          `;
        } else if (app.status === 'Waitlisted') {
          extraDetails = `
            <div class="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-sans text-[13.5px] leading-relaxed font-light">
              <strong class="font-semibold">Waitlisted Profile:</strong> Candidate meets criteria successfully, but slot capacity limits are reached. We will check vacancies periodically until June 30.
            </div>
          `;
        }

        resultHTML = `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-reveal revealed mt-10">
            
            <!-- Metadata Summary Card (col span 5) -->
            <div class="lg:col-span-5 bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm text-left space-y-4">
              <h4 class="font-display font-semibold text-lg text-text-dark border-b border-stone-100 pb-2">Application Metadata</h4>
              
              <div class="space-y-3 font-sans text-[14px] text-text-muted">
                <div class="flex justify-between py-1 border-b border-stone-100">
                  <span class="text-text-light text-[12.5px]">Application ID</span>
                  <strong class="font-mono text-text-dark">${app.applicationId}</strong>
                </div>
                <div class="flex justify-between py-1 border-b border-stone-100">
                  <span class="text-text-light text-[12.5px]">Candidate Name</span>
                  <strong class="font-medium text-text-dark">${applicant.fullName}</strong>
                </div>
                <div class="flex justify-between py-1 border-b border-stone-100">
                  <span class="text-text-light text-[12.5px]">Target Role</span>
                  <strong class="font-semibold text-text-dark">${opportunity.title}</strong>
                </div>
                <div class="flex justify-between py-1 border-b border-stone-100">
                  <span class="text-text-light text-[12.5px]">Applied Date</span>
                  <span class="text-text-dark">${app.appliedDate}</span>
                </div>
                <div class="flex justify-between py-1">
                  <span class="text-text-light text-[12.5px]">Evaluation Status</span>
                  <strong class="font-interface uppercase text-[10px] text-pink-ruby bg-pink-blush px-2 py-0.5 rounded border border-pink-quartz">${app.status}</strong>
                </div>
              </div>

              ${extraDetails}
            </div>

            <!-- Visual Pipeline Steps (col span 7) -->
            <div class="lg:col-span-7 bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm text-left">
              <h4 class="font-display font-semibold text-lg text-text-dark border-b border-stone-100 pb-2 mb-6">Recruitment Tracker</h4>
              <div class="py-2 pl-4">
                ${timelineSteps}
              </div>
            </div>

          </div>
        `;
      } else {
        resultHTML = `
          <div class="text-center py-10 bg-stone-100 border border-stone-200 rounded-xl max-w-md mx-auto mt-10 scroll-reveal revealed select-none">
            <span class="text-3xl block mb-2">🔍</span>
            <p class="font-sans text-[14.5px] font-semibold text-text-dark">Record Not Found</p>
            <p class="font-sans text-[13px] text-text-light mt-1 px-4 leading-relaxed">
              We couldn't locate any applications matching ID <strong>${this.searchedId}</strong>. Please check your credentials and try again.
            </p>
          </div>
        `;
      }
    }

    return `
      <div class="max-w-4xl mx-auto select-none">
        
        <!-- Search bar panel -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-6 max-w-md mx-auto shadow-sm text-left space-y-4">
          <h3 class="font-display font-semibold text-lg text-text-dark">Audit Application Pipeline</h3>
          <p class="font-sans text-[13px] text-text-light leading-relaxed font-light">
            Enter your unique Application ID to inspect screening reviews, interview details, and offer releases.
          </p>

          <form id="tracker-lookup-form" class="space-y-4 font-sans">
            <div>
              <label for="track-id" class="block text-[10px] font-interface font-bold uppercase tracking-widest text-text-light mb-1.5">Application ID *</label>
              <input type="text" id="track-id" required value="${this.searchedId}" placeholder="e.g. AMT-INT-2026-004" class="w-full font-mono text-[14px] px-3.5 py-2.5 rounded border border-stone-200 focus:outline-none focus:border-pink-ruby">
            </div>

            <button type="submit" class="w-full font-interface font-semibold text-[10.5px] uppercase tracking-widest py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
              Lookup Status Coordinates
            </button>
          </form>
        </div>

        ${resultHTML}

      </div>
    `;
  }

  static init(onStateChangeCallback) {
    const form = document.getElementById('tracker-lookup-form');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const appId = document.getElementById('track-id').value.trim();
        this.searchedId = appId;
        
        const app = internshipApplications.find(a => a.applicationId === appId);
        
        if (app) {
          const applicant = applicants.find(ap => ap.id === app.applicantId);
          const opportunity = internshipOpportunities.find(o => o.id === app.opportunityId);
          this.searchResult = { app, applicant, opportunity };
        } else {
          this.searchResult = null;
        }

        this.hasSearched = true;
        
        // Remove appId query from hash URL if any, to avoid looping redirects
        if (window.location.hash.includes('?')) {
          history.replaceState(null, '', '#/internships/status');
        }

        if (onStateChangeCallback) onStateChangeCallback();
      });
    }

    // Offer accept mock triggers
    const acceptBtn = document.getElementById('btn-mock-accept-offer');
    const declineBtn = document.getElementById('btn-mock-decline-offer');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        alert('Success: Offer accepted! Your onboarding dashboard has been initialized.');
        if (this.searchResult && this.searchResult.app) {
          this.searchResult.app.status = 'Offer Accepted';
        }
        if (onStateChangeCallback) onStateChangeCallback();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => {
        alert('Verification: Offer declined.');
        if (this.searchResult && this.searchResult.app) {
          this.searchResult.app.status = 'Offer Declined';
        }
        if (onStateChangeCallback) onStateChangeCallback();
      });
    }
  }
}
