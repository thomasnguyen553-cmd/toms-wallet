self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', e => {
  const d = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(d.title || '💰 Tom\'s Wallet', {
      body: d.body || 'Kiểm tra chi tiêu hôm nay',
      tag: 'daily-budget',
      data: d
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(cs => {
      for (const c of cs) {
        if (c.url.startsWith(self.registration.scope)) return c.focus();
      }
      return clients.openWindow(self.registration.scope);
    })
  );
});
