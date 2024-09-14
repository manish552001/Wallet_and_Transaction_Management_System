import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../Redux/reducers/rootReducer';

const initialState = {};
const middleWare = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
    devTools: window.navigator.userAgent.includes('Chrome'), // Enable Redux DevTools for Chrome
    preloadedState: initialState,
});

export default store;
