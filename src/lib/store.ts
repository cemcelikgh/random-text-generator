import { configureStore } from '@reduxjs/toolkit';
import textReducer from './features/textSlice';
import themeReducer from './features/themeSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      text: textReducer,
      theme: themeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
