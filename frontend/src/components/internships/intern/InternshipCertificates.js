export default class InternshipCertificates {
  render(intern) {
    if (!intern) return '';

    const elig = intern.certificateEligibility;
    if (!elig) return '';

    // Calculate details checks
    const isAttendancePassed = elig.attendanceThreshold;
    const isDeliverablesPassed = elig.deliverablesCompleted;
    const isApprovedPassed = elig.mentorApproval;

    const allPassed = isAttendancePassed && isDeliverablesPassed && isApprovedPassed;

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Credential Eligibility Check</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/internship/certificate-eligibility
          </span>
        </div>

        <div class="space-y-4 font-sans text-[13.5px] text-text-muted leading-relaxed">
          <p class="font-light">
            Official internship credentials are automatically generated upon passing our operational compliance gates. Please verify eligibility rules below:
          </p>

          <div class="space-y-3 p-4 bg-stone-50 border border-stone-200 rounded-xl select-none">
            
            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <div class="flex items-center gap-3">
                <span class="font-interface text-xl">${isAttendancePassed ? '✓' : '✗'}</span>
                <div>
                  <span class="font-medium text-text-dark block">Attendance Gate</span>
                  <span class="text-[11px] text-text-light">Requires overall participation rate &ge; 80%</span>
                </div>
              </div>
              <span class="font-interface font-bold text-[9px] uppercase tracking-widest ${isAttendancePassed ? 'text-emerald-700' : 'text-rose-700'}">
                ${isAttendancePassed ? 'Passed' : 'Failed'}
              </span>
            </div>

            <div class="flex items-center justify-between py-1 border-b border-stone-200/40">
              <div class="flex items-center gap-3">
                <span class="font-interface text-xl">${isDeliverablesPassed ? '✓' : '✗'}</span>
                <div>
                  <span class="font-medium text-text-dark block">Deliverables Gate</span>
                  <span class="text-[11px] text-text-light">Requires all assigned task deliverables APPROVED</span>
                </div>
              </div>
              <span class="font-interface font-bold text-[9px] uppercase tracking-widest ${isDeliverablesPassed ? 'text-emerald-700' : 'text-rose-700'}">
                ${isDeliverablesPassed ? 'Passed' : 'Pending'}
              </span>
            </div>

            <div class="flex items-center justify-between py-1">
              <div class="flex items-center gap-3">
                <span class="font-interface text-xl">${isApprovedPassed ? '✓' : '✗'}</span>
                <div>
                  <span class="font-medium text-text-dark block">Mentor Evaluation Signature</span>
                  <span class="text-[11px] text-text-light">Requires formal review sign-off by assigned mentor</span>
                </div>
              </div>
              <span class="font-interface font-bold text-[9px] uppercase tracking-widest ${isApprovedPassed ? 'text-emerald-700' : 'text-rose-700'}">
                ${isApprovedPassed ? 'Signed' : 'Pending'}
              </span>
            </div>

          </div>

          <!-- Download Action Card -->
          <div class="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="font-interface font-bold text-[9.5px] uppercase tracking-widest text-text-light block">Registry Status</span>
              <strong class="text-text-dark text-[15px] font-semibold">${allPassed ? 'Certificate Released' : 'Pending Gates Compliance'}</strong>
            </div>

            ${allPassed ? `
              <a href="#/verify?code=7B92XQK3" class="inline-flex items-center justify-center gap-1.5 font-interface font-semibold text-[10.5px] uppercase tracking-widest px-6 py-3 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Verification Credential
              </a>
            ` : `
              <button disabled class="font-interface font-semibold text-[10.5px] uppercase tracking-widest px-6 py-3 rounded bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300">
                Download Credential (Locked)
              </button>
            `}
          </div>
        </div>

      </div>
    `;
  }
}
