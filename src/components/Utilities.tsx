'use client';

import { selectText, setParNum, setTexFor }
  from '@/lib/features/textSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import ChangeTheme from '@/utils/ChangeTheme';

function Utilities() {

  const dispatch = useAppDispatch();
  const { paragraphNumber } = useAppSelector(selectText);
  const { textFormat, copiedText } = useAppSelector(selectText);
  
  const handleNumInpCha = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d+$/.test(input) && 0 < Number(input) &&  Number(input) < 100) {
      dispatch(setParNum(input));
    } else if (input === "") {
      dispatch(setParNum("1"));
    };
  };

  const handleSelInpCha = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTexFor(e.target.value));
  };

  const handleCopy = () => { navigator.clipboard.writeText(copiedText) };

  return (
    <section id='utilities'>
      <label htmlFor="quantity">
        Paragraphs: 
        <input type="number"
          id="quantity" name="quantity"
          value={paragraphNumber}
          onChange={handleNumInpCha}
        />
      </label>
      <label htmlFor="text-format">
        Format:
        <select
          id="text-format" name="text-format"
          value={textFormat}
          onChange={handleSelInpCha}
        >
          <option value="regular">Regular</option>
          <option value="html">HTML</option>
        </select>
      </label>
      <button type="button" onClick={handleCopy}>
        Copy Text
      </button>
      <ChangeTheme />
    </section>
  );

}

export default Utilities;
