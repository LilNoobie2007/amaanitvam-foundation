(function () {
  'use strict';

  const nav = document.getElementById('site-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const currentPage = document.body.dataset.page || '';

  /* Active nav link */
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.dataset.nav === currentPage) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Navbar scroll behavior */
  function updateNav() {
    if (!nav) return;
    const hero = document.querySelector('[data-hero]');
    const scrolled = window.scrollY > 40;
    const hasHero = hero && hero.getBoundingClientRect().bottom > 80;

    if (hasHero && !scrolled) {
      nav.classList.add('is-transparent');
      nav.classList.remove('is-solid');
    } else {
      nav.classList.remove('is-transparent');
      nav.classList.add('is-solid');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* Mobile menu */
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const expanded = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', expanded);
    });
  });

  /* Certificate verification demo */
  const verifyForm = document.getElementById('verify-form');
  if (verifyForm) {
    verifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('cert-id').value.trim();
      const result = document.getElementById('verify-result');
      if (!id) return;
      result.hidden = false;
      result.className = 'mt-6 p-6 rounded-xl border ';
      if (id.toUpperCase().startsWith('AF-')) {
        result.className += 'border-green-200 bg-green-50';
        result.innerHTML = '<div class="flex items-start gap-3"><span class="material-symbols-outlined text-green-600 icon-fill">verified</span><div><p class="font-semibold text-green-800">Certificate Verified</p><p class="text-sm text-green-700 mt-1">This certificate is authentic and was issued by Amaanitvam Foundation.</p></div></div>';
      } else {
        result.className += 'border-red-200 bg-red-50';
        result.innerHTML = '<div class="flex items-start gap-3"><span class="material-symbols-outlined text-red-600">cancel</span><div><p class="font-semibold text-red-800">Not Found</p><p class="text-sm text-red-700 mt-1">No matching certificate found. Please check the ID and try again.</p></div></div>';
      }
    });
  }
})();
