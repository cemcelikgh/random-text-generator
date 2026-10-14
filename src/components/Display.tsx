'use client';

import { selectText, setArrangedText } from "@/lib/features/textSlice";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useCallback, useEffect, useState } from "react";

function Display() {

  const [text, setText] = useState('');
  const [loadedParagraphNumber, setLoadedParagraphNumber] = useState('0');
  const { paragraphNumber, textFormat, arrangedText } = useAppSelector(selectText);
  const dispatch = useAppDispatch();

  const loading = loadedParagraphNumber !== paragraphNumber;

  const fetchText = useCallback((paragraphNumber: string) => {

    const apiKey = process.env.NEXT_PUBLIC_LOR_IPS_API_KEY;
    if (!apiKey) throw new Error('NEXT_PUBLIC_LOR_IPS_API_KEY is missing');

    fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${paragraphNumber}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if(!response.ok) throw new Error('Could not fetch the random text.');
      return response.json();
    }).then(data => {
      const text = data?.text;
      if (!text || typeof text !== 'string') throw new Error('Could not retrieve the text data.');
      setText(text);
    }).catch(error => { console.error(error);
    }).finally(() => { setLoadedParagraphNumber(paragraphNumber) });

  }, []);

  useEffect(() => { fetchText(paragraphNumber) }, [paragraphNumber, fetchText]);

  useEffect(() => {
    if (textFormat === 'regular') {
      dispatch(setArrangedText('    ' + text.replace(/\n/g, '\n    ').slice(0, -5)));
    } else {
      const htmlTextArr = text.slice(0, -1).split('\n')
        .map((innerText: string) => `<p>\n    ${innerText}\n</p>\n`);
      dispatch(setArrangedText(htmlTextArr.join('').slice(0, -1)));
    };
  }, [textFormat, text, dispatch]);

  return (loading ?
    <div className="loader-container">
      <div className="lds-ripple">
        <div/>
        <div/>
      </div>
    </div>
  : <section id="display">{arrangedText}</section>
  );

}

export default Display;
