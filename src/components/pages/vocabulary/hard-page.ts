import { AggregatedWord, AggregatedWords } from '../../../models/aggregatedWords.interface';

export const HARD_WORDS_LIMIT = 50;

export const parseAggregatedWords = (serverWords: AggregatedWords) => {
  const arr = serverWords[0].paginatedResults;
  return arr.map((word: AggregatedWord) => {
    // eslint-disable-next-line
    word.id = word._id;
    return word;
  });
};
