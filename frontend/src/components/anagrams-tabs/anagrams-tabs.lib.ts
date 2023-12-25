import { BookOpenIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

import { TabsType } from './anagrams-tabs.type';

/**
 * @function getTabs
 *
 * @returns {TabsType} Tabs details
 */
export const getTabs = (): TabsType[] => [
  { id: 'anagrams', name: 'Anagrams', icon: Squares2X2Icon },
  { id: 'dictionary', name: 'Dictionary', icon: BookOpenIcon },
];
