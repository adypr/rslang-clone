import { Word } from './word.interface';

export interface UsersWord {
  difficulty: string,
  optional: {
    audioSuccess: number,
    audioTotal: number,
    sprintSuccess: number,
    sprintTotal: number,
    successStreak: number,
  },
  wordId?: string,
  id?: string,
}

export type UserWords = UsersWord[];

export interface ReceivedUserWord extends UsersWord {
  id: string,
  wordId: string
}

export type ReceivedUserWords = ReceivedUserWord[];

export interface AggregatedUserWord extends Word {
  _id: string,
  userWord: {
    difficulty: string,
    optional: {
      audioSuccess: number,
      audioTotal: number,
      sprintSuccess: number,
      sprintTotal: number,
      successStreak: number,
    },
  }
}

export type AggregatedUserWords = AggregatedUserWord[];

export type ReceivedUserAggregatedWords = {
  paginatedResults: AggregatedUserWord[],
  totalCount: {
    count: number
  }
}[];
