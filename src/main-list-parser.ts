import { s, sAll, scrollToBottom, wait } from './utils';

export interface BookOverview {
    id: string;
    name: string;
    author: string;
    price: string;
    link: string;
}

export async function parseMainList(): Promise<BookOverview[]> {
    sAll(document, 'footer, .zuletzt-angesehen-und-mehr').forEach(it => {
        it?.parentNode?.removeChild(it);
    });

    const loadMoreButton = s(document, 'button[interaction="eintraege-nachladen"]')!;
    const statusTextElement = s(document, 'p.ergebnisanzeige')!;

    let alreadyLoaded = 0;
    let total = Number.MAX_VALUE;
    while(alreadyLoaded < total) {
        const [alreadyLoadedStr, _, totalStr, ...__] = statusTextElement.innerText.split(' ');
        alreadyLoaded = parseInt(alreadyLoadedStr);
        total = parseInt(totalStr);
        console.log({alreadyLoaded, total});

        await wait(100);
        scrollToBottom();

        if (loadMoreButton.dataset.status === 'sichtbar') {
            loadMoreButton.click();
        }
    }


    const listItems = sAll(document, '.merkzettel-eintrag');
    return listItems.map(listItem => {
        const id = listItem.getAttribute('product-id')!.toString();
        const name = s(listItem, '.artikeldetails h2')?.innerText ?? '';
        const author = s(listItem, '.artikeldetails p:nth-child(2)')?.innerText ?? '';
        const link = s<HTMLLinkElement>(listItem, 'a')?.href ?? '';
        const price = s(listItem, '.preis')?.innerText?.split('€')[0] + '€';
        return {id, name, author, price, link};
    });
}
