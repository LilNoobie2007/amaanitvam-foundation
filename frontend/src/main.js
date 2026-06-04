import './style.css';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import ProgramsPage from './pages/ProgramsPage.js';
import ImpactPage from './pages/ImpactPage.js';
import VolunteerPortal from './pages/VolunteerPortal.js';
import VolunteerDashboard from './pages/VolunteerDashboard.js';
import CertificateVerificationPage from './pages/CertificateVerificationPage.js';
import AdminCertificatesPage from './pages/AdminCertificatesPage.js';
import CertificateGeneratorPage from './pages/CertificateGeneratorPage.js';
import AdminCertificateDetailPage from './pages/AdminCertificateDetailPage.js';
import EventsPage from './pages/EventsPage.js';
import EventDetailsPage from './pages/EventDetailsPage.js';
import EventReportPage from './pages/EventReportPage.js';
import AdminEventsPage from './pages/AdminEventsPage.js';
import EventCreatorPage from './pages/EventCreatorPage.js';
import EventReportPublisherPage from './pages/EventReportPublisherPage.js';
import InternshipsPage from './pages/InternshipsPage.js';
import DomainDetailsPage from './pages/DomainDetailsPage.js';
import InternshipOpportunityPage from './pages/InternshipOpportunityPage.js';
import InternshipApplicationPage from './pages/InternshipApplicationPage.js';
import ApplicationStatusPage from './pages/ApplicationStatusPage.js';
import InternDashboardPage from './pages/InternDashboardPage.js';
import AdminInternshipsPage from './pages/AdminInternshipsPage.js';
import ApplicantDetailsPage from './pages/ApplicantDetailsPage.js';
import ContactPage from './pages/ContactPage.js';
import DonatePage from './pages/DonatePage.js';
import AdminInquiriesPage from './pages/AdminInquiriesPage.js';
import AdminDonationsPage from './pages/AdminDonationsPage.js';

// New Admin Operations Pages
import AdminLoginPage from './pages/AdminLoginPage.js';
import AdminDashboardPage from './pages/AdminDashboardPage.js';
import AdminPeoplePage from './pages/AdminPeoplePage.js';
import AdminPersonProfilePage from './pages/AdminPersonProfilePage.js';
import AdminProjectsPage from './pages/AdminProjectsPage.js';
import AdminGlobalSearchPage from './pages/AdminGlobalSearchPage.js';
import AdminVolunteersPage from './pages/AdminVolunteersPage.js';
import AdminPartnershipsPage from './pages/AdminPartnershipsPage.js';
import AdminAuditLogsPage from './pages/AdminAuditLogsPage.js';
import AdminSystemHealthPage from './pages/AdminSystemHealthPage.js';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage.js';

const appElement = document.querySelector('#app');

const routes = {
  '#/': HomePage,
  '#/about': AboutPage,
  '#/programs': ProgramsPage,
  '#/impact': ImpactPage,
  '#/volunteer': VolunteerPortal,
  '#/volunteer/dashboard': VolunteerDashboard,
  '#/verify': CertificateVerificationPage,
  '#/admin/certificates': AdminCertificatesPage,
  '#/admin/certificates/new': CertificateGeneratorPage,
  '#/admin/certificates/view': AdminCertificateDetailPage,
};

function router() {
  const hash = window.location.hash || '#/';
  
  let PageClass;
  let targetAnchor = null;
  
  if (hash === '#/about') {
    PageClass = AboutPage;
  } else if (hash === '#/programs') {
    PageClass = ProgramsPage;
  } else if (hash === '#/impact') {
    PageClass = ImpactPage;
  } else if (hash === '#/volunteer') {
    PageClass = VolunteerPortal;
  } else if (hash === '#/volunteer/dashboard') {
    // Route guard check
    const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';
    if (!isLoggedIn) {
      window.location.hash = '#/volunteer';
      return;
    }
    PageClass = VolunteerDashboard;
  } else if (hash === '#/verify') {
    PageClass = CertificateVerificationPage;
  } else if (hash === '#/admin/login' || hash === '#/admin/request-access' || hash === '#/admin/forgot-password' || hash === '#/admin/reset-password') {
    PageClass = AdminLoginPage;
  } else if (hash === '#/admin') {
    PageClass = AdminDashboardPage;
  } else if (hash.startsWith('#/admin/search')) {
    PageClass = AdminGlobalSearchPage;
  } else if (hash.startsWith('#/admin/people/')) {
    PageClass = AdminPersonProfilePage;
  } else if (hash === '#/admin/people') {
    PageClass = AdminPeoplePage;
  } else if (hash === '#/admin/volunteers') {
    PageClass = AdminVolunteersPage;
  } else if (hash === '#/admin/internships') {
    PageClass = AdminInternshipsPage;
  } else if (hash === '#/admin/projects') {
    PageClass = AdminProjectsPage;
  } else if (hash === '#/admin/certificates') {
    PageClass = AdminCertificatesPage;
  } else if (hash === '#/admin/certificates/new') {
    PageClass = CertificateGeneratorPage;
  } else if (hash.startsWith('#/admin/certificates/view')) {
    PageClass = AdminCertificateDetailPage;
  } else if (hash.startsWith('#/admin/events')) {
    PageClass = AdminEventsPage;
  } else if (hash === '#/admin/events/new') {
    PageClass = EventCreatorPage;
  } else if (hash === '#/admin/events/report') {
    PageClass = EventReportPublisherPage;
  } else if (hash === '#/admin/donations') {
    PageClass = AdminDonationsPage;
  } else if (hash === '#/admin/partnerships') {
    PageClass = AdminPartnershipsPage;
  } else if (hash === '#/admin/inquiries') {
    PageClass = AdminInquiriesPage;
  } else if (hash === '#/admin/analytics') {
    PageClass = AdminAnalyticsPage;
  } else if (hash === '#/admin/audit-logs') {
    PageClass = AdminAuditLogsPage;
  } else if (hash === '#/admin/system-health') {
    PageClass = AdminSystemHealthPage;
  } else if (hash === '#/events') {
    PageClass = EventsPage;
  } else if (hash.startsWith('#/events/view/')) {
    PageClass = EventDetailsPage;
  } else if (hash.startsWith('#/events/')) {
    PageClass = EventReportPage;
  } else if (hash === '#/internships') {
    PageClass = InternshipsPage;
  } else if (hash.startsWith('#/internships/domain/')) {
    PageClass = DomainDetailsPage;
  } else if (hash.startsWith('#/internships/opportunity/')) {
    PageClass = InternshipOpportunityPage;
  } else if (hash === '#/internships/apply') {
    PageClass = InternshipApplicationPage;
  } else if (hash === '#/internships/status') {
    PageClass = ApplicationStatusPage;
  } else if (hash === '#/intern/dashboard') {
    PageClass = InternDashboardPage;
  } else if (hash === '#/contact') {
    PageClass = ContactPage;
  } else if (hash === '#/donate') {
    PageClass = DonatePage;
  } else if (hash === '#/' || hash === '') {
    PageClass = HomePage;
  } else if (hash.startsWith('#') && !hash.startsWith('#/')) {
    // Standard homepage scroll anchors (like #community, #volunteer-form, etc.)
    PageClass = HomePage;
    targetAnchor = hash;
  } else {
    PageClass = HomePage;
  }
  
  const previousPage = appElement.dataset.currentPage;
  
  let newPageName = 'home';
  if (PageClass === AboutPage) newPageName = 'about';
  else if (PageClass === ProgramsPage) newPageName = 'programs';
  else if (PageClass === ImpactPage) newPageName = 'impact';
  else if (PageClass === VolunteerPortal) newPageName = 'volunteer';
  else if (PageClass === VolunteerDashboard) newPageName = 'volunteer-dashboard';
  else if (PageClass === CertificateVerificationPage) newPageName = 'verify';
  else if (PageClass === AdminLoginPage) newPageName = 'admin-login';
  else if (PageClass === AdminDashboardPage) newPageName = 'admin-dashboard';
  else if (PageClass === AdminGlobalSearchPage) newPageName = 'admin-search';
  else if (PageClass === AdminPersonProfilePage) newPageName = 'admin-person-profile';
  else if (PageClass === AdminPeoplePage) newPageName = 'admin-people';
  else if (PageClass === AdminVolunteersPage) newPageName = 'admin-volunteers';
  else if (PageClass === AdminInternshipsPage) newPageName = 'admin-internships';
  else if (PageClass === AdminProjectsPage) newPageName = 'admin-projects';
  else if (PageClass === AdminEventsPage) newPageName = 'admin-events';
  else if (PageClass === AdminDonationsPage) newPageName = 'admin-donations';
  else if (PageClass === AdminPartnershipsPage) newPageName = 'admin-partnerships';
  else if (PageClass === AdminInquiriesPage) newPageName = 'admin-inquiries';
  else if (PageClass === AdminAnalyticsPage) newPageName = 'admin-analytics';
  else if (PageClass === AdminAuditLogsPage) newPageName = 'admin-audit-logs';
  else if (PageClass === AdminSystemHealthPage) newPageName = 'admin-system-health';
  else if (PageClass === AdminCertificatesPage) newPageName = 'admin-certificates';
  else if (PageClass === CertificateGeneratorPage) newPageName = 'admin-certificates-new';
  else if (PageClass === AdminCertificateDetailPage) newPageName = 'admin-certificates-view';
  else if (PageClass === EventsPage) newPageName = 'events';
  else if (PageClass === EventDetailsPage) newPageName = 'event-details';
  else if (PageClass === EventReportPage) newPageName = 'event-report';
  else if (PageClass === InternshipsPage) newPageName = 'internships';
  else if (PageClass === DomainDetailsPage) newPageName = 'internships-domain';
  else if (PageClass === InternshipOpportunityPage) newPageName = 'internships-opportunity';
  else if (PageClass === InternshipApplicationPage) newPageName = 'internships-apply';
  else if (PageClass === ApplicationStatusPage) newPageName = 'internships-status';
  else if (PageClass === InternDashboardPage) newPageName = 'intern-dashboard';
  else if (PageClass === ContactPage) newPageName = 'contact';
  else if (PageClass === DonatePage) newPageName = 'donate';
  
  if (previousPage !== newPageName) {
    window.scrollTo(0, 0);
    const pageInstance = new PageClass();
    appElement.innerHTML = pageInstance.render();
    appElement.dataset.currentPage = newPageName;
    pageInstance.init();
  }
  
  // If we have an anchor, let's scroll to it after rendering
  if (targetAnchor) {
    setTimeout(() => {
      const el = document.querySelector(targetAnchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, previousPage !== newPageName ? 300 : 50);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
