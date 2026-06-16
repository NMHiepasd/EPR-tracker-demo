import { useLang } from '../hooks/useLang';
import { evalComputed } from '../utils/compute';
import FieldControl from './FieldControl';

export default function RepeatSection({ section, data, onChange }) {
  const { T } = useLang();
  const rows = data?.rows || [{}];

  const addRow = () => onChange({ ...data, rows: [...rows, {}] });
  const delRow = (i) => onChange({ ...data, rows: rows.filter((_, j) => j !== i) });
  const updRow = (i, fid, val) => {
    const next = rows.map((r, j) => j === i ? { ...r, [fid]: val } : r);
    onChange({ ...data, rows: next });
  };

  const sumVals = {};
  (section.rfields || []).forEach(f => {
    if (f.type === 'number') sumVals[f.id] = rows.map(r => parseFloat(r[f.id] || 0) || 0);
  });

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 mb-2 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-mono text-gray-400 font-semibold">
              {T('Dòng', 'Row')} {i + 1}
            </span>
            {rows.length > 1 && (
              <button onClick={() => delRow(i)}
                className="text-[10px] px-1.5 py-0.5 border border-red-200 rounded text-red-500 bg-white cursor-pointer">
                {T('xóa', 'delete')}
              </button>
            )}
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            {(section.rfields || []).map(f => (
              <div key={f.id} className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  {f.lotkey && <span className="w-1.5 h-1.5 rounded-full bg-epr-green inline-block flex-shrink-0" />}
                  {f.lv} / <span className="text-gray-400 italic">{f.le}</span>
                  {f.req && <span className="text-red-500">*</span>}
                </label>
                <FieldControl field={f} value={row[f.id] || ''} onChange={v => updRow(i, f.id, v)} values={row} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={addRow}
        className="text-xs px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer mb-2.5 hover:border-epr-green hover:text-epr-green transition-colors">
        + {T('Thêm dòng', 'Add Row')}
      </button>

      {(section.sfields || []).map(sf => {
        const v = evalComputed(sf.formula, sumVals);
        return (
          <div key={sf.id} className="flex justify-between items-center px-3 py-2 bg-epr-green-light border border-epr-green-border rounded-lg">
            <span className="text-xs font-semibold text-epr-green-dark">{sf.lv} / {sf.le}</span>
            <span className="font-mono text-sm font-bold text-green-600">{v} {sf.unit || ''}</span>
          </div>
        );
      })}
    </div>
  );
}
