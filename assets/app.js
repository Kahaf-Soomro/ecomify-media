/* Native browser enhancements; all page content is present in the HTML. */
(() => {
  'use strict';
  const burger = document.querySelector('#navBurger');
  const nav = document.querySelector('#navLinks');
  const mobile = window.matchMedia('(max-width: 980px)');
  function setMenu(open, returnFocus = false) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    burger.classList.toggle('is-open', open);
    nav.classList.toggle('mshow', open);
    nav.inert = mobile.matches && !open;
    if (returnFocus) burger.focus();
  }
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  mobile.addEventListener('change', () => setMenu(false));
  setMenu(false);
  document.addEventListener('click', e => {
    if (!e.target.closest('header') && burger?.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion && entry.target.animate) entry.target.animate(
          [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', delay: Number(entry.target.dataset.delay || 0) }
        );
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
  }

  document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-item').forEach(other => { if (other !== item) other.open = false; });
  }));

  const scroll = document.querySelector('#reviewScroll');
  document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
    const card = scroll?.querySelector('.review-preview');
    if (scroll && card) scroll.scrollBy({ left: (card.getBoundingClientRect().width + 20) * Number(button.dataset.scroll), behavior: reducedMotion ? 'instant' : 'smooth' });
  }));

  // Keep real anchors as the WhatsApp fallback. Never send a message automatically.
  let toastTimer;
  document.querySelectorAll('[data-enquiry]').forEach(a => a.addEventListener('click', () => {
    const toast = document.querySelector('#waToast');
    if (!toast) return;
    const label = a.dataset.enquiry;
    document.querySelector('#waToastTitle').textContent = label || 'Ecomify Media';
    document.querySelector('#waToastSub').textContent = 'Continue your conversation in WhatsApp.';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
  }));

  const dialog = document.querySelector('#reviewLightbox');
  const items = [...document.querySelectorAll('[data-review]')];
  let index = 0;
  let opener;
  function showReview(i) {
    index = (i + items.length) % items.length;
    const source = items[index].querySelector('img');
    const image = dialog.querySelector('#lightboxImage');
    image.src = source.getAttribute('src');
    image.alt = source.alt;
    dialog.querySelector('#lightboxTitle').textContent = `Client feedback ${index + 1} of ${items.length}`;
    dialog.querySelector('#lightboxOriginal').href = source.getAttribute('src');
  }
  items.forEach((button, i) => button.addEventListener('click', () => {
    if (!dialog?.showModal) {
      window.open(button.querySelector('img').src, '_blank', 'noopener');
      return;
    }
    opener = button;
    showReview(i);
    dialog.showModal();
    document.documentElement.classList.add('lightbox-open');
    dialog.querySelector('.lightbox-close').focus();
  }));
  dialog?.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    opener?.focus();
  });
  dialog?.querySelectorAll('[data-review-step]').forEach(button => button.addEventListener('click', () => showReview(index + Number(button.dataset.reviewStep))));
  dialog?.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); showReview(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); showReview(index + 1); }
  });
})();
