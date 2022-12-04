import { BaseObject } from '../../models/base.interface';
import { StorageObject, StoragePageMap } from '../../models/storage-object.interface';

export const setStorageValues = (...params: string[][]): void => {
  Array.from(params).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const removeStorageValues = (...values: string[]) => {
  Array.from(values).forEach((value) => {
    localStorage.removeItem(value);
  });
};

const CURRENT_STORAGE_STATE: string = 'currentStorageState';
const PAGE_MAP_KEY: string = 'pageMapKey';

export const getAllStorage = () => {
  const storageState: string = localStorage.getItem(CURRENT_STORAGE_STATE);
  const objectStorage: StorageObject = JSON.parse(storageState);

  return objectStorage;
};

export const getStorageItem = (key: string) => getAllStorage()?.[key];

export const setStorageItem = (key: string, value: string | number | boolean | BaseObject) => {
  const object: StorageObject = { ...getAllStorage(), [key]: value };

  localStorage.setItem(CURRENT_STORAGE_STATE, JSON.stringify(object));
};

export const savePages = (groupNum: number, pageNum: number) => {
  const allStorageObject: StorageObject = getAllStorage();
  const object: BaseObject = {
    ...(allStorageObject[PAGE_MAP_KEY] as BaseObject),
    [groupNum]: pageNum,
  };

  setStorageItem(PAGE_MAP_KEY, object);
};

export const getGroupPage = (groupNum: number) => {
  const page: number = (getStorageItem(PAGE_MAP_KEY) as StoragePageMap)?.[groupNum] ?? 0;

  return page;
};
