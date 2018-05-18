importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(new RegExp('http://localhost:63944/'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(new RegExp('.+\.html$'), workbox.strategies.cacheFirst({
  cacheName: 'htmls-cache'
}));

// workbox.precache(['src/app/components/common/login/login.component.html']);
