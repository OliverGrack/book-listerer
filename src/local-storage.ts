import { BookOverview } from './main-list-parser';

export type BookId = string;

interface LocalStorageContent {
    overviews: Record<BookId, BookOverview>;
    notScannedIds: string[];
    details: Record<BookId, Record<string, string>>;
}

export function storageGet<T extends keyof LocalStorageContent>(key: T): LocalStorageContent[T]|undefined {
    const text = localStorage.getItem(key);
    if (text) {
        return JSON.parse(text);
    } else {
        return undefined;
    }
}

export function storageSet<T extends keyof LocalStorageContent>(key: T, value: LocalStorageContent[T]|undefined) {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key);
    }
}
