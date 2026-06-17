/* GA4 loader — reads window.MP_CONFIG.GA_ID. No-op until a real G-XXXX id is set. */
(function(){
  var cfg = window.MP_CONFIG || {};
  var id = cfg.GA_ID || "";
  if(!id || id.indexOf("G-XXXX") === 0){
    // Placeholder id -> don't load GA, just log once for the developer.
    if(window.console) console.info("[MangoPark] GA4 devre dışı: config.js içinde GA_ID henüz ayarlanmadı.");
    window.mpTrack = function(){};   // safe no-op
    return;
  }
  var s = document.createElement('script');
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
  // helper for custom events (e.g. demo açılışı, sekme geçişi)
  window.mpTrack = function(name, params){ gtag('event', name, params || {}); };
})();
