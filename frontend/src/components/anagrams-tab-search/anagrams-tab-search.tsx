import { ChangeEvent, FormEvent, JSX } from "react";

import MessageBox from "@components/message-box/message-box";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { restore, setOffset, setText } from "@redux/reducers/anagram/anagramSlice";
import { fetchAnagrams } from "@redux/reducers/anagram/anagramThunk";
import { setCurrentTab } from "@redux/reducers/tabs/tabsSlice";
import { mergeClassNames } from "@utils/style";

const AnagramsTabSearch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { text, status, error } = useAppSelector((state) => state.anagram);

  const isLoading = status === "loading";
  const isActionDisabled = isLoading || text.trim() === "";

  /**
   * Handles changes to the input field for anagram search.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - The input change event containing the new value.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setText(event.target.value));
  };

  /**
   * Submits the anagram search and switches to the results tab only upon success.
   *
   * @param {FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (isActionDisabled) {
      return;
    }

    dispatch(setOffset(0));

    try {
      await dispatch(fetchAnagrams()).unwrap();
      dispatch(setCurrentTab("results"));
    } catch {}
  };

  const handleReset = (): void => {
    dispatch(restore());
  };

  return (
    <div className="anagramstabanagram__container">
      <form onSubmit={handleSubmit} className="anagramstabanagram__form-container flex flex-col gap-y-4">
        <div className="anagramstabanagram__input-button-container flex flex-col sm:flex-row flex-nowrap gap-3 mx-auto w-full sm:w-3/4 md:w-2/4">
          <div className="anagramstabanagram__input-container w-full">
            <label htmlFor="original-text" className="sr-only">
              Text to anagram
            </label>
            <input
              type="text"
              name="original-text"
              id="original-text"
              data-cy="original-text"
              disabled={isLoading}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
              placeholder="Enter a text..."
              value={text}
              onChange={handleInputChange}
            />
          </div>
          <div className="anagramstabanagram__button-container">
            <button
              type="submit"
              disabled={isActionDisabled}
              className={mergeClassNames(
                isActionDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-af-600",
                "w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600",
              )}
            >
              {isLoading ? <ArrowPathIcon className="h-5 w-5 animate-spin" aria-hidden="true" /> : <span>Go!</span>}
            </button>
          </div>
          <div className="anagramstabanagram__button-container">
            <button
              type="button"
              disabled={isActionDisabled}
              onClick={handleReset}
              className={mergeClassNames(
                isActionDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-af-600",
                "w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-af-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-af-600",
              )}
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
        {error && (
          <div className="mx-auto w-full sm:w-3/4 md:w-2/4">
            <MessageBox type="warning" message={error} />
          </div>
        )}
      </form>
    </div>
  );
};

export default AnagramsTabSearch;
