import React, { useEffect } from 'react';
import { Button } from './Button';
import { IoPlay } from 'react-icons/io5';
import { BsTranslate } from 'react-icons/bs';
import { RxReset } from 'react-icons/rx';
import { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../apiKey';

const Home = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState(window.speechSynthesis.getVoices());
  const [voice, setVoice] = useState('');
  const [error, setError] = useState('');
  const [translatedStringToShow, setTranslatedStringToShow] = useState('');

  const getTranslate = async () => {
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        to: voice.lang.substring(0, 2),
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain',
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
      },
      data: [{ Text: `${text}` }],
    };
    const { data } = await axios.request(options);

    const { text: translatedText } = data[0].translations[0];
    return translatedText;
  };
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const handleSelect = ({ target: { value } }) => {
    setVoice(voices.find((voice) => voice.name === value));
  };

  const play = async () => {
    if (!text) {
      setError('Write something');
      return;
    }

    const speechText = await getTranslate();

    const utterance = new SpeechSynthesisUtterance(speechText);

    utterance.lang = voice.lang;
    utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };
  const translate = async () => {
    const speechText = await getTranslate();
    setTranslatedStringToShow(speechText);
  };
  const reset = () => {
    setText('');
    setError('');
    setTranslatedStringToShow('');
  };
  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());

    loadVoices();
  }, []);
  useEffect(() => {
    if (!voices.length) return;
    const loadVoice = () => setVoice(voices[0]);

    loadVoice();
  }, [voices]);

  return (
    <div className="container">
      <h1>Text to speech</h1>
      <div className="content">
        {!text && <p>{error}</p>}

        <div className="textarea-container">
          <textarea onChange={handleChange} value={text}></textarea>
          <textarea value={translatedStringToShow} readOnly disabled></textarea>
        </div>
        <select onChange={handleSelect} name="" id="">
          {voices.length &&
            voices.map((voice, index) => (
              <option value={voice.name} key={index}>
                {voice.name}
              </option>
            ))}
        </select>

        <div className="btns-container">
          <Button
            icon={<BsTranslate className="icon" />}
            type="submit"
            onClick={translate}
          />
          <Button
            icon={<IoPlay className="icon" />}
            type="submit"
            onClick={play}
          />
          <Button
            icon={<RxReset className="icon" />}
            type="submit"
            onClick={reset}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
