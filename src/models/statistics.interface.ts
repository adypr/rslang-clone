export interface Settings {
  optional: {
    learnedPages: {
      [group: string] : number[],
    };
  }
}

export interface Statistics {
  learnedWords: number,
  optional: {
    dayStat: {
      today: number,
      newWords: number,
      learnedWords: number,
      audioNewWords: number,
      audioSuccess: number,
      audioTotal: number,
      audioStreakCurr: number,
      audioStreakMax: number,
      sprintNewWords: number,
      sprintSuccess: number,
      sprintTotal: number,
      sprintStreakCurr: number,
      sprintStreakMax: number,
    }
    completeStat: {
      [date: number]: {
        newWords: number,
        totalLearnedWords: number,
      }
    }
  }
}
