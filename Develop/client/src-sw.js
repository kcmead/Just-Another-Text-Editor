// Import necessary Workbox modules for building service worker strategies
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route the assets specified in the __WB_MANIFEST variable
precacheAndRoute(self.__WB_MANIFEST);

// Configure a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Cache responses with status codes 0 (e.g., for CORS) or 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set an expiration for cached pages (30 days in this example)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache with specific URLs using the configured pageCache strategy
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register a route for navigation requests to use the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register a route for specific asset requests (styles, scripts, workers) to use StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      // Cache responses with status codes 0 (e.g., for CORS) or 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
