import { configureStore } from '@reduxjs/toolkit';
import textReducer from './features/textSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    text: textReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
