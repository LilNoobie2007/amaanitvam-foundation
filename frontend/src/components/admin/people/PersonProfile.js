import { people } from '../../../mocks/admin/people.js';
import { cohorts } from '../../../mocks/admin/cohorts.js';
import { projects } from '../../../mocks/admin/projects.js';
import { certificates } from '../../../mocks/admin/certificates.js';

export default class PersonProfile {
  constructor(personId) {
    this.personId = personId;
  }

  render() {
    const person = people.find(p => p.id === this.personId);
    if (!person) {
      return `
        <div class="py-12 text-center text-text-light font-sans bg-white border border-stone-200 rounded-xl shadow-sm">
          <p class="text-base font-semibold">User profile not found</p>
          <a href="#/admin/people" class="text-pink-ruby hover:underline mt-2 inline-block">&larr; Back to Directory</a>
        </div>
      `;
    }

    const cohort = cohorts.find(c => c.id === person.cohortId);
    const relatedCerts = person.relatedRecords?.certificates || [];
    const relatedEvents = person.relatedRecords?.events || [];
    const relatedProjects = person.relatedRecords?.projects || [];
    const relatedDonations = person.relatedRecords?.donations || [];

    // Construct Timeline Items
    const timelineItems = [];
    relatedCerts.forEach(c => {
      timelineItems.push({
        date: c.date || person.lastActivity,
        title: `Certificate ${c.status}`,
        desc: `${c.name} (${c.id})`,
        icon: `<span class="bg-pink-blush text-pink-ruby border border-pink-quartz p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></span>`
      });
    });
    relatedEvents.forEach(e => {
      timelineItems.push({
        date: person.lastActivity,
        title: `Attended Event: ${e.name}`,
        desc: `Role: ${e.role} &bull; Check-in: ${e.checkIn}`,
        icon: `<span class="bg-blue-50 text-blue-800 border border-blue-100 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span>`
      });
    });
    relatedProjects.forEach(p => {
      timelineItems.push({
        date: person.lastActivity,
        title: `Contributed to Project`,
        desc: `${p.name} - Status: ${p.status}`,
        icon: `<span class="bg-emerald-50 text-emerald-800 border border-emerald-100 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg></span>`
      });
    });
    relatedDonations.forEach(d => {
      timelineItems.push({
        date: d.date,
        title: `Donation Processed`,
        desc: `Amount: INR ${d.amount.toLocaleString()} (${d.status})`,
        icon: `<span class="bg-gold-light text-gold-ochre border border-gold-satin/20 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 8h4m-4 8h4"/></svg></span>`
      });
    });

    // Sort timeline by date
    timelineItems.sort((a, b) => b.date.localeCompare(a.date));

    const timelineHTML = timelineItems.map(item => `
      <div class="flex gap-4">
        <div class="flex flex-col items-center shrink-0">
          ${item.icon}
          <div class="w-0.5 h-full bg-stone-200 my-1"></div>
        </div>
        <div class="pb-6 text-left">
          <span class="block text-[11px] text-text-light font-interface">${item.date}</span>
          <h6 class="font-sans font-bold text-[13px] text-text-dark mt-0.5">${item.title}</h6>
          <p class="text-[12px] text-text-muted mt-0.5">${item.desc}</p>
        </div>
      </div>
    `).join("");

    const projectCheckboxes = projects.map(proj => {
      const isAssigned = relatedProjects.some(rp => rp.id === proj.id) ? "checked" : "";
      return `
        <label class="flex items-center gap-2 text-[12px] text-text-muted font-sans cursor-pointer">
          <input type="checkbox" class="profile-project-assign h-4 w-4 rounded text-pink-ruby focus:ring-pink-ruby border-stone-300" data-id="${proj.id}" data-name="${proj.title}" ${isAssigned} />
          <span>${proj.title}</span>
        </label>
      `;
    }).join("");

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Breadcrumb & Back -->
        <div>
          <a href="#/admin/people" class="font-interface font-bold text-[11px] uppercase tracking-wider text-pink-ruby hover:underline flex items-center gap-1">
            &larr; Back to Directory
          </a>
        </div>

        <!-- 360 Head Info -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-start gap-4">
            <div class="h-14 w-14 rounded-full bg-pink-blush border border-pink-quartz flex items-center justify-center font-display font-bold text-pink-ruby text-xl">
              ${person.name.charAt(0)}${person.name.split(' ')[1]?.charAt(0) || ''}
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h2 class="font-display font-bold text-2xl text-text-dark">${person.name}</h2>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-pink-blush text-pink-ruby border-pink-quartz/40">${person.type}</span>
              </div>
              <p class="text-[12.5px] text-text-muted font-sans mt-0.5">${person.roleTitle || "Unassigned Role"} &bull; ${cohort ? cohort.name : "No active cohort cycle"}</p>
              <div class="flex gap-4 mt-2.5 text-[11.5px] text-text-light font-interface">
                <span>Email: ${person.email}</span>
                <span>Phone: ${person.phone}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[12px] font-bold text-text-light font-interface uppercase">Status:</span>
            <select id="profile-status-select" class="px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans font-semibold text-[12px]">
              <option value="Active" ${person.status === "Active" ? "selected" : ""}>Active</option>
              <option value="Completed" ${person.status === "Completed" ? "selected" : ""}>Completed</option>
              <option value="Pending" ${person.status === "Pending" ? "selected" : ""}>Pending</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Column 1 & 2: Timeline & Module Relationships -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Timeline of Operations -->
            <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
              <h4 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100">
                Participation Timeline (360&deg; View)
              </h4>
              <div class="relative pl-2 mt-4 space-y-1">
                ${timelineHTML || `
                  <div class="text-center py-6 text-text-light text-[12.5px] font-sans">
                    No timeline items logged.
                  </div>
                `}
              </div>
            </div>

            <!-- Assigned Projects and Credentials Details -->
            <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
              <h4 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100">
                Active Projects & Certifications
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Projects List -->
                <div class="space-y-3 text-left">
                  <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Projects Roster</span>
                  <div class="space-y-2">
                    ${relatedProjects.map(proj => `
                      <div class="p-3 border border-stone-100 rounded bg-stone-50/50 text-[12.5px] font-sans flex items-center justify-between">
                        <div>
                          <strong class="font-semibold text-text-dark">${proj.name}</strong>
                          <span class="block text-[10.5px] text-text-light mt-0.5">Status: ${proj.status}</span>
                        </div>
                        <a href="#/admin/projects" class="text-pink-ruby hover:underline font-bold text-[10px] uppercase font-interface">Manage</a>
                      </div>
                    `).join("") || `
                      <span class="block text-[12px] text-text-light italic font-sans">No projects assigned.</span>
                    `}
                  </div>
                </div>

                <!-- Certificates List -->
                <div class="space-y-3 text-left">
                  <span class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Issued Credentials</span>
                  <div class="space-y-2">
                    ${relatedCerts.map(cert => {
                      const isPending = cert.status === "Pending";
                      return `
                        <div class="p-3 border border-stone-100 rounded bg-stone-50/50 text-[12.5px] font-sans flex items-center justify-between">
                          <div>
                            <strong class="font-semibold text-text-dark">${cert.name}</strong>
                            <span class="block text-[10.5px] text-text-light mt-0.5">${cert.id} &bull; ${cert.status}</span>
                          </div>
                          ${isPending ? `
                            <button class="profile-verify-cert-btn bg-pink-ruby hover:bg-pink-ruby/90 text-white font-interface font-bold text-[9px] uppercase tracking-wider px-2 py-1 rounded shadow-sm" data-id="${cert.id}">
                              Approve
                            </button>
                          ` : `
                            <a href="#/admin/certificates" class="text-pink-ruby hover:underline font-bold text-[10px] uppercase font-interface">View</a>
                          `}
                        </div>
                      `;
                    }).join("") || `
                      <span class="block text-[12px] text-text-light italic font-sans">No certificates issued.</span>
                    `}
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- Column 3: Custom Actions & Notes -->
          <div class="space-y-6">
            
            <!-- Quick Actions Panel -->
            <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-4">
              <h4 class="font-display font-semibold text-lg text-text-dark pb-2 border-b border-stone-100">
                Action Panel
              </h4>
              
              <!-- Assigned Cohort Select -->
              <div class="space-y-2 text-left">
                <label class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Assigned Cohort Cycle</label>
                <select id="profile-cohort-select" class="w-full px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans text-[12.5px]">
                  <option value="">No Active Cohort</option>
                  ${cohorts.map(c => `
                    <option value="${c.id}" ${person.cohortId === c.id ? "selected" : ""}>${c.name} (${c.status})</option>
                  `).join("")}
                </select>
              </div>

              <!-- Assign Projects Checkboxes -->
              <div class="space-y-2 text-left pt-2 border-t border-stone-100">
                <label class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light mb-1">Assign to Projects</label>
                <div class="space-y-2">
                  ${projectCheckboxes}
                </div>
              </div>

            </div>

            <!-- Reviewer Notes & Evaluations Form -->
            <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-4">
              <h4 class="font-display font-semibold text-lg text-text-dark pb-2 border-b border-stone-100">
                Internal Evaluations
              </h4>
              
              <div class="space-y-2 text-left">
                <label class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Growth Tier Class</label>
                <select id="profile-tier-select" class="w-full px-3 py-1.5 border border-stone-200 bg-stone-50 text-text-dark rounded focus:outline-none focus:border-pink-ruby font-sans text-[12.5px]">
                  <option value="New Contributor" ${person.growthTier === "New Contributor" ? "selected" : ""}>New Contributor</option>
                  <option value="Active Contributor" ${person.growthTier === "Active Contributor" ? "selected" : ""}>Active Contributor</option>
                  <option value="Lead Volunteer" ${person.growthTier === "Lead Volunteer" ? "selected" : ""}>Lead Volunteer</option>
                </select>
              </div>

              <div class="space-y-2 text-left pt-2">
                <label class="block font-interface font-bold text-[10px] uppercase tracking-widest text-text-light">Evaluation Reviewer Notes</label>
                <textarea id="profile-eval-notes" rows="4" placeholder="Enter evaluation comments, mentoring checklist records, or screening notes for internal review..." class="w-full p-2.5 text-[12px] border border-stone-200 rounded focus:outline-none focus:border-pink-ruby font-sans">${person.evalNotes || ""}</textarea>
              </div>

              <button id="profile-save-eval" class="w-full py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded font-interface font-bold text-[11px] uppercase tracking-wider transition-all">
                Save Review Notes
              </button>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    const person = people.find(p => p.id === this.personId);
    if (!person) return;

    // Status Selector
    const statusSelect = document.getElementById('profile-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        person.status = e.target.value;
        alert(`Status updated to "${person.status}".`);
        if (this.onStateChange) this.onStateChange();
      });
    }

    // Cohort Selector
    const cohortSelect = document.getElementById('profile-cohort-select');
    if (cohortSelect) {
      cohortSelect.addEventListener('change', (e) => {
        person.cohortId = e.target.value;
        alert(`Cohort cycle assigned successfully.`);
        if (this.onStateChange) this.onStateChange();
      });
    }

    // Project Checkboxes
    const projectCbs = document.querySelectorAll('.profile-project-assign');
    projectCbs.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        
        if (!person.relatedRecords.projects) {
          person.relatedRecords.projects = [];
        }

        if (e.target.checked) {
          // add relation
          if (!person.relatedRecords.projects.some(rp => rp.id === id)) {
            person.relatedRecords.projects.push({ id, name, status: "In Progress" });
          }
          // add contributor to project in projects.js
          const proj = projects.find(pr => pr.id === id);
          if (proj && !proj.contributors.includes(person.id)) {
            proj.contributors.push(person.id);
          }
          alert(`Assigned ${person.name} to project "${name}".`);
        } else {
          // remove relation
          person.relatedRecords.projects = person.relatedRecords.projects.filter(rp => rp.id !== id);
          // remove contributor from projects.js
          const proj = projects.find(pr => pr.id === id);
          if (proj) {
            proj.contributors = proj.contributors.filter(cid => cid !== person.id);
          }
          alert(`Removed ${person.name} from project "${name}".`);
        }
        if (this.onStateChange) this.onStateChange();
      });
    });

    // Tier Selector
    const tierSelect = document.getElementById('profile-tier-select');
    if (tierSelect) {
      tierSelect.addEventListener('change', (e) => {
        person.growthTier = e.target.value;
      });
    }

    // Save evaluation notes
    const saveEvalBtn = document.getElementById('profile-save-eval');
    if (saveEvalBtn) {
      saveEvalBtn.addEventListener('click', () => {
        const notes = document.getElementById('profile-eval-notes').value;
        person.evalNotes = notes;
        alert("Evaluation review notes saved successfully.");
      });
    }

    // Approve Certificate
    const approveCertBtns = document.querySelectorAll('.profile-verify-cert-btn');
    approveCertBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const certId = e.target.dataset.id;
        
        // Update in related records
        const relatedCert = person.relatedRecords.certificates.find(c => c.id === certId);
        if (relatedCert) {
          relatedCert.status = "Approved";
          relatedCert.date = new Date().toISOString().split('T')[0];
        }

        // Update in global certificates
        const globalCert = certificates.find(c => c.id === certId);
        if (globalCert) {
          globalCert.status = "Approved";
          globalCert.issueDate = new Date().toISOString().split('T')[0];
        }

        alert(`Certificate ${certId} approved for publication. Status is now "Approved" (awaiting generation).`);
        if (this.onStateChange) this.onStateChange();
      });
    });
  }
}
