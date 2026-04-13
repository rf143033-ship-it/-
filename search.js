'use strict';

(function initSearch() {
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        window.location.href = `explore-cities.html?search=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });
})();
