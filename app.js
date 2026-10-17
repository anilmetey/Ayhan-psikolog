/**
 * Uzm. Psk. Ayhan Altaş - Ultra-Luxury Architectural Experience
 * Cinematic Preloader, 3D EMDR Wave Canvas, 3D Card Tilt, Scroll Reveals & Assessment
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initScrollProgress();
  initScrollReveals();
  init3dEmdrCanvas();
  init3dTiltCards();
  initMobileNav();
  initInteractiveAssessment();
  initFaqAccordion();
});

/* ==========================================================================
   1. CINEMATIC SPLASH SCREEN CONTROLLER
   ========================================================================== */

function initSplashScreen() {
  const splash = document.querySelector('.splash-screen');
  const counterEl = document.querySelector('.splash-counter');
  const progressBar = document.querySelector('.splash-progress-bar');
  if (!splash) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;

    if (counterEl) counterEl.textContent = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        splash.classList.add('is-loaded');
        // Trigger hero reveal
        document.querySelectorAll('#hero .reveal-fade').forEach((el) => {
          el.classList.add('is-revealed');
        });
      }, 350);
    }
  }, 35);
}

/* ==========================================================================
   2. SCROLL PROGRESS TRACKER
   ========================================================================== */

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-tracker');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   3. SCROLL REVEALS (Intersection Observer)
   ========================================================================== */

function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-fade');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => {
    // Hero elements are triggered after splash screen
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   4. 3D INTERACTIVE EMDR NEURAL WAVE CANVAS
   Simulates bilateral cognitive stimulation with interactive 3D perspective
   ========================================================================== */

function init3dEmdrCanvas() {
  const canvas = document.getElementById('emdr-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }, { passive: true });

  // 3D Particles Matrix
  const cols = 28;
  const rows = 12;
  const spacingX = width / (cols - 1);
  const spacingY = height / (rows - 1);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let time = 0;

  const container = canvas.parentElement;
  container.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  }, { passive: true });

  container.addEventListener('mouseleave', () => {
    targetMouseX = width / 2;
    targetMouseY = height / 2;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    time += 0.035;

    // Bilateral horizontal wave (EMDR eye movement pacing)
    const bilateralPulse = Math.sin(time * 1.4) * (width * 0.28);

    ctx.lineWidth = 1;

    for (let j = 0; j < rows; j++) {
      ctx.beginPath();
      let started = false;

      for (let i = 0; i < cols; i++) {
        const baseX = i * spacingX;
        const baseY = j * spacingY;

        // Mathematical 3D elevation
        const distFromCenter = Math.hypot(baseX - (width / 2 + bilateralPulse), baseY - height / 2);
        const waveZ = Math.sin(time + distFromCenter * 0.02) * 22;
        const mouseDist = Math.hypot(baseX - mouseX, baseY - mouseY);
        const mouseLift = Math.max(0, 45 - mouseDist * 0.25);

        const elevY = baseY - waveZ - mouseLift;
        const elevX = baseX + Math.cos(time + j * 0.3) * 6;

        if (!started) {
          ctx.moveTo(elevX, elevY);
          started = true;
        } else {
          ctx.lineTo(elevX, elevY);
        }

        // Draw nodal points with champagne warmth
        const alpha = Math.min(1, Math.max(0.15, (elevY / height) * 0.9));
        ctx.fillStyle = `rgba(216, 194, 167, ${alpha * 0.65})`;
        ctx.fillRect(elevX - 1.5, elevY - 1.5, 3, 3);
      }

      ctx.strokeStyle = 'rgba(179, 142, 100, 0.18)';
      ctx.stroke();
    }

    // Focal bilateral stimulus node
    const focalX = width / 2 + bilateralPulse;
    const focalY = height / 2 + Math.sin(time * 2) * 15;

    ctx.beginPath();
    ctx.arc(focalX, focalY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#b38e64';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(focalX, focalY, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(216, 194, 167, 0.35)';
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* ==========================================================================
   5. 3D TILT CARDS CONTROLLER
   ========================================================================== */

function init3dTiltCards() {
  const cards = document.querySelectorAll('.tilt-card-wrapper');
  if (!cards.length) return;

  cards.forEach((wrapper) => {
    const inner = wrapper.querySelector('.tilt-card-inner') || wrapper;
    const glare = wrapper.querySelector('.tilt-card-glare');

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (max +/- 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`; /* taste-skill-ignore */
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   6. MOBILE NAVIGATION
   ========================================================================== */

function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const menu = document.querySelector('.nav-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-active');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE ASSESSMENT TOOL (The Live Keşif Aracı)
   ========================================================================== */

function initInteractiveAssessment() {
  const root = document.querySelector('.interactive-tool-section');
  if (!root) return;

  const steps = [
    {
      title: "Gündelik hayatınızda sizi en çok zorlayan temel durum nedir?",
      options: [
        {
          id: "panik",
          label: "Aniden gelen çarpıntı, nefes darlığı ve yoğun kontrol kaybı hissi (Panik Atak)",
          modality: "EMDR Terapisi & Panik Bozukluk Protokolü",
          headline: "Panik Bozukluğunda Bilimsel EMDR ve Bilişsel Müdahale",
          explanation: "Uzman Klinik Psikolog Ayhan Altaş'ın tez çalışması doğrudan Panik Bozukluğunda EMDR terapisi üzerinedir. Seanslarda bedensel alarm sistemini yanlış tetikleyen duyumlar ve zihinsel felaket senaryoları yapılandırılmış klinik protokolle yeniden işlenir."
        },
        {
          id: "travma",
          label: "Geçmişte yaşanan sarsıcı bir kayıp, kaza veya çocukluk anısının bugünü etkilemesi",
          modality: "EMDR (Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme)",
          headline: "Travmatik Anı Ağlarının Güvenle Çözümlenmesi",
          explanation: "Beynimiz aşırı stres altındayken anıları sağlıklı dosyalayamaz. DBE akreditasyonlu EMDR sürecinde, anının duygusal yükü iki yönlü uyarım tekniğiyle duyarsızlaştırılır ve anı nötr bir yaşam tecrübesine dönüştürülür."
        },
        {
          id: "fobi",
          label: "Belirli durumlar, mekanlar veya sosyal ortamlardan kaçınma (Fobi & Sosyal Kaygı)",
          modality: "Hipnoterapi & Bilişsel Davranışçı Terapi Entegrasyonu",
          headline: "Bilinçdışı Savunmaları Anlama ve Güven Alanı İnşası",
          explanation: "Omni Hipnoz Akademisi teknikleri ve klinik görüşme yöntemleriyle, mantığınızın 'korkma' demesine rağmen bedeninizin verdiği kaçınma tepkisi derin odaklanma halinde yeniden yapılandırılır."
        },
        {
          id: "kaygi",
          label: "Sürekli bir şeylerin kötü gideceği hissi, içsel huzursuzluk ve tükenmişlik",
          modality: "Bilişsel Klinik Terapi & 'Kaygımı Tanıyorum' Yaklaşımı",
          headline: "Kaygıyı Bastırmak Değil, Mesajını Çözümlemek",
          explanation: "Ayhan Altaş'ın 'Kaygımı Tanıyorum' kitabında ele aldığı gibi, kaygı bir düşman değil yanlış ayarlanmış bir alarmdır. Terapide zihninizin tehdit algılama mekanizması adım adım güvenli zemine çekilir."
        }
      ]
    },
    {
      title: "Bu durum gündelik yaşamınızı ne kadar süredir etkiliyor?",
      options: [
        { id: "recent", label: "Son birkaç aydır (Yeni başlayan bir kriz veya geçiş süreci)" },
        { id: "chronic", label: "Bir yıldan uzun süredir (Kronikleşmiş ve alışkanlığa dönüşmüş)" },
        { id: "lifelong", label: "Kendimi bildim bileli bu döngüyü yaşıyorum" }
      ]
    },
    {
      title: "Görüşme ve danışmanlık tercihinizi belirtin:",
      options: [
        { id: "bursa", label: "Bursa Nilüfer'deki muayenehanede yüz yüze görüşme" },
        { id: "online", label: "Konum bağımsız, güvenli online seans" }
      ]
    }
  ];

  let currentStep = 0;
  const userChoices = {};

  const stepContainer = root.querySelector('.tool-step-container');
  const resultPanel = root.querySelector('.tool-result-panel');
  const stepCounter = root.querySelector('.tool-step-counter');
  const stepTitle = root.querySelector('.tool-step-title');
  const optionsList = root.querySelector('.tool-options-list');
  const restartBtn = root.querySelector('.tool-restart-btn');

  function renderStep(index) {
    if (index >= steps.length) {
      showResults();
      return;
    }

    if (stepContainer) stepContainer.style.display = 'block';
    if (resultPanel) {
      resultPanel.classList.remove('is-active');
      resultPanel.style.display = 'none';
    }

    const step = steps[index];
    if (stepCounter) stepCounter.textContent = `Aşama ${index + 1} / ${steps.length}`;
    if (stepTitle) stepTitle.textContent = step.title;

    if (optionsList) {
      optionsList.innerHTML = '';
      step.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tool-option-btn';
        btn.innerHTML = `
          <span>${opt.label}</span>
          <span class="tool-option-indicator"></span>
        `;
        btn.addEventListener('click', () => {
          userChoices[index] = opt;
          currentStep++;
          renderStep(currentStep);
        });
        optionsList.appendChild(btn);
      });
    }
  }

  function showResults() {
    if (stepContainer) stepContainer.style.display = 'none';
    if (!resultPanel) return;

    resultPanel.style.display = 'flex';
    resultPanel.classList.add('is-active');

    const choice1 = userChoices[0] || steps[0].options[0];
    const choice3 = userChoices[2] || steps[2].options[0];

    const modalityBadge = resultPanel.querySelector('.result-modality-badge');
    const resultTitle = resultPanel.querySelector('.result-title');
    const resultExplanation = resultPanel.querySelector('.result-explanation');
    const resultActionBtn = resultPanel.querySelector('.result-action-link');

    if (modalityBadge) modalityBadge.textContent = choice1.modality;
    if (resultTitle) resultTitle.textContent = choice1.headline;
    if (resultExplanation) resultExplanation.textContent = choice1.explanation;

    if (resultActionBtn) {
      const message = `Merhaba Uzm. Psk. Ayhan Altaş, sitenizdeki klinik keşif rehberini inceledim. Temel şikayetim: "${choice1.label}". Tercih ettiğim seans türü: ${choice3.label}. İlk görüşme ve uygun randevu takvimi hakkında bilgi almak istiyorum.`;
      const encoded = encodeURIComponent(message);
      resultActionBtn.href = `https://wa.me/905370212508?text=${encoded}`;
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentStep = 0;
      renderStep(0);
    });
  }

  renderStep(0);
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const btn = other.querySelector('.faq-question-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      questionBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}
