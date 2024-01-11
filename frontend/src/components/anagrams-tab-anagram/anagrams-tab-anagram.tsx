import { useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { restore, setText } from '../../redux/reducers/anagram/anagramSlice';
import { fetchAnagrams } from '../../redux/reducers/anagram/anagramThunk';
import { mergeClassNames } from '../../utils/style';
import AnagramsList from '../anagrams-list/anagrams-list';
import MessageBox from '../message-box/message-box';


const AnagramsTabAnagram = () => {
  const dispatch = useAppDispatch();
  const { text, status, error } = useAppSelector((state) => state.anagram);
  const [message, setMessage] = useState<string>('');

  return (
    <div className='anagramstabanagram__container'>
      <div className={mergeClassNames(status === 'loading' ? 'pointer-events-none' : '', 'anagramstabanagram__form-container flex flex-col gap-y-4')}>
        <div
          className={mergeClassNames(
            status === 'loading' ? 'pointer-events-none' : '',
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
                if (message) setMessage('');
                dispatch(setText(event.target.value));
              }}
            />
          </div>
          <div className={mergeClassNames(status === 'loading' || text === '' ? 'cursor-not-allowed' : '', 'anagramstabanagram__button-container')}>
            <button
              type='button'
              className={mergeClassNames(
                status === 'loading' || text === '' ? 'opacity-50 pointer-events-none' : 'hover:bg-af-600',
                'w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600'
              )}
              onClick={() => {
                dispatch(fetchAnagrams());
              }}
            >
              {status === 'loading' ? <ArrowPathIcon className='h-5 w-5 animate-spin' aria-hidden='true' /> : <span>Go!</span>}
            </button>
          </div>
          <div className={mergeClassNames(status === 'loading' || text === '' ? 'cursor-not-allowed' : '', 'anagramstabanagram__button-container')}>
            <button
              type='button'
              className={mergeClassNames(
                status === 'loading' || text === '' ? 'opacity-50 pointer-events-none' : 'hover:bg-af-600',
                'w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600'
              )}
              onClick={() => {
                dispatch(restore());
              }}
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
        <div className='mx-auto w-full sm:w-3/4 md:w-2/4'>{error && <MessageBox type='warning' message={error} />}</div>
      </div>
      <div className='anagramstabanagram__anagrams-container mt-4'>
        <AnagramsList />
      </div>
    </div>
  );
};

export default AnagramsTabAnagram;
