const CACHE_NAME = 'nexus-academy-cache-v1';

// List of all the files your phone needs to download for offline use
const urlsToCache = [
  '/Tuition-class/',
  '/Tuition-class/index.html',
  '/Tuition-class/about.html',
  '/Tuition-class/courses.html',
  '/Tuition-class/registration.html',
  '/Tuition-class/login.html',
  '/Tuition-class/dashboard.html',
  '/Tuition-class/style.css',
  '/Tuition-class/script.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' // Caches your icons
];

// 1. Install Step: Download and save the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and downloading files...');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Step: When you open the app, check the cache first!
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is found in the phone's saved cache, return it immediately
        if (response) {
          return response;
        }
        // If it's not in the cache (like sending an email), try the internet
        return fetch(event.request);
      })
  );
});
