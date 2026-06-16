import { useLang } from '../hooks/useLang';
import { evalComputed } from '../utils/compute';

export default function FieldControl({ field, value, onChange, values }) {
  const { lang } = useLang();
  const hint = lang === 'en' ? (field.hint_en || field.hint_vi || 'Upload photo') : (field.hint_vi || 'Chọn hoặc chụp ảnh');

  if (field.type === 'image_upload') {
    const imgs = Array.isArray(value) ? value : [];
    return (
      <div className="col-span-full">
        <label className="flex items-center gap-2.5 border border-dashed border-gray-300 rounded-lg p-2.5 cursor-pointer bg-gray-50 hover:border-epr-green hover:bg-epr-green-light transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <div>
            <div className="text-xs text-gray-700 font-medium">{field.lv} / {field.le}</div>
            <div className="text-[10px] text-gray-400">{hint}</div>
          </div>
          <input type="file" accept="image/*" multiple className="hidden"
            onChange={e => {
              const urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
              onChange([...imgs, ...urls]);
            }} />
        </label>
        {imgs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {imgs.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="w-14 h-14 object-cover rounded-md border border-gray-200" />
                <button onClick={() => onChange(imgs.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-white text-[9px] flex items-center justify-center p-0">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <select value={value || ''} onChange={e => onChange(e.target.value)}
        className="h-[34px] border border-gray-300 rounded-md px-2 bg-white text-gray-900 outline-none w-full cursor-pointer text-xs focus:border-epr-green">
        <option value="">{lang === 'en' ? '— Select —' : '— Chọn —'}</option>
        {(field.opts || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (field.type === 'computed') {
    const v = evalComputed(field.formula, values);
    return (
      <div className="flex items-center gap-1.5">
        <input readOnly value={v === '—' ? '' : v} placeholder="—"
          className="flex-1 h-[34px] border border-epr-green-border rounded-md px-2 bg-epr-green-light text-epr-green-dark font-mono font-semibold outline-none text-xs" />
        {field.unit && <span className="text-[10px] text-gray-400 whitespace-nowrap">{field.unit}</span>}
      </div>
    );
  }

  const t = field.type === 'number' ? 'number'
    : field.type === 'date' ? 'date'
    : field.type === 'time' ? 'time'
    : field.type === 'month' ? 'month' : 'text';

  return (
    <div className="flex items-center gap-1.5">
      <input
        type={t} value={value || ''} placeholder={field.ph || ''}
        onChange={e => onChange(e.target.value)}
        step={field.step} min={field.min} max={field.max}
        className={`flex-1 h-[34px] border border-gray-300 rounded-md px-2 bg-white text-gray-900 outline-none text-xs focus:border-epr-green ${t === 'number' ? 'font-mono' : ''}`}
      />
      {field.unit && <span className="text-[10px] text-gray-400 whitespace-nowrap">{field.unit}</span>}
    </div>
  );
}
