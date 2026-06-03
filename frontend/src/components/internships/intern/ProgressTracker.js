import { progress } from '../../../mocks/progress.js';

export default class ProgressTracker {
  render(intern) {
    if (!intern) return '';

    const prog = progress.find(p => p.internId === intern.id);
    if (!prog) return '';

    // Render onboarding checklist status
    const checks = [
      { key: "welcomeSession", label: "Welcome Orientation Sync" },
      { key: "documentation", label: "Documentation & ID Registry submitted" },
      { key: "chatChannel", label: "Slack Communication channels joined" },
      { key: "mentorIntro", label: "1-on-1 Mentor Alignment" },
      { key: "firstTask", label: "First Task deliverable assigned" }
    ];

    const checksHTML = checks.map(c => {
      const isChecked = intern.onboardingChecklist && intern.onboardingChecklist[c.key];
      return `
        <label class="flex items-center gap-3 text-[13.5px] text-text-muted cursor-pointer select-none">
          <input type="checkbox" ${isChecked ? 'checked' : ''} disabled class="rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby cursor-not-allowed">
          <span class="${isChecked ? 'line-through text-text-light' : 'text-text-dark font-medium'}">${c.label}</span>
        </label>
      `;
    }).join('');

    // Render weekly logs list
    const logsHTML = (prog.weeklyLogs || []).map(log => {
      return `
        <div class="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2 select-none text-[13.5px]">
          <div class="flex items-center justify-between">
            <span class="font-interface font-bold text-[10px] uppercase tracking-widest text-pink-ruby">${log.week}</span>
            <span class="inline-block text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Logged</span>
          </div>
          <div class="text-text-dark"><strong class="font-semibold text-text-light">Achievements:</strong> ${log.achievements}</div>
          <div class="text-text-dark"><strong class="font-semibold text-text-light">Blockers:</strong> ${log.blockers || 'None'}</div>
          ${log.mentorComments ? `
            <div class="mt-2 p-2.5 border-t border-stone-200/60 bg-white rounded text-text-muted text-[12.5px] font-light leading-relaxed">
              <strong class="font-semibold text-text-dark font-display">Mentor comments:</strong> "${log.mentorComments}"
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left space-y-6">
        <div class="flex items-center justify-between pb-4 border-b border-stone-100">
          <h3 class="font-display font-semibold text-[20px] text-text-dark">Onboarding & Progress Ledger</h3>
          <span class="font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light">
            GET /api/internship/progress
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Onboarding Checklist (col-span-5) -->
          <div class="md:col-span-5 space-y-4">
            <h4 class="font-display font-semibold text-lg text-text-dark">Onboarding Milestones</h4>
            <div class="flex flex-col gap-3 p-4 bg-stone-50/50 border border-stone-200/80 rounded-xl">
              ${checksHTML}
            </div>
          </div>

          <!-- Weekly Journals (col-span-7) -->
          <div class="md:col-span-7 space-y-4">
            <h4 class="font-display font-semibold text-lg text-text-dark">Weekly Progress Journals</h4>
            <div class="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              ${logsHTML.length > 0 ? logsHTML : `
                <p class="font-sans text-[14px] text-text-light">No weekly progress journals filed yet.</p>
              `}
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
