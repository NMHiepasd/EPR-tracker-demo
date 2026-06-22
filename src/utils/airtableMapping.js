export const AIRTABLE_TABLE_MAP = {
    S01: 'S01',
    S02: 'S02',
    S03: 'S03',
    S04: 'S04',
    S05: 'S05',
    S06: 'LOTs',
    S07: 'S07',
    S08: 'S08',
    S09: 'S09',
    S10: 'S10',
    S11: 'S11',
    S12: 'S12',
    S13: 'S13',
    S14: 'S14',
    S15: 'S15',
    S16: 'S16',
};

export const AIRTABLE_REPEAT_TABLE_MAP = {
    S02: 'S02_Items',
    S04: 'S04_Items',
    S05: 'S05_Items',
    S08: 'S08_Items',
    S09: 'S09_Items',
    S14: 'S14_Items',
    S15: 'S15_Items',
};

export const AIRTABLE_PARENT_LINK_FIELD = {
    S02: 'S02 Record',
    S04: 'S04 Record',
    S05: 'S05 Record',
    S08: 'S08 Record',
    S09: 'S09 Record',
    S14: 'S14 Record',
    S15: 'S15 Record',
};

export const AIRTABLE_FIELD_MAP = {
    S01: {
        hd: { ticket_no: 'Ticket No', date: 'Date', shift: 'Shift', weigher: 'Weigher' },
        vh: { plate_no: 'Plate No', supplier_name: 'Supplier Name', driver_name: 'Driver Name', material_level: 'Material Level', material_type: 'Material Type' },
        wg: { time_in: 'Time in', time_out: 'Time out', gross_weight_kg: 'Gross Weight Kg', tare_weight_kg: 'Tare Weight Kg' },
    },

    S02: {
        hd: { ticket_no: 'Ticket No', date: 'Date', shift: 'Shift' },
        sl: { seller_name: 'Seller Name', seller_phone: 'Seller Phone', seller_address: 'Seller Address' },
    },

    S03: {
        hd: { ticket_no: 'Ticket No', date: 'Date', shift: 'Shift' },
        vc: { plate_no: 'Plate No', po_no: 'PO No', customer_name: 'Customer Name', material_level: 'Material Level', material_type: 'Material Type' },
        wg: { tare_weight_kg: 'Tare Weight Kg', gross_weight_kg: 'Gross Weight Kg' },
    },

    S04: {
        hd: { ticket_no: 'Ticket No', date: 'Date' },
        dl: {
            contract_no: 'Contract No',
            delivery_person: 'Delivery Person',
            phone: 'Phone',
            address: 'Address',
            remarks: 'Remarks',
        },
        tx: {
            recipient_name: 'Recipient Name',
            recycler_name: 'Recycler Name',
            invoice_no: 'Invoice No',
            po_no: 'PO No',
            warehouse: 'Warehouse',
        },
    },

    S05: {
        hd: { doc_no: 'Doc No', date: 'Date', customer: 'Customer', prepared_by: 'Prepared By' },
    },

    S06: {
        li: {
            lot_no: 'LOT No',
            supplier_code: 'Supplier Code',
            material_level: 'Material Level',
            material_code: 'Material Code',
            bales_per_lot: 'Bales Per Lot',
            total_weight_kg: 'Total Weight Kg',
            date_received: 'Date Received',
            qc_result: 'QC Result',
        },
    },

    S07: {
        hd: { ticket_no: 'Ticket No', date: 'Date' },
        vc: {
            plate_no: 'Plate No',
            driver: 'Driver',
            supplier_name: 'Supplier Name',
            supplier_code: 'Supplier Code',
            waste_type: 'Waste Type',
            lot_no: 'Lot No',
            shift: 'Shift',
        },
        wg: {
            gross_weight_kg: 'Gross Weight Kg',
            tare_weight_kg: 'Tare Weight Kg',
            qc_result: 'QC Result',
        },
    },

    S08: {
        hd: { ticket_no: 'Ticket No', date: 'Date' },
        dl: {
            contract_no: 'Contract No',
            delivery_person: 'Delivery Person',
            phone: 'Phone',
            address: 'Address',
            remarks: 'Remarks',
        },
        sp: {
            supplier_name: 'Supplier Name',
            supplier_code: 'Supplier Code',
            invoice_no: 'Invoice No',
            po_no: 'PO No',
            warehouse: 'Warehouse',
        },
    },

    S09: {
        hd: { doc_no: 'Doc No' },
        dl: {
            contract_no: 'Contract No',
            delivery_person: 'Delivery Person',
            phone: 'Phone',
            address: 'Address',
            remarks: 'Remarks',
        },
    },
    S14: {
        hd: {
            month: 'Month',
            year: 'Year',
            po_no: 'PO No',
            contract_no: 'Contract No',
        },
    },

    S15: {
        hd: {
            month: 'Month',
            year: 'Year',
            po_no: 'PO No',
            contract_no: 'Contract No',
        },
    },

    S16: {
        hd: {
            doc_no: 'Doc No',
            report_period: 'Report Period',
            report_date: 'Report Date',
            city: 'City',
            inspector: 'Inspector',
            reporter: 'Reporter',
        },

        mb: {
            raw_material_kg: 'Raw Material Kg',
            sorting_kg: 'Sorting Kg',
            pelletizing_kg: 'Pelletizing Kg',
        },
    },
};

export const AIRTABLE_REPEAT_FIELD_MAP = {
    S02: {
        ln: {
            material_level: 'Material Level',
            material_type: 'Material Type',
            weighing_time: 'Weighing Time',
            weight_kg: 'Weight Kg',
            notes: 'Notes',
        },
    },

    S04: {
        ln: {
            material_code: 'Material Code',
            goods_desc: 'Goods Description',
            lot_no: 'Lot No',
            unit: 'Unit',
            doc_qty: 'Doc Qty',
            actual_qty: 'Actual Qty',
            unit_price: 'Unit Price',
        },
    },

    S05: {
        ln: {
            lot_no: 'Lot No',
            warehouse_issue_no: 'Warehouse Issue No',
            issue_date: 'Issue Date',
            po_no: 'PO No',
            material_code: 'Material Code',
            shipped_qty_kg: 'Shipped Qty Kg',
            invoice_no: 'Invoice No',
        },
    },

    S08: {
        ln: {
            material_code: 'Material Code',
            lot_no: 'Lot No',
            doc_qty: 'Doc Qty',
            actual_qty: 'Actual Qty',
            unit_price: 'Unit Price',
        },
    },

    S09: {
        ln: {
            lot_no: 'Lot No',
            receipt_no: 'Receipt No',
            receipt_date: 'Receipt Date',
            po_no: 'PO No',
            material_code: 'Material Code',
            received_qty_kg: 'Received Qty Kg',
            supplier_code: 'Supplier Code',
        },
    },

    S10: {
        ln: {
            lot_no: 'LOT',
            prod_order_code: 'Production Order Code',
            material_level: 'Material Level',
            material_code: 'Material Code',
            total_bales: 'Total Bales',
            total_material_kg: 'Total Material Kg',
            impurities_kg: 'Impurities Kg',
            sorting_date: 'Sorting Date',
            shift: 'Shift',
            supervisor_name: 'Supervisor Name',
            summary_doc: 'Summary Doc',
            labor_qty: 'Quantity Of Labors',
        },
    },

    S11: {
        ln: {
            lot_no: 'LOT',
            prod_order_code: 'Production Order Code',
            washing_date: 'Washing Date',
            shift: 'Shift',
            machine_code: 'Machine Code',
            planned_time_hr: 'Planned Time Hr',
            actual_time_hr: 'Actual Time Hr',
            downtime_hr: 'Downtime Hr',
            stop_reason: 'Stop Reason',
            supervisor_name: 'Supervisor Name',
            summary_doc: 'Summary Doc',
            labor_qty: 'Quantity Of Labors',
        },
    },

    S12: {
        ln: {
            lot_no_material: 'Input LOT',
            prod_order_code: 'Production Order Code',
            material_level: 'Material Level',
            material_code: 'Material Code',
            manufacturing_date: 'Manufacturing Date',
            machine_code: 'Machine Code',
            shift: 'Shift',
            operator_name: 'Operator Name',
            finished_code: 'Finished Pellet Code',
            lot_no_pellet: 'Output LOT',
            pelletizing_wt_kg: 'Pelletizing Weight Kg',
            summary_doc: 'Summary Doc',
            labor_qty: 'Quantity Of Labors',
        },
    },

    S13: {
        ln: {
            lot_no_material: 'Material LOT',
            summary_doc: 'Summary Doc',
            production_report_code: 'Production Report Code',
            prod_order_code: 'Production Order Code',
            material_level: 'Material Level',
            material_code: 'Material Code',
            manufacturing_date: 'Manufacturing Date',
            press_machine_code: 'Press Machine Code',
            shift: 'Shift',
            operator_code: 'Operator Code',
            operator_name: 'Operator Name',
            qc_staff_code: 'QC Staff Code',
            qc_staff_name: 'QC Staff Name',
            thickness_mm: 'Thickness Mm',
            lot_no_board: 'Board LOT',
            unit: 'Unit',
            sheet_weight_kg: 'Sheet Weight Kg',
        },
    },

    S14: {
        ln: {
            packaging_name: 'Packaging Name',
            unit: 'Unit',
            input_weight_kg: 'Input Weight Kg',
            recycling_method: 'Recycling Method',
            recovery_rate_pct: 'Recovery Rate %',
        },
    },

    S15: {
        ln: {
            packaging_name: 'Packaging Name',
            unit: 'Unit',
            input_weight_kg: 'Input Weight Kg',
            recycling_method: 'Recycling Method',
            recovery_rate_pct: 'Recovery Rate %',
        },
    },

};