export interface TabsType {
  id: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>
  >;
}

export type tabsIdType = 'dictionary' | 'anagrams';

export interface AnagramsTabsType {
  currentTab: tabsIdType;
  setCurrentTab: (currentTab: tabsIdType) => void;
  className?: string;
}
