import { useState } from 'react';

import { mergeClassNames } from '../../utils/style';
import { AnagramsTabAnagramType } from './anagrams-tab-anagram.type';


const AnagramsTabAnagram = ({ text, setText }: AnagramsTabAnagramType) => {
    const [inputText, setInputText] = useState<string>("")

    const handleGoButtonClick = () => {
        if (inputText) {
            setText(inputText)
        }
    }

    return <div className="anagramstabanagram__container flex flex-col sm:flex-row flex-nowrap gap-3 mx-auto w-3/4 md:w-2/4">
        <div className="anagramstabanagram__input-container w-full">
            <label htmlFor="original-text" className="sr-only">
                Text to anagram
            </label>
            <input
                type="text"
                name="original-text"
                id="original-text"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter a text..."
                value={inputText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInputText(event.target.value)
                }}
            />
        </div>
        <div>
            <button
                type="button"
                className={
                    mergeClassNames(
                        inputText === "" ? "opacity-70 cursor-not-allowed" : "hover:bg-af-600",
                        "w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600"
                    )}
                onClick={handleGoButtonClick}
            >
                Go!
            </button>
        </div>
    </div>
}

export default AnagramsTabAnagram