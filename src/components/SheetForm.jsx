import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { GROUP_MAP } from '../data/constants';
import FieldControl from './FieldControl';
import RepeatSection from './RepeatSection';
import { saveSheetToAirtable } from '../utils/airtable';

export default function SheetForm({ sheet, lotInfo, data, onChangeData }) {
  const { T } = useLang();
  const setData = (updater) => {
    const next = typeof updater === 'function' ? updater(data) : updater;
    onChangeData(next);
  };
  const [saved, setSaved] = useState(false);
  const g = GROUP_MAP[sheet.group] || GROUP_MAP.REC;

  const updateField = (secId, fid, val) => {
    setData(d => ({
      ...d,
      [secId]: {
        ...(d[secId] || {}),
        [fid]: val
      }
    }));

    setSaved(false);
  };

  const updateSection = (secId, val) => {
    setData(d => ({
      ...d,
      [secId]: val
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await saveSheetToAirtable(sheet.id, data);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error(error);
      alert('Không lưu được dữ liệu lên Airtable. Kiểm tra console để xem lỗi.');
    }
  };

  const allValues = Object.values(data || {}).reduce((acc, sectionData) => {
    if (!sectionData?.rows) {
      return { ...acc, ...sectionData };
    }
    return acc;
  }, {});

  return (
    <div className="pb-5">
      {/* Sheet header */}
      <div className="bg-white border border-gray-200 rounded-xl mb-3" style={{ borderTop: `3px solid ${g.color}` }}>
        <div className="p-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm"
                style={{ background: g.bg, color: g.color, border: `1px solid ${g.border}` }}>
                {sheet.group}
              </span>
              <span className="text-[9px] font-mono text-gray-400">{sheet.id} · {sheet.doc_prefix}</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{sheet.lvi}</div>
            <div className="text-[11px] text-gray-500 italic mt-0.5">{sheet.len}</div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="lot-chip">LOT: {lotInfo.lot}</span>
              <span className="text-[10px] text-gray-500">{lotInfo.mat} · {lotInfo.ncc}</span>
            </div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button onClick={() => { setData({}); setSaved(false); }}
              className="btn text-[11px] px-2.5 py-1.5">
              {T('Xóa', 'Clear')}
            </button>
            <button onClick={handleSave}
              className="btn text-[11px] px-3 py-1.5 font-semibold transition-all"
              style={{ borderColor: g.color, color: saved ? '#fff' : g.color, background: saved ? g.color : '#fff' }}>
              {saved ? `✓ ${T('Đã lưu', 'Saved')}` : T('Lưu phiếu', 'Save Record')}
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sheet.sections.map(sec => {
        const secData = data[sec.id] || {};
        return (
          <div key={sec.id} className="card">
            <div className="card-head">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider flex-1">
                {sec.lvi} <span className="font-normal italic text-gray-400 text-[9px]">/ {sec.len}</span>
              </span>
              {sec.rep && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: g.bg, color: g.color, border: `1px solid ${g.border}` }}>
                  {T('lặp lại', 'repeatable')}
                </span>
              )}
            </div>
            <div className="p-3">
              {sec.rep ? (
                <RepeatSection
                  section={sec}
                  data={secData}
                  onChange={val => updateSection(sec.id, val)}
                />
              ) : (
                <div className="field-grid">
                  {(sec.fields || []).map(f => {
                    if (f.type === 'image_upload') {
                      return (
                        <div key={f.id} className="col-span-full">
                          <FieldControl field={f} value={secData[f.id]} onChange={v => updateField(sec.id, f.id, v)} values={allValues} />
                        </div>
                      );
                    }
                    return (
                      <div key={f.id} className="field">
                        <label>
                          {f.lotkey && <span className="lot-dot" />}
                          {f.lv} / <span className="italic text-gray-400 text-[9px]">{f.le}</span>
                          {f.req && <span className="req">*</span>}
                          {f.unit && <span className="text-gray-300 text-[9px]">({f.unit})</span>}
                        </label>
                        <FieldControl
                          field={f}
                          value={secData[f.id]}
                          onChange={v => updateField(sec.id, f.id, v)}
                          values={allValues}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
