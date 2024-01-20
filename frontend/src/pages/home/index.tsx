import AnagramsTabResults from '../../components/anagrams-tab-results/anagrams-tab-results';
import AnagramsTabSearch from '../../components/anagrams-tab-search/anagrams-tab-search';
import AnagramsTabs from '../../components/anagrams-tabs/anagrams-tabs';
import Header from '../../components/header/header';
import { useAppSelector } from '../../redux/hooks';


const Home = () => {
  const { currentTab } = useAppSelector((state) => state.tab);

  return (
    <div className='home__container w-full flex flex-col px-4 pt-2 justify-center max-w-5xl m-auto min-w-[500px]'>
      <div className='home__header'>
        <Header />
      </div>
      <div className='home__body bg-white mt-4 flex flex-col p-4 border-2 rounded-xl'>
        <div className='home__tabs-header'>
          <AnagramsTabs />
        </div>
        {currentTab === 'search' && (
          <div className='home__tab-anagram my-16 w-full'>
            <AnagramsTabSearch />
          </div>
        )}
        {currentTab === 'results' && (
          <div className='home__tab-dictionary my-16 w-full'>
            <AnagramsTabResults />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
