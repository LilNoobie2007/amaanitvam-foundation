import AdminLayout from '../components/admin/AdminLayout.js';
import PeopleDirectory from '../components/admin/people/PeopleDirectory.js';

export default class AdminPeoplePage {
  constructor() {
    this.directory = new PeopleDirectory();
  }

  render() {
    return AdminLayout.render(this.directory.render(), "people");
  }

  init() {
    AdminLayout.init();
    
    // Pass refresh callback to allow repainting when filters or selections update state
    this.directory.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
