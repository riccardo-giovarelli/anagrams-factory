import { mergeClassNames } from '../../utils/style';
import { AnagramsPaginationType } from './anagrams-pagination.type';

const AnagramsPagination = ({ offset, limit, total, setOffset }: AnagramsPaginationType) => {
  // Previous click
  const handlePreviousClick = () => {
    if (offset - 1 >= 0) {
      setOffset(offset - 1);
    }
  };

  // Next click
  const handleNextClick = () => {
    if (limit * (offset + 1) <= total) {
      setOffset(offset + 1);
    }
  };

  return (
    <nav className='flex items-center justify-between border-2 rounded-xl border-af-900 bg-white p-3 mx-5' aria-label='Pagination'>
      <div className='hidden sm:block'>
        <p className='text-sm text-af-900'>
          Showing <span className='font-medium'>{offset * limit + 1}</span> to{' '}
          <span className='font-medium'>{offset * limit + limit <= total ? offset * limit + limit : total}</span> of{' '}
          <span className='font-medium'>{total}</span> results
        </p>
      </div>
      <div className='flex flex-1 justify-between sm:justify-end gap-3'>
        <button
          className={mergeClassNames(
            offset - 1 >= 0 ? 'hover:bg-af-600' : 'opacity-70 cursor-not-allowed',
            'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-af-900 text-white focus-visible:outline-offset-0'
          )}
          onClick={handlePreviousClick}
        >
          Previous
        </button>
        <button
          className={mergeClassNames(
            limit * (offset + 1) <= total ? 'hover:bg-af-600' : 'opacity-40 cursor-not-allowed',
            'relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-af-900 text-white focus-visible:outline-offset-0'
          )}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default AnagramsPagination;
