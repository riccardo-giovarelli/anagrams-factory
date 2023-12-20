export interface TabsType {
  id: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>
  >;
}

export interface AnagramsTabsType {
  currentTab: string;
  setCurrentTab: (currentTab: string) => void;
  className: string;
}
