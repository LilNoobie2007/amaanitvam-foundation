import AdminLayout from '../components/admin/AdminLayout.js';
import ProjectsManager from '../components/admin/ProjectsManager.js';

export default class AdminProjectsPage {
  constructor() {
    this.projectsManager = new ProjectsManager();
  }

  render() {
    return AdminLayout.render(this.projectsManager.render(), "projects");
  }

  init() {
    AdminLayout.init();
    this.projectsManager.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
