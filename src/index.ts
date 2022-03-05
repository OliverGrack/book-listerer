import { parseMainList } from './main-list-parser';
import { storageGet, storageSet } from './local-storage';
import { parseBookDetails } from './book-detail-parser';
import { visitNextBook } from './visit-next-book';
import { createButton, createResultDisplay } from './elements';
import { recordsToCsv } from './csv-formatter';
import { downloadTextFile } from './utils';


async function main() {
    const currentUrl = window.location.href;

    if (currentUrl.includes('/merkliste/')) {
        // -- MAIN LIST PAGE -- button to parse
        createButton('Export', async (ev) => {
            ev.preventDefault();
            const list = await parseMainList();
            const map = Object.fromEntries(list.map(it => [it.id, it]));
            storageSet('overviews', map);
            storageSet('notScannedIds', list.filter(it => it.link !== "").map(it => it.id));
            console.log(JSON.stringify(list));
            console.log(list);
            continueScan();
        });
    } else if (currentUrl.includes('/artikeldetails/')) {
        const urlSplit = currentUrl.split('/');
        const bookId = urlSplit[urlSplit.length - 1];
        console.log(bookId);

        const notScannedIds = new Set(storageGet('notScannedIds'));
        console.log(notScannedIds);
        if (notScannedIds && notScannedIds.has(bookId)) {
            console.log('Scanning book details');
            const bookDetails = await parseBookDetails();
            const allBookDetails = storageGet("details") ?? {};
            allBookDetails[bookId] = bookDetails;
            storageSet('details', allBookDetails);
            console.log(allBookDetails);
            notScannedIds.delete(bookId);
            storageSet('notScannedIds', Array.from(notScannedIds));

            continueScan();
        }
    } else if (currentUrl === "https://www.thalia.at/") {
        const notScannedIds = new Set(storageGet('notScannedIds'));
        if (notScannedIds) {
            // thalia redirected to start page, since the book is not available anymore.
            // Therefore, we skip this book and go on with the next one.
            const [_, ...notScannedIds] = storageGet('notScannedIds') ?? [''];
            storageSet('notScannedIds', notScannedIds);
            continueScan();
        }
    }
}

function continueScan() {
    const notScannedIds = storageGet('notScannedIds') ?? [];
    const allBookDetails = storageGet('details') ?? {};
    if (notScannedIds.length === 0) {
        const bookOverviews = storageGet('overviews') ?? {};
        const bookAllData = Object.entries(bookOverviews).map(([bookId, bookOverview]) => {
            return {
                ...bookOverview,
                ...(allBookDetails[bookId] ?? {}),
            }
        });
        console.log(JSON.stringify(bookAllData));
        console.log(bookAllData);
        createResultDisplay(JSON.stringify(bookAllData, null, 2));
        // createResultDisplay(recordsToCsv(bookAllData));
        const date = new Date().toISOString();
        createButton('Download as CSV', () => {
            downloadTextFile(`book-listerer-export-${date}.csv`, recordsToCsv(bookAllData));
        });
        createButton('Download as JSON', () => {
            downloadTextFile(`book-listerer-export-${date}.json`, JSON.stringify(bookAllData, null, 2));
        });
        storageSet('notScannedIds', undefined);
        storageSet('overviews', undefined);
        storageSet('details', undefined);
    } else {
        createResultDisplay(`${notScannedIds.length} books remaining`);
        visitNextBook();
    }
}

main().catch(e => {
    console.log(e);
});
