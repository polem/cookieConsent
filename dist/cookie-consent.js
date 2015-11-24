!function(e){"use strict";e.fn.cookieConsent=function(i){var s=e.extend({consentCookieName:"has_consent",bannerShowContainerClass:"cookie-consent-banner-show",bannerShowClass:"show",bannerSelector:".cookie-consent-banner",acceptBtnSelector:".accept",rejectBtnSelector:".reject",ga:null},i),a=e(this),r=e(s.bannerSelector);r.find(s.acceptBtnSelector).click(function(e){e.preventDefault(),c.setConsent(!0)}),r.find(s.rejectBtnSelector).click(function(e){e.preventDefault(),c.setConsent(!1)});var c=new t(new n,s.consentCookieName),h=new o(c,function(){a.addClass(s.bannerShowContainerClass),r.addClass(s.bannerShowClass)},function(){a.removeClass(s.bannerShowContainerClass),r.removeClass(s.bannerShowClass)},s.ga);return c.onChange(function(){a.trigger("cookieConsent.consent.update"),h.update()}),a.data("consentManager",c),this};var n=function(){this.trackingCookiesNames=["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]};n.prototype.setCookie=function(e,n,t){var o=new Date;o.setTime(o.getTime()+1e3*t);var i="expires="+o.toUTCString();document.cookie=e+"="+n+"; "+i+"; path=/"},n.prototype.getCookie=function(e){e+="=";for(var n=document.cookie.split(";"),t=0;t<n.length;t++){for(var o=n[t];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(e))return o.substring(e.length,o.length)}},n.prototype.deleteCookie=function(e){var n=document.location.hostname;0===n.indexOf("www.")&&(n=n.substring(4)),document.cookie=e+"=; domain=."+n+"; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/",document.cookie=e+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/"},n.prototype.deleteTrackingCookies=function(){for(var e in this.trackingCookiesNames)this.deleteCookie(e)};var t=function(e,n){this.cookieManager=e,this.consentCookieName=n};t.prototype.getConsent=function(){var e=this.cookieManager.getCookie(this.consentCookieName);if("undefined"!=typeof e)return 1===parseInt(e)},t.prototype.hasConsent=function(){return this.getConsent()===!0},t.prototype.onChange=function(e){this.consentChangeCallbackFn=e},t.prototype.setConsent=function(e){return e||this.cookieManager.deleteTrackingCookies(),this.cookieManager.setCookie(this.consentCookieName,e?1:0,2592e3),"function"==typeof this.consentChangeCallbackFn&&this.consentChangeCallbackFn.call(e),this};var o=function(e,n,t,o){this.consentManager=e,this.showFn=n,this.hideFn=t,this.consent=this.consentManager.getConsent(),this.ga=o,this.enableGA(this.consent===!0),"undefined"==typeof this.consent&&this.showBanner()};o.prototype.enableGA=function(e){this.ga&&(window["ga-disable-"+this.ga]=!e)},o.prototype.update=function(){var e=this.consentManager.getConsent();return this.consent===e?this:(this.consent=e,this.enableGA(this.consent===!0),void("undefined"!=typeof e?this.hideBanner():this.showBanner()))},o.prototype.showBanner=function(){this.showFn.call()},o.prototype.hideBanner=function(){this.hideFn.call()}}(jQuery);