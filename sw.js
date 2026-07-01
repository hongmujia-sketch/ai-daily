const CACHE_NAME = 'ai-daily-v9';
self.addEventListener('install', e => {
  self.skipWaiting();
  if (window.caches) {
    caches.keys().then(function(names) { names.forEach(function(n) { caches.delete(n); }); });
  }
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k))
    ))
  );
  clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(function(resp) {
      return resp;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
