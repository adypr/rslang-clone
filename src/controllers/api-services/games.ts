import Loader from '../loader';
import { UsersWord } from '../../models/users-words.interface';
import {
  addLearnedWordStat,
  removeLearnedWordStat,
  addNewWordAudiocallStat,
  addNewWordSprintStat,
  addRightAudiocallStat,
  addRightSprintStat,
  addWrongAudiocallStat,
  addWrongSprintStat,
} from '../statistics';
import { Statistics } from '../../models/statistics.interface';

const getUserWord: (wordId: string) => Promise<UsersWord> = (
  wordId: string,
) => Loader.getUserWord(wordId);

const postUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (
  wordId: string,
  params: UsersWord,
) => Loader.createWord(wordId, params).then((res: Response) => res.json());

const putUserWord: (wordId: string, params: UsersWord) => Promise<UsersWord> = (
  wordId: string,
  params: UsersWord,
) => Loader.updateWord(wordId, params).then((res: Response) => res.json());

const checkDifficultyWhenRightAnswer = (usersWord: UsersWord) => {
  const wordProperties = usersWord;
  if (usersWord.optional.successStreak >= 3
    && wordProperties.difficulty === 'new') {
    wordProperties.difficulty = 'learned';
  }

  if (usersWord.optional.successStreak >= 5
    && wordProperties.difficulty === 'hard') {
    wordProperties.difficulty = 'learned';
    let hardWordsCount = +localStorage.getItem('hardWordsCount');
    hardWordsCount -= 1;
    localStorage.setItem('hardWordsCount', String(hardWordsCount));
  }

  return wordProperties;
};

const addUsersRightWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };
      const { successStreak } = { ...wordProperties }.optional;
      const diff = { ...wordProperties }.difficulty;
      usersWord.optional.audioSuccess += 1;
      usersWord.optional.successStreak += 1;
      usersWord.optional.audioTotal += 1;

      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addRightAudiocallStat(stat);
          if ((successStreak >= 2 && diff === 'new')
          || (successStreak >= 4 && diff === 'hard')) {
            newStat = addLearnedWordStat(newStat);
          }
          Loader.upsertStatistics(newStat);
        });

      const newUsersWord = checkDifficultyWhenRightAnswer(usersWord);

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(newUsersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 1,
            audioTotal: 1,
            sprintSuccess: 0,
            sprintTotal: 0,
            successStreak: 1,
          },
        },
      );
      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addNewWordAudiocallStat(stat);
          newStat = addRightAudiocallStat(newStat);
          Loader.upsertStatistics(newStat);
        });
    });
};

const addUsersWrongWordFromAudiocall = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };
      const diff = { ...wordProperties }.difficulty;

      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addWrongAudiocallStat(stat);
          if (diff === 'learned') newStat = removeLearnedWordStat(newStat);
          Loader.upsertStatistics(newStat);
        });

      if (diff === 'learned') {
        usersWord.difficulty = 'new';
      }
      usersWord.optional.successStreak = 0;
      usersWord.optional.audioTotal += 1;

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 1,
            sprintSuccess: 0,
            sprintTotal: 0,
            successStreak: 0,
          },
        },
      );
      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addNewWordAudiocallStat(stat);
          newStat = addWrongAudiocallStat(newStat);
          Loader.upsertStatistics(newStat);
        });
    });
};

const addUsersRightWordFromSprint = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };
      const { successStreak } = { ...wordProperties }.optional;
      const diff = { ...wordProperties }.difficulty;
      usersWord.optional.sprintSuccess += 1;
      usersWord.optional.sprintTotal += 1;
      usersWord.optional.successStreak += 1;

      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addRightSprintStat(stat);
          if ((successStreak >= 2 && diff === 'new')
            || (successStreak >= 4 && diff === 'hard')) {
            newStat = addLearnedWordStat(newStat);
          }
          Loader.upsertStatistics(newStat);
        });

      const newUsersWord = checkDifficultyWhenRightAnswer(usersWord);

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(newUsersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 0,
            sprintSuccess: 1,
            sprintTotal: 1,
            successStreak: 1,
          },
        },
      );
      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addNewWordSprintStat(stat);
          newStat = addRightSprintStat(newStat);
          Loader.upsertStatistics(newStat);
        });
    });
};

const addUsersWrongWordFromSprint = (_wordId: string) => {
  getUserWord(_wordId)
    .then((wordProperties: UsersWord) => {
      const usersWord: UsersWord = { ...wordProperties };
      const diff = { ...wordProperties }.difficulty;

      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addWrongSprintStat(stat);
          if (diff === 'learned') newStat = removeLearnedWordStat(newStat);
          Loader.upsertStatistics(newStat);
        });

      if (diff === 'learned') {
        usersWord.difficulty = 'new';
      }
      usersWord.optional.successStreak = 0;
      usersWord.optional.sprintTotal += 1;

      putUserWord(_wordId, (({ id, wordId, ...rest }: UsersWord) => rest)(usersWord));
    })
    .catch(() => {
      postUserWord(
        _wordId,
        {
          difficulty: 'new',
          optional: {
            audioSuccess: 0,
            audioTotal: 0,
            sprintSuccess: 0,
            sprintTotal: 1,
            successStreak: 0,
          },
        },
      );
      Loader.getStatistics()
        .then((stat: Statistics) => {
          let newStat = addNewWordSprintStat(stat);
          newStat = addWrongSprintStat(newStat);
          Loader.upsertStatistics(newStat);
        });
    });
};

export {
  addUsersRightWordFromAudiocall,
  addUsersWrongWordFromAudiocall,
  addUsersRightWordFromSprint,
  addUsersWrongWordFromSprint,
};
