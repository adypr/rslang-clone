import { Settings, Statistics } from '../models/statistics.interface';

export const newOptions: Settings = {
  optional: {
    learnedPages: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
  },
};

export const newStatistics: Statistics = {
  learnedWords: 0,
  optional: {
    dayStat: {
      today: new Date().setHours(0, 0, 0, 0),
      newWords: 0,
      learnedWords: 0,
      audioNewWords: 0,
      audioSuccess: 0,
      audioTotal: 0,
      audioStreakCurr: 0,
      audioStreakMax: 0,
      sprintNewWords: 0,
      sprintSuccess: 0,
      sprintTotal: 0,
      sprintStreakCurr: 0,
      sprintStreakMax: 0,
    },
    completeStat: {
      [new Date().setHours(0, 0, 0, 0)]: { newWords: 0, totalLearnedWords: 0 },
    },
  },
};

export const createNewDayStat = () => ({
  today: new Date().setHours(0, 0, 0, 0),
  newWords: 0,
  learnedWords: 0,
  audioNewWords: 0,
  audioSuccess: 0,
  audioTotal: 0,
  audioStreakCurr: 0,
  audioStreakMax: 0,
  sprintNewWords: 0,
  sprintSuccess: 0,
  sprintTotal: 0,
  sprintStreakCurr: 0,
  sprintStreakMax: 0,
});

export const addNewWordAudiocallStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].newWords += 1;
  } else {
    stat.optional.completeStat[today] = {
      newWords: 1,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.newWords += 1;
  stat.optional.dayStat.audioNewWords += 1;
  return stat;
};

export const addNewWordSprintStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].newWords += 1;
  } else {
    stat.optional.completeStat[today] = {
      newWords: 1,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.newWords += 1;
  stat.optional.dayStat.sprintNewWords += 1;
  return stat;
};

export const addWrongAudiocallStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  if (stat.optional.dayStat.audioStreakCurr > stat.optional.dayStat.audioStreakMax) {
    stat.optional.dayStat.audioStreakMax = stat.optional.dayStat.audioStreakCurr;
  }
  stat.optional.dayStat.audioTotal += 1;
  stat.optional.dayStat.audioStreakCurr = 0;

  return stat;
};

export const addRightAudiocallStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.audioStreakCurr += 1;
  stat.optional.dayStat.audioTotal += 1;
  stat.optional.dayStat.audioSuccess += 1;
  if (stat.optional.dayStat.audioStreakCurr > stat.optional.dayStat.audioStreakMax) {
    stat.optional.dayStat.audioStreakMax = stat.optional.dayStat.audioStreakCurr;
  }

  return stat;
};

export const addWrongSprintStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  if (stat.optional.dayStat.sprintStreakCurr > stat.optional.dayStat.sprintStreakMax) {
    stat.optional.dayStat.sprintStreakMax = stat.optional.dayStat.sprintStreakCurr;
  }
  stat.optional.dayStat.sprintTotal += 1;
  stat.optional.dayStat.sprintStreakCurr = 0;

  return stat;
};

export const addRightSprintStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.sprintStreakCurr += 1;
  stat.optional.dayStat.sprintTotal += 1;
  stat.optional.dayStat.sprintSuccess += 1;
  if (stat.optional.dayStat.sprintStreakCurr > stat.optional.dayStat.sprintStreakMax) {
    stat.optional.dayStat.sprintStreakMax = stat.optional.dayStat.sprintStreakCurr;
  }

  return stat;
};

export const addLearnedWordStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;
  stat.learnedWords += 1;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].totalLearnedWords = stat.learnedWords;
  } else {
    stat.optional.completeStat[today] = {
      newWords: 0,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.learnedWords += 1;
  return stat;
};

export const removeLearnedWordStat = (_stat: Statistics) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const stat = _stat;
  stat.learnedWords -= 1;
  if (stat.optional.completeStat[today]) {
    stat.optional.completeStat[today].totalLearnedWords = stat.learnedWords;
  } else {
    stat.optional.completeStat[today] = {
      newWords: 0,
      totalLearnedWords: stat.learnedWords,
    };
  }

  if (stat.optional.dayStat.today !== today) stat.optional.dayStat = createNewDayStat();
  stat.optional.dayStat.learnedWords -= 1;
  return stat;
};
