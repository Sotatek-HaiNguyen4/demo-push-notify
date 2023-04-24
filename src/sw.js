/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.');

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: 'https://spyna.it/icons/favicon.ico',
    actions: [{ action: 'Detail', title: 'View', icon: 'https://via.placeholder.com/128/ff0000' }]
  };
  event.waitUntil(self.registration.showNotification(title, options));

  // Extract the unread count from the push message data.
  const message = event.data.json();
  // const unreadCount = message.unreadCount;

  // Set or clear the badge.
  // if (navigator.setAppBadge) {
  //   if (unreadCount && unreadCount > 0) {
  //     navigator.setAppBadge(unreadCount);
  //   } else {
  //     navigator.clearAppBadge();
  //   }
  // }

  const unreadCount = 2;
  navigator.setAppBadge(unreadCount);
  alert('You have 2 notify')
}

function openPushNotification(event) {
  console.log('[Service Worker] Notification click Received.', event.notification.data);

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);
