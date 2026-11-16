import { JSX } from "react";

import AnagramsList from "@components/anagrams-list/anagrams-list";
import { useAppSelector } from "@redux/hooks";

const AnagramsTabResults = (): JSX.Element => {
  const { anagrams } = useAppSelector((state) => state.anagram);
  const hasResults = Array.isArray(anagrams?.data) && anagrams.data.length > 0;

  return (
    <div className="anagramstabanagram__anagrams-container mt-4">
      {hasResults ? (
        <AnagramsList />
      ) : (
        <div className="text-center text-xl text-gray-700">
          No results here.
          <br /> Try to perform a new search...
        </div>
      )}
    </div>
  );
};

export default AnagramsTabResults;
