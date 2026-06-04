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
  } else if (hash === '#/admin/certificates') {
    PageClass = AdminCertificatesPage;
  } else if (hash === '#/admin/certificates/new') {
    PageClass = CertificateGeneratorPage;
  } else if (hash.startsWith('#/admin/certificates/view')) {
    PageClass = AdminCertificateDetailPage;
  } else if (hash === '#/events') {
    PageClass = EventsPage;
  } else if (hash.startsWith('#/events/view/')) {
    PageClass = EventDetailsPage;
  } else if (hash.startsWith('#/events/')) {
    PageClass = EventReportPage;
  } else if (hash === '#/admin/events') {
    PageClass = AdminEventsPage;
  } else if (hash === '#/admin/events/new') {
    PageClass = EventCreatorPage;
  } else if (hash === '#/admin/events/report') {
    PageClass = EventReportPublisherPage;
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
  } else if (hash === '#/admin/internships') {
    PageClass = AdminInternshipsPage;
  } else if (hash.startsWith('#/admin/internships/applicant/')) {
    PageClass = ApplicantDetailsPage;
  } else if (hash === '#/contact') {
    PageClass = ContactPage;
  } else if (hash === '#/donate') {
    PageClass = DonatePage;
  } else if (hash === '#/admin/inquiries') {
    PageClass = AdminInquiriesPage;
  } else if (hash === '#/admin/donations') {
    PageClass = AdminDonationsPage;
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
  else if (PageClass === AdminCertificatesPage) newPageName = 'admin-certificates';
  else if (PageClass === CertificateGeneratorPage) newPageName = 'admin-certificates-new';
  else if (PageClass === AdminCertificateDetailPage) newPageName = 'admin-certificates-view';
  else if (PageClass === EventsPage) newPageName = 'events';
  else if (PageClass === EventDetailsPage) newPageName = 'event-details';
  else if (PageClass === EventReportPage) newPageName = 'event-report';
  else if (PageClass === AdminEventsPage) newPageName = 'admin-events';
  else if (PageClass === EventCreatorPage) newPageName = 'admin-events-new';
  else if (PageClass === EventReportPublisherPage) newPageName = 'admin-events-report';
  else if (PageClass === InternshipsPage) newPageName = 'internships';
  else if (PageClass === DomainDetailsPage) newPageName = 'internships-domain';
  else if (PageClass === InternshipOpportunityPage) newPageName = 'internships-opportunity';
  else if (PageClass === InternshipApplicationPage) newPageName = 'internships-apply';
  else if (PageClass === ApplicationStatusPage) newPageName = 'internships-status';
  else if (PageClass === InternDashboardPage) newPageName = 'intern-dashboard';
  else if (PageClass === AdminInternshipsPage) newPageName = 'admin-internships';
  else if (PageClass === ApplicantDetailsPage) newPageName = 'admin-internships-applicant';
  else if (PageClass === ContactPage) newPageName = 'contact';
  else if (PageClass === DonatePage) newPageName = 'donate';
  else if (PageClass === AdminInquiriesPage) newPageName = 'admin-inquiries';
  else if (PageClass === AdminDonationsPage) newPageName = 'admin-donations';
  
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
