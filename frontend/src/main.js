import './style.css';
import HomePage from './pages/HomePage.js';

// Initialize the single page assembler
const homePage = new HomePage();

// Mount the assembled layout into the root element
const appElement = document.querySelector('#app');
if (appElement) {
  appElement.innerHTML = homePage.render();
  
  // Initialize dynamic interaction controllers (scrolling headers, toggles, etc.)
  homePage.init();
}
