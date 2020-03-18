import postTypeReducer from './slices/postTypeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'


export default configureStore({
  reducer: {
    postType: postTypeReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
});
