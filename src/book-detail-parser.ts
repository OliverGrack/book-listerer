import { s, sAll, trimSpacesAndNewLines } from './utils';

export async function parseBookDetails(): Promise<Record<string, string>> {
    const detailContainer = s(document, '[component="artikelbeschreibung-und-details"] .details-overlay')!;
    const detailsElements = sAll(detailContainer, '.artikeldetail');
    return Object.fromEntries(detailsElements.map(detailElement => {
        return [
            trimSpacesAndNewLines(s(detailElement, 'b')?.innerText ?? ''),
            trimSpacesAndNewLines(s(detailElement, ':nth-child(2)')?.innerText ?? ''),
        ];
    }));
}
