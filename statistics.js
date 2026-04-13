'use strict';

(function initStatisticsPage() {
  if (!document.getElementById('statisticsPage')) return;

  const stats = typeof ECONOMIC_STATS !== 'undefined' ? ECONOMIC_STATS : null;
  if (!stats) return;

  
  const statsGrid = document.getElementById('mainStatsGrid');
  if (statsGrid) {
    const items = [
      { icon: 'fa-city', number: stats.totalCities, label: 'مدينة صناعية', suffix: '' },
      { icon: 'fa-industry', number: stats.totalFactories, label: 'منشأة صناعية', suffix: '' },
      { icon: 'fa-users', number: stats.totalWorkers, label: 'عامل وموظف', suffix: '' },
      { icon: 'fa-chart-line', number: stats.gdpContribution, label: 'من الناتج المحلي', suffix: '%' }
    ];
    statsGrid.innerHTML = items.map(item => `
      <div class="stat-card reveal">
        <div class="icon"><i class="fas ${item.icon}"></i></div>
        <div class="number" data-counter="${item.number}" data-suffix="${item.suffix}">0</div>
        <div class="label">${item.label}</div>
      </div>
    `).join('');
  }

  
  if (typeof VISION_2030_DATA !== 'undefined') {
    const progressContainer = document.getElementById('visionProgress');
    if (progressContainer) {
      progressContainer.innerHTML = VISION_2030_DATA.targets.map(t => `
        <div class="vision-target-item reveal">
          <div class="d-flex justify-between align-center mb-8">
            <span class="font-bold text-primary">${t.title}</span>
            <span class="text-gold font-bold">${t.current} / ${t.target} ${t.unit}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" data-width="${Math.round((t.current / t.target) * 100)}"></div>
          </div>
          <div class="d-flex justify-between mt-8">
            <span style="font-size:0.8rem;color:#999">الحالي: ${t.current} ${t.unit}</span>
            <span style="font-size:0.8rem;color:#999">المستهدف: ${t.target} ${t.unit}</span>
          </div>
        </div>
      `).join('');
    }
  }
})();
