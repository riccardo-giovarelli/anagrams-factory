import { BookOpenIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

/**
 * @function getTabs
 *
 * @returns {TabsType} Tabs details
 */
export const getTabs = () => [
  { id: 'anagrams', name: 'Anagrams', icon: Squares2X2Icon },
  { id: 'dictionary', name: 'Dictionary', icon: BookOpenIcon },
];
