let scrollEndTimeout;

window.addEventListener('scroll', () => {
  document.documentElement.classList.add('is-scrolling');
  window.clearTimeout(scrollEndTimeout);
  scrollEndTimeout = window.setTimeout(() => {
    document.documentElement.classList.remove('is-scrolling');
  }, 180);
}, { passive: true });
