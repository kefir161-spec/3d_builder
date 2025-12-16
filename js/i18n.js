/**
 * Cubik Builder - Internationalization Module
 * @module i18n
 * @description Multi-language support with URL parameter, localStorage, and browser detection
 * @author Andrey Bovdurets
 * @version 1.1
 * 
 * Usage:
 *   - URL: ?lang=ru or ?lang=en
 *   - JS:  CubikI18N.setLang('ru')
 *   - HTML: <span data-i18n-key="key.name">Fallback</span>
 */
(function(global, doc) {
  'use strict';

  // =============================================================================
  // Configuration
  // =============================================================================
  
  var SUPPORTED = ['en', 'ru'];
  var STORAGE_KEY = 'cubik_lang';
  var DEFAULT_LANG = 'en';

  // =============================================================================
  // Language Detection & Management
  // =============================================================================

  /**
   * Normalize language code to supported format
   * @param {string} code - Language code (e.g., 'en-US', 'ru', 'en')
   * @returns {string} Normalized language code
   */
  function normalizeLang(code) {
    if (!code) return DEFAULT_LANG;
    code = String(code).toLowerCase().trim();
    // Handle codes like 'en-US' -> 'en'
    if (code.indexOf('-') !== -1) {
      code = code.split('-')[0];
    }
    return SUPPORTED.indexOf(code) !== -1 ? code : DEFAULT_LANG;
  }

  /**
   * Get language from URL parameter (?lang=xx)
   * @returns {string|null} Language code or null
   */
  function getLangFromQuery() {
    try {
      var match = global.location.search.match(/[?&]lang=([a-zA-Z\-]+)/);
      return match ? match[1] : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get language from localStorage
   * @returns {string|null} Language code or null
   */
  function getLangFromStorage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  /**
   * Save language to localStorage
   * @param {string} lang - Language code
   */
  function saveLangToStorage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage unavailable (private mode, etc.)
    }
  }

  /**
   * Get browser's preferred language
   * @returns {string|null} Language code or null
   */
  function getBrowserLang() {
    try {
      return navigator.language || navigator.userLanguage || null;
    } catch (e) {
      return null;
    }
  }

  // Determine current language with priority:
  // 1. URL parameter (?lang=xx)
  // 2. localStorage
  // 3. Browser language
  // 4. Default (en)
  var currentLang = normalizeLang(
    getLangFromQuery() ||
    getLangFromStorage() ||
    getBrowserLang() ||
    DEFAULT_LANG
  );

  /**
   * Update HTML element lang attributes
   * Sets both 'lang' and 'data-lang' for CSS selectors
   */
  function updateHtmlLang() {
    try {
      doc.documentElement.setAttribute('lang', currentLang);
      doc.documentElement.setAttribute('data-lang', currentLang);
    } catch (e) {}
  }

  // Initialize HTML lang attribute
  updateHtmlLang();

  // =============================================================================
  // Translation Dictionaries
  // =============================================================================

  var DICT = {
    en: {
      // General
      'app.title': '3D Builder',
      'loader.loading': 'Loading Cubiks...',

      // Help Modal
      'help.title': 'Quick start',
      'help.navigation': 'Navigation',
      'help.controls': 'Controls',
      'help.btn': 'Help',
      'help.start': 'Start',
      'help.close': 'Close',

      // Navigation Instructions
      'help.lmb.rotate': 'Hold LMB \u2014 rotate',
      'help.rmb.pan': 'Hold RMB \u2014 pan',
      'help.wheel.zoom': 'Mouse wheel \u2014 zoom',
      'help.lmb.add': 'Add Cubik',
      'help.rmb.delete': 'Delete Cubik',
      'help.tab.replace': 'Replace/Repaint facets',
      'help.undo': 'Ctrl+Z / Ctrl+Y \u2014 Undo / Redo',
      'help.copy': 'Copy Cubik',
      'help.orbit': 'Orbit camera around pivot',
      'help.move': 'Move up/down',

      // HUD (Top Bar)
      'hud.load': 'Load',
      'hud.save': 'Save',
      'hud.cubiks': 'Cubiks',
      'hud.cubiksLabel': 'Click to export stats',

      // Navigation (Side Menu)
      'nav.home': 'Home',
      'nav.shop': 'Shop',
      'nav.about': 'About us',
      'nav.faq': 'FAQ',
      'nav.gallery': 'Gallery',
      'nav.video': 'Video',
      'nav.blog': 'Blog',
      'nav.partnership': 'Partnership',
      'nav.contacts': 'Contacts',

      // Block Editor
      'editor.title': 'Block Editor',
      'editor.hint': 'Select the facets you want to replace, pick a color in the palette, choose replacement type \u2014 then apply.',
      'editor.preview': 'Edited cubik preview',
      'editor.noSelection': 'No cubik selected',
      'editor.replace': 'Replace facets',

      // Export / Import
      'export.scene': 'Export scene',
      'export.stats': 'Export stats',

      // Projects
      'project.save': 'Save project',
      'project.load': 'Load project',
      'project.name': 'Project name',
      'project.cancel': 'Cancel',
      'project.saveBtn': 'Save',
      'project.modalTitle': 'Save project',

      // Statistics
      'stats.blocks': 'Blocks',
      'stats.facets': 'Facets',

      // Status Messages
      'status.ready': 'Ready.',
      'status.loading': 'Loading...',
      'status.saved': 'Saved!',
      'status.error': 'Error',

      // Facet Stats Panel
      'facetStats.title': '\uD83D\uDCCA',
      'facetStats.empty': '\u2014',
      'facetStats.collapse': 'Collapse',
      'facetStats.expand': 'Expand'
    },

    ru: {
      // General
      'app.title': '\u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C Cubiks',
      'loader.loading': '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 Cubiks...',

      // Help Modal
      'help.title': '\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0441\u0442\u0430\u0440\u0442',
      'help.navigation': '\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F',
      'help.controls': '\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435',
      'help.btn': '\u041F\u043E\u043C\u043E\u0449\u044C',
      'help.start': '\u041D\u0430\u0447\u0430\u0442\u044C',
      'help.close': '\u0417\u0430\u043A\u0440\u044B\u0442\u044C',

      // Navigation Instructions
      'help.lmb.rotate': '\u0417\u0430\u0436\u0430\u0442\u044C \u041B\u041A\u041C \u2014 \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435',
      'help.rmb.pan': '\u0417\u0430\u0436\u0430\u0442\u044C \u041F\u041A\u041C \u2014 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435',
      'help.wheel.zoom': '\u041A\u043E\u043B\u0435\u0441\u043E \u043C\u044B\u0448\u0438 \u2014 \u043C\u0430\u0441\u0448\u0442\u0430\u0431',
      'help.lmb.add': '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C Cubik',
      'help.rmb.delete': '\u0423\u0434\u0430\u043B\u0438\u0442\u044C Cubik',
      'help.tab.replace': '\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C/\u043F\u0435\u0440\u0435\u043A\u0440\u0430\u0441\u0438\u0442\u044C \u0433\u0440\u0430\u043D\u0438',
      'help.undo': 'Ctrl+Z / Ctrl+Y \u2014 \u041E\u0442\u043C\u0435\u043D\u0430 / \u041F\u043E\u0432\u0442\u043E\u0440',
      'help.copy': '\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C Cubik',
      'help.orbit': '\u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u043A\u0430\u043C\u0435\u0440\u044B \u0432\u043E\u043A\u0440\u0443\u0433 \u0446\u0435\u043D\u0442\u0440\u0430',
      'help.move': '\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0432\u0432\u0435\u0440\u0445/\u0432\u043D\u0438\u0437',

      // HUD (Top Bar)
      'hud.load': '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C',
      'hud.save': '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C',
      'hud.cubiks': '\u041A\u0443\u0431\u0438\u043A\u0438',
      'hud.cubiksLabel': '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438',

      // Navigation (Side Menu)
      'nav.home': '\u0413\u043B\u0430\u0432\u043D\u0430\u044F',
      'nav.shop': '\u041C\u0430\u0433\u0430\u0437\u0438\u043D',
      'nav.about': '\u041E \u043D\u0430\u0441',
      'nav.faq': 'FAQ',
      'nav.gallery': '\u0413\u0430\u043B\u0435\u0440\u0435\u044F',
      'nav.video': '\u0412\u0438\u0434\u0435\u043E',
      'nav.blog': '\u0411\u043B\u043E\u0433',
      'nav.partnership': '\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u0442\u0432\u043E',
      'nav.contacts': '\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B',

      // Block Editor
      'editor.title': '\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0431\u043B\u043E\u043A\u043E\u0432',
      'editor.hint': '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u0440\u0430\u043D\u0438 \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u043D\u044B, \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0446\u0432\u0435\u0442 \u0432 \u043F\u0430\u043B\u0438\u0442\u0440\u0435, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0437\u0430\u043C\u0435\u043D\u044B \u2014 \u0437\u0430\u0442\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0435.',
      'editor.preview': '\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043A\u0443\u0431\u0438\u043A\u0430',
      'editor.noSelection': '\u041A\u0443\u0431\u0438\u043A \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D',
      'editor.replace': '\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0433\u0440\u0430\u043D\u0438',

      // Export / Import
      'export.scene': '\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u0446\u0435\u043D\u044B',
      'export.stats': '\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438',

      // Projects
      'project.save': '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442',
      'project.load': '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442',
      'project.name': '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430',
      'project.cancel': '\u041E\u0442\u043C\u0435\u043D\u0430',
      'project.saveBtn': '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C',
      'project.modalTitle': '\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430',

      // Statistics
      'stats.blocks': '\u0411\u043B\u043E\u043A\u0438',
      'stats.facets': '\u0413\u0440\u0430\u043D\u0438',

      // Status Messages
      'status.ready': '\u0413\u043E\u0442\u043E\u0432\u043E.',
      'status.loading': '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...',
      'status.saved': '\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E!',
      'status.error': '\u041E\u0448\u0438\u0431\u043A\u0430',

      // Facet Stats Panel
      'facetStats.title': '\uD83D\uDCCA',
      'facetStats.empty': '\u2014',
      'facetStats.collapse': '\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C',
      'facetStats.expand': '\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C'
    }
  };

  // =============================================================================
  // Translation Function
  // =============================================================================

  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @param {string} [fallback] - Fallback value if key not found
   * @returns {string} Translated string
   */
  function t(key, fallback) {
    var pack = DICT[currentLang] || DICT[DEFAULT_LANG];
    if (pack && Object.prototype.hasOwnProperty.call(pack, key)) {
      return pack[key];
    }
    if (DICT[DEFAULT_LANG] && Object.prototype.hasOwnProperty.call(DICT[DEFAULT_LANG], key)) {
      return DICT[DEFAULT_LANG][key];
    }
    return fallback !== undefined ? fallback : key;
  }

  // =============================================================================
  // DOM Application
  // =============================================================================

  /**
   * Apply all translations to DOM elements
   * Looks for data-i18n-key, data-i18n-attr, data-i18n-placeholder attributes
   */
  function apply() {
    // Update <title>
    var titleEl = doc.querySelector('title[data-i18n-key]');
    if (titleEl) {
      titleEl.textContent = t(titleEl.getAttribute('data-i18n-key'));
    }

    // Update all elements with data-i18n-key
    var nodes = doc.querySelectorAll('[data-i18n-key]');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute('data-i18n-key');
      if (!key) continue;

      var value = t(key);
      var attrName = node.getAttribute('data-i18n-attr');

      if (attrName) {
        node.setAttribute(attrName, value);
      } else {
        node.textContent = value;
      }
    }

    // Update placeholders
    var placeholders = doc.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var ph = placeholders[j];
      var phKey = ph.getAttribute('data-i18n-placeholder');
      if (phKey) {
        ph.setAttribute('placeholder', t(phKey));
      }
    }

    // Dispatch event for other modules
    try {
      var event = new CustomEvent('i18n:applied', { detail: { lang: currentLang } });
      doc.dispatchEvent(event);
    } catch (e) {}
  }

  // =============================================================================
  // Language Setting
  // =============================================================================

  /**
   * Set application language
   * @param {string} lang - Language code
   * @param {boolean} [saveToStorage=true] - Whether to save to localStorage
   * @returns {string} The normalized language that was set
   */
  function setLang(lang, saveToStorage) {
    var next = normalizeLang(lang);
    if (next === currentLang) return currentLang;

    currentLang = next;
    updateHtmlLang();

    if (saveToStorage !== false) {
      saveLangToStorage(currentLang);
    }

    apply();

    // Dispatch language change event
    try {
      var event = new CustomEvent('i18n:langChanged', { detail: { lang: currentLang } });
      doc.dispatchEvent(event);
    } catch (e) {}

    return currentLang;
  }

  // =============================================================================
  // Utility Functions
  // =============================================================================

  /**
   * Get list of supported languages
   * @returns {string[]} Array of supported language codes
   */
  function getSupported() {
    return SUPPORTED.slice();
  }

  /**
   * Add translations dynamically
   * @param {string} lang - Language code
   * @param {Object} translations - Key-value pairs of translations
   */
  function addTranslations(lang, translations) {
    if (!DICT[lang]) {
      DICT[lang] = {};
      if (SUPPORTED.indexOf(lang) === -1) {
        SUPPORTED.push(lang);
      }
    }
    for (var key in translations) {
      if (Object.prototype.hasOwnProperty.call(translations, key)) {
        DICT[lang][key] = translations[key];
      }
    }
  }

  // =============================================================================
  // Public API
  // =============================================================================

  global.CubikI18N = {
    /** Current language code */
    get lang() {
      return currentLang;
    },
    /** List of supported languages */
    get supported() {
      return getSupported();
    },
    /** Translate a key */
    t: t,
    /** Apply translations to DOM */
    apply: apply,
    /** Set language */
    setLang: setLang,
    /** Get supported languages */
    getSupported: getSupported,
    /** Add custom translations */
    addTranslations: addTranslations
  };

  // Apply translations after DOM load
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

})(window, document);
