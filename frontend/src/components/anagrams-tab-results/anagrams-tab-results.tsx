import { useAppSelector } from '../../redux/hooks';
import AnagramsList from '../anagrams-list/anagrams-list';


const AnagramsTabResults = () => {
  const { anagrams } = useAppSelector((state) => state.anagram);
  return (
    <div className='anagramstabanagram__anagrams-container mt-4'>
      {anagrams ? (
        <AnagramsList />
      ) : (
        <div className='text-center text-xl text-gray-700'>
          No results here.
          <br /> Try to perform a new search...
        </div>
      )}
    </div>
  );
};

export default AnagramsTabResults;
