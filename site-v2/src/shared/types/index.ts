export * from './store.types';

export interface WithClassName {
  className?: string;
}

export interface WithOnChange<T> {
  onChange: (value: T) => void;
}
