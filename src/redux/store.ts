import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'


export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
});
