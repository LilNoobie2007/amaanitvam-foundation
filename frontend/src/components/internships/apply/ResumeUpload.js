export default class ResumeUpload {
  render(selectedFileName = "") {
    return `
      <div class="border-2 border-dashed border-stone-200/80 hover:border-pink-ruby rounded-xl p-6 text-center bg-stone-50 cursor-pointer transition-colors duration-300 select-none" id="resume-dropzone">
        <input type="file" id="resume-file-input" class="hidden" accept=".pdf,.doc,.docx">
        
        <div class="space-y-2">
          <span class="text-3xl block">📎</span>
          <div class="font-sans text-[13.5px] text-text-muted">
            ${selectedFileName ? `
              <span class="font-semibold text-emerald-700">File Selected: ${selectedFileName}</span>
              <p class="text-[11px] text-text-light mt-1">Click or drag to replace resume doc.</p>
            ` : `
              <span class="font-semibold text-text-dark">Upload your Resume *</span>
              <p class="text-[11px] text-text-light mt-1">Supports PDF, DOC, DOCX up to 5MB.</p>
            `}
          </div>
        </div>
      </div>
    `;
  }

  static init(onChangeCallback) {
    const zone = document.getElementById('resume-dropzone');
    const input = document.getElementById('resume-file-input');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('border-pink-ruby', 'bg-pink-blush/30');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('border-pink-ruby', 'bg-pink-blush/30');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('border-pink-ruby', 'bg-pink-blush/30');
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (onChangeCallback) onChangeCallback(file.name);
      }
    });

    input.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (onChangeCallback) onChangeCallback(file.name);
      }
    });
  }
}
