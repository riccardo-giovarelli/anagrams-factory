import './anagrams-list.style.scss';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setOffset, setUnique } from '../../redux/reducers/anagram/anagramSlice';
import { AnagramDataType } from '../../redux/reducers/anagram/anagramSlice.type';
import { fetchAnagrams } from '../../redux/reducers/anagram/anagramThunk.ts';
import { mergeClassNames } from '../../utils/style.ts';
import AnagramsPagination from '../anagrams-pagination/anagrams-pagination';
import Toggle from '../toggle/toggle.tsx';


const AnagramsList = () => {
  const { anagrams, offset, limit, unique } = useAppSelector((state) => state.anagram);
  const dispatch = useAppDispatch();

  return anagrams?.data && Array.isArray(anagrams.data) ? (
    <div className='anagramslist__container'>
      <div className='anagramslist__toggle-unique mx-5 p-2 border-2 border-af-900 rounded-xl w-fit'>
        <Toggle
          label={'Nascondi duplicati'}
          enabled={unique}
          setEnabled={(value: boolean) => {
            dispatch(setUnique(value));
            dispatch(fetchAnagrams());
          }}
        />
      </div>
      <div className='anagramslist__list-container px-5 mt-8'>
        <ul className='anagramslist__list flex flex-row flex-wrap text-lg gap-3' role='list'>
          {anagrams.data.map((anagram: AnagramDataType, index: number) => (
            <li
              key={index}
              className={mergeClassNames(
                index === anagrams.data.length - 1 ? 'justify-start' : 'justify-center flex-1',
                'anagramslist__list-item flex flex-row flex-nowrap gap-3 items-center'
              )}
            >
              <div className='anagramslist__anagram-box text-af-100 border-2 border-af-100 rounded-xl py-2 px-3 flex-none'>
                {anagram.attributes.word}
              </div>
              {index < anagrams.data.length - 1 && (
                <div className='anagramslist__anagram-arrow flex flex-row flex-nowrap items-start flex-1 min-w-[20px]'>
                  <div className='border-b border-2 border-af-900 h-0 min-w-[20px] w-full' />
                  <div className='arrow right border-af-900' />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='anagramslist__pagination mt-10'>
        <AnagramsPagination
          offset={offset}
          limit={limit}
          setOffset={(value: number) => {
            dispatch(setOffset(value));
            dispatch(fetchAnagrams());
          }}
          total={anagrams ? anagrams.meta.totalResults : 0}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AnagramsList;
