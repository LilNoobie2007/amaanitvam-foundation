import Navbar from '../components/Navbar.js';
import Hero from '../components/Hero.js';
import Challenge from '../components/Challenge.js';
import TrustStrip from '../components/TrustStrip.js';
import WhyWeExist from '../components/WhyWeExist.js';
import Programs from '../components/Programs.js';
import Community from '../components/Community.js';
import Verification from '../components/Verification.js';
import Footer from '../components/Footer.js';

export default class HomePage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new Hero();
    this.challenge = new Challenge();
    this.trustStrip = new TrustStrip();
    this.whyWeExist = new WhyWeExist();
    this.programs = new Programs();
    this.community = new Community();
    this.verification = new Verification();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        
        <!-- Sticky Absolute Header Navigation -->
        ${this.navbar.render()}
        
        <main class="flex-grow">
          
          <!-- Viewport Cover Hero Section -->
          ${this.hero.render()}
          
          <!-- Narrative Challenge Section (Tension) -->
          ${this.challenge.render()}
          
          <!-- Proof: Lived Work Statistics Strip -->
          ${this.trustStrip.render()}
          
          <!-- Connected Journey Purpose: Mission & Vision Section -->
          ${this.whyWeExist.render()}
          
          <!-- Progressive chapters vertical timeline: Programs Section -->
          ${this.programs.render()}
          
          <!-- Togetherness sunset full-screen banner: Community Section -->
          ${this.community.render()}
          
          <!-- Credential Registry Integrity Section -->
          ${this.verification.render()}
          
        </main>
        
        <!-- Deep Loop Tagline Footer with Volunteer Invitation -->
        ${this.footer.render()}
        
      </div>
    `;
  }

  init() {
    // Initialize scrolling header, hamburger toggle and scroll highlights
    Navbar.init();

    // Initialize horizontal metrics count-up logic
    TrustStrip.init();

    // Initialize volunteer form submission handling
    Footer.init();

    // --- INTERSECTION OBSERVER FOR NARRATIVE SCROLL REVEALS ---
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(el => revealObserver.observe(el));

    // --- STAGGER GRID LOADING CONTROLLERS ---
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-load');
      const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, idx) => {
              setTimeout(() => {
                item.classList.add('revealed');
              }, idx * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      });
      staggerObserver.observe(container);
    });

    // --- DYNAMIC ACTIVE LINK SCROLL HIGHLIGHTING ---
    const navItems = document.querySelectorAll('#nav-links a');
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 250;
      document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(item => {
            item.classList.remove('active-nav');
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active-nav');
            }
          });
        }
      });
    });
  }
}
