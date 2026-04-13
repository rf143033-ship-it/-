'use strict';

(function initComparePage() {
  if (!document.getElementById('comparePage')) return;
  if (typeof CITIES_DATA === 'undefined') return;

  const city1Select = document.getElementById('city1Select');
  const city2Select = document.getElementById('city2Select');
  const compareBtn = document.getElementById('compareBtn');
  const resultContainer = document.getElementById('compareResult');

  const options = CITIES_DATA.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  if (city1Select) city1Select.innerHTML = '<option value="">-- اختر مدينة --</option>' + options;
  if (city2Select) city2Select.innerHTML = '<option value="">-- اختر مدينة --</option>' + options;

  if (city1Select && CITIES_DATA[0]) city1Select.value = CITIES_DATA[0].id;
  if (city2Select && CITIES_DATA[1]) city2Select.value = CITIES_DATA[1].id;

  function compareSelected() {
    const id1 = city1Select ? city1Select.value : '';
    const id2 = city2Select ? city2Select.value : '';

    if (!id1 || !id2) {
      SIC.showNotification('الرجاء اختيار مدينتين للمقارنة', 'error');
      return;
    }

    if (id1 === id2) {
      SIC.showNotification('الرجاء اختيار مدينتين مختلفتين', 'error');
      return;
    }

    const c1 = CITIES_DATA.find(c => c.id === id1);
    const c2 = CITIES_DATA.find(c => c.id === id2);

    if (!c1 || !c2) return;

    const rows = [
      { label: 'المنطقة', v1: c1.region, v2: c2.region },
      { label: 'سنة التأسيس', v1: c1.established, v2: c2.established },
      { label: 'المساحة', v1: c1.area.toLocaleString('ar-SA') + ' ' + c1.areaUnit, v2: c2.area.toLocaleString('ar-SA') + ' ' + c2.areaUnit },
      { label: 'عدد المنشآت', v1: c1.factories.toLocaleString('ar-SA'), v2: c2.factories.toLocaleString('ar-SA') },
      { label: 'عدد العمال', v1: c1.workers.toLocaleString('ar-SA'), v2: c2.workers.toLocaleString('ar-SA') },
      { label: 'مساهمة الناتج المحلي', v1: c1.gdpContribution + '%', v2: c2.gdpContribution + '%' },
      { label: 'قيمة الصادرات', v1: c1.exportValue + ' مليار ريال', v2: c2.exportValue + ' مليار ريال' },
      { label: 'نسبة التوطين', v1: c1.saudiEmployment + '%', v2: c2.saudiEmployment + '%' },
      { label: 'الإنتاج السنوي', v1: c1.stats.annualProduction, v2: c2.stats.annualProduction },
      { label: 'نسبة التصدير', v1: c1.stats.exportPercentage, v2: c2.stats.exportPercentage },
      { label: 'المحتوى المحلي', v1: c1.stats.localContent, v2: c2.stats.localContent }
    ];

    if (resultContainer) {
      resultContainer.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px">
          <div class="card" style="overflow:hidden">
            <img src="${c1.image}" alt="${c1.name}" style="width:100%;height:200px;object-fit:cover">
            <div style="padding:20px;text-align:center">
              <h3 style="color:#2C3E50">${c1.name}</h3>
              <p style="color:#999;font-size:0.88rem">${c1.region}</p>
            </div>
          </div>
          <div class="card" style="overflow:hidden">
            <img src="${c2.image}" alt="${c2.name}" style="width:100%;height:200px;object-fit:cover">
            <div style="padding:20px;text-align:center">
              <h3 style="color:#2C3E50">${c2.name}</h3>
              <p style="color:#999;font-size:0.88rem">${c2.region}</p>
            </div>
          </div>
        </div>
        <div style="overflow-x:auto">
          <table class="compare-table">
            <thead>
              <tr>
                <th>المعيار</th>
                <th>${c1.name}</th>
                <th>${c2.name}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td>${row.label}</td>
                  <td>${row.v1}</td>
                  <td>${row.v2}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px">
          <div>
            <h4 style="color:#2C3E50;margin-bottom:16px">الصناعات - ${c1.name}</h4>
            <div class="tags">${c1.industries.map(i => `<span class="tag tag-gold">${i}</span>`).join('')}</div>
          </div>
          <div>
            <h4 style="color:#2C3E50;margin-bottom:16px">الصناعات - ${c2.name}</h4>
            <div class="tags">${c2.industries.map(i => `<span class="tag tag-gold">${i}</span>`).join('')}</div>
          </div>
        </div>
        <div style="display:flex;gap:16px;justify-content:center;margin-top:32px">
          <a href="city-details.html?id=${c1.id}" class="btn btn-dark">تفاصيل ${c1.name}</a>
          <a href="city-details.html?id=${c2.id}" class="btn btn-primary">تفاصيل ${c2.name}</a>
        </div>
      `;
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (compareBtn) compareBtn.addEventListener('click', compareSelected);

  if (city1Select && city2Select && city1Select.value && city2Select.value) {
    compareSelected();
  }
})();
