// offline cache: the app files are stored on first visit; after that everything opens without internet.
// bump VERSION whenever test_gameplay_thapster.html changes, so the new version replaces the stored one.
// NOTE: cache names here start with "playtest-" (not "thapster-") so they don't clash with the Thapster Recorder repo on the same github.io origin.
const VERSION='playtest-1';
const FILES=['./','./index.html','./test_gameplay_thapster.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('playtest-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));});
