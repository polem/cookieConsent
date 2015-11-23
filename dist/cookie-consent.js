!function(e){"use strict";e.fn.cookieConsent=function(s){var i=e.extend({consentCookieName:"hasConsent",bannerShowContainerClass:"cookie-consent-banner-show",bannerShowClass:"show",bannerSelector:".cookie-consent-banner",acceptBtnSelector:".accept",rejectBtnSelector:".reject"},s),a=e(this),r=e(i.bannerSelector);r.find(i.acceptBtnSelector).click(function(e){e.preventDefault(),c.setConsent(!0)}),r.find(i.rejectBtnSelector).click(function(e){e.preventDefault(),c.setConsent(!1)});var c=new t(new n,i.consentCookieName),h=new o(c,function(){a.addClass(i.bannerShowContainerClass),r.addClass(i.bannerShowClass)},function(){a.removeClass(i.bannerShowContainerClass),r.removeClass(i.bannerShowClass)});return c.onChange(function(){a.trigger("cookieConsent.consent.update"),h.update()}),this};var n=function(){this.trackingCookiesNames=["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]};n.prototype.setCookie=function(e,n,t){var o=new Date;o.setTime(o.getTime()+1e3*t);var s="expires="+o.toUTCString();document.cookie=e+"="+n+"; "+s},n.prototype.getCookie=function(e){e+="=";for(var n=document.cookie.split(";"),t=0;t<n.length;t++){for(var o=n[t];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(e))return o.substring(e.length,o.length)}},n.prototype.deleteCookie=function(e){var n=document.location.hostname;0===n.indexOf("www.")&&(n=n.substring(4)),document.cookie=e+"=; domain=."+n+"; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/",document.cookie=e+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/"},n.prototype.deleteTrackingCookies=function(){for(var e in this.trackingCookiesNames)this.deleteCookie(e)};var t=function(e,n){this.cookieManager=e,this.consentCookieName=n};t.prototype.getConsent=function(){return this.cookieManager.getCookie(this.consentCookieName)},t.prototype.hasConsent=function(){return 1===this.getConsent()},t.prototype.onChange=function(e){this.consentChangeCallbackFn=e},t.prototype.setConsent=function(e){return e||this.cookieManager.deleteTrackingCookies(),this.cookieManager.setCookie(this.consentCookieName,e?1:0,2592e3),"function"==typeof this.consentChangeCallbackFn&&this.consentChangeCallbackFn.call(e),this};var o=function(e,n,t){this.consentManager=e,this.showFn=n,this.hideFn=t,this.consent=this.consentManager.getConsent(),this.consent||this.showBanner()};o.prototype.update=function(){var e=this.consentManager.getConsent();return this.consent===e?this:(this.consent=e,void(this.consent?this.hideBanner():this.showBanner()))},o.prototype.showBanner=function(){this.showFn.call()},o.prototype.hideBanner=function(){this.hideFn.call()}}(jQuery);