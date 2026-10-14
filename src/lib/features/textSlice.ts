import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TextFormat = 'regular' | 'html';

interface TextState {
  paragraphNumber: string;
  textFormat: TextFormat;
  arrangedText: string;
};

const initialState: TextState = {
  paragraphNumber: '4',
  textFormat: 'regular',
  arrangedText: '',
};

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setParagraphNumber: (state, action: PayloadAction<string>) => {
      state.paragraphNumber = action.payload;
    },
    setTextFormat: (state, action: PayloadAction<TextFormat>) => {
      state.textFormat = action.payload;
    },
    setArrangedText: (state, action: PayloadAction<string>) => {
      state.arrangedText = action.payload;
    },
  },
})

export const {
  setParagraphNumber,
  setTextFormat,
  setArrangedText,
} = textSlice.actions;

export const selectText = (state: RootState) => state.text;

export default textSlice.reducer;
