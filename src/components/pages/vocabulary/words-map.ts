import { Word } from '../../../models/word.interface';

let mapOfWords: Record<string, Word> = {};

const setWords = (value: Record<string, Word>) => {
  mapOfWords = value;
};

const getWords: () => Record<string, Word> = () => mapOfWords;

export { getWords, setWords };
