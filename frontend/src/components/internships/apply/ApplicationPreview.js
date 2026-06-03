export default class ApplicationPreview {
  render(data = {}) {
    return `
      <div class="space-y-6 text-left select-none">
        
        <div class="pb-3 border-b border-stone-200">
          <h4 class="font-display font-semibold text-xl text-text-dark">Review Registration Details</h4>
          <p class="font-sans text-[13px] text-text-light mt-1">Please inspect coordinates and links before submitting. Reciprocal edits require returning to editing step.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-[14.5px] text-text-muted leading-relaxed">
          
          <div class="space-y-4">
            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Full Name</span>
              <strong class="font-semibold text-text-dark text-[16px]">${data.fullName || 'N/A'}</strong>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Email Address</span>
              <span class="text-text-dark">${data.email || 'N/A'}</span>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Phone Number</span>
              <span class="text-text-dark">${data.phone || 'N/A'}</span>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">College / University</span>
              <span class="text-text-dark">${data.college || 'N/A'}</span>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Degree & Year</span>
              <span class="text-text-dark">${data.degree || 'N/A'} (${data.year || 'N/A'})</span>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Internship Domain</span>
              <strong class="font-semibold text-pink-ruby text-[15px]">${data.domain || 'N/A'}</strong>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Resume Attachment</span>
              <span class="font-semibold text-emerald-700 font-mono text-[13.5px]">📎 ${data.resumeFileName || 'No resume uploaded'}</span>
            </div>

            <div>
              <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold">Professional Links</span>
              <div class="flex flex-col gap-1 text-[13.5px] mt-1 font-mono">
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="text-pink-ruby hover:underline">LinkedIn Profile</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="text-pink-ruby hover:underline">GitHub Profile</a>` : ''}
                ${data.portfolio ? `<a href="${data.portfolio}" target="_blank" class="text-pink-ruby hover:underline">Portfolio Link</a>` : ''}
              </div>
            </div>
          </div>

        </div>

        <div class="pt-4 border-t border-stone-100">
          <span class="text-text-light text-[11px] uppercase tracking-wider block font-interface font-bold mb-2">Statement of Purpose (SOP)</span>
          <p class="font-sans text-[14px] text-text-muted leading-relaxed font-light text-justify bg-stone-50 border border-stone-200 p-4 rounded-xl">
            ${data.sop || 'No statement written.'}
          </p>
        </div>

      </div>
    `;
  }
}
