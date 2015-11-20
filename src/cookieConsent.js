(function ($) {

  'use strict';

  $.fn.cookieConsent = function(options) {

    // This is the easiest way to have default options.
    var settings = $.extend({
      consentCookieName: 'hasConsent',
      popupOpenContainerClass: 'cookie-consent-popup-open',
      popupOpenClass: 'open',
      popupSelector: '.cookie-consent-popup',
      acceptBtnSelector: '.accept',
      rejectBtnSelector: '.reject'
    }, options);

    var container = $(this);
    var popup = $(settings.popupSelector);

    popup.find(settings.acceptBtnSelector).click(function(event) {
      event.preventDefault();
      consentManager.setConsent(true);
    });

    popup.find(settings.rejectBtnSelector).click(function(event) {
      event.preventDefault();
      consentManager.setConsent(false);
    });

    var consentManager = new ConsentManager(new CookieManager(), settings.consentCookieName);

    var cookieControllerManager = new CookieConsentController(consentManager, function () {
      container.addClass(settings.popupOpenContainerClass);
      popup.addClass(settings.popupOpenClass);
    }, function () {
      container.removeClass(settings.popupOpenContainerClass);
      popup.removeClass(settings.popupOpenClass);
    });

    consentManager.onChange(function() {
      container.trigger('cookieConsent.consent.update');
      cookieControllerManager.update();
    });

    return this;
  };

  var CookieManager = function() {
    this.trackingCookiesNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"];
  };

  CookieManager.prototype.setCookie = function(name, value, ttl) {
    var d = new Date();
    d.setTime(d.getTime() + (ttl * 1000));
    var expires = 'expires='+d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires;
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
    return this.cookieManager.getCookie(this.consentCookieName);
  };

  ConsentManager.prototype.hasConsent = function() {
    return this.getConsent() === 1;
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

  var CookieConsentController = function(consentManager, showFn, hideFn) {

    this.consentManager = consentManager;
    this.showFn = showFn;
    this.hideFn = hideFn;
    this.consent = this.consentManager.getConsent();

    // init
    if (!this.consent) {
      this.showPopup();
    }
  };

  CookieConsentController.prototype.update = function() {
    var consent = this.consentManager.getConsent();

    if (this.consent === consent) {
      return this;
    }

    this.consent = consent;

    if (this.consent) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  };

  CookieConsentController.prototype.showPopup = function() {
    this.showFn.call();
  };

  CookieConsentController.prototype.hidePopup = function() {
    this.hideFn.call();
  };

}(jQuery));


