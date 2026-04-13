'use strict';

function FilterManager(options = {}) {
  this.items = options.items || [];
  this.container = options.container;
  this.renderFn = options.renderFn;
  this.filters = {};

  this.setFilter = function(key, value) {
    if (value === 'all' || value === '') {
      delete this.filters[key];
    } else {
      this.filters[key] = value;
    }
    this.apply();
  };

  this.apply = function() {
    let filtered = this.items;
    Object.entries(this.filters).forEach(([key, value]) => {
      filtered = filtered.filter(item => {
        if (Array.isArray(item[key])) {
          return item[key].some(v => v.includes(value) || value.includes(v));
        }
        return String(item[key]).includes(value);
      });
    });
    if (this.container && this.renderFn) {
      this.container.innerHTML = filtered.length
        ? filtered.map(this.renderFn).join('')
        : '<div class="no-results"><i class="fas fa-search"></i><p>لا توجد نتائج مطابقة</p></div>';
    }
    return filtered;
  };

  this.reset = function() {
    this.filters = {};
    this.apply();
  };
}
