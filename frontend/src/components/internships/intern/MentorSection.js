export default class MentorSection {
  render(mentor) {
    if (!mentor) return '';

    return `
      <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm text-left space-y-4">
        <h4 class="font-display font-semibold text-lg text-text-dark border-b border-stone-100 pb-2">Assigned Mentor & Syncs</h4>
        
        <div class="flex items-center gap-4 py-2 select-none">
          <div class="w-12 h-12 rounded-full bg-pink-ruby text-white font-display font-bold flex items-center justify-center text-[18px]">
            ${mentor.name.charAt(0)}
          </div>
          <div>
            <h5 class="font-display font-semibold text-[16px] text-text-dark leading-none">${mentor.name}</h5>
            <span class="font-sans text-[12.5px] text-text-light block mt-1">${mentor.role}</span>
          </div>
        </div>

        <div class="space-y-3 font-sans text-[13.5px] text-text-muted border-t border-stone-100 pt-4">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-text-dark">Email:</span>
            <a href="mailto:${mentor.email}" class="text-pink-ruby hover:underline font-mono text-[13px]">${mentor.email}</a>
          </div>
          <div class="flex items-start gap-2">
            <span class="font-semibold text-text-dark shrink-0">Meeting Schedule:</span>
            <span>Every Thursday at 4:30 PM (Weekly retrospective sync via Google Meet).</span>
          </div>
        </div>
      </div>
    `;
  }
}
