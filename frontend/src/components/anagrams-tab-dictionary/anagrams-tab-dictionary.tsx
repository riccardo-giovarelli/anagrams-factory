import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchWord } from '../../redux/reducers/dictionary/dictionaryThunk';


const AnagramsTabDictionary = () => {
  const dispatch = useAppDispatch();
  const { text, anagrams } = useAppSelector((state) => state.anagram);

  useEffect(() => {
    if (anagrams && text) {
      dispatch(searchWord());
    }
  }, [anagrams, text]);

  return (
    <div className='anagramstabdictionary__container'>
      {anagrams && text ? (
        <div></div>
      ) : (
        <div className='anagramstabdictionary__nodata-container w-full text-center text-xl text-gray-500'>
          No data to show.
          <br />
          Try generating some anagrams.
        </div>
      )}
    </div>
  );
};

export default AnagramsTabDictionary;
