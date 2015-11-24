(function ($) {

  'use strict';

  $.fn.cookieConsent = function(options) {

    var settings = $.extend({
      consentCookieName: 'has_consent',
      bannerShowContainerClass: 'cookie-consent-banner-show',
      bannerShowClass: 'show',
      bannerSelector: '.cookie-consent-banner',
      acceptBtnSelector: '.accept',
      rejectBtnSelector: '.reject',
      ga: null
    }, options);

    var container = $(this);
    var banner = $(settings.bannerSelector);

    banner.find(settings.acceptBtnSelector).click(function(event) {
      event.preventDefault();
      consentManager.setConsent(true);
    });

    banner.find(settings.rejectBtnSelector).click(function(event) {
      event.preventDefault();
      consentManager.setConsent(false);
    });

    var consentManager = new ConsentManager(new CookieManager(), settings.consentCookieName);

    var cookieControllerManager = new CookieConsentController(consentManager, function () {
      container.addClass(settings.bannerShowContainerClass);
      banner.addClass(settings.bannerShowClass);
    }, function () {
      container.removeClass(settings.bannerShowContainerClass);
      banner.removeClass(settings.bannerShowClass);
    }, settings.ga);

    consentManager.onChange(function() {
      container.trigger('cookieConsent.consent.update');
      cookieControllerManager.update();
    });

    container.data('consentManager', consentManager);

    return this;
  };

  var CookieManager = function() {
    this.trackingCookiesNames = ['__utma','__utmb','__utmc','__utmt','__utmv','__utmz','_ga','_gat'];
  };

  CookieManager.prototype.setCookie = function(name, value, ttl) {
    var d = new Date();
    d.setTime(d.getTime() + (ttl * 1000));
    var expires = 'expires='+d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  };

  CookieManager.prototype.getCookie = function(name) {
    name = name + '=';
    var ca = document.cookie.split(';');
    for (var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length,c.length);
      }
    }
    return;
  };

  CookieManager.prototype.deleteCookie = function(name) {
    var hostname = document.location.hostname;
    if(hostname.indexOf('www.') === 0){
      hostname = hostname.substring(4);
    }
    document.cookie = name + '=; domain=.' + hostname + '; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
  };

  CookieManager.prototype.deleteTrackingCookies = function() {
    for(var name in this.trackingCookiesNames){
      this.deleteCookie(name);
    }
  };

  var ConsentManager = function(cookieManager, consentCookieName) {
    this.cookieManager = cookieManager;
    this.consentCookieName = consentCookieName;
  };

  ConsentManager.prototype.getConsent = function() {

    var value = this.cookieManager.getCookie(this.consentCookieName);

    if (typeof value === 'undefined') {
      return;
    }

    return parseInt(value) === 1;
  };

  ConsentManager.prototype.hasConsent = function() {
    return this.getConsent() === true;
  };

  ConsentManager.prototype.onChange = function(consentChangeCallbackFn) {
    this.consentChangeCallbackFn = consentChangeCallbackFn;
  };

  ConsentManager.prototype.setConsent = function(consent) {

    if(!consent) {
      this.cookieManager.deleteTrackingCookies();
    }

    // store consent for one month
    this.cookieManager.setCookie(this.consentCookieName, consent ? 1 : 0, 3600 * 24 * 30);

    if (typeof this.consentChangeCallbackFn === 'function') {
      this.consentChangeCallbackFn.call(consent);
    }

    return this;
  };

  var CookieConsentController = function(consentManager, showFn, hideFn, ga) {

    this.consentManager = consentManager;
    this.showFn = showFn;
    this.hideFn = hideFn;
    this.consent = this.consentManager.getConsent();
    this.ga = ga;

    // disable google analytics tracking
    this.enableGA(this.consent === true);

    // init
    if (typeof this.consent === 'undefined') {
      this.showBanner();
    }
  };

  CookieConsentController.prototype.enableGA= function(enabled) {
    if (this.ga) {
      window['ga-disable-' + this.ga] = !enabled;
    }
  };

  CookieConsentController.prototype.update = function() {
    var consent = this.consentManager.getConsent();

    if (this.consent === consent) {
      return this;
    }

    this.consent = consent;
    this.enableGA(this.consent === true);

    if (typeof consent !== 'undefined') {
      this.hideBanner();
    } else {
      this.showBanner();
    }
  };

  CookieConsentController.prototype.showBanner = function() {
    this.showFn.call();
  };

  CookieConsentController.prototype.hideBanner = function() {
    this.hideFn.call();
  };

}(jQuery));

