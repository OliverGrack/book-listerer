
export function s<T = HTMLElement>(parent: ParentNode, selector: string): T|undefined {
    return parent.querySelector(selector) as any as T|undefined;
}

export function sAll<T = HTMLElement>(parent: ParentNode, selector: string): T[] {
    return [...parent.querySelectorAll(selector)] as any as T[];
}

export function wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => {
        setTimeout(resolve, ms);
    })
}

export function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'instant' as any,
    });
}

export function trimSpacesAndNewLines(str: string) {
    return str.replace(/^\s+|\s+$/g, '');
}

export function uniqueBy<T>(array: readonly T[], getter: (item: T) => any = it => it): T[] {
    const seen = new Set();
    const arrayWithoutDuplicates: T[] = [];
    array.forEach(it => {
        const property = getter(it);
        if (!seen.has(property)) {
            seen.add(property);
            arrayWithoutDuplicates.push(it);
        }
    });
    return arrayWithoutDuplicates;
}

export function downloadTextFile(fileName: string, content: string) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(content);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
