import { mergeClassNames } from '../../utils/style';
import { getTabs } from './anagrams-tabs.lib';
import { AnagramsTabsType, tabsIdType, TabsType } from './anagrams-tabs.type';


const AnagramsTabs = ({ currentTab, setCurrentTab, className = "" }: AnagramsTabsType) => {
    const tabs: TabsType[] = getTabs()

    return (
        <div className={className}>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full border p-2 rounded-md border-gray-300 focus:border-af-900 focus:ring-af-900"
                    value={tabs.find((tab) => tab.id === currentTab)?.id}
                    onChange={(e) => { setCurrentTab(e.target.value as tabsIdType); }}
                >
                    {tabs.map((tab: TabsType, index: number) => (
                        <option
                            key={index}
                            value={tab.id}
                        >
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab: TabsType, index: number) => (
                            <button
                                key={index}
                                className={mergeClassNames(
                                    tab.id === currentTab
                                        ? 'border-af-900 text-af-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                )}
                                aria-current={tab.id === currentTab ? 'page' : undefined}
                                onClick={() => { setCurrentTab(tab.id as tabsIdType) }}

                            >
                                <tab.icon
                                    className={mergeClassNames(
                                        tab.id === currentTab ? 'text-af-900' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )

}

export default AnagramsTabs