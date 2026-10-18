/**
 * Atmosphere Emotion-Based Ambient System (atmosphere.js)
 * Pure Vanilla JS • localStorage persistence • Accessible & performant
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'ayhan_atmosphere';
    const VALID_MOODS = ['huzurlu', 'yorgun', 'kaygili', 'huzunlu', 'enerjik'];
    const MOOD_NAMES = {
        huzurlu: 'Huzurlu',
        yorgun: 'Yorgun',
        kaygili: 'Kaygılı',
        huzunlu: 'Hüzünlü',
        enerjik: 'Enerjik'
    };
    const MOOD_LABELS = {
        huzurlu: 'Huzurlu ve dengeli',
        yorgun: 'Sıcak krem & soluk amber',
        kaygili: 'Yatıştırıcı adaçayı yeşili',
        huzunlu: 'Dingin gri-mavi tonlar',
        enerjik: 'Canlandırıcı şeftali & altın'
    };

    let currentMood = 'huzurlu';

    function initAtmosphere() {
        const widget = document.getElementById('atmosphere-widget');
        const toggleBtn = document.getElementById('atmosphere-toggle');
        const chipsTray = document.getElementById('atmosphere-chips');
        const chipButtons = document.querySelectorAll('.atmosphere-chip');

        if (!widget || !toggleBtn || !chipsTray) return;

        // 1. Get saved mood or default to 'huzurlu'
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && VALID_MOODS.includes(saved)) {
                currentMood = saved;
            }
        } catch (e) {
            // LocalStorage disabled or unavailable; graceful fallback
        }

        // 2. Apply initial mood (MOOD_LABELS is safely defined above)
        applyMood(currentMood, false);

        let lastToggleTime = 0;

        // 3. Expose global toggleAtmosphere handler for direct HTML onclick or external calls
        window.toggleAtmosphere = function (e) {
            if (e) {
                if (typeof e.preventDefault === 'function') e.preventDefault();
                if (typeof e.stopPropagation === 'function') e.stopPropagation();
            }
            const now = Date.now();
            if (now - lastToggleTime < 250) {
                return; // Prevent duplicate toggle from inline onclick + addEventListener firing simultaneously
            }
            lastToggleTime = now;

            const isOpen = chipsTray.classList.toggle('is-open');
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggleBtn.classList.toggle('is-active', isOpen);
        };

        // Bind single robust click listener
        toggleBtn.onclick = window.toggleAtmosphere;

        // 4. Handle mood chip clicks & hover preview
        chipButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const mood = btn.getAttribute('data-mood');
                if (mood && VALID_MOODS.includes(mood)) {
                    applyMood(mood, true);
                    closeTray();
                }
            });

            btn.addEventListener('mouseenter', function () {
                const mood = btn.getAttribute('data-mood');
                const hintEl = document.querySelector('.atmosphere-panel-hint');
                if (hintEl && MOOD_LABELS[mood]) {
                    hintEl.textContent = MOOD_LABELS[mood];
                }
            });

            btn.addEventListener('mouseleave', function () {
                const hintEl = document.querySelector('.atmosphere-panel-hint');
                if (hintEl && MOOD_LABELS[currentMood]) {
                    hintEl.textContent = MOOD_LABELS[currentMood];
                }
            });
        });

        // 5. Close when clicking outside
        document.addEventListener('click', function (e) {
            if (!widget.contains(e.target)) {
                closeTray();
            }
        });

        // 6. Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && chipsTray.classList.contains('is-open')) {
                closeTray();
                toggleBtn.focus();
            }
        });

        function closeTray() {
            chipsTray.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.classList.remove('is-active');
        }

        function applyMood(mood, persist) {
            currentMood = mood;
            document.documentElement.setAttribute('data-atmosphere', mood);

            // Update chips aria & visual state
            chipButtons.forEach(function (btn) {
                const isSelected = btn.getAttribute('data-mood') === mood;
                btn.classList.toggle('is-active', isSelected);
                btn.setAttribute('aria-checked', isSelected ? 'true' : 'false');
            });

            // Update panel hint label
            const hintEl = document.querySelector('.atmosphere-panel-hint');
            if (hintEl && MOOD_LABELS[mood]) {
                hintEl.textContent = MOOD_LABELS[mood];
            }

            // Update visible trigger button label
            const labelTextEl = document.getElementById('atmosphere-toggle-text');
            if (labelTextEl) {
                labelTextEl.textContent = 'Duygunu Seç: ' + (MOOD_NAMES[mood] || 'Huzurlu');
            }

            if (persist) {
                try {
                    localStorage.setItem(STORAGE_KEY, mood);
                } catch (e) {}
            }
        }
    }

    // Initialize immediately if ready or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAtmosphere);
    } else {
        initAtmosphere();
    }
})();
