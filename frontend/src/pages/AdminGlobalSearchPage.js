import AdminLayout from '../components/admin/AdminLayout.js';
import GlobalSearch from '../components/admin/GlobalSearch.js';

export default class AdminGlobalSearchPage {
  constructor() {
    this.searchComponent = new GlobalSearch();
  }

  render() {
    return AdminLayout.render(this.searchComponent.render(), "search");
  }

  init() {
    AdminLayout.init();
    this.searchComponent.init(() => {
      const appElement = document.querySelector('#app');
      if (appElement) {
        appElement.innerHTML = this.render();
        this.init();
      }
    });
  }
}
