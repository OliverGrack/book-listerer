import { uniqueBy } from './utils';

const csvValueRegex = /"/g

function escapeCsvValue(value: string) {
    if (value.includes(",") || value.includes('"')) {
        return `"${value.replace(csvValueRegex, '\\"')}"`;
    } else {
        return value;
    }
}

function formatCsvRow(strings: string[]) {
    return strings.map(str => `${escapeCsvValue(str)}`).join(";");
}

export function recordsToCsv(records: Record<string, string>[]) {
    const keys = uniqueBy(records.flatMap(it => Object.keys(it)));

    const titleRow = formatCsvRow(keys);
    const recordRows = records.map(record => {
        return formatCsvRow(keys.map(key => record[key] ?? ''))
    });

    return [titleRow, ...recordRows].join('\n');
}
