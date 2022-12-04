import { BaseObject } from './base.interface';

export type StorageObject = (
  Partial<Record<string, string | number | boolean | BaseObject | StoragePageMap>>);

export type StoragePageMap = Partial<Record<number, number>>;
