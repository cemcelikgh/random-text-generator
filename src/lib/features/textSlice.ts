import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

export const textSlice = createSlice({
  name: 'text',
  initialState: {
    paragraphNumber: '4',
    textFormat: 'regular',
    copiedText: ''
  },
  reducers: {
    setParNum: (state, action: PayloadAction<string>) => {
      state.paragraphNumber = action.payload;
    },
    setTexFor: (state, action: PayloadAction<string>) => {
      state.textFormat = action.payload;
    },
    setCopTex: (state, action: PayloadAction<string>) => {
      state.copiedText = action.payload;
    }
  }
})

export const { setParNum, setTexFor, setCopTex } = textSlice.actions;

export const selectText = (state: RootState) => state.text;

export default textSlice.reducer;
