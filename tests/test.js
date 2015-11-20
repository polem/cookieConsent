describe('cookieConsent initialisation', function() {

  var el, cookieConsent, settings;

  settings = {
    consentCookieName: 'hasConsent',
    popupOpenContainerClass: 'cookie-consent-popup-open',
    popupOpenClass: 'open',
    popupSelector: '.cookie-consent-popup',
    acceptBtnSelector: '.accept',
    rejectBtnSelector: '.reject'
  };

  beforeEach(function(){
    deleteCookies();
    $(document.body).append('<div class="container"><div class="cookie-consent-popup">Le site utilise des cookies <a class="btn accept" href="">Accepter</a> / <a class="btn reject" href="">Rejeter</a></div></div>');
    el = $('.container');
    cookieConsent = el.cookieConsent(settings);
  });

  it('should show popup on init', function() {
    expect(el).toHaveClass(settings.popupOpenContainerClass);
    expect($(settings.popupSelector)).toHaveClass(settings.popupOpenClass);
  });

  it('should hide popin on reject', function() {
    $(settings.rejectBtnSelector, $(settings.popupSelector)).click();

    expect(el).not.toHaveClass(settings.popupOpenContainerClass);
    expect($(settings.popupSelector)).not.toHaveClass(settings.popupOpenClass);
  });

  it('should hide popin on accept', function() {
    $(settings.acceptBtnSelector, $(settings.popupSelector)).click();

    expect(el).not.toHaveClass(settings.popupOpenContainerClass);
    expect($(settings.popupSelector)).not.toHaveClass(settings.popupOpenClass);
  });


  function deleteCookies () {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }

});

