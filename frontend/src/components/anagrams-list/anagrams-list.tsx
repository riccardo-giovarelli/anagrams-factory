import "./anagrams-list.style.scss";

import { JSX } from "react";

import AnagramsPagination from "@components/anagrams-pagination/anagrams-pagination";
import Toggle from "@components/toggle/toggle";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setOffset, setUnique } from "@redux/reducers/anagram/anagramSlice";
import { AnagramDataType } from "@redux/reducers/anagram/anagramSlice.type";
import { fetchAnagrams } from "@redux/reducers/anagram/anagramThunk";
import { mergeClassNames } from "@utils/style";

const AnagramsList = (): JSX.Element | null => {
  const { anagrams, offset, limit, unique } = useAppSelector((state) => state.anagram);
  const dispatch = useAppDispatch();

  const items = anagrams?.data;

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const handleToggleUnique = (value: boolean): void => {
    dispatch(setUnique(value));
    dispatch(setOffset(0));
    dispatch(fetchAnagrams());
  };

  const handlePageChange = (value: number): void => {
    dispatch(setOffset(value));
    dispatch(fetchAnagrams());
  };

  return (
    <div className="anagramslist__container">
      <div className="anagramslist__toggle-unique mx-5 p-2 border-2 border-af-900 rounded-xl w-fit">
        <Toggle label="Nascondi duplicati" enabled={unique} setEnabled={handleToggleUnique} />
      </div>
      <div className="anagramslist__list-container px-5 mt-8">
        <ul className="anagramslist__list flex flex-row flex-wrap text-lg gap-3" role="list">
          {items.map((anagram: AnagramDataType, index: number) => {
            const isLastItem = index === items.length - 1;

            return (
              <li
                key={`${anagram.id}-${anagram.attributes.word}`}
                className={mergeClassNames(
                  isLastItem ? "justify-start" : "justify-center flex-1",
                  "anagramslist__list-item flex flex-row flex-nowrap gap-3 items-center",
                )}
              >
                <div className="anagramslist__anagram-box text-af-100 border-2 border-af-100 rounded-xl py-2 px-3 flex-none">
                  {anagram.attributes.word}
                </div>
                {!isLastItem && (
                  <div className="anagramslist__anagram-arrow flex flex-row flex-nowrap items-start flex-1 min-w-[20px]">
                    <div className="border-b-2 border-af-900 h-0 min-w-[20px] w-full" />
                    <div className="arrow right border-af-900" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="anagramslist__pagination mt-10">
        <AnagramsPagination
          offset={offset}
          limit={limit}
          setOffset={handlePageChange}
          total={anagrams?.meta?.totalResults ?? 0}
        />
      </div>
    </div>
  );
};

export default AnagramsList;
