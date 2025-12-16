/**
 * Cubik Builder - Mobile Detection Module
 * @module mobile
 * @description Detects mobile devices and shows video placeholder
 * @version 1.1
 */
(function() {
  'use strict';

  // Keep language behaviour consistent with i18n.js:
  // 1) ?lang=xx, 2) localStorage('cubik_lang'), 3) navigator.language, 4) 'en'
  var STORAGE_KEY = 'cubik_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ru'];

  function normalizeLang(code) {
    if (!code) return DEFAULT_LANG;
    code = String(code).toLowerCase().trim();
    // Handle codes like 'en-US' -> 'en'
    if (code.indexOf('-') !== -1) {
      code = code.split('-')[0];
    }
    return SUPPORTED.indexOf(code) !== -1 ? code : DEFAULT_LANG;
  }

  function getLangFromQuery() {
    try {
      var match = window.location.search.match(/[?&]lang=([a-zA-Z\-]+)/);
      return match ? match[1] : null;
    } catch (e) {
      return null;
    }
  }

  function getLangFromStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getBrowserLang() {
    try {
      return navigator.language || navigator.userLanguage || null;
    } catch (e) {
      return null;
    }
  }

  function getCurrentLang() {
    return normalizeLang(
      getLangFromQuery() ||
      getLangFromStorage() ||
      getBrowserLang() ||
      DEFAULT_LANG
    );
  }

  function updateHtmlLang(lang) {
    try {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('data-lang', lang);
    } catch (e) {}
  }

  var MOBILE_DICT = {
    en: {
      message: '3D editor is available on desktop.',
      home: 'Cubik.one'
    },
    ru: {
      message: '3D-редактор доступен в десктопной версии.',
      home: 'Cubik.one'
    }
  };

  function mt(lang, key) {
    var pack = MOBILE_DICT[lang] || MOBILE_DICT[DEFAULT_LANG];
    return (pack && pack[key]) || (MOBILE_DICT[DEFAULT_LANG] && MOBILE_DICT[DEFAULT_LANG][key]) || '';
  }

  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window);
  }

  /**
   * Show video placeholder and hide main content
   */
  function showMobilePlaceholder() {
    // Prevent duplicates
    if (document.getElementById('mobileVideoContainer')) return;

    var lang = getCurrentLang();
    updateHtmlLang(lang);

    // Hide all body content
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.display = 'none';
    }

    // Create full-screen container
    var container = document.createElement('div');
    container.id = 'mobileVideoContainer';

    // Content card
    var card = document.createElement('div');
    card.className = 'mobile-card';

    // Video wrapper
    var videoWrap = document.createElement('div');
    videoWrap.className = 'mobile-video-wrap';

    // Create video element
    var video = document.createElement('video');
    video.id = 'mobileVideo';
    video.src = '3dbuilder/Video/Plug.mp4';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = true; // Show controls for manual play
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('preload', 'auto');

    videoWrap.appendChild(video);

    // Message
    var msg = document.createElement('div');
    msg.className = 'mobile-msg';
    msg.textContent = mt(lang, 'message');

    // Home button
    var home = document.createElement('a');
    home.className = 'mobile-home-btn';
    home.href = 'https://cubik.one/';
    home.target = '_self';
    home.rel = 'noopener';
    home.textContent = mt(lang, 'home');

    card.appendChild(videoWrap);
    card.appendChild(msg);
    card.appendChild(home);

    container.appendChild(card);
    document.body.appendChild(container);

    // Try autoplay
    function tryPlay() {
      video.muted = true;
      var playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(function() {
          // Autoplay worked, hide controls
          video.controls = false;
        }).catch(function() {
          // Autoplay blocked, keep controls visible
          video.controls = true;
        });
      }
    }

    // Try to play immediately
    tryPlay();

    // Enable sound on touch/click
    function enableSound() {
      video.muted = false;
    }

    function isInteractiveTarget(evt) {
      try {
        return !!(evt && evt.target && evt.target.closest && evt.target.closest('a'));
      } catch (e) {
        return false;
      }
    }

    // Enable playback (and optionally sound) on first interaction with the video area.
    videoWrap.addEventListener('touchstart', function(e) {
      if (isInteractiveTarget(e)) return;
      tryPlay();
      enableSound();
    }, { once: true });

    videoWrap.addEventListener('click', function(e) {
      if (isInteractiveTarget(e)) return;
      tryPlay();
      enableSound();
    }, { once: true });
  }

  // Check on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (isMobile()) {
        showMobilePlaceholder();
      }
    });
  } else {
    if (isMobile()) {
      showMobilePlaceholder();
    }
  }

  // Export for external use
  window.CubikMobile = {
    isMobile: isMobile,
    showPlaceholder: showMobilePlaceholder
  };

})();
