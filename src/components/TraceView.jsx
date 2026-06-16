import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { GROUP_MAP, TRACE_DATA } from '../data/constants';

function DocItem({ doc, lang }) {
  const [open, setOpen] = useState(false);
  const gm = GROUP_MAP[doc.group] || { color: '#374151', bg: '#f3f4f6', border: '#e5e7eb' };
  const name = lang === 'en' ? (doc.name_en || doc.name_vi) : doc.name_vi;
  return (
    <div
      onClick={() => setOpen(o => !o)}
      className={`bg-white border rounded-lg p-2.5 cursor-pointer transition-all ${open ? 'border-epr-green bg-green-50' : 'border-gray-200 hover:border-epr-green'}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-mono text-[11px] text-blue-700 font-bold">{doc.no}</div>
          <div className="text-xs font-semibold text-gray-900 my-0.5">{name}</div>
          <span className="badge text-[9px]" style={{ background: gm.bg, color: gm.color, border: `1px solid ${gm.border}` }}>{doc.group}</span>
        </div>
        <span className="text-xs text-gray-400 transition-transform mt-0.5" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </div>
      {open && (
        <div className="mt-2 bg-green-50 border border-epr-green-border rounded-lg p-2.5" onClick={e => e.stopPropagation()}>
          <div className="text-[10px] font-bold text-epr-green-dark uppercase tracking-wider mb-1.5">
            {lang === 'en' ? 'Document Details' : 'Chi tiết phiếu'}
          </div>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
            {Object.entries(doc.det).map(([k, v]) => (
              <div key={k}>
                <div className="text-[9px] font-mono text-gray-400 uppercase">{k.replace(/_/g, ' ')}</div>
                <div className="text-[11px] font-medium text-gray-700 mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineStep({ step, lang }) {
  const [open, setOpen] = useState(false);
  const { T } = useLang();
  const gm = GROUP_MAP[step.group_owner] || GROUP_MAP.REC;
  const stageName = lang === 'en' ? step.stage_en : step.stage_vi;
  const statusName = lang === 'en' ? step.status_en : step.status_vi;
  const isOk = step.status_vi === 'Hoàn thành';

  return (
    <div className="relative mb-2.5">
      <div className="absolute -left-6 top-3 w-[13px] h-[13px] rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold text-white"
        style={{ background: step.color }}>
        {step.step}
      </div>
      <div className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-colors ${open ? 'border-epr-green' : 'border-gray-200'}`}
        onClick={() => setOpen(o => !o)}>
        <div className="p-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{step.icon}</span>
              <span className="text-sm font-bold text-gray-900">{T('Bước', 'Step')} {step.step}: {stageName}</span>
              <span className="badge text-[9px]" style={{ background: gm.bg, color: gm.color, border: `1px solid ${gm.border}` }}>
                {step.group_owner}
              </span>
            </div>
            <div className="text-[11px] text-gray-500 pl-6">{step.date} · {step.docs.length} {T('chứng từ', 'documents')}</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border"
              style={{ background: isOk ? '#ecfdf5' : '#fffbeb', color: isOk ? '#065f46' : '#92400e', borderColor: isOk ? '#a7f3d0' : '#fde68a' }}>
              {isOk ? '✓ ' : ''}{statusName}
            </span>
            <span className="text-sm text-gray-400 transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
          </div>
        </div>
        {open && (
          <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="grid gap-2 mt-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {step.docs.map(doc => <DocItem key={doc.no} doc={doc} lang={lang} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TraceView({ lotInfo }) {
  const { lang, T } = useLang();
  const id = lotInfo.lot;
  const tr = TRACE_DATA[id];

  const KpiCard = ({ icon, label, value, color }) => (
    <div className="tm-item">
      <div className="text-[9px] text-slate-400 uppercase tracking-wider font-mono">{icon} {label}</div>
      <div className="text-sm font-semibold text-slate-100 mt-1" style={color ? { color } : {}}>{value}</div>
    </div>
  );

  if (!tr) {
    return (
      <div>
        <div className="trace-hero">
          <div className="text-[11px] text-slate-400 font-mono mb-1 uppercase tracking-wider">🔍 {T('Truy xuất nguồn gốc', 'LOT Traceability')}</div>
          <div className="font-mono text-2xl font-extrabold text-epr-green tracking-wider">LOT: {id}</div>
          <div className="trace-meta">
            <KpiCard icon="🏷️" label={T('Loại NL', 'Material')} value={lotInfo.mat} />
            <KpiCard icon="🏢" label={T('Mã NCC', 'Supplier Code')} value={lotInfo.ncc} />
            <KpiCard icon="⚖️" label={T('Tổng KL', 'Total Weight')} value={`${Number(lotInfo.wt).toLocaleString()} Kg`} />
            <KpiCard icon="📦" label={T('Số kiện', 'Bales')} value={`${lotInfo.bales}`} />
          </div>
        </div>
        <div className="card">
          <div className="p-10 text-center">
            <div className="text-3xl mb-2.5">📋</div>
            <div className="text-sm font-semibold text-gray-700 mb-1.5">{T('Chưa có dữ liệu truy xuất', 'No traceability data yet')}</div>
            <div className="text-xs text-gray-500">
              LOT <strong>{id}</strong> {T('chưa có hồ sơ sản xuất nào được nhập.', 'has no production records entered.')}
              <br />{T('Dùng LOT', 'Use LOT')} <strong className="text-epr-green">5534</strong> {T('để xem demo đầy đủ.', 'to view a full demo.')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sm = tr.sm;
  return (
    <div>
      <div className="trace-hero">
        <div className="flex items-start justify-between flex-wrap gap-2.5">
          <div>
            <div className="text-[11px] text-slate-400 font-mono mb-1 uppercase tracking-wider">🔍 {T('Truy xuất nguồn gốc', 'LOT Traceability')}</div>
            <div className="font-mono text-2xl font-extrabold text-epr-green tracking-wider">LOT: {id}</div>
            <div className="text-xs text-slate-400 mt-1">{sm.mcode} · {sm.supplier} ({sm.ncc})</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold"
              style={{ background: 'rgba(16,185,129,.2)', color: '#10b981', border: '1px solid rgba(16,185,129,.4)' }}>
              {sm.qc}
            </span>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">{sm.d_in} → {sm.d_out}</div>
          </div>
        </div>

        {/* 8 KPI metrics */}
        <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
          <KpiCard icon="🚛" label={T('Thu gom NL / Raw Material Collection', 'Raw Material Collection')} value={`${sm.in_kg} Kg`} />
          <KpiCard icon="🔍" label={T('Phân loại / Sorting', 'Sorting')} value={`${sm.sorted} Kg`} />
          <KpiCard icon="⚠️" label={T('KL chênh lệch NL–PL', 'Raw–Sorting Variance')} value={`${sm.var_nl_pl} Kg`} color="#f59e0b" />
          <KpiCard icon="📉" label={T('Tỉ lệ hao hụt NL–PL', 'Raw–Sorting Loss Rate')} value={sm.loss_nl_pl} color="#f59e0b" />
          <KpiCard icon="🔶" label={T('Tạo hạt / Pelletizing', 'Pelletizing')} value={`${sm.pellet} Kg`} />
          <KpiCard icon="⚠️" label={T('KL chênh lệch PL–TH', 'Sorting–Pellet Variance')} value={`${sm.var_pl_th} Kg`} color="#ef4444" />
          <KpiCard icon="📉" label={T('Tỉ lệ hao hụt PL–TH', 'Sorting–Pellet Loss Rate')} value={sm.loss_pl_th} color="#ef4444" />
          <KpiCard icon="🏷️" label={T('LOT hạt output', 'Output Pellet LOT')} value={sm.out_lot} color="#10b981" />
        </div>
      </div>

      <div className="text-xs font-bold text-gray-700 mb-2.5 flex items-center gap-2">
        <span>{T('Pipeline thu gom & tái chế', 'Collection & Recycling Pipeline')}</span>
        <span className="text-[10px] text-gray-400 font-normal">— {T('bấm vào từng bước để mở chi tiết phiếu', 'click each step to expand document details')}</span>
      </div>

      <div className="flex gap-2.5 flex-wrap mb-3">
        <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold"
          style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>
          MA: {T('Thu gom', 'Collection')}
        </span>
        <span className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold"
          style={{ background: '#F0FDFA', color: '#0F766E', border: '1px solid #99F6E4' }}>
          REC: {T('Tái chế', 'Recycling')}
        </span>
      </div>

      <div className="relative pl-7">
        <div className="absolute left-2 top-0 bottom-0 w-0.5"
          style={{ background: 'linear-gradient(to bottom, #10b981, #3b82f6, #8b5cf6, #f59e0b, #ef4444)' }} />
        {tr.tl.map(step => <TimelineStep key={step.id} step={step} lang={lang} />)}
      </div>
    </div>
  );
}
