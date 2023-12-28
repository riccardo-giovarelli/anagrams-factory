import { useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAnagrams, setLoading, setText } from '../../redux/reducers/anagram/anagramSlice';
import { mergeClassNames } from '../../utils/style';
import AnagramsList from '../anagrams-list/anagrams-list';
import MessageBox from '../message-box/message-box';
import { getAnagrams, handleInputChange } from './anagrams-tab-anagram.lib';


const AnagramsTabAnagram = () => {
  const dispatch = useAppDispatch();
  const { text, loading, offset, limit } = useAppSelector((state) => state.anagram);
  const [message, setMessage] = useState<string>('');

  /**
   * Button click handler
   */
  const handleGoButtonClick = async () => {
    dispatch(setLoading(true));
    const anagramsData = await getAnagrams(text, offset, limit);
    if (!anagramsData) {
      dispatch(setAnagrams([]));
    } else if (anagramsData.data) {
      dispatch(setAnagrams(anagramsData));
    } else if (anagramsData.title && anagramsData.detail) {
      setMessage(`${anagramsData.title}: ${anagramsData.detail}`);
      dispatch(setAnagrams([]));
    }
    dispatch(setLoading(false));
  };

  return (
    <div className='anagramstabanagram__container'>
      <div className={mergeClassNames(loading ? 'pointer-events-none' : '', 'anagramstabanagram__form-container flex flex-col gap-y-4')}>
        <div
          className={mergeClassNames(
            loading ? 'pointer-events-none' : '',
            'anagramstabanagram__input-button-container flex flex-col sm:flex-row flex-nowrap gap-3 mx-auto w-full sm:w-3/4 md:w-2/4'
          )}
        >
          <div className='anagramstabanagram__input-container w-full'>
            <label htmlFor='original-text' className='sr-only'>
              Text to anagram
            </label>
            <input
              type='text'
              name='original-text'
              id='original-text'
              className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='Enter a text...'
              value={text}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(event, dispatch, setText, message, setMessage);
              }}
            />
          </div>
          <div className='anagramstabanagram__button-container'>
            <button
              type='button'
              className={mergeClassNames(
                loading || text === '' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-af-600',
                'w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600'
              )}
              onClick={handleGoButtonClick}
            >
              {loading ? <ArrowPathIcon className='h-5 w-5 animate-spin' aria-hidden='true' /> : <span>Go!</span>}
            </button>
          </div>
        </div>
        <div className='mx-auto w-full sm:w-3/4 md:w-2/4'>{message && <MessageBox type='warning' message={message} />}</div>
      </div>
      <div className='anagramstabanagram__anagrams-container mt-10'>
        <AnagramsList />
      </div>
    </div>
  );
};

export default AnagramsTabAnagram;
