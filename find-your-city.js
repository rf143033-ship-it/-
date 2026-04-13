'use strict';

(function initFindYourCity() {
  if (!document.getElementById('findCityPage')) return;

  const questions = [
    {
      id: 'industry',
      question: 'ما هو القطاع الصناعي الذي تستهدفه؟',
      options: [
        { label: 'البتروكيماويات والنفط', value: 'petrochemicals', icon: 'fa-oil-well' },
        { label: 'الصناعات الغذائية', value: 'food', icon: 'fa-wheat-awn' },
        { label: 'الصناعات الدوائية', value: 'pharma', icon: 'fa-pills' },
        { label: 'مواد البناء', value: 'construction', icon: 'fa-building' },
        { label: 'اللوجستيات', value: 'logistics', icon: 'fa-truck' },
        { label: 'التقنية والتصنيع المتقدم', value: 'tech', icon: 'fa-microchip' }
      ]
    },
    {
      id: 'region',
      question: 'ما هي المنطقة الجغرافية المفضلة لمشروعك؟',
      options: [
        { label: 'المنطقة الوسطى (الرياض)', value: 'central', icon: 'fa-map-marker-alt' },
        { label: 'المنطقة الغربية (جدة/مكة)', value: 'west', icon: 'fa-map-marker-alt' },
        { label: 'المنطقة الشرقية (الدمام/الجبيل)', value: 'east', icon: 'fa-map-marker-alt' },
        { label: 'المنطقة الشمالية', value: 'north', icon: 'fa-map-marker-alt' },
        { label: 'المنطقة الجنوبية', value: 'south', icon: 'fa-map-marker-alt' },
        { label: 'لا يهم الموقع', value: 'any', icon: 'fa-globe' }
      ]
    },
    {
      id: 'investment',
      question: 'ما هو حجم الاستثمار المخطط له؟',
      options: [
        { label: 'أقل من 10 مليون ريال', value: 'small', icon: 'fa-coins' },
        { label: '10 - 50 مليون ريال', value: 'medium', icon: 'fa-coins' },
        { label: '50 - 200 مليون ريال', value: 'large', icon: 'fa-coins' },
        { label: 'أكثر من 200 مليون ريال', value: 'xlarge', icon: 'fa-coins' }
      ]
    },
    {
      id: 'priority',
      question: 'ما هو أهم عامل في اختيار المدينة الصناعية؟',
      options: [
        { label: 'القرب من الموانئ', value: 'port', icon: 'fa-ship' },
        { label: 'توفر المواد الخام', value: 'materials', icon: 'fa-boxes-stacked' },
        { label: 'الحوافز الحكومية', value: 'incentives', icon: 'fa-hand-holding-dollar' },
        { label: 'البنية التحتية المتطورة', value: 'infrastructure', icon: 'fa-road' },
        { label: 'القرب من الأسواق', value: 'market', icon: 'fa-store' },
        { label: 'توفر الكوادر البشرية', value: 'workforce', icon: 'fa-users' }
      ]
    }
  ];

  let currentQ = 0;
  const answers = {};

  const questionContainer = document.getElementById('questionContainer');
  const progressBar = document.getElementById('quizProgress');
  const resultContainer = document.getElementById('quizResult');

  function renderQuestion() {
    if (!questionContainer) return;
    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;

    if (progressBar) {
      progressBar.style.width = progress + '%';
      const stepEl = document.getElementById('quizStep');
      if (stepEl) stepEl.textContent = `السؤال ${currentQ + 1} من ${questions.length}`;
    }

    questionContainer.innerHTML = `
      <div class="quiz-question reveal">
        <h3 style="font-size:1.4rem;color:#2C3E50;margin-bottom:32px;text-align:center">${q.question}</h3>
        <div class="quiz-options" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
          ${q.options.map(opt => `
            <button class="quiz-option" data-value="${opt.value}" style="
              padding:20px 16px;
              border:2px solid #e8e0d0;
              border-radius:12px;
              background:white;
              cursor:pointer;
              transition:all 0.3s;
              text-align:center;
              font-family:Tajawal,sans-serif;
              font-size:0.9rem;
              color:#2C3E50;
            ">
              <i class="fas ${opt.icon}" style="font-size:1.8rem;color:#D4AF37;display:block;margin-bottom:10px"></i>
              ${opt.label}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    
    questionContainer.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[q.id] = btn.dataset.value;
        btn.style.borderColor = '#D4AF37';
        btn.style.background = 'rgba(212,175,55,0.08)';
        setTimeout(() => {
          currentQ++;
          if (currentQ < questions.length) {
            renderQuestion();
          } else {
            showResult();
          }
        }, 400);
      });

      btn.addEventListener('mouseenter', () => {
        if (!btn.style.borderColor.includes('D4AF37')) {
          btn.style.borderColor = '#C9A961';
          btn.style.background = 'rgba(212,175,55,0.04)';
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (!btn.style.borderColor.includes('D4AF37')) {
          btn.style.borderColor = '#e8e0d0';
          btn.style.background = 'white';
        }
      });
    });
  }

  function showResult() {
    if (progressBar) progressBar.style.width = '100%';

    
    let scores = {};
    if (typeof CITIES_DATA !== 'undefined') {
      CITIES_DATA.forEach(city => { scores[city.id] = 0; });

      
      if (answers.industry === 'petrochemicals') {
        ['jubail', 'yanbu', 'jizan'].forEach(id => { if (scores[id] !== undefined) scores[id] += 3; });
      } else if (answers.industry === 'food') {
        ['riyadh', 'jeddah', 'hail', 'madinah'].forEach(id => { if (scores[id] !== undefined) scores[id] += 3; });
      } else if (answers.industry === 'pharma') {
        ['riyadh', 'sudair'].forEach(id => { if (scores[id] !== undefined) scores[id] += 3; });
      } else if (answers.industry === 'logistics') {
        ['jeddah', 'dammam'].forEach(id => { if (scores[id] !== undefined) scores[id] += 3; });
      }

      
      if (answers.region === 'central') {
        ['riyadh', 'sudair'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.region === 'west') {
        ['jeddah', 'yanbu', 'taif', 'madinah'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.region === 'east') {
        ['jubail', 'dammam'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.region === 'north') {
        ['hail'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.region === 'south') {
        ['jizan'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      }

      
      if (answers.priority === 'port') {
        ['jeddah', 'jubail', 'yanbu', 'jizan'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.priority === 'materials') {
        ['jubail', 'yanbu', 'jizan'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      } else if (answers.priority === 'market') {
        ['riyadh', 'jeddah', 'dammam'].forEach(id => { if (scores[id] !== undefined) scores[id] += 2; });
      }
    }

    
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topIds = sorted.slice(0, 3).map(s => s[0]);
    const topCities = topIds.map(id => CITIES_DATA.find(c => c.id === id)).filter(Boolean);

    if (questionContainer) questionContainer.innerHTML = '';

    if (resultContainer) {
      resultContainer.innerHTML = `
        <div style="text-align:center;margin-bottom:40px">
          <div style="width:80px;height:80px;background:linear-gradient(135deg,#D4AF37,#C9A961);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
            <i class="fas fa-star" style="font-size:2rem;color:white"></i>
          </div>
          <h2 style="color:#2C3E50;margin-bottom:8px">نتائج البحث عن مدينتك المثالية</h2>
          <p style="color:#999">بناءً على إجاباتك، هذه أفضل المدن الصناعية لمشروعك</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:32px">
          ${topCities.map((city, i) => `
            <div class="card reveal delay-${(i+1)*100}" style="position:relative;overflow:hidden">
              ${i === 0 ? '<div style="position:absolute;top:16px;right:16px;background:#D4AF37;color:white;padding:4px 12px;border-radius:100px;font-size:0.78rem;font-weight:700;z-index:1">الأفضل لك</div>' : ''}
              <img src="${city.image}" alt="${city.name}" style="width:100%;height:160px;object-fit:cover">
              <div style="padding:20px">
                <h4 style="color:#2C3E50;margin-bottom:4px">${city.name}</h4>
                <p style="color:#999;font-size:0.85rem;margin-bottom:12px">${city.region}</p>
                <div class="tags">
                  ${city.industries.slice(0, 2).map(ind => `<span class="tag">${ind}</span>`).join('')}
                </div>
                <a href="city-details.html?id=${city.id}" class="btn btn-primary btn-sm w-full" style="margin-top:16px;justify-content:center">
                  عرض التفاصيل
                </a>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center">
          <button onclick="location.reload()" class="btn btn-dark">
            <i class="fas fa-redo"></i>
            إعادة الاختبار
          </button>
        </div>
      `;
    }
  }

  renderQuestion();
})();
