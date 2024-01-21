# Node Firebase Push Notification

[![npm version](https://img.shields.io/npm/v/node-firebase-push-notification.svg)](https://www.npmjs.com/package/node-firebase-push-notification)
[![License](https://img.shields.io/github/license/mustafahere/node-firebase-push-notification.svg)](https://github.com/mustafahere/node-firebase-push-notification/blob/main/LICENSE)

Node Firebase Push Notification is an npm package that simplifies sending push notifications using Firebase Cloud Messaging (FCM) in Node.js applications.

## Installation

To install the package, use npm:

```bash
npm install node-firebase-push-notification
```

## Usage

```js
const { FirebaseAdmin } = require('node-firebase-push-notification');

// Initialize FirebaseAdmin with your credentials
FirebaseAdmin.initialize({
projectId: 'your-project-id',
privateKey: 'your-private-key',
clientEmail: 'your-client-email',
databaseURL: 'your-database-url'
});

// Get the FirebaseAdmin instance
const firebaseAdmin = FirebaseAdmin.getInstance();

// Send push notifications to a list of device tokens
firebaseAdmin.sendMulticastMessaging(
['deviceToken1', 'deviceToken2'],
'Notification Title',
'Notification Body',
{ customData: 'value' },
)
.then((batchResponse) => {
console.log('Push notification sent:', batchResponse);
})
.catch((error) => {
console.error('Error sending push notification:', error);
});
```

Please remember to replace the placeholders such as `'your-project-id'`, `'your-private-key'`, `'your-client-email'`, `'your-database-url'` with the appropriate values for your project.

## Contributing

Contributions are welcome! Please follow the contribution guidelines before submitting a pull request.

## License

This package is MIT licensed.
