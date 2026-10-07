// Кэш для офлайн-работы. При изменении файлов увеличьте версию.
const CACHE = 'english-path-v2';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'data/vocab.js', 'data/grammar.js', 'data/reading.js', 'data/verbs.js', 'data/glossary.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Сначала сеть (чтобы обновления приходили сразу), при офлайне — кэш
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
