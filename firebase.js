const admin = require('firebase-admin');
const serviceAccount = require('./path/serviceAccountKey.json');
// Initialize firebase admin SDK
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: 'copay-69e75.firebaseapp.com',
  projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
  storageBucket: 'copay-69e75.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.REACT_APP_ID_FIREBASE,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_FIREBASE,
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'copay-69e75.appspot.com',
  firebaseConfig,
});
const bucket = admin.storage().bucket();
module.exports = {
  bucket,
};
