import { AuthMode } from "src/app/auth/auth.enum";

export const environment = {
  firebase: {
    projectId: 'lemonmart-e39d4',
    appId: '1:483057153568:web:69c628b84ad6242f98ee45',
    storageBucket: 'lemonmart-e39d4.appspot.com',
    apiKey: 'AIzaSyBNDIZ0h6Yxk8jIWCB2sZDTiXPf9XrH608',
    authDomain: 'lemonmart-e39d4.firebaseapp.com',
    messagingSenderId: '483057153568',
    measurementId: 'G-S9QQZ0N8F9',
  },
  authMode: AuthMode.InMemory
};
