'use client';

import { selectText, setParagraphNumber, setTextFormat } from '@/lib/features/textSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import ThemeSelector from './theme-selector/ThemeSelector';

function Selectors() {

  const { paragraphNumber, textFormat, arrangedText } = useAppSelector(selectText);
  const dispatch = useAppDispatch();
  
  const handleParagraphNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d+$/.test(input) && 0 < Number(input) && Number(input) < 100) {
      dispatch(setParagraphNumber(input));
    } else if (input === "") {
      dispatch(setParagraphNumber("1"));
    };
  };

  const handleTextFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'regular' || e.target.value === 'html') {
      dispatch(setTextFormat(e.target.value))
    };
  };

  const handleCopyText = () => { navigator.clipboard.writeText(arrangedText) };

  return (
    <section id='selectors'>
      <label htmlFor="quantity">
        Paragraphs: 
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={paragraphNumber}
          onChange={handleParagraphNumber}
        />
      </label>
      <label htmlFor="text-format">
        Format:
        <select
          id="text-format"
          name="text-format"
          value={textFormat}
          onChange={handleTextFormat}
        >
          <option value="regular">Regular</option>
          <option value="html">HTML</option>
        </select>
      </label>
      <button
        type="button"
        onClick={handleCopyText}
      >
        Copy Text
      </button>
      <ThemeSelector />
    </section>
  );

}

export default Selectors;
