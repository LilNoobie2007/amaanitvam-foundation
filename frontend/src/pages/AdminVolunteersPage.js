import AdminLayout from '../components/admin/AdminLayout.js';
import VolunteerOverview from '../components/admin/people/VolunteerOverview.js';

export default class AdminVolunteersPage {
  constructor() {
    this.volunteerOverview = new VolunteerOverview();
  }

  render() {
    return AdminLayout.render(this.volunteerOverview.render(), "volunteers");
  }

  init() {
    AdminLayout.init();
    this.volunteerOverview.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
