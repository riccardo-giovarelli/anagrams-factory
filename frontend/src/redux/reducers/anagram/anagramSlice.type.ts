export interface AnagramsInitialState {
  text: string;
  anagrams: AnagramType | null;
  loading: boolean;
  unique: boolean;
  offset: number;
  limit: number;
}

export interface AnagramType {
  links: any;
  meta: any;
  data: AnagramDataType[];
}

export interface AnagramDataType {
  type: string;
  id: number;
  attributes: {
    word: string;
  };
}
