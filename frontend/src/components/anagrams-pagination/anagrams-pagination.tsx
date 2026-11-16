import { JSX } from "react";

import { mergeClassNames } from "@utils/style";

import { handleNextClick, handlePreviousClick } from "./anagrams-pagination.lib";
import { AnagramsPaginationType } from "./anagrams-pagination.type";

const AnagramsPagination = ({ offset, limit, total, setOffset }: AnagramsPaginationType): JSX.Element => {
  const startItem = total === 0 ? 0 : offset * limit + 1;
  const endItem = Math.min((offset + 1) * limit, total);

  const canGoPrevious = offset > 0;
  const canGoNext = limit * (offset + 1) < total;

  return (
    <nav
      className="flex items-center justify-between border-2 rounded-xl border-af-900 bg-white p-3 mx-5"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-af-900">
          Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end gap-3">
        <button
          type="button"
          disabled={!canGoPrevious}
          className={mergeClassNames(
            canGoPrevious ? "hover:bg-af-600" : "opacity-50 cursor-not-allowed",
            "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-af-900 text-white focus-visible:outline-offset-0",
          )}
          onClick={() => handlePreviousClick(offset, setOffset)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canGoNext}
          className={mergeClassNames(
            canGoNext ? "hover:bg-af-600" : "opacity-50 cursor-not-allowed",
            "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-af-900 text-white focus-visible:outline-offset-0",
          )}
          onClick={() => handleNextClick(limit, offset, total, setOffset)}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default AnagramsPagination;
