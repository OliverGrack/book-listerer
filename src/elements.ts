import { parseMainList } from './main-list-parser';
import { storageSet } from './local-storage';
import { visitNextBook } from './visit-next-book';
import { s } from './utils';

export function createResultDisplay(content: string) {
    const box = document.createElement('textarea');
    box.style.cssText = `
            position: fixed;
            inset: 5rem;
            padding: 1rem;
            border-radius: 1rem;
            border: 2px solid blue;
        `;
    box.value = content;
    document.body.appendChild(box);
}

export function getOrCreateButtonContainer() {
    const existing = s(document, '.export-button-container');
    if (existing) {
        return existing;
    }
    const container = document.createElement('div');
    container.classList.add('export-button-container');
    container.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
        `;
    document.body.appendChild(container);
    return container;
}

export function createButton(text: string, action: HTMLButtonElement['onclick']) {
    const container = getOrCreateButtonContainer();
    const button = document.createElement('button');
    button.style.cssText = `
            padding: 1rem;
            margin: 0.5rem;
            border-radius: 1rem;
            border: 2px solid blue;
        `;
    button.innerText = text;
    button.onclick = action;
    container.appendChild(button);
}
