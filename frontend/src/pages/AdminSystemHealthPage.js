import AdminLayout from '../components/admin/AdminLayout.js';
import { systemHealth } from '../mocks/admin/systemHealth.js';

export default class AdminSystemHealthPage {
  render() {
    const healthSpecs = [
      { name: "Database Engine Connection", val: systemHealth.databaseStatus, status: "Healthy" },
      { name: "SLA SMTP Email Gateway", val: systemHealth.emailServiceStatus, status: "Healthy" },
      { name: "GraphQL Core API Gateway", val: systemHealth.apiHealthStatus, status: "Healthy" },
      { name: "Background Jobs Daemon Queue", val: systemHealth.backgroundJobsStatus, status: "Healthy" }
    ];

    const specsHTML = healthSpecs.map(spec => `
      <div class="p-4 border border-stone-200/80 rounded bg-white font-sans flex items-center justify-between text-[12.5px]">
        <div>
          <span class="block font-semibold text-text-dark">${spec.name}</span>
          <span class="block text-[11px] text-text-light mt-0.5">${spec.val}</span>
        </div>
        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded text-[9.5px] font-bold uppercase tracking-wider">
          ${spec.status}
        </span>
      </div>
    `).join("");

    const healthHTML = `
      <div class="space-y-6 select-none text-left scroll-reveal revealed">
        <!-- Header -->
        <div class="flex justify-between items-center pb-2">
          <div>
            <h2 class="font-display font-bold text-2xl text-text-dark">Diagnostics & System Health</h2>
            <p class="text-[12.5px] text-text-light font-sans mt-0.5">Monitor application specifications, storage volume thresholds, database locks, and mail service gateways.</p>
          </div>
          
          <button id="system-diagnostic-trigger" class="px-4 py-2 bg-pink-ruby text-white hover:bg-pink-ruby/90 rounded-lg font-interface font-bold text-[11px] uppercase tracking-wider transition-all">
            Run Diagnostics Check
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Col 1 & 2: Health Modules -->
          <div class="lg:col-span-2 space-y-4">
            <h4 class="font-display font-semibold text-base text-text-dark">Service Registries Status</h4>
            <div class="grid grid-cols-1 gap-4">
              ${specsHTML}
            </div>
          </div>

          <!-- Col 3: Resource Load meters -->
          <div class="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm space-y-5">
            <h4 class="font-display font-semibold text-base text-text-dark pb-2 border-b border-stone-100">Storage Volume Allocation</h4>
            
            <div class="space-y-4">
              <div class="space-y-1.5 font-sans">
                <div class="flex justify-between text-[12px] font-semibold text-text-muted">
                  <span>S3 Media Volume (34 GB allocated)</span>
                  <span>${systemHealth.storageUsagePercent}%</span>
                </div>
                <div class="w-full bg-stone-100 h-2 rounded overflow-hidden">
                  <div class="bg-pink-ruby h-full" style="width: ${systemHealth.storageUsagePercent}%"></div>
                </div>
              </div>

              <div class="space-y-1.5 font-sans">
                <div class="flex justify-between text-[12px] font-semibold text-text-muted">
                  <span>API Server RAM Buffer</span>
                  <span>45%</span>
                </div>
                <div class="w-full bg-stone-100 h-2 rounded overflow-hidden">
                  <div class="bg-emerald-600 h-full" style="width: 45%"></div>
                </div>
              </div>

              <div class="space-y-1.5 font-sans">
                <div class="flex justify-between text-[12px] font-semibold text-text-muted">
                  <span>Database IO Latency</span>
                  <span>14 ms</span>
                </div>
                <div class="w-full bg-stone-100 h-2 rounded overflow-hidden">
                  <div class="bg-emerald-600 h-full" style="width: 14%"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    return AdminLayout.render(healthHTML, "system-health");
  }

  init() {
    AdminLayout.init();

    const trigger = document.getElementById('system-diagnostic-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        trigger.disabled = true;
        trigger.textContent = "Scanning Core Nodes...";
        
        setTimeout(() => {
          alert("Diagnostics check completed. Core PostgreSQL DB nodes, AWS SES gateways, and Redis buffers are fully operational. Uptime: 99.98%.");
          trigger.disabled = false;
          trigger.textContent = "Run Diagnostics Check";
        }, 1200);
      });
    }
  }
}
