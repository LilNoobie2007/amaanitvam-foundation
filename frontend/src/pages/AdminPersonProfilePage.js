import AdminLayout from '../components/admin/AdminLayout.js';
import PersonProfile from '../components/admin/people/PersonProfile.js';

export default class AdminPersonProfilePage {
  render() {
    const hash = window.location.hash || "";
    const parts = hash.split('/');
    // Hash format: #/admin/people/peo-arjun-mehta
    const personId = parts[3] ? parts[3].split('?')[0] : "";
    
    this.profileComponent = new PersonProfile(personId);

    return AdminLayout.render(this.profileComponent.render(), "people");
  }

  init() {
    AdminLayout.init();
    if (this.profileComponent) {
      this.profileComponent.init(() => {
        const appElement = document.querySelector('#app');
        if (appElement) {
          appElement.innerHTML = this.render();
          this.init();
        }
      });
    }
  }
}
