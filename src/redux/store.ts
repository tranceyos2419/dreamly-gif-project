import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'


export default configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
});
