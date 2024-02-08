import {useEffect, useRef, useState} from 'react';

import {Header, Paragraph} from './HomePage.styles';
import {AddWordForm} from '../components/AddWordForm';
import {SpeechRecognition, SpeechGrammarList} from '../types';

export const HomePage = () => {
    const [words, setWords] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);
    const [started, setStarted] = useState(false);
    const recognition = useRef(new SpeechRecognition());
    const recognitionList = useRef(new SpeechGrammarList());
    const handleAddWord = (word: string) => {
        console.log('add word', word);
        setWords([...words, word]);
        recognitionList.current.addFromString(word);
    };
    const handleStart = () => {
        console.log('start');
        if (!started) {
            recognition.current.start();
        } else {
            recognition.current.stop();
        }
        setStarted(v => !v);
    };
    const handleRecognized = (e: SpeechRecognitionEvent) => {
        console.log('result', e);
        const data = [...e.results].map(r => [...r].map(i => i.transcript).join('/'));
        setResults(data);
    };

    useEffect(() => {
        if (!recognition.current || !recognitionList.current) {
            return;
        }

        recognition.current.grammars = recognitionList.current;
        recognition.current.continuous = true;
        recognition.current.lang = 'en-US';
        recognition.current.addEventListener('result', handleRecognized);
    }, []);

    console.log(recognition.current);

    return (
        <div>
            <Header>
                Word counter
            </Header>
            <Paragraph>
                Word recognition and signaling when detected
            </Paragraph>
            <AddWordForm onAdd={handleAddWord}/>
            <button onClick={handleStart}>{started ? 'Stop' : 'Start'}</button>
            <div>
                words added:
                <div>
                    {words.map(((word, i) => (
                        <div key={i}>{word}</div>
                    )))}
                </div>
            </div>
            <div>
                <h4>
                    Results
                </h4>
                <div>
                    {results.map(((result, i) => (
                        <div key={i}>{result}</div>
                    )))}
                </div>
            </div>
        </div>
    );
};
