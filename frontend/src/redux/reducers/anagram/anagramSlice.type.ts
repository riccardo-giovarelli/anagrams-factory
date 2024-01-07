export interface AnagramsStateType {
  text: string;
  anagrams: AnagramType | null;
  unique: boolean;
  offset: number;
  limit: number;
  status: string;
  error: string | undefined;
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

export interface fetchAnagramsType {
  text: string;
  limit: number;
  offset: number;
  unique: boolean;
}
