'use strict';

(function initVisionPage() {
  if (!document.getElementById('visionPage')) return;
  if (typeof VISION_2030_DATA === 'undefined') return;

  
  const targetsContainer = document.getElementById('visionTargets');
  if (targetsContainer) {
    targetsContainer.innerHTML = VISION_2030_DATA.targets.map(t => {
      const pct = Math.round((t.current / t.target) * 100);
      return `
        <div class="card reveal" style="padding:28px">
          <div class="d-flex justify-between align-center mb-16">
            <h4 style="font-size:1rem;color:#2C3E50">${t.title}</h4>
            <span style="background:rgba(212,175,55,0.1);color:#D4AF37;padding:4px 12px;border-radius:100px;font-size:0.82rem;font-weight:700">${pct}%</span>
          </div>
          <div class="progress-bar" style="height:10px">
            <div class="progress-fill" data-width="${pct}"></div>
          </div>
          <div class="d-flex justify-between mt-12">
            <span style="font-size:0.85rem;color:#666">الحالي: <strong style="color:#D4AF37">${t.current} ${t.unit}</strong></span>
            <span style="font-size:0.85rem;color:#666">المستهدف: <strong style="color:#2C3E50">${t.target} ${t.unit}</strong></span>
          </div>
        </div>
      `;
    }).join('');
  }

  
  const pillarsContainer = document.getElementById('visionPillars');
  if (pillarsContainer) {
    const icons = ['fa-chart-line', 'fa-flag', 'fa-globe', 'fa-microchip'];
    pillarsContainer.innerHTML = VISION_2030_DATA.pillars.map((p, i) => `
      <div class="stat-card reveal delay-${(i+1)*100}">
        <div class="icon"><i class="fas ${icons[i]}"></i></div>
        <h4 style="margin:12px 0 8px;font-size:1rem">${p.title}</h4>
        <p style="font-size:0.88rem;color:#777">${p.description}</p>
      </div>
    `).join('');
  }
})();