import LoginForm from '../components/admin/auth/LoginForm.js';
import RequestAccess from '../components/admin/auth/RequestAccess.js';
import ForgotPassword from '../components/admin/auth/ForgotPassword.js';
import ResetPassword from '../components/admin/auth/ResetPassword.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

export default class AdminLoginPage {
  constructor() {
    this.navbar = new Navbar();
    this.footer = new Footer();
    this.loginForm = new LoginForm();
    this.requestAccess = new RequestAccess();
    this.forgotPassword = new ForgotPassword();
    this.resetPassword = new ResetPassword();
  }

  render() {
    const hash = window.location.hash || '#/admin/login';
    let subFormHTML = "";
    
    if (hash === '#/admin/request-access') {
      subFormHTML = this.requestAccess.render();
    } else if (hash === '#/admin/forgot-password') {
      subFormHTML = this.forgotPassword.render();
    } else if (hash === '#/admin/reset-password') {
      subFormHTML = this.resetPassword.render();
    } else {
      subFormHTML = this.loginForm.render();
    }

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        ${this.navbar.render()}

        <main class="flex-grow pt-28 pb-12 px-6 flex items-center justify-center">
          <div class="w-full max-w-md">
            ${subFormHTML}
          </div>
        </main>

        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    Footer.init();

    const hash = window.location.hash || '#/admin/login';
    if (hash === '#/admin/request-access') {
      RequestAccess.init();
    } else if (hash === '#/admin/forgot-password') {
      ForgotPassword.init();
    } else if (hash === '#/admin/reset-password') {
      ResetPassword.init();
    } else {
      LoginForm.init();
    }
  }
}
