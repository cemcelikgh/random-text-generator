'use client';

import { selectText, setCopTex } from "@/lib/features/textSlice";
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { useCallback, useEffect, useState } from "react";

function Display() {

  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { paragraphNumber, textFormat } = useAppSelector(selectText);

  const fetchText = useCallback((parNum: string) => {

    setLoading(true);

    fetch(`/.netlify/functions/loremIpsum?parNum=${parNum}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not fetch the random text.');
      };
      return response.json();
    }).then(data => {
        const text = data?.text;
        if (!text) {
          throw new Error('Could not retrieve the text data.');
        };
      const arrangedTextArr = text.split('\n').slice(0, -1)
        .map((innTex: string) => `    ${innTex}\n`);
      if (textFormat === 'regular') {
        const arrangedText = arrangedTextArr.join('');
        setText(arrangedText);
        dispatch(setCopTex(arrangedText));
      } else {
        const arrangedHtmlText = arrangedTextArr
          .map((innTex: string) => `<p>\n${innTex}</p>\n`).join('');
        setText(arrangedHtmlText);
        dispatch(setCopTex(arrangedHtmlText));
      };
    }).catch(error => { console.error(error);
    }).finally(() => { setLoading(false) });

  }, [textFormat, dispatch]);

  useEffect(() => { fetchText(paragraphNumber) }, [paragraphNumber, fetchText]);

  useEffect(() => {
    if (textFormat === 'regular') {
      const arrangedText = text.replace(/<\/?p>\n/g, '');
      setText(arrangedText);
      dispatch(setCopTex(arrangedText));
    } else {
      const arrangedHtmlText = text.split('\n').slice(0, -1)
        .map((innTex) => `<p>\n${innTex}\n</p>\n`).join('');
      setText(arrangedHtmlText);
      dispatch(setCopTex(arrangedHtmlText));
    };
  }, [textFormat, dispatch]);

  return (
    loading
      ? <div className="loader-container">
          <div className="lds-ripple"><div>
            </div>
              <div></div>
            </div>
        </div>
      : <section id="display">{text}</section>
  );

}

export default Display;
