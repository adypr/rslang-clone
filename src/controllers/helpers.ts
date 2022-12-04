/**
 * Creates some element with a template and classes and appends it to the parent container
 * @param tag - tag of the element to create
 * @param templateElement - innerHTML of the element to create
 * @param container - parent of the element
 * @param classStyle - add a style (string) or multiple styles (string array)
 * @param isAfter - if true, the created element is added at the end of the container
 */
import { Words } from '../models/words.interface';

const renderElement = (
  tag: string,
  templateElement: string,
  container: HTMLElement,
  classStyle?: string | string[],
  isAfter?: boolean,
) => {
  const element: HTMLElement = document.createElement(tag) as HTMLElement;

  if (typeof classStyle === 'string') {
    element.classList.add(classStyle);
  }

  if (Array.isArray(classStyle)) {
    classStyle.filter(Boolean).forEach((style) => element.classList.add(style));
  }

  element.innerHTML = templateElement;

  if (isAfter) {
    container.after(element);
  } else {
    container.append(element);
  }
};

const getGroupNumber: () => number = () => {
  const query = new URLSearchParams(window.location.search);
  const numOfGroup: number | null = query.has('group') ? +query.get('group') : null;

  return numOfGroup;
};

const countGameResults: (rightWords: Words, wrongWords: Words) => string = (
  rightWords: Words,
  wrongWords: Words,
) => {
  const mark: number = (rightWords.length * 100) / (rightWords.length + wrongWords.length);

  switch (true) {
    case mark === 100:
      return 'Идеально!';
    case mark >= 80:
      return 'Отлично!';
    case mark >= 60:
      return 'Хорошо!';
    case mark >= 40:
      return 'Неплохо!';

    default:
      return 'Еще раз?';
  }
};

export const notLearnedMongoDBQuery = (page: number) => `{"$and":[{"$or":[{"userWord.difficulty":"new"}, {"userWord.difficulty":"hard"}, {"userWord":null}]},{"page":${page}}]}`;

export const mapAsync = <T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> => Promise.all(array.map(callbackfn));

export const filterAsync = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> => {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((value, index) => filterMap[index]);
};

export { renderElement, getGroupNumber, countGameResults };
