export interface AnagramsTabAnagramType {
  text: string;
  setText: (text: string) => void;
}

export interface AnagramsReturnMessage {
  title?: string;
  detail?: string;
  data?: string[];
}
