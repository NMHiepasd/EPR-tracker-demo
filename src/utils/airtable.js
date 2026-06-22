import Airtable from 'airtable';
import {
    AIRTABLE_FIELD_MAP,
    AIRTABLE_PARENT_LINK_FIELD,
    AIRTABLE_REPEAT_FIELD_MAP,
    AIRTABLE_REPEAT_TABLE_MAP,
    AIRTABLE_TABLE_MAP,
} from './airtableMapping';

const base = new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_TOKEN,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

function isValueValid(value) {
    return value !== undefined && value !== null && value !== '';
}

function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}

function addField(fields, column, value) {
    if (isValueValid(value)) {
        fields[column] = value;
    }
}

function flattenSheetData(sheetId, sheetData) {
    const fieldMap = AIRTABLE_FIELD_MAP[sheetId] || {};
    const fields = {};

    Object.entries(fieldMap).forEach(([sectionId, sectionMap]) => {
        Object.entries(sectionMap).forEach(([fieldId, airtableColumn]) => {
            const value = sheetData?.[sectionId]?.[fieldId];
            addField(fields, airtableColumn, value);
        });
    });


    return fields;
}

function flattenRepeatRow(sheetId, row) {
    const repeatMap = AIRTABLE_REPEAT_FIELD_MAP[sheetId] || {};
    const sectionMap = repeatMap.ln || {};
    const fields = {};

    Object.entries(sectionMap).forEach(([fieldId, airtableColumn]) => {
        const value = row?.[fieldId];
        addField(fields, airtableColumn, value);
    });

    return fields;
}

export async function createAirtableRecord(tableName, fields) {
    const records = await base(tableName).create([{ fields }]);
    return records[0];
}

async function createAirtableRecords(tableName, rows) {
    if (!rows.length) return [];

    const records = await base(tableName).create(
        rows.map(fields => ({ fields }))
    );

    return records;
}

function getRepeatRows(sheetData) {
    return sheetData?.ln?.rows || [];
}

export async function saveSheetToAirtable(sheetId, sheetData) {
    const tableName = AIRTABLE_TABLE_MAP[sheetId];

    if (!tableName) {
        throw new Error(`Missing Airtable table mapping for ${sheetId}`);
    }

    const repeatRows = getRepeatRows(sheetData);
    const hasOnlyRepeatRows = ['S10', 'S11', 'S12', 's13'].includes(sheetId);

    if (hasOnlyRepeatRows) {
        const rows = repeatRows
            .map(row => flattenRepeatRow(sheetId, row))
            .filter(fields => Object.keys(fields).length > 0);

        return createAirtableRecords(tableName, rows);
    }

    const fields = flattenSheetData(sheetId, sheetData);
    const headerRecord = await createAirtableRecord(tableName, fields);

    const repeatTableName = AIRTABLE_REPEAT_TABLE_MAP[sheetId];

    if (repeatTableName && repeatRows.length > 0) {
        const parentFieldName = AIRTABLE_PARENT_LINK_FIELD[sheetId];

        const itemRows = repeatRows
            .map(row => {
                const rowFields = flattenRepeatRow(sheetId, row);

                if (parentFieldName) {
                    rowFields[parentFieldName] = [headerRecord.id];
                }

                return rowFields;
            })
            .filter(fields => Object.keys(fields).length > 0);

        await createAirtableRecords(repeatTableName, itemRows);
    }

    return headerRecord;
}