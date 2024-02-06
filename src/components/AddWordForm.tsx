import {FC, useState} from 'react';

type Props = {
    onAdd: (word: string) => void;
}
export const AddWordForm: FC<Props> = ({onAdd}) => {
    const [word, setWord] = useState('');

    return (
        <div>
            <label>your word:</label>
            <input
                type="text"
                value={word}
                onChange={e => setWord(e.target.value)}
            />
            <button onClick={() => onAdd(word)}>Add</button>
        </div>
    );
};
