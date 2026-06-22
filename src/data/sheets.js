import { MAT, MATERIAL_LEVELS } from './constants';

export const SHEETS = [
  {
    id:'S01', group:'MA', lvi:'Phiếu cân xe nguyên liệu đầu vào', len:'Inbound Vehicle Weighing Slip', doc_prefix:'VW',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'VW-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
        { id:'shift', lv:'Ca làm việc', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
        { id:'weigher', lv:'Người cân', le:'Weigher', type:'text' },
      ]},
      { id:'vh', lvi:'Thông tin xe & nhà cung cấp', len:'Vehicle & Supplier Information', fields:[
        { id:'plate_no', lv:'Biển số xe', le:'Vehicle Plate No.', type:'text', req:true },
        { id:'supplier_name', lv:'Tên nhà cung cấp', le:'Supplier Name', type:'text', req:true },
        { id:'driver_name', lv:'Tên lái xe', le:'Driver Name', type:'text' },
        { id:'material_level', lv: 'Cấp nguyên liệu', le: 'Material Level', type: 'select', req: true, opts: MATERIAL_LEVELS,},
        { id:'material_type', lv:'Loại nguyên liệu', le:'Material Type', type:'select', req:true, dependsOn: 'material_level' },
      ]},
      { id:'wg', lvi:'Kết quả cân', len:'Weighing Results', fields:[
        { id: 'time_in', type: 'time', lv: 'Thời gian xe vào', le: 'Vehicle Check In Time'},
        { id:'gross_weight_kg', lv:'Gross weight — xe vào có hàng', le:'Gross Weight — Loaded Vehicle', type:'number', req:true, unit:'Kg' },
        { id:'time_out', type: 'time', lv: 'Thời gian xe ra ', le: 'Vehicle Check Out Time '},
        { id:'tare_weight_kg', lv:'Tare weight — xe ra không tải', le:'Tare Weight — Empty Vehicle', type:'number', req:true, unit:'Kg' },
        { id:'net_weight_kg', lv:'Net weight thực tế', le:'Actual Net Weight', type:'computed', formula:'gross_weight_kg - tare_weight_kg', unit:'Kg' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu cân xe', le:'Vehicle weighing slip photos', type:'image_upload', hint_vi:'Chụp phiếu cân, đồng hồ cân, biển số xe', hint_en:'Photo of weighing slip, scale display, vehicle plate' },
      ]},
    ],
  },
  {
    id:'S02', group:'MA', lvi:'Phiếu cân ký nguyên liệu đầu vào', len:'Inbound Waste Weighing Slip', doc_prefix:'IW',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'IW-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
      ]},
      { id:'sl', lvi:'Thông tin người bán', len:'Seller Information', fields:[
        { id:'seller_name', lv:'Họ và tên người bán', le:'Seller Full Name', type:'text', req:true },
        { id:'seller_phone', lv:'Số điện thoại', le:'Phone No.', type:'text' },
        { id:'seller_address', lv:'Địa chỉ', le:'Address', type:'text' },
      ]},
      { id:'ln', lvi:'Chi tiết cân', len:'Weighing Details', rep:true, rfields:[
        { id:'material_level', lv: 'Cấp nguyên liệu', le: 'Material Level', type: 'select', req: true, opts: MATERIAL_LEVELS,},
        { id:'material_type', lv:'Loại nguyên liệu', le:'Material Type', type:'select', req:true, dependsOn: 'material_level' },
        { id:'weighing_time', lv:'Thời gian cân', le:'Weighing Time', type:'time', req:true },
        { id:'weight_kg', lv:'Khối lượng', le:'Weight', type:'number', req:true, unit:'Kg' },
        { id:'notes', lv:'Ghi chú', le:'Notes', type:'text' },
      ], sfields:[{ id:'tot', lv:'Tổng khối lượng', le:'Total Weight', formula:'SUM(weight_kg)', unit:'Kg' }]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu cân ký', le:'Waste weighing slip photos', type:'image_upload', hint_vi:'Chụp phiếu cân ký, ảnh người bán và hàng', hint_en:'Photo of weighing slip, seller and goods' },
      ]},
    ],
  },
  {
    id:'S03', group:'MA', lvi:'Phiếu cân xuất hàng', len:'Outbound Waste Weighing Slip', doc_prefix:'OW',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'OW-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
      ]},
      { id:'vc', lvi:'Thông tin xe & khách hàng', len:'Vehicle & Customer Information', fields:[
        { id:'plate_no', lv:'Biển số xe', le:'Vehicle Plate No.', type:'text', req:true },
        { id:'po_no', lv:'Theo đơn hàng số (PO No.)', le:'PO No.', type:'text', req:true },
        { id:'customer_name', lv:'Khách hàng', le:'Customer', type:'text', req:true },
        { id:'material_level', lv: 'Cấp nguyên liệu', le: 'Material Level', type: 'select', req: true, opts: MATERIAL_LEVELS,},
        { id:'material_type', lv:'Loại nguyên liệu', le:'Material Type', type:'select', req:true, dependsOn: 'material_level' },
      ]},
      { id:'wg', lvi:'Kết quả cân', len:'Weighing Results', fields:[
        { id:'tare_weight_kg', lv:'Tare weight — xe vào không tải', le:'Tare Weight — Empty Vehicle', type:'number', req:true, unit:'Kg' },
        { id:'gross_weight_kg', lv:'Gross weight — xe ra có hàng', le:'Gross Weight — Loaded Vehicle', type:'number', req:true, unit:'Kg' },
        { id:'net_weight_kg', lv:'Net outbound weight thực tế', le:'Actual Net Outbound Weight', type:'computed', formula:'gross_weight_kg - tare_weight_kg', unit:'Kg' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu cân xuất hàng', le:'Outbound weighing slip photos', type:'image_upload', hint_vi:'Chụp phiếu cân, biển số xe', hint_en:'Photo of weighing slip, vehicle plate' },
      ]},
    ],
  },
  {
    id:'S04', group:'MA', lvi:'Phiếu xuất kho bán hàng', len:'Warehouse Issue', doc_prefix:'WI',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'WI-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
      ]},
      { id:'tx', lvi:'Thông tin giao dịch', len:'Transaction Information', fields:[
        { id:'recipient_name', lv:'Họ và tên người nhận', le:'Recipient Name', type:'text', req:true },
        { id:'recycler_name', lv:'Tên đơn vị tái chế', le:'Recycler Name', type:'text', req:true },
        { id:'invoice_no', lv:'Số hóa đơn', le:'Invoice No.', type:'text' },
        { id:'po_no', lv:'Theo đơn hàng số (PO No.)', le:'PO No.', type:'text', req:true },
        { id:'warehouse', lv:'Xuất tại kho', le:'Warehouse', type:'text' },
      ]},
      { id:'dl', lvi:'Thông tin giao nhận', len:'Delivery Information', fields:[
        { id:'contract_no', lv:'Số hợp đồng', le:'Contract No.', type:'text' },
        { id:'delivery_person', lv:'Người giao hàng', le:'Delivery Person', type:'text' },
        { id:'phone', lv:'Số điện thoại', le:'Phone', type:'text' },
        { id:'address', lv:'Địa chỉ', le:'Address', type:'text' },
        { id:'remarks', lv:'Ghi chú', le:'Remarks', type:'text' },
      ]},
      { id:'ln', lvi:'Chi tiết hàng xuất', len:'Issue Line Items', rep:true, rfields:[
        { id:'material_code', lv:'Mã số', le:'Material Code', type:'text', req:true },
        { id:'goods_desc', lv:'Tên hàng hóa', le:'Goods Description', type:'text', req:true },
        { id:'lot_no', lv:'Số lot', le:'Lot No.', type:'text', req:true, lotkey:true },
        { id:'unit', lv:'ĐVT', le:'Unit', type:'text', req:true },
        { id:'doc_qty', lv:'SL theo chứng từ', le:'Doc. Qty', type:'number', req:true, unit:'Kg' },
        { id:'actual_qty', lv:'SL thực xuất', le:'Actual Qty', type:'number', req:true, unit:'Kg' },
        { id:'unit_price', lv:'Đơn giá', le:'Unit Price', type:'number' },
        { id:'amount', lv:'Thành tiền', le:'Amount', type:'computed', formula:'actual_qty * unit_price' },
      ], sfields:[{ id:'tot', lv:'Cộng / Total', le:'Total', formula:'SUM(amount)' }]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu xuất kho', le:'Warehouse issue photos', type:'image_upload', hint_vi:'Chụp phiếu xuất kho, hóa đơn', hint_en:'Photo of warehouse issue slip and invoice' },
      ]},
    ],
  },
  {
    id:'S05', group:'MA', lvi:'Chi tiết xuất hàng', len:'Waste Delivery Detail', doc_prefix:'WD',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'doc_no', lv:'Số / No.', le:'No.', type:'text', req:true, ph:'WD-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
        { id:'customer', lv:'Khách hàng', le:'Customer', type:'text', req:true },
        { id:'prepared_by', lv:'Người lập phiếu', le:'Prepared By', type:'text' },
      ]},
      { id:'ln', lvi:'Chi tiết hàng giao', len:'Delivery Line Items', rep:true, rfields:[
        { id:'lot_no', lv:'Số Lot', le:'Lot No.', type:'text', req:true, lotkey:true },
        { id:'warehouse_issue_no', lv:'Phiếu XK — Số', le:'Warehouse Issue No.', type:'text', req:true },
        { id:'issue_date', lv:'Ngày xuất', le:'Issue Date', type:'date', req:true },
        { id:'po_no', lv:'Số PO', le:'PO No.', type:'text', req:true },
        { id:'material_code', lv:'Mã NL', le:'Material Code', type:'text', req:true },
        { id:'shipped_qty_kg', lv:'SL xuất', le:'Shipped Qty', type:'number', req:true, unit:'Kg' },
        { id:'invoice_no', lv:'Số HD', le:'Inv. No.', type:'text' },
      ], sfields:[{ id:'tot', lv:'Tổng cộng', le:'Total', formula:'SUM(shipped_qty_kg)', unit:'Kg' }]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh chứng từ xuất hàng', le:'Delivery document photos', type:'image_upload', hint_vi:'Chụp phiếu giao hàng', hint_en:'Photo of delivery slip' },
      ]},
    ],
  },
  {
    id:'S06', group:'LOT', lvi:'Tem phế liệu', len:'Waste LOT Label', doc_prefix:'LOT',
    sections:[
      { id:'li', lvi:'Thông tin LOT', len:'LOT Information', fields:[
        { id:'supplier_code', lv:'Mã NCC', le:'Supplier Code', type:'text', req:true },
        { id:'lot_no', lv:'Số LOT', le:'LOT No.', type:'text', req:true, lotkey:true, ph:'LOT-2026-001' },
        { id:'material_level', lv:'Level nguyên liệu', le:'Material Level', type:'select', req:true, opts:MATERIAL_LEVELS },
        { id:'material_code', lv:'Mã loại hàng', le:'Material Code', type:'select', req:true, dependsOn:'material_level' },
        { id:'bales_per_lot', lv:'Số kiện phế liệu trên LOT', le:'Bales per LOT', type:'number', req:true, unit:'kiện/bales' },
        { id:'total_weight_kg', lv:'Tổng trọng lượng LOT', le:'Total LOT Weight', type:'number', req:true, unit:'Kg' },
        { id:'date_received', lv:'Ngày nhập kho', le:'Date Received', type:'date', req:true },
        { id:'qc_result', lv:'Kết quả kiểm tra', le:'QC Result', type:'select', req:true, opts:['Đạt / Pass','Không đạt / Fail'] },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh tem LOT', le:'LOT label photos', type:'image_upload', hint_vi:'Chụp tem dán trực tiếp trên kiện hàng', hint_en:'Photo of LOT label attached on bales' },
      ]},
    ],
  },
  {
    id:'S07', group:'REC', lvi:'Phiếu cân xe', len:'Vehicle Weighing Slip — MAC', doc_prefix:'WS',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'WS-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
      ]},
      { id:'vc', lvi:'Thông tin xe & hàng hóa', len:'Vehicle & Cargo Information', fields:[
        { id:'plate_no', lv:'Biển số xe', le:'Vehicle Plate No.', type:'text', req:true },
        { id:'driver', lv:'Lái xe', le:'Driver', type:'text' },
        { id:'supplier_name', lv:'Nhà cung cấp', le:'Supplier', type:'text', req:true },
        { id:'supplier_code', lv:'Mã NCC', le:'Supplier Code', type:'text', req:true },
        { id:'waste_type', lv:'Loại phế liệu', le:'Waste Type', type:'select', req:true, opts:MAT },
        { id:'lot_no', lv:'Số LOT', le:'LOT No.', type:'text', req:true, lotkey:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
      ]},
      { id:'wg', lvi:'Kết quả cân', len:'Weighing Results', fields:[
        { id:'gross_weight_kg', lv:'Gross weight — xe vào có hàng', le:'Gross Weight — Loaded', type:'number', req:true, unit:'Kg' },
        { id:'tare_weight_kg', lv:'Tare weight — xe ra không hàng', le:'Tare Weight — Empty', type:'number', req:true, unit:'Kg' },
        { id:'net_weight_kg', lv:'Actual cargo weight', le:'Actual Cargo Weight', type:'computed', formula:'gross_weight_kg - tare_weight_kg', unit:'Kg' },
        { id:'qc_result', lv:'Kết quả', le:'Result', type:'select', req:true, opts:['Đạt / Pass','Không đạt / Fail'] },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu cân xe', le:'Vehicle weighing slip photos', type:'image_upload', hint_vi:'Chụp đồng hồ cân, biển số xe', hint_en:'Photo of scale display and vehicle plate' },
      ]},
    ],
  },
  {
    id:'S08', group:'REC', lvi:'Phiếu nhập kho mua hàng', len:'Purchase Warehouse Receipt', doc_prefix:'PWR',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'ticket_no', lv:'Số phiếu', le:'Ticket No.', type:'text', req:true, ph:'PWR-2026-001' },
        { id:'date', lv:'Ngày', le:'Date', type:'date', req:true },
      ]},
      { id:'sp', lvi:'Thông tin nhà cung cấp', len:'Supplier Information', fields:[
        { id:'supplier_name', lv:'Tên nhà cung cấp', le:'Supplier Name', type:'text', req:true },
        { id:'supplier_code', lv:'Mã NCC', le:'Supplier Code', type:'text', req:true },
        { id:'invoice_no', lv:'Số hóa đơn', le:'Invoice No.', type:'text' },
        { id:'po_no', lv:'Theo đơn hàng số (PO No.)', le:'PO No.', type:'text', req:true },
        { id:'warehouse', lv:'Nhập tại kho', le:'Warehouse', type:'text' },
      ]},
      { id:'dl', lvi:'Thông tin giao nhận', len:'Delivery Information', fields:[
        { id:'contract_no', lv:'Số hợp đồng', le:'Contract No.', type:'text' },
        { id:'delivery_person', lv:'Người giao hàng', le:'Delivery Person', type:'text' },
        { id:'phone', lv:'Số điện thoại', le:'Phone', type:'text' },
        { id:'address', lv:'Địa chỉ', le:'Address', type:'text' },
        { id:'remarks', lv:'Ghi chú', le:'Remarks', type:'text' },
      ]},
      { id:'ln', lvi:'Chi tiết nhập kho', len:'Receipt Line Items', rep:true, rfields:[
        { id:'material_code', lv:'Mã hàng', le:'Material Code', type:'text', req:true },
        { id:'lot_no', lv:'Số lot', le:'Lot No.', type:'text', req:true, lotkey:true },
        { id:'doc_qty', lv:'SL theo chứng từ', le:'Doc. Qty', type:'number', req:true, unit:'Kg' },
        { id:'actual_qty', lv:'SL thực nhập', le:'Actual Qty', type:'number', req:true, unit:'Kg' },
        { id:'unit_price', lv:'Đơn giá', le:'Unit Price', type:'number' },
        { id:'amount', lv:'Thành tiền', le:'Amount', type:'computed', formula:'actual_qty * unit_price' },
      ], sfields:[{ id:'tot', lv:'Cộng / Total', le:'Total', formula:'SUM(amount)' }]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh phiếu nhập kho', le:'Receipt photos', type:'image_upload', hint_vi:'Chụp phiếu nhập kho, hóa đơn', hint_en:'Photo of warehouse receipt and invoice' },
      ]},
    ],
  },
  {
    id:'S09', group:'REC', lvi:'Chi tiết nhập nguyên liệu', len:'Waste Receipt Detail', doc_prefix:'WRD',
    sections:[
      { id:'hd', lvi:'Thông tin phiếu', len:'Ticket Information', fields:[
        { id:'doc_no', lv:'Số / No.', le:'No.', type:'text', req:true, ph:'WRD-2026-001' },
      ]},
      { id:'dl', lvi:'Thông tin giao nhận', len:'Delivery Information', fields:[
        { id:'contract_no', lv:'Số hợp đồng', le:'Contract No.', type:'text' },
        { id:'delivery_person', lv:'Người giao hàng', le:'Delivery Person', type:'text' },
        { id:'phone', lv:'Số điện thoại', le:'Phone', type:'text' },
        { id:'address', lv:'Địa chỉ', le:'Address', type:'text' },
        { id:'remarks', lv:'Ghi chú', le:'Remarks', type:'text' },
      ]},
      { id:'ln', lvi:'Chi tiết nhập nguyên liệu', len:'Receipt Line Items', rep:true, rfields:[
        { id:'lot_no', lv:'Số Lot_NL', le:'Lot No. (Material)', type:'text', req:true, lotkey:true },
        { id:'receipt_no', lv:'Phiếu NK — Số', le:'Receipt No.', type:'text', req:true },
        { id:'receipt_date', lv:'Ngày NK', le:'Receipt Date', type:'date', req:true },
        { id:'po_no', lv:'Số PO', le:'PO No.', type:'text', req:true },
        { id:'material_code', lv:'Mã NL', le:'Material Code', type:'text', req:true },
        { id:'received_qty_kg', lv:'SL nhập', le:'Received Qty', type:'number', req:true, unit:'Kg' },
        { id:'supplier_code', lv:'Mã NCC', le:'Supplier Code', type:'text', req:true },
      ], sfields:[{ id:'tot', lv:'Tổng cộng', le:'Total', formula:'SUM(received_qty_kg)', unit:'Kg' }]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh chứng từ nhập NL', le:'Receipt document photos', type:'image_upload', hint_vi:'Chụp chứng từ liên quan', hint_en:'Photo of related receipts and documents' },
      ]},
    ],
  },
  {
    id:'S10', group:'REC', lvi:'Báo cáo thống kê phân loại', len:'Sorting Statistics Report', doc_prefix:'SS',
    sections:[
      { id:'ln', lvi:'Chi tiết phân loại theo LOT', len:'Sorting Details by LOT', rep:true, rfields:[
        { id:'lot_no', lv:'Số LOT (NVL)', le:'LOT No. (Material)', type:'text', req:true, lotkey:true },
        { id:'prod_order_code', lv:'Mã lệnh SX', le:'Production Order Code', type:'text', req:true },
        { id:'material_level', lv:'Level nguyên liệu', le:'Material Level', type:'select', req:true, opts:MATERIAL_LEVELS },
        { id:'material_code', lv:'Mã NVL', le:'Material Code', type:'select', req:true, dependsOn:'material_level' },
        { id:'total_bales', lv:'Tổng số kiện', le:'Total Bales', type:'number', req:true, unit:'kiện/bales' },
        { id:'total_material_kg', lv:'Tổng KL SX', le:'Total Input Weight', type:'number', req:true, unit:'Kg' },
        { id:'impurities_kg', lv:'KL tạp chất', le:'Impurities Weight', type:'number', req:true, unit:'Kg' },
        { id:'sorted_weight_kg', lv:'KL sau phân loại', le:'Sorted Weight', type:'computed', formula:'total_material_kg - impurities_kg', unit:'Kg' },
        { id:'sorting_date', lv:'Ngày phân loại', le:'Sorting Date', type:'date', req:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
        { id:'supervisor_name', lv:'Người giám sát', le:'Supervisor', type:'text' },
        { id:'summary_doc', lv:'Tài liệu tổng hợp', le:'Summary Doc', type:'text' },
        { id:'labor_qty', lv:'Số lượng nhân công', le:'Quantity of Labors', type:'number' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh khu vực phân loại', le:'Sorting area photos', type:'image_upload', hint_vi:'Chụp khu vực phân loại', hint_en:'Photo of sorting area and output' },
      ]},
    ],
  },
  {
    id:'S11', group:'REC', lvi:'Báo cáo thống kê bằm giặt', len:'Washing & Shredding Statistics Report', doc_prefix:'WS',
    sections:[
      { id:'ln', lvi:'Chi tiết bằm giặt theo LOT', len:'Washing & Shredding Details by LOT', rep:true, rfields:[
        { id:'lot_no', lv:'Số LOT (NVL)', le:'LOT No. (Material)', type:'text', req:true, lotkey:true },
        { id:'prod_order_code', lv:'Mã lệnh SX', le:'Production Order Code', type:'text', req:true },
        { id:'washing_date', lv:'Ngày bằm giặt', le:'Washing Date', type:'date', req:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
        { id:'machine_code', lv:'Mã máy', le:'Machine Code', type:'text', req:true },
        { id:'planned_time_hr', lv:'TG kế hoạch', le:'Planned Time', type:'number', unit:'giờ/hr', step:0.5 },
        { id:'actual_time_hr', lv:'TG thực tế', le:'Actual Time', type:'number', unit:'giờ/hr', step:0.5 },
        { id:'downtime_hr', lv:'TG dừng máy', le:'Downtime', type:'number', unit:'giờ/hr', step:0.5 },
        { id:'stop_reason', lv:'Lý do dừng', le:'Reason for Stop', type:'text' },
        { id:'supervisor_name', lv:'Người giám sát', le:'Supervisor', type:'text' },
        { id:'summary_doc', lv:'Tài liệu tổng hợp', le:'Summary Doc', type:'text' },
        { id:'labor_qty', lv:'Số lượng nhân công', le:'Quantity of Labors', type:'number' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh máy bằm giặt', le:'Washing & shredding machine photos', type:'image_upload', hint_vi:'Chụp máy bằm giặt, output', hint_en:'Photo of washing machine and output' },
      ]},
    ],
  },
  {
    id:'S12', group:'REC', lvi:'Báo cáo thống kê tạo hạt', len:'Pelletizing Statistics Report', doc_prefix:'PL',
    sections:[
      { id:'ln', lvi:'Chi tiết tạo hạt theo LOT', len:'Pelletizing Details by LOT', rep:true, rfields:[
        { id:'lot_no_material', lv:'Số LOT (NVL) — input', le:'LOT No. (Material) — input', type:'text', req:true, lotkey:true },
        { id:'prod_order_code', lv:'Mã lệnh SX', le:'Production Order Code', type:'text', req:true },
        { id:'material_level', lv:'Level nguyên liệu', le:'Material Level', type:'select', req:true, opts:MATERIAL_LEVELS },
        { id:'material_code', lv:'Mã NVL', le:'Material Code', type:'select', req:true, dependsOn:'material_level' },
        { id:'manufacturing_date', lv:'Ngày sản xuất', le:'Manufacturing Date', type:'date', req:true },
        { id:'machine_code', lv:'Mã máy', le:'Machine Code', type:'text', req:true },
        { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:['Ca 1 / Shift 1','Ca 2 / Shift 2','Ca 3 / Shift 3'] },
        { id:'operator_name', lv:'NV vận hành', le:'Operator', type:'text' },
        { id:'finished_code', lv:'Mã hạt', le:'Finished Pellet Code', type:'text', req:true },
        { id:'lot_no_pellet', lv:'LOT hạt — output', le:'Pellet LOT No. — output', type:'text', req:true, lotkey:true, ph:'PLT-2026-001' },
        { id:'pelletizing_wt_kg', lv:'KL tạo hạt', le:'Pelletizing Weight', type:'number', req:true, unit:'Kg' },
        { id:'summary_doc', lv:'Tài liệu tổng hợp', le:'Summary Doc', type:'text' },
        { id:'labor_qty', lv:'Số lượng nhân công', le:'Quantity of Labors', type:'number' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh hạt nhựa thành phẩm', le:'Finished pellet photos', type:'image_upload', hint_vi:'Chụp hạt nhựa, máy tạo hạt', hint_en:'Photo of finished pellets and pelletizing machine' },
      ]},
    ],
  },
  {
    id:'S13', group:'REC', lvi:'Báo cáo thống kê sản xuất tấm nhựa', len:'Plastic Board Production Statistics Report', doc_prefix:'PB',
    sections:[
      { id:'ln', lvi:'Chi tiết sản xuất tấm nhựa', len:'Plastic Board Production Details', rep:true, rfields:[
          { id:'lot_no_material', lv:'Số LOT (NVL)', le:'LOT No. (Material)', type:'text', req:true, lotkey:true },
          { id:'summary_doc', lv:'Tài liệu tổng hợp', le:'Summary Doc', type:'text' },
          { id:'production_report_code', lv:'Số chứng từ báo cáo SX', le:'Production Report Code', type:'text' },
          { id:'prod_order_code', lv:'Mã lệnh SX', le:'Production Order Code', type:'text', req:true },
          { id:'material_level', lv:'Level nguyên liệu', le:'Material Level', type:'select', req:true, opts:MATERIAL_LEVELS },
          { id:'material_code', lv:'Mã NVL', le:'Material Code', type:'select', req:true, dependsOn:'material_level' },
          { id:'manufacturing_date', lv:'Ngày sản xuất', le:'Manufacturing Date', type:'date', req:true },
          { id:'press_machine_code', lv:'Mã máy ép', le:'Press Machine Code', type:'text', req:true },
          { id:'shift', lv:'Ca', le:'Shift', type:'select', req:true, opts:[
              'Ca 1 / Shift 1',
              'Ca 2 / Shift 2',
              'Ca 3 / Shift 3'
            ]},
          { id:'operator_code', lv:'Mã NV vận hành', le:'Operator Code', type:'text' },
          { id:'operator_name', lv:'Tên NV vận hành', le:'Operator Name', type:'text' },
          { id:'qc_staff_code', lv:'Mã NV QC', le:'QC Staff Code', type:'text' },
          { id:'qc_staff_name', lv:'Tên NV QC', le:'QC Staff Name', type:'text' },
          { id:'thickness_mm', lv:'Độ dày', le:'Thickness', type:'number', unit:'mm' },
          { id:'lot_no_board', lv:'LOT tấm nhựa', le:'Board LOT No.', type:'text', req:true, lotkey:true },
          { id:'unit', lv:'ĐVT', le:'Unit', type:'text', req:true },
          { id:'sheet_weight_kg', lv:'Khối lượng tấm nhựa', le:'Sheet Weight', type:'number', req:true, unit:'Kg' },
        ], sfields:[
          {
            id:'tot',
            lv:'Tổng cộng',
            le:'Total',
            formula:'SUM(sheet_weight_kg)',
            unit:'Kg'
          }
        ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
          {
            id:'images',
            lv:'Ảnh sản xuất tấm nhựa',
            le:'Plastic Board Production Photos',
            type:'image_upload'
          },
        ]},
    ],
  },
  {
    id:'S14', group:'REC', lvi:'Thư xác nhận sản lượng (MAC → EGL)', len:'Volume Confirmation Letter (MAC → EGL)', doc_prefix:'VCL',
    sections:[
      { id:'hd', lvi:'Thông tin kỳ báo cáo', len:'Reporting Period', fields:[
        { id:'month', lv:'Tháng', le:'Month', type:'number', req:true, min:1, max:12 },
        { id:'year', lv:'Năm', le:'Year', type:'number', req:true, min:2024, max:2030 },
        { id:'po_no', lv:'Theo PO số', le:'PO No.', type:'text', req:true },
        { id:'contract_no', lv:'Số hợp đồng', le:'Contract No.', type:'text', req:true },
      ]},
      { id:'ln', lvi:'Chi tiết từng loại bao bì', len:'Packaging Line Items', rep:true, rfields:[
        { id:'packaging_name', lv:'Tên bao bì', le:'Packaging Name', type:'select', req:true, opts:['PET bottle','HDPE bottle','PP container','PE film','BOPP film','Mixed plastics'] },
        { id:'unit', lv:'ĐVT', le:'Unit', type:'text', req:true },
        { id:'input_weight_kg', lv:'Bao bì đầu vào', le:'Input Packaging Weight', type:'number', req:true, unit:'Kg' },
        { id:'recycling_method', lv:'Giải pháp tái chế', le:'Recycling Method', type:'select', req:true, opts:['Mechanical recycling','Chemical recycling','Co-processing','Energy recovery'] },
        { id:'recovery_rate_pct', lv:'Tỷ lệ thu hồi', le:'Recovery Rate', type:'number', req:true, unit:'%', min:0, max:100, step:0.1 },
        { id:'recovered_weight_kg', lv:'KL thu hồi', le:'Recovered Weight', type:'computed', formula:'input_weight_kg * recovery_rate_pct / 100', unit:'Kg' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh thư xác nhận đã ký', le:'Signed confirmation letter photos', type:'image_upload', hint_vi:'Scan hoặc chụp bản ký tên và đóng dấu', hint_en:'Scan or photo of signed and stamped letter' },
      ]},
    ],
  },
  {
    id:'S15', group:'AI', lvi:'Thư xác nhận sản lượng AI', len:'AI Volume Confirmation Letternpm s', doc_prefix:'VCL',
    sections:[
      { id:'hd', lvi:'Thông tin kỳ báo cáo', len:'Reporting Period', fields:[
          { id:'month', lv:'Tháng', le:'Month', type:'number', req:true, min:1, max:12 },
          { id:'year', lv:'Năm', le:'Year', type:'number', req:true, min:2024, max:2030 },
          { id:'po_no', lv:'Theo PO số', le:'PO No.', type:'text', req:true },
          { id:'contract_no', lv:'Số hợp đồng', le:'Contract No.', type:'text', req:true },
        ]},
      { id:'ln', lvi:'Chi tiết từng loại bao bì', len:'Packaging Line Items', rep:true, rfields:[
          { id:'packaging_name', lv:'Tên bao bì', le:'Packaging Name', type:'select', req:true, opts:['PET bottle','HDPE bottle','PP container','PE film','BOPP film','Mixed plastics'] },
          { id:'unit', lv:'ĐVT', le:'Unit', type:'text', req:true },
          { id:'input_weight_kg', lv:'Bao bì đầu vào', le:'Input Packaging Weight', type:'number', req:true, unit:'Kg' },
          { id:'recycling_method', lv:'Giải pháp tái chế', le:'Recycling Method', type:'select', req:true, opts:['Mechanical recycling','Chemical recycling','Co-processing','Energy recovery'] },
          { id:'recovery_rate_pct', lv:'Tỷ lệ thu hồi', le:'Recovery Rate', type:'number', req:true, unit:'%', min:0, max:100, step:0.1 },
          { id:'recovered_weight_kg', lv:'KL thu hồi', le:'Recovered Weight', type:'computed', formula:'input_weight_kg * recovery_rate_pct / 100', unit:'Kg' },
        ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
          { id:'images', lv:'Ảnh thư xác nhận đã ký', le:'Signed confirmation letter photos', type:'image_upload', hint_vi:'Scan hoặc chụp bản ký tên và đóng dấu', hint_en:'Scan or photo of signed and stamped letter' },
        ]},
    ],
  },
  {
    id:'S16', group:'AI', lvi:'Báo cáo tổng hợp (Mass Balance)', len:'Summary Report — Mass Balance', doc_prefix:'SR',
    sections:[
      { id:'hd', lvi:'Thông tin báo cáo', len:'Report Information', fields:[
        { id:'doc_no', lv:'Số / No.', le:'No.', type:'text', req:true, ph:'SR-2026-06' },
        { id:'report_period', lv:'Kỳ báo cáo', le:'Report Period', type:'month', req:true },
        { id:'report_date', lv:'Ngày báo cáo', le:'Report Date', type:'date' },
        { id:'city', lv:'Địa điểm', le:'City', type:'text', ph:'TP. Hồ Chí Minh' },
      ]},
      { id:'mb', lvi:'Dữ liệu khối lượng', len:'Weight Data', fields:[
        { id:'raw_material_kg', lv:'Thu gom NL — Raw Material', le:'Raw Material Collection', type:'number', req:true, unit:'Kg' },
        { id:'sorting_kg', lv:'Phân loại — Sorting', le:'Sorting Output', type:'number', req:true, unit:'Kg' },
        { id:'pelletizing_kg', lv:'Tạo hạt — Pelletizing', le:'Pelletizing Output', type:'number', req:true, unit:'Kg' },
        { id:'inspector', lv:'Người kiểm tra', le:'Inspector', type:'text'},
        { id:'reporter', lv:'Người báo cáo', le:'Reporter', type:'text'},
      ]},
      { id:'cv', lvi:'Kết quả tính toán — tự động', len:'Computed Results — Auto', fields:[
        { id:'v1', lv:'KL chênh lệch NL–PL', le:'Raw–Sorting Variance', type:'computed', formula:'raw_material_kg - sorting_kg', unit:'Kg' },
        { id:'r1', lv:'Tỉ lệ hao hụt NL–PL', le:'Raw–Sorting Loss Rate', type:'computed', formula:'(raw_material_kg - sorting_kg) / raw_material_kg * 100', unit:'%' },
        { id:'v2', lv:'KL chênh lệch PL–TH', le:'Sorting–Pellet Variance', type:'computed', formula:'sorting_kg - pelletizing_kg', unit:'Kg' },
        { id:'r2', lv:'Tỉ lệ hao hụt PL–TH', le:'Sorting–Pellet Loss Rate', type:'computed', formula:'(sorting_kg - pelletizing_kg) / sorting_kg * 100', unit:'%' },
      ]},
      { id:'at', lvi:'Hình ảnh đính kèm', len:'Attachments', fields:[
        { id:'images', lv:'Ảnh báo cáo tổng hợp', le:'Summary report photos', type:'image_upload', hint_vi:'Scan hoặc chụp báo cáo tổng hợp', hint_en:'Scan or photo of summary report' },
      ]},
    ],
  },
];
