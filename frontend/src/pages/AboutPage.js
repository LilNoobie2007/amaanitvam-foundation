import Navbar from '../components/Navbar.js';
import AboutHero from '../components/AboutHero.js';
import StudentBeginning from '../components/StudentBeginning.js';
import StoryTimeline from '../components/StoryTimeline.js';
import AboutWhyWeExist from '../components/AboutWhyWeExist.js';
import CoreValues from '../components/CoreValues.js';
import ImpactProcess from '../components/ImpactProcess.js';
import ImpactSnapshot from '../components/ImpactSnapshot.js';
import NextChapter from '../components/NextChapter.js';
import JoinJourney from '../components/JoinJourney.js';
import Footer from '../components/Footer.js';

export default class AboutPage {
  constructor() {
    this.navbar = new Navbar();
    this.aboutHero = new AboutHero();
    this.studentBeginning = new StudentBeginning();
    this.storyTimeline = new StoryTimeline();
    this.whyWeExist = new AboutWhyWeExist();
    this.coreValues = new CoreValues();
    this.impactProcess = new ImpactProcess();
    this.impactSnapshot = new ImpactSnapshot();
    this.nextChapter = new NextChapter();
    this.joinJourney = new JoinJourney();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        
        <!-- Shared Header Navigation -->
        ${this.navbar.render()}
        
        <main class="flex-grow">
          
          <!-- Quieter, Typography-Focused About Hero -->
          ${this.aboutHero.render()}
          
          <!-- Emotional Context Origin Beginning Section -->
          ${this.studentBeginning.render()}
          
          <!-- Signature Scroll-Reveal Documentary Timeline -->
          ${this.storyTimeline.render()}
          
          <!-- Reflective Mission and Vision connected journey path -->
          ${this.whyWeExist.render()}
          
          <!-- Institutional Vertical Value Pillars -->
          ${this.coreValues.render()}
          
          <!-- Interactive program flowchart: Need -> Program -> Action -> Outcome -->
          ${this.impactProcess.render()}
          
          <!-- Quiet evidence-based approved metrics snapshot -->
          ${this.impactSnapshot.render()}
          
          <!-- Forward vision momentum: The Next Chapter -->
          ${this.nextChapter.render()}
          
          <!-- Wide sunrise field invitation covered CTA card -->
          ${this.joinJourney.render()}
          
        </main>
        
        <!-- Official Mehrauli contact data tagline footer with volunteer form -->
        ${this.footer.render()}
        
      </div>
    `;
  }

  init() {
    // Initialize scrolling header, hamburger toggle and scroll highlights
    Navbar.init();

    // Trigger sequential activation of milestone dots on scroll
    StoryTimeline.init();

    // Trigger interactive flowchart program updates
    ImpactProcess.init();

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
  }
}
