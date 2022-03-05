import { storageGet } from './local-storage';

export function visitNextBook() {
    const notScannedIds = storageGet('notScannedIds') ?? [];
    const nextId = notScannedIds[0];
    if (nextId) {
        window.location.href = 'https://www.thalia.at/shop/home/artikeldetails/' + nextId;
    }
}
