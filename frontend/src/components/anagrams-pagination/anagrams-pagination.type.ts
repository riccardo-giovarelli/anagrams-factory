export interface AnagramsPaginationType {
  offset: number;
  limit: number;
  total: number;
  setOffset: (offset: number) => void;
}
