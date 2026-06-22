export const USERS = [
  { id: 'admin',       pass: 'Amin@2025', role: 'admin', name: 'Administrator',     color: '#7C3AED' },
  { id: 'ma_user',    pass: 'MA@2025',   role: 'MA',    name: 'Master Aggregator',  color: '#1D4ED8' },
  { id: 'recycler01', pass: 'Rec@2025',  role: 'REC',   name: 'Recycler — MAC',     color: '#0F766E' },
];

export const MATERIAL_LEVELS = [
  'LEVEL 1 — Physical Form / Dạng vật lý',
  'LEVEL 2 — Polymer Type / Chủng loại nhựa',
  'LEVEL 3A — Form / Hình thức',
  'LEVEL 3B — Color / Màu sắc',
  'LEVEL 3C — Condition / Tình trạng',
];

export const MATERIAL_BY_LEVEL = {
  'LEVEL 1 — Physical Form / Dạng vật lý': [
    'R — Rigid / Nhựa cứng',
    'F — Flexible / Nhựa mềm',
    'M — Mixed / Hỗn hợp',
  ],

  'LEVEL 2 — Polymer Type / Chủng loại nhựa': [
    'PET — Polyethylene Terephthalate / Chai, hộp nhựa trong cứng',
    'HDPE — High-Density Polyethylene / Can, thùng nhựa cứng mật độ cao',
    'LDPE — Low-Density Polyethylene / Nhựa mềm, PE film',
    'PP — Polypropylene / Nhựa PP, hộp, cốc, ống',
    'PS — Polystyrene / Xốp, nhựa PS',
    'PVC — Polyvinyl Chloride / Nhựa PVC, ống',
    'MIX — Mixed Polymers / Hỗn hợp nhiều loại nhựa',
  ],

  'LEVEL 3A — Form / Hình thức': [
    'B — Baled / Đóng kiện',
    'L — Loose / Hàng rời',
    'BG — Bag / Đóng bao',
    'C — Crushed / Băm / xay',
  ],

  'LEVEL 3B — Color / Màu sắc': [
    'BL — Blue / Xanh',
    'CL — Clear / Trong suốt',
    'MX — Mixed / Hỗn hợp màu',
  ],

  'LEVEL 3C — Condition / Tình trạng': [
    'D — Dirty / Nhựa bẩn',
    'W — Washed / Đã qua rửa sơ bộ',
    'C — Clean / Nhựa sạch',
  ],
};

export const ROLE_ACCESS = {
  admin: ['MA','LOT','REC','AI'],
  MA:    ['MA','LOT'],
  REC:   ['LOT','REC'],
};

export const GROUPS = [
  { key:'MA',  label:'MA',  vi:'Master Aggregator',       en:'Master Aggregator',       color:'#1D4ED8', bg:'#EFF6FF', border:'#BFDBFE' },
  { key:'LOT', label:'LOT', vi:'Tem phế liệu',            en:'Waste LOT Label',          color:'#7C3AED', bg:'#F5F3FF', border:'#DDD6FE' },
  { key:'REC', label:'REC', vi:'Recycler — Mộc An Châu',  en:'Recycler — Moc An Chau',  color:'#0F766E', bg:'#F0FDFA', border:'#99F6E4' },
  { key:'AI',  label:'AI',  vi:'Intermediary / Tổng hợp', en:'Authorized Intermediary',  color:'#B45309', bg:'#FFFBEB', border:'#FDE68A' },
];

export const GROUP_MAP = {
  MA:  { color:'#1D4ED8', bg:'#EFF6FF', border:'#BFDBFE' },
  LOT: { color:'#7C3AED', bg:'#F5F3FF', border:'#DDD6FE' },
  REC: { color:'#0F766E', bg:'#F0FDFA', border:'#99F6E4' },
  AI:  { color:'#B45309', bg:'#FFFBEB', border:'#FDE68A' },
};

export const MAT = ['PET','HDPE','PP','PE film','BOPP','Mixed'];

export const SEED_LOTS = [
  { lot:'5534',         ncc:'NCC-001', mcode:'PET-001',  mat:'PET',     wt:'12500', bales:48, date:'2026-06-01', status:'active' },
  { lot:'5535',         ncc:'NCC-002', mcode:'HDPE-001', mat:'HDPE',    wt:'8300',  bales:32, date:'2026-06-02', status:'active' },
  { lot:'5536',         ncc:'NCC-003', mcode:'PP-001',   mat:'PP',      wt:'5600',  bales:22, date:'2026-06-03', status:'active' },
  { lot:'LOT-2026-001', ncc:'NCC-001', mcode:'PET-002',  mat:'PET',     wt:'15000', bales:60, date:'2026-06-04', status:'active' },
  { lot:'LOT-2026-002', ncc:'NCC-004', mcode:'FILM-001', mat:'PE film', wt:'3200',  bales:15, date:'2026-06-05', status:'inactive' },
];

export const TRACE_DATA = {
  '5534': {
    sm: {
      in_kg:'12,500', bales:48, sorted:'12,125', pellet:'11,800',
      var_nl_pl:'375', loss_nl_pl:'3.0%', var_pl_th:'325', loss_pl_th:'2.7%',
      out_lot:'PLT-2026-011', supplier:'NCC Hoang Long', ncc:'NCC-001',
      mat:'PET', mcode:'PET-001', d_in:'2026-06-01', d_out:'2026-06-08', qc:'Pass / Đạt',
    },
    tl: [
      {
        id:'t1', step:1, icon:'🚛', color:'#10b981', group_owner:'MA',
        stage_vi:'Thu gom nguyên liệu', stage_en:'Waste Collection',
        status_vi:'Hoàn thành', status_en:'Completed', date:'2026-06-01',
        docs: [
          { no:'VW-2026-041', name_vi:'Phiếu cân xe nguyên liệu đầu vào', name_en:'Inbound Vehicle Weighing Slip', group:'MA',
            det:{ plate_no:'51A-23456', supplier:'NCC Hoang Long', gross:'13,250 Kg', tare:'750 Kg', net:'12,500 Kg', shift:'Ca 1 / Shift 1', weigher:'Nguyen Van A' } },
          { no:'IW-2026-088', name_vi:'Phiếu cân ký nguyên liệu đầu vào', name_en:'Inbound Waste Weighing Slip', group:'MA',
            det:{ seller:'Nguyen Thi B', phone:'0905-123-456', address:'45 Le Loi, Da Nang', total_weight:'12,480 Kg', material:'PET' } },
          { no:'WD-2026-041', name_vi:'Chi tiết xuất hàng (MA → REC)', name_en:'Waste Delivery Detail (MA → REC)', group:'MA',
            det:{ customer:'Moc An Chau (REC)', lot:'5534', material:'PET', shipped_qty:'12,500 Kg', po:'PO-2026-088' } },
          { no:'WI-2026-041', name_vi:'Phiếu xuất kho bán hàng (MA → REC)', name_en:'Warehouse Issue (MA → REC)', group:'MA',
            det:{ recipient:'Moc An Chau Recycler', invoice:'HD-2026-0412', po:'PO-2026-088', lot:'5534', warehouse:'Kho MA' } },
        ],
      },
      {
        id:'t2', step:2, icon:'📥', color:'#3b82f6', group_owner:'REC',
        stage_vi:'Nhập kho nguyên liệu (REC)', stage_en:'Raw Material Intake (REC)',
        status_vi:'Hoàn thành', status_en:'Completed', date:'2026-06-01',
        docs: [
          { no:'WS-2026-041', name_vi:'Phiếu cân xe (MAC nhận)', name_en:'Vehicle Weighing Slip (MAC intake)', group:'REC',
            det:{ plate_no:'51A-23456', supplier_code:'NCC-001', waste_type:'PET', lot:'5534', gross:'13,250 Kg', tare:'750 Kg', net:'12,500 Kg', qc:'Đạt / Pass' } },
          { no:'PWR-2026-031', name_vi:'Phiếu nhập kho mua hàng', name_en:'Purchase Warehouse Receipt', group:'REC',
            det:{ supplier:'NCC Hoang Long', supplier_code:'NCC-001', invoice:'HD-2026-0412', po:'PO-2026-088', warehouse:'Kho A — Tầng 1', actual_qty:'12,500 Kg' } },
          { no:'WRD-2026-031', name_vi:'Chi tiết nhập nguyên liệu', name_en:'Waste Receipt Detail', group:'REC',
            det:{ lot:'5534', material_code:'PET-001', received:'12,500 Kg', supplier_code:'NCC-001' } },
        ],
      },
      {
        id:'t3', step:3, icon:'🔍', color:'#8b5cf6', group_owner:'REC',
        stage_vi:'Phân loại', stage_en:'Sorting',
        status_vi:'Hoàn thành', status_en:'Completed', date:'2026-06-03',
        docs: [
          { no:'SS-2026-019', name_vi:'Báo cáo thống kê phân loại', name_en:'Sorting Statistics Report', group:'REC',
            det:{ lot:'5534', prod_order:'LSX-2026-019', material:'PET', total_bales:'48', input_kg:'12,500 Kg', impurities:'375 Kg', sorted:'12,125 Kg', sorted_code:'PET-S-001', date:'2026-06-03', shift:'Ca 2 / Shift 2', supervisor:'Tran Van C', workers:'12' } },
        ],
      },
      {
        id:'t4', step:4, icon:'⚙️', color:'#f59e0b', group_owner:'REC',
        stage_vi:'Bằm giặt', stage_en:'Washing & Shredding',
        status_vi:'Hoàn thành', status_en:'Completed', date:'2026-06-05',
        docs: [
          { no:'WS-2026-022', name_vi:'Báo cáo thống kê bằm giặt', name_en:'Washing & Shredding Statistics Report', group:'REC',
            det:{ lot:'5534', prod_order:'LSX-2026-022', date:'2026-06-05', shift:'Ca 1 / Shift 1', machine:'M-003 (PET Washing)', planned:'8.0 hr', actual:'7.5 hr', downtime:'0.5 hr', stop_reason:'Scheduled maintenance', supervisor:'Le Thi D' } },
        ],
      },
      {
        id:'t5', step:5, icon:'🔶', color:'#ef4444', group_owner:'REC',
        stage_vi:'Tạo hạt', stage_en:'Pelletizing',
        status_vi:'Hoàn thành', status_en:'Completed', date:'2026-06-08',
        docs: [
          { no:'PL-2026-011', name_vi:'Báo cáo thống kê tạo hạt', name_en:'Pelletizing Statistics Report', group:'REC',
            det:{ lot_input:'5534', lot_output:'PLT-2026-011', material:'PET', date:'2026-06-08', machine:'M-007', shift:'Ca 2 / Shift 2', operator:'Pham Van E', qc_staff:'Hoang Thi F', finished_code:'PET-GRAN-A', weight:'11,800 Kg' } },
          { no:'VCL-2026-006', name_vi:'Thư xác nhận sản lượng (MAC → EGL)', name_en:'Volume Confirmation Letter (MAC → EGL)', group:'REC',
            det:{ month:'6/2026', po:'PO-2026-120', packaging:'PET bottle', input:'12,500 Kg', method:'Mechanical recycling', recovery_rate:'94.4%', recovered:'11,800 Kg' } },
        ],
      },
    ],
  },
};
