import { useState } from 'react';

import AnagramsTabs from '../../components/anagrams-tabs/anagrams-tabs';
import Header from '../../components/header/header';


const Home = () => {
    const [currentTab, setCurrentTab] = useState<string>('anagrams');

    return <div className="home__container w-full flex flex-col px-4 pt-2 justify-center max-w-5xl m-auto">
        <Header />
        <AnagramsTabs currentTab={currentTab} setCurrentTab={setCurrentTab} className={"mt-20"} />
    </div>
}

export default Home