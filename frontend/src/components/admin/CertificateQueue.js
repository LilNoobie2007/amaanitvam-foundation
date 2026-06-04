import { certificates } from '../../mocks/admin/certificates.js';
import { people } from '../../mocks/admin/people.js';

export default class CertificateQueue {
  constructor() {
    this.currentFilter = "All";
    this.selectedIds = new Set();
  }

  render() {
    const filteredCerts = this.currentFilter === "All"
      ? certificates
      : certificates.filter(c => c.status === this.currentFilter);

    const rowsHTML = filteredCerts.map(c => {
      const isChecked = this.selectedIds.has(c.id) ? "checked" : "";
      
      let badgeColor = "bg-stone-100 text-text-dark border-stone-200";
      if (c.status === "Issued") badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-100";
      else if (c.status === "Approved") badgeColor = "bg-blue-50 text-blue-800 border-blue-100";
      else if (c.status === "Pending") badgeColor = "bg-pink-blush text-pink-ruby border-pink-quartz/45";

      return `
        <tr class="hover:bg-stone-50/80 transition-colors border-b border-stone-100 text-[12.5px] font-sans text-text-muted">
          <td class="px-4 py-3">
            <input type="checkbox" class="cert-row-select h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" data-id="${c.id}" ${isChecked} />
          </td>
          <td class="px-4 py-3 font-semibold text-text-dark">${c.id}</td>
          <td class="px-4 py-3 font-medium text-text-dark">
            <a href="#/admin/people/${c.recipientId}" class="hover:underline hover:text-pink-ruby transition-colors">${c.recipientName}</a>
          </td>
          <td class="px-4 py-3 font-sans">${c.type}</td>
          <td class="px-4 py-3 text-text-light font-interface">${c.issueDate || "Awaiting Verification"}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-0.5 rounded text-[10.5px] font-bold uppercase tracking-wider border ${badgeColor}">${c.status}</span>
          </td>
          <td class="px-4 py-3 text-right">
            ${c.status === "Pending" ? `
              <button class="cert-approve-btn px-2.5 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded font-interface font-bold text-[9.5px] text-text-dark uppercase tracking-wider transition-colors" data-id="${c.id}">
                Verify
              </button>
            ` : ""}
            ${c.status === "Approved" ? `
              <button class="cert-issue-btn px-2.5 py-1 bg-pink-ruby hover:bg-pink-ruby/90 text-white rounded font-interface font-bold text-[9.5px] uppercase tracking-wider transition-colors" data-id="${c.id}">
                Publish
              </button>
            ` : ""}
            ${c.status === "Issued" ? `
              <a href="#/verify?id=${c.id}" target="_blank" class="inline-flex items-center gap-0.5 text-[11px] font-bold uppercase tracking-wider text-pink-ruby hover:underline">
                View Lookup &rarr;
              </a>
            ` : ""}
          </td>
        </tr>
      `;
    }).join("");

    const filterTabs = ["All", "Pending", "Approved", "Issued"].map(status => {
      const activeClass = this.currentFilter === status
        ? "border-pink-ruby text-pink-ruby font-bold"
        : "border-transparent text-text-light hover:text-text-dark";
      return `
        <button class="cert-filter-tab px-3 py-2 border-b-2 font-interface font-semibold text-[11.5px] uppercase tracking-wider transition-colors ${activeClass}" data-filter="${status}">
          ${status}
        </button>
      `;
    }).join("");

    return `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Certification Approval Queue</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Verify volunteer campaign hours, approve internship cycles, and issue verifiable digital credentials.</p>
          </div>
          
          <div class="flex gap-2">
            <button id="cert-bulk-approve-btn" class="px-4 py-2 border border-stone-200 hover:border-text-dark rounded-lg text-text-dark bg-white font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors">
              Verify Checked
            </button>
            <button id="cert-bulk-issue-btn" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all">
              Publish Checked
            </button>
          </div>
        </div>

        <!-- Filter tabs & Search -->
        <div class="bg-white border border-stone-200/80 rounded-xl p-4 shadow-sm space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-100 gap-4">
            <div class="flex gap-2">
              ${filterTabs}
            </div>
            
            <div class="relative w-full md:w-72">
              <input type="text" id="cert-queue-search" placeholder="Search recipients..." class="w-full pl-8 pr-3 py-1.5 text-[12px] border border-stone-200 rounded focus:outline-none focus:border-pink-ruby font-sans" />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-text-light absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Table Container -->
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-stone-200 text-left font-interface text-[9.5px] uppercase tracking-widest text-text-light">
                  <th class="px-4 py-3 w-10">
                    <input type="checkbox" id="cert-select-all" class="h-4 w-4 rounded border-stone-300 text-pink-ruby focus:ring-pink-ruby" />
                  </th>
                  <th class="px-4 py-3">Certificate ID</th>
                  <th class="px-4 py-3">Recipient Name</th>
                  <th class="px-4 py-3">Type</th>
                  <th class="px-4 py-3">Issue/Request Date</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3 text-right">Action Operations</th>
                </tr>
              </thead>
              <tbody id="cert-queue-rows">
                ${rowsHTML || `<tr><td colspan="7" class="text-center py-8 text-text-light font-sans">No certificates match the filter status.</td></tr>`}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    `;
  }

  init(onStateChange) {
    this.onStateChange = onStateChange;

    const tabs = document.querySelectorAll('.cert-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentFilter = e.currentTarget.dataset.filter;
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    });

    const searchInput = document.getElementById('cert-queue-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#cert-queue-rows tr');
        rows.forEach(row => {
          const recCol = row.querySelector('td:nth-child(3)');
          if (recCol) {
            const matches = recCol.textContent.toLowerCase().includes(query);
            row.style.display = matches ? "" : "none";
          }
        });
      });
    }

    const selectAllCheckbox = document.getElementById('cert-select-all');
    const rowCheckboxes = document.querySelectorAll('.cert-row-select');

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const checked = e.target.checked;
        rowCheckboxes.forEach(cb => {
          cb.checked = checked;
          const id = cb.dataset.id;
          if (checked) this.selectedIds.add(id);
          else this.selectedIds.delete(id);
        });
      });
    }

    rowCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) this.selectedIds.add(id);
        else {
          this.selectedIds.delete(id);
          if (selectAllCheckbox) selectAllCheckbox.checked = false;
        }
      });
    });

    // Approve Single Certificate Action
    const approveBtns = document.querySelectorAll('.cert-approve-btn');
    approveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const cert = certificates.find(c => c.id === id);
        if (cert) {
          cert.status = "Approved";
          
          // Sync into individual person related record
          const person = people.find(p => p.id === cert.recipientId);
          if (person && person.relatedRecords?.certificates) {
            const relCert = person.relatedRecords.certificates.find(c => c.id === id);
            if (relCert) relCert.status = "Approved";
          }

          alert(`Certificate ${id} verified and approved for publication.`);
          if (this.onStateChange) this.onStateChange();
        }
      });
    });

    // Issue Single Certificate Action (Publish)
    const issueBtns = document.querySelectorAll('.cert-issue-btn');
    issueBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const cert = certificates.find(c => c.id === id);
        if (cert) {
          cert.status = "Issued";
          cert.issueDate = new Date().toISOString().split('T')[0];
          
          // Sync to individual person
          const person = people.find(p => p.id === cert.recipientId);
          if (person && person.relatedRecords?.certificates) {
            const relCert = person.relatedRecords.certificates.find(c => c.id === id);
            if (relCert) {
              relCert.status = "Issued";
              relCert.date = cert.issueDate;
            }
          }

          alert(`Certificate ${id} successfully published to public verifiable credential registries.`);
          if (this.onStateChange) this.onStateChange();
        }
      });
    });

    // Bulk Approve
    const bulkApproveBtn = document.getElementById('cert-bulk-approve-btn');
    if (bulkApproveBtn) {
      bulkApproveBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 0) {
          alert("Please select one or more pending certificates to verify.");
          return;
        }
        
        certificates.forEach(c => {
          if (this.selectedIds.has(c.id) && c.status === "Pending") {
            c.status = "Approved";
            const person = people.find(p => p.id === c.recipientId);
            if (person && person.relatedRecords?.certificates) {
              const rc = person.relatedRecords.certificates.find(item => item.id === c.id);
              if (rc) rc.status = "Approved";
            }
          }
        });

        alert(`Successfully verified and approved ${this.selectedIds.size} certificates.`);
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    }

    // Bulk Issue (Publish)
    const bulkIssueBtn = document.getElementById('cert-bulk-issue-btn');
    if (bulkIssueBtn) {
      bulkIssueBtn.addEventListener('click', () => {
        if (this.selectedIds.size === 0) {
          alert("Please select one or more approved certificates to publish.");
          return;
        }

        const dateStr = new Date().toISOString().split('T')[0];
        certificates.forEach(c => {
          if (this.selectedIds.has(c.id) && c.status === "Approved") {
            c.status = "Issued";
            c.issueDate = dateStr;
            const person = people.find(p => p.id === c.recipientId);
            if (person && person.relatedRecords?.certificates) {
              const rc = person.relatedRecords.certificates.find(item => item.id === c.id);
              if (rc) {
                rc.status = "Issued";
                rc.date = dateStr;
              }
            }
          }
        });

        alert(`Successfully published ${this.selectedIds.size} certificates to the registry.`);
        this.selectedIds.clear();
        if (this.onStateChange) this.onStateChange();
      });
    }
  }
}
