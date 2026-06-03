import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { internshipOpportunities } from '../mocks/opportunities.js';

export default class DomainDetailsPage {
  constructor() {
    this.navbar = new Navbar();
    this.footer = new Footer();
  }

  render() {
    const hash = window.location.hash;
    const parts = hash.split('/');
    const slug = parts[parts.length - 1];

    const domainsData = {
      "web-development": {
        title: "Web Development",
        icon: "💻",
        overview: "Build and optimize responsive client-side web architectures, administrative panels, and state-level registries for the Amaanitvam platform.",
        skills: ["Component architectures", "State management", "SPA routing", "Performance optimization", "CSS styling systems"],
        tools: ["HTML5 / CSS3", "Modern JavaScript (ES6+)", "Git & GitHub", "Chrome DevTools"],
        projects: ["Volunteer Roster Portal", "Credential verification widgets", "Offline sync utility for field teachers"]
      },
      "ui-ux-design": {
        title: "UI/UX Design",
        icon: "🎨",
        overview: "Map user journeys, construct wireframes, and design high-fidelity layouts for our digital learning classrooms and public outreach spaces.",
        skills: ["User research", "Wireframing & storyboarding", "Interactive prototyping", "Accessibility compliance (WCAG)", "Design systems creation"],
        tools: ["Figma", "FigJam", "Adobe Illustrator"],
        projects: ["Student Classroom Portal interface redesign", "Mobile survey collection flows for rural fields"]
      },
      "graphic-design": {
        title: "Graphic Design",
        icon: "📐",
        overview: "Design print worksheets, curriculum handouts, social media campaigns, and official digital certificate templates.",
        skills: ["Visual hierarchy", "Typography scales", "Vector illustration", "Branding compliance"],
        tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
        projects: ["Manthan Center Math & Language worksheets", "Foundation newsletter templates", "Visual impact booklet"]
      },
      "content-writing": {
        title: "Content Writing",
        icon: "✍️",
        overview: "Write descriptive event summaries, newsletter articles, and donor narratives detailing Amaanitvam's social impact.",
        skills: ["Creative storytelling", "Copyediting & proofing", "SEO optimization", "Impact documentation"],
        tools: ["Google Workspace", "Medium", "Markdown editors"],
        projects: ["Regional center field narrative series", "Monthly donor digest copy", "Events retrospective report"]
      },
      "data-analysis": {
        title: "Data Analysis",
        icon: "📊",
        overview: "Gather field inputs, calculate program efficacy indices, and compile demographic metric datasets to assist decision-making.",
        skills: ["Quantitative reporting", "Survey design", "Statistical summaries", "Dashboard visualizations"],
        tools: ["Microsoft Excel", "Google Sheets", "Python (Pandas)", "Tableau"],
        projects: ["Efficacy ratio mapping for Project Shiksha", "Delhi NCR centers health camp statistics compilation"]
      },
      "community-outreach": {
        title: "Community Outreach",
        icon: "📢",
        overview: "Coordinate regional drives, manage center resources, and organize hygiene camps in local communities.",
        skills: ["Public communication", "Logistics coordination", "Event planning", "Volunteer management"],
        tools: ["Slack", "WhatsApp Business", "Google Maps"],
        projects: ["Hygiene camps coordination guide", "Outreach survey administration"]
      },
      "operations": {
        title: "Operations & HR",
        icon: "⚙️",
        overview: "Coordinate intern onboarding checklists, manage calendar synchronization, and verify compliance metrics.",
        skills: ["Project management", "Workflow auditing", "Schedule tracking", "Human resource logistics"],
        tools: ["Notion", "Google Calendar", "Excel"],
        projects: ["Intern weekly sync coordinator board", "Onboarding checklist automated pipeline"]
      },
      "marketing": {
        title: "Campaign Marketing",
        icon: "🚀",
        overview: "Build public campaigns, manage social content calendars, and handle press releases to increase visibility.",
        skills: ["Growth marketing", "Visual layouting", "Post scheduling", "User engagement analysis"],
        tools: ["Buffer", "Canva", "Mailchimp"],
        projects: ["Social media outreach planner", "Amaanitvam Foundation anniversary campaign"]
      },
      "research": {
        title: "Social Research",
        icon: "🔍",
        overview: "Analyze socioeconomic demographics and benchmark governmental welfare schemes to optimize foundation initiatives.",
        skills: ["Qualitative interviews", "Secondary research", "Comparative policy reviews", "Policy mapping"],
        tools: ["Zotero", "Google Scholar", "NVivo"],
        projects: ["Comparative study of government education schemes in outer Delhi", "Child attendance barriers research"]
      }
    };

    const domain = domainsData[slug] || domainsData["web-development"];

    // Find opportunities matching this domain name
    const matchingOpps = internshipOpportunities.filter(opp => opp.domain.toLowerCase() === domain.title.toLowerCase() && opp.status === "Open");

    const skillsHTML = domain.skills.map(s => `
      <li class="flex items-center gap-2 bg-stone-100/60 border border-stone-200/50 rounded-lg px-3.5 py-2 font-sans text-[13.5px] text-text-dark">
        <span class="h-1.5 w-1.5 rounded-full bg-pink-ruby"></span>
        ${s}
      </li>
    `).join('');

    const toolsHTML = domain.tools.map(t => `
      <span class="bg-pink-blush text-pink-ruby border border-pink-quartz/60 px-3 py-1 rounded-full font-interface text-[11px] font-bold uppercase tracking-wider">${t}</span>
    `).join('');

    const projectsHTML = domain.projects.map(p => `
      <div class="bg-stone-50 border border-stone-200/60 rounded-xl p-4.5">
        <h5 class="font-interface font-semibold text-[14px] text-text-dark mb-1.5">${p}</h5>
        <span class="font-sans text-[11px] text-text-light font-light uppercase tracking-wider block">Sample Curriculum Project</span>
      </div>
    `).join('');

    const opportunitiesHTML = matchingOpps.map(opp => `
      <div class="bg-white border border-stone-200 hover:border-pink-ruby rounded-xl p-5 shadow-sm hover:shadow transition-all duration-300 flex flex-col justify-between min-h-[180px]">
        <div>
          <div class="flex items-center justify-between text-[11px] font-interface text-text-light uppercase tracking-wider mb-2">
            <span>${opp.mode}</span>
            <span class="text-pink-ruby font-semibold">${opp.duration}</span>
          </div>
          <h4 class="font-display font-semibold text-[17.5px] text-text-dark mb-2">${opp.title}</h4>
          <p class="font-sans text-[12.5px] text-text-muted leading-relaxed font-light line-clamp-3 mb-4">${opp.description}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-stone-100">
          <span class="font-interface text-[11px] font-bold text-text-dark">${opp.remainingSeats} Seats Available</span>
          <a href="#/internships/opportunity/${opp.slug}" class="font-interface font-bold text-[10px] uppercase tracking-widest px-4 py-2.5 rounded bg-pink-ruby text-white hover:bg-pink-ruby/90 shadow transition-colors">
            Details & Apply
          </a>
        </div>
      </div>
    `).join('');

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow py-12 px-6">
          <div class="max-w-5xl mx-auto space-y-10">
            
            <!-- Breadcrumb -->
            <div class="text-left font-interface text-[11px] uppercase tracking-widest text-text-light">
              <a href="#/internships" class="hover:text-pink-ruby">Internships</a> / <span class="text-text-dark">Specializations</span>
            </div>

            <!-- Header Card -->
            <div class="bg-white border border-stone-200/80 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-start gap-6 text-left scroll-reveal revealed">
              <span class="text-6xl p-4 bg-stone-50 border border-stone-150 rounded-xl leading-none select-none">${domain.icon}</span>
              <div class="space-y-3 flex-grow">
                <span class="font-interface font-semibold text-[11px] uppercase tracking-widest text-pink-ruby">Specialization Stream</span>
                <h2 class="font-display font-semibold text-3xl text-text-dark tracking-tight">${domain.title}</h2>
                <p class="font-sans text-[15px] text-text-muted leading-relaxed font-light">${domain.overview}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              
              <!-- Left: Skills and Tools (col span 7) -->
              <div class="lg:col-span-7 space-y-8">
                
                <!-- Skills Panel -->
                <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100">Skills Developed</h3>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${skillsHTML}
                  </ul>
                </div>

                <!-- Tools Panel -->
                <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100">Industry Standards & Tools</h3>
                  <div class="flex flex-wrap gap-2">
                    ${toolsHTML}
                  </div>
                </div>

                <!-- Projects Panel -->
                <div class="bg-white border border-stone-200/60 rounded-xl p-6 shadow-sm space-y-4">
                  <h3 class="font-display font-semibold text-lg text-text-dark pb-3 border-b border-stone-100">Sample Projects Catalog</h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${projectsHTML}
                  </div>
                </div>

              </div>

              <!-- Right: Open Positions (col span 5) -->
              <div class="lg:col-span-5 space-y-6">
                <h3 class="font-display font-semibold text-lg text-text-dark text-left">Open Opportunities</h3>
                
                <div class="flex flex-col gap-4">
                  ${opportunitiesHTML || `
                    <div class="bg-white border border-stone-200 rounded-xl p-6 text-center shadow-sm">
                      <p class="font-sans text-[13.5px] text-text-muted font-light italic">No openings currently active in this domain. Check back later!</p>
                    </div>
                  `}
                </div>
              </div>

            </div>

          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();
  }
}
