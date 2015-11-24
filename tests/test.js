describe('cookieConsent initialisation', function() {

  var el, cookieConsent, settings;

  settings = {
    consentCookieName: 'hasConsent',
    bannerShowContainerClass: 'cookie-consent-banner-open',
    bannerShowClass: 'open',
    bannerSelector: '.cookie-consent-banner',
    acceptBtnSelector: '.accept',
    rejectBtnSelector: '.reject',
    ga: 'UA-23FJFFSX-3'
  };

  beforeEach(function(){
    deleteCookies();
    $(document.body).append('<div class="container"><div class="cookie-consent-banner">Le site utilise des cookies <a class="btn accept" href="">Accepter</a> / <a class="btn reject" href="">Rejeter</a></div></div>');
    el = $('.container');
    cookieConsent = el.cookieConsent(settings);
  });

  it('should show banner on init', function() {
    expect(el).toHaveClass(settings.bannerShowContainerClass);
    expect($(settings.bannerSelector)).toHaveClass(settings.bannerShowClass);

    // should disable ga
    expect(window['ga-disable-' + settings.ga]).toBe(true);
  });

  it('should hide popin on reject', function() {
    $(settings.rejectBtnSelector, $(settings.bannerSelector)).click();

    expect(el).not.toHaveClass(settings.bannerShowContainerClass);
    expect($(settings.bannerSelector)).not.toHaveClass(settings.bannerShowClass);

    // should disable ga
    expect(window['ga-disable-' + settings.ga]).toBe(true);
  });

  it('should hide popin on accept', function() {
    $(settings.acceptBtnSelector, $(settings.bannerSelector)).click();

    expect(el).not.toHaveClass(settings.bannerShowContainerClass);
    expect($(settings.bannerSelector)).not.toHaveClass(settings.bannerShowClass);

    // should enable ga
    expect(window['ga-disable-' + settings.ga]).toBe(false);
  });


  function deleteCookies () {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }

});

