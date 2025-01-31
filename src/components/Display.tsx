'use client';

import { selectText, setCopTex } from "@/lib/features/textSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Display() {

  const { paragraphNumber, textFormat } = useSelector(selectText);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  function fetchText(parNum: string) {
    setLoading(true);
    fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${parNum}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': '4MSJagGew/L8z6bW/tuZ9Q==ZXb7U2CJY8n49iMd',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to fetch response: ' + response.statusText)
        }
        return response.json()
      })
      .then(json => {
        const arrangedTextArr = json.text.split('\n').slice(0, -1)
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
        }
      })
      .catch(error => { console.error('Fetch Error: ', error) })
      .finally(() => { setLoading(false)} );
  }

  useEffect(() => {
    if (textFormat === 'regular') {
      const arrangedText = text.replace(/<\/?p>\n/g, '');
      setText(arrangedText);
      dispatch(setCopTex(arrangedText));
    } else {
      const arrangedHtmlText = text.split('\n').slice(0, -1)
        .map((innTex: string) => `<p>\n${innTex}\n</p>\n`).join('');
      console.log(arrangedHtmlText);
      setText(arrangedHtmlText);
      dispatch(setCopTex(arrangedHtmlText));
    }
  }, [textFormat]);

  useEffect(() => {
    fetchText(paragraphNumber)
  }, [paragraphNumber]);

  return (
    loading
      ? <div className="loader-container">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>
      : <section id="display">{text}</section>
  )
}

export default Display;
