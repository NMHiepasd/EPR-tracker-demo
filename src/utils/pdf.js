import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { SHEETS } from '../data/sheets';

function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

export function validateAllSheets(formData) {
    const errors = [];

    SHEETS.forEach(sheet => {
        sheet.sections.forEach(sec => {
            if (sec.rep) {
                const rows = formData?.[sheet.id]?.[sec.id]?.rows || [];
                rows.forEach((row, index) => {
                    (sec.rfields || []).forEach(field => {
                        if (field.req && isEmpty(row[field.id])) {
                            errors.push(`${sheet.id} - ${sec.lvi} - dòng ${index + 1}: thiếu ${field.lv}`);
                        }
                    });
                });
            } else {
                (sec.fields || []).forEach(field => {
                    if (field.req && isEmpty(formData?.[sheet.id]?.[sec.id]?.[field.id])) {
                        errors.push(`${sheet.id} - ${sec.lvi}: thiếu ${field.lv}`);
                    }
                });
            }
        });
    });

    return errors;
}

export async function generateCertificatePdf({ formData, lotInfo }) {
    const templateBytes = await fetch('/templates/certificate-template.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    const page1 = pages[0];

    page1.drawText(`LOT: ${lotInfo.lot}`, {
        x: 55,
        y: 700,
        size: 10,
        font,
        color: rgb(0, 0, 0),
    });

    page1.drawText(`Material: ${lotInfo.mat || ''}`, {
        x: 55,
        y: 685,
        size: 10,
        font,
        color: rgb(0, 0, 0),
    });

    page1.drawText(`Supplier: ${lotInfo.ncc || ''}`, {
        x: 55,
        y: 670,
        size: 10,
        font,
        color: rgb(0, 0, 0),
    });

    Object.entries(formData).forEach(([sheetId, sheetData], index) => {
        page1.drawText(`${sheetId}: completed`, {
            x: 55,
            y: 640 - index * 14,
            size: 8,
            font,
            color: rgb(0, 0, 0),
        });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}