'use strict';


(function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });
})();


(function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();


(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      document.body.style.overflow = '';
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  
  const navItems = nav.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');
    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });
})();


(function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('active');
      const parentItem = link.closest('.nav-item');
      if (parentItem) {
        const parentLink = parentItem.querySelector('.nav-link');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
})();


(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
})();


function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');
  const decimals = isFloat ? String(target).split('.')[1].length : 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    element.textContent = prefix + (isFloat ? current.toFixed(decimals) : Math.floor(current).toLocaleString('ar-SA')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}


(function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = parseInt(el.dataset.duration) || 2000;
        animateCounter(el, target, duration, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
})();


(function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      
      if (!isOpen) item.classList.add('open');
    });
  });
})();


function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector || '.tabs-container');
  if (!container) return;

  const buttons = container.querySelectorAll('.tab-btn');
  const contents = container.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}


function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

(function initModals() {
  
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
  });

  
  document.querySelectorAll('[data-modal-close], .modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
})();


function showNotification(message, type = 'info', duration = 3000) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}


(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();


(function initSearchOverlay() {
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('globalSearchInput');

  if (!searchBtn || !searchOverlay) return;

  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput && searchInput.focus(), 300);
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('open');
    });
  }

  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function() {
      performGlobalSearch(this.value);
    }, 300));
  }
})();


function performGlobalSearch(query) {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;

  if (query.length < 2) {
    resultsContainer.innerHTML = '';
    return;
  }

  const results = [];
  const q = query.toLowerCase();

  
  if (typeof CITIES_DATA !== 'undefined') {
    CITIES_DATA.forEach(city => {
      if (city.name.includes(query) || city.region.includes(query) ||
          city.industries.some(i => i.includes(query))) {
        results.push({
          title: city.name,
          subtitle: city.region,
          url: `city-details.html?id=${city.id}`,
          icon: 'fa-city',
          type: 'مدينة صناعية'
        });
      }
    });
  }

  
  if (typeof INDUSTRIES_DATA !== 'undefined') {
    INDUSTRIES_DATA.forEach(ind => {
      if (ind.name.includes(query) || ind.description.includes(query)) {
        results.push({
          title: ind.name,
          subtitle: 'قطاع صناعي',
          url: `industry-details.html?id=${ind.id}`,
          icon: 'fa-industry',
          type: 'صناعة'
        });
      }
    });
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p class="search-no-results">لا توجد نتائج للبحث</p>';
    return;
  }

  resultsContainer.innerHTML = results.slice(0, 6).map(r => `
    <a href="${r.url}" class="search-result-item">
      <div class="search-result-icon">
        <i class="fas ${r.icon}"></i>
      </div>
      <div class="search-result-text">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-subtitle">${r.type} - ${r.subtitle}</div>
      </div>
      <i class="fas fa-arrow-left search-result-arrow"></i>
    </a>
  `).join('');
}




function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


function formatNumber(num) {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + ' مليار';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + ' مليون';
  if (num >= 1000) return (num / 1000).toFixed(1) + ' ألف';
  return num.toString();
}


function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}


function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class') el.className = value;
    else if (key === 'html') el.innerHTML = value;
    else if (key === 'text') el.textContent = value;
    else el.setAttribute(key, value);
  });
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}


function createBarChart(canvasId, labels, data, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = options.padding || 40;
  const barColor = options.barColor || '#D4AF37';
  const maxValue = Math.max(...data) * 1.2;

  ctx.clearRect(0, 0, width, height);

  const barWidth = (width - padding * 2) / labels.length - 10;
  const chartHeight = height - padding * 2;

  labels.forEach((label, i) => {
    const barHeight = (data[i] / maxValue) * chartHeight;
    const x = padding + i * ((width - padding * 2) / labels.length) + 5;
    const y = height - padding - barHeight;

    
    ctx.fillStyle = barColor;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    
    ctx.fillStyle = '#666';
    ctx.font = '12px Tajawal, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + barWidth / 2, height - 10);

    
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 13px Tajawal, sans-serif';
    ctx.fillText(data[i], x + barWidth / 2, y - 8);
  });
}


(function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
})();


(function initCookieConsent() {
  if (localStorage.getItem('cookieConsent')) return;
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  setTimeout(() => banner.classList.add('show'), 2000);

  const acceptBtn = banner.querySelector('.cookie-accept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      banner.classList.remove('show');
    });
  }
})();


(function initTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = el.dataset.tooltip;
      document.body.appendChild(tip);

      const rect = el.getBoundingClientRect();
      tip.style.cssText = `
        position: fixed;
        top: ${rect.top - tip.offsetHeight - 8}px;
        left: ${rect.left + rect.width / 2 - tip.offsetWidth / 2}px;
        background: #2C3E50;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.82rem;
        font-family: Tajawal, sans-serif;
        z-index: 9999;
        white-space: nowrap;
        pointer-events: none;
      `;
    });

    el.addEventListener('mouseleave', () => {
      const tip = document.querySelector('.tooltip');
      if (tip) tip.remove();
    });
  });
})();


window.SIC = {
  openModal,
  closeModal,
  showNotification,
  animateCounter,
  getUrlParam,
  formatNumber,
  truncateText,
  createBarChart,
  initTabs,
  debounce
};


(function addSearchStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #searchOverlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(8px);
      z-index: 5000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 100px 24px 24px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    #searchOverlay.open {
      opacity: 1;
      visibility: visible;
    }
    .search-overlay-inner {
      width: 100%;
      max-width: 700px;
    }
    .search-overlay-bar {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .search-overlay-bar input {
      flex: 1;
      padding: 20px 24px;
      font-size: 1.1rem;
      border: none;
      outline: none;
      font-family: Tajawal, sans-serif;
      color: #2C3E50;
    }
    .search-overlay-bar button {
      padding: 20px 24px;
      background: #D4AF37;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
    }
    #searchResults {
      margin-top: 12px;
      background: white;
      border-radius: 12px;
      overflow: hidden;
    }
    .search-result-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.2s;
      color: #2C3E50;
    }
    .search-result-item:hover {
      background: rgba(212,175,55,0.06);
    }
    .search-result-icon {
      width: 40px;
      height: 40px;
      background: rgba(212,175,55,0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #D4AF37;
      flex-shrink: 0;
    }
    .search-result-title {
      font-weight: 700;
      font-size: 0.95rem;
    }
    .search-result-subtitle {
      font-size: 0.8rem;
      color: #999;
      margin-top: 2px;
    }
    .search-result-arrow {
      margin-right: auto;
      color: #D4AF37;
      font-size: 0.8rem;
    }
    .search-no-results {
      padding: 20px;
      text-align: center;
      color: #999;
      font-family: Tajawal, sans-serif;
    }
    #cookieBanner {
      position: fixed;
      bottom: -100px;
      left: 24px;
      right: 24px;
      max-width: 500px;
      margin: 0 auto;
      background: #2C3E50;
      color: white;
      padding: 20px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 4000;
      transition: bottom 0.4s ease;
      font-family: Tajawal, sans-serif;
      font-size: 0.88rem;
    }
    #cookieBanner.show {
      bottom: 24px;
    }
    .cookie-accept {
      padding: 8px 20px;
      background: #D4AF37;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: Tajawal, sans-serif;
      font-weight: 700;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(style);
})();
