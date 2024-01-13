import { useState } from 'react';

import AnagramsTabAnagram from '../../components/anagrams-tab-anagram/anagrams-tab-anagram';
import AnagramsTabDictionary from '../../components/anagrams-tab-dictionary/anagrams-tab-dictionary';
import AnagramsTabs from '../../components/anagrams-tabs/anagrams-tabs';
import { tabsIdType } from '../../components/anagrams-tabs/anagrams-tabs.type';
import Header from '../../components/header/header';

const Home = () => {
  const [currentTab, setCurrentTab] = useState<tabsIdType>('anagrams');

  return (
    <div className='home__container w-full flex flex-col px-4 pt-2 justify-center max-w-5xl m-auto min-w-[500px]'>
      <div className='home__header'>
        <Header />
      </div>
      <div className='home__body bg-white mt-4 flex flex-col p-4 border-2 rounded-xl'>
        <div className='home__tabs-header'>
          <AnagramsTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        {currentTab === 'anagrams' && (
          <div className='home__tab-anagram my-16 w-full'>
            <AnagramsTabAnagram />
          </div>
        )}
        {currentTab === 'dictionary' && (
          <div className='home__tab-dictionary my-16 w-full'>
            <AnagramsTabDictionary />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
