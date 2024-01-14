import { Squares2X2Icon } from '@heroicons/react/24/outline';

import { TabsType } from './anagrams-tabs.type';


/**
 * @function getTabs
 *
 * @returns {TabsType} Tabs details
 */
export const getTabs = (): TabsType[] => [
  { id: 'search', name: 'Find Anagrams', icon: Squares2X2Icon },
  { id: 'results', name: 'Results', icon: Squares2X2Icon },
];
