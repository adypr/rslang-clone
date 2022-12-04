import { UsersWord } from './users-words.interface';
import { Word } from './word.interface';

export interface AggregatedWord extends Word {
  userWord: UsersWord,
  _id: string
}

export type PaginatedResults = AggregatedWord[];

export type AggregatedWords = [{
  paginatedResults: PaginatedResults,
  totalCount: [{
    count: number
  }]
}];
