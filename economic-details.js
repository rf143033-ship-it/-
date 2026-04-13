'use strict';

(function initEconomicDetails() {
  if (!document.getElementById('economicDetailsPage')) return;

  const sectionId = new URLSearchParams(window.location.search).get('section') || 'gdp';

  const sections = {
    gdp: {
      title: 'الناتج المحلي الإجمالي الصناعي',
      description: 'يُسهم القطاع الصناعي بنسبة 12.5% من الناتج المحلي الإجمالي للمملكة العربية السعودية، مع استهداف رفعها إلى 25% بحلول 2030.',
      stats: [
        { label: 'المساهمة الحالية', value: '12.5%' },
        { label: 'المستهدف 2030', value: '25%' },
        { label: 'معدل النمو السنوي', value: '8.3%' }
      ]
    },
    exports: {
      title: 'الصادرات غير النفطية',
      description: 'ارتفعت الصادرات غير النفطية بشكل ملحوظ خلال السنوات الأخيرة، مدفوعةً بنمو القطاع الصناعي وتطوير المدن الصناعية.',
      stats: [
        { label: 'إجمالي الصادرات', value: '285 مليار ريال' },
        { label: 'المستهدف 2030', value: '500 مليار ريال' },
        { label: 'نمو الصادرات', value: '15% سنوياً' }
      ]
    },
    investment: {
      title: 'الاستثمار الأجنبي المباشر',
      description: 'تستقطب المملكة استثمارات أجنبية ضخمة في القطاع الصناعي، مستفيدةً من بيئتها الاستثمارية المحفزة ومدنها الصناعية المتطورة.',
      stats: [
        { label: 'الاستثمار الحالي', value: '145 مليار ريال' },
        { label: 'المستهدف 2030', value: '300 مليار ريال' },
        { label: 'عدد المشاريع', value: '2,400+ مشروع' }
      ]
    }
  };

  const section = sections[sectionId] || sections.gdp;

  const titleEl = document.getElementById('economicSectionTitle');
  if (titleEl) titleEl.textContent = section.title;

  const descEl = document.getElementById('economicSectionDesc');
  if (descEl) descEl.textContent = section.description;

  const statsEl = document.getElementById('economicSectionStats');
  if (statsEl) {
    statsEl.innerHTML = section.stats.map(s => `
      <div class="stat-card">
        <div class="number">${s.value}</div>
        <div class="label">${s.label}</div>
      </div>
    `).join('');
  }
})();
