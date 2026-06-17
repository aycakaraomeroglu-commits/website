/* Content loader: fills [data-key], [data-key-href], and document title/meta from content.json.
   Static HTML text remains as fallback if fetch fails (file:// or missing file). */
(function(){
  function get(obj, path){ return path.split('.').reduce(function(o,k){ return (o&&o[k]!==undefined)?o[k]:undefined; }, obj); }
  fetch('content.json', {cache:'no-store'})
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){
      if(!data) return;
      document.querySelectorAll('[data-key]').forEach(function(el){
        var v = get(data, el.getAttribute('data-key'));
        if(v!==undefined && v!==null) el.textContent = v;
      });
      document.querySelectorAll('[data-key-href]').forEach(function(el){
        var v = get(data, el.getAttribute('data-key-href'));
        if(v) el.setAttribute('href', v);
      });
      // document title + meta description (page declares which keys via <body data-page="home">)
      var page = document.body.getAttribute('data-page');
      if(page && data[page]){
        if(data[page].seo_title) document.title = data[page].seo_title;
        var md=document.querySelector('meta[name="description"]');
        if(md && data[page].seo_desc) md.setAttribute('content', data[page].seo_desc);
      }
      window.dispatchEvent(new Event('content-loaded'));
    })
    .catch(function(){});
})();
