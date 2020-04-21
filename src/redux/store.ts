import postTypeReducer from './slices/postTypeSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import LogRocket from 'logrocket';


export default configureStore({
  reducer: {
    postType: postTypeReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
  },
  middleware:[...getDefaultMiddleware(),LogRocket.reduxMiddleware() ]
});
