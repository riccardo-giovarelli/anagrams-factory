import { useEffect, useState } from 'react';


const useAnagram = (text: string, offset: number = 1, limit: number = 100) => {
  const [anagrams, setAnagrams] = useState<string[] | null>(null);

  useEffect(() => {
    if (!text) {
      return;
    }

    (async function () {
      try {
        const response = await fetch(`http://localhost:3000/api/anagram/make?text=${text}&limit=${limit}&offset=${offset}`);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const anagrams = await response.json();
          setAnagrams(anagrams);
        }
      } catch (e) {
        console.warn('[AF-MSG] Error getting anagrams.', e);
        setAnagrams(null);
      }
    })();
  }, [text]);

  return anagrams;
};

export default useAnagram;
