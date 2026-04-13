'use strict';

(function initTimeline() {
  if (!document.getElementById('timelinePage')) return;
  if (typeof TIMELINE_DATA === 'undefined') return;

  const container = document.getElementById('timelineContainer');
  if (!container) return;

  container.innerHTML = TIMELINE_DATA.map((item, i) => `
    <div class="timeline-item ${i % 2 === 0 ? '' : 'reverse'}">
      <div class="timeline-content reveal ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}">
        ${item.milestone ? '<span style="display:inline-block;background:#D4AF37;color:white;padding:3px 12px;border-radius:100px;font-size:0.78rem;font-weight:700;margin-bottom:10px">حدث محوري</span>' : ''}
        <h4 style="color:#2C3E50;margin-bottom:8px">${item.event}</h4>
        <p style="font-size:0.9rem;color:#666">${item.description}</p>
      </div>
      <div class="timeline-year">
        <div class="timeline-year-badge ${item.milestone ? 'milestone' : ''}">${item.year}</div>
      </div>
      <div class="timeline-content" style="visibility:hidden"></div>
    </div>
  `).join('');
})();
