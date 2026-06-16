import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { MAT } from '../data/constants';
import LangToggle from './LangToggle';

const EMPTY = { lot:'', ncc:'', mcode:'', mat:'PET', wt:'', bales:'', date: new Date().toISOString().slice(0,10), status:'active' };

export default function AdminPanel({ lots, onUpdate, onBack }) {
  const { T } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [editLot, setEditLot] = useState(null);
  const [err, setErr] = useState('');

  const validate = () => {
    if (!form.lot.trim()) return T('Vui lòng nhập số LOT', 'Please enter LOT No.');
    if (!form.ncc.trim()) return T('Vui lòng nhập Mã NCC', 'Please enter Supplier Code');
    if (!form.mcode.trim()) return T('Vui lòng nhập Mã loại NL', 'Please enter Material Code');
    if (!form.wt) return T('Vui lòng nhập tổng trọng lượng', 'Please enter total weight');
    if (!form.bales) return T('Vui lòng nhập số kiện', 'Please enter number of bales');
    return '';
  };

  const handleAdd = () => {
    const e = validate(); if (e) { setErr(e); return; }
    if (lots.find(l => l.lot === form.lot.trim())) { setErr(T('Số LOT đã tồn tại', 'LOT No. already exists')); return; }
    onUpdate([...lots, { ...form, lot: form.lot.trim() }]);
    setForm(EMPTY); setErr('');
  };

  const handleSave = () => {
    const e = validate(); if (e) { setErr(e); return; }
    onUpdate(lots.map(l => l.lot === editLot ? { ...form, lot: editLot } : l));
    setEditLot(null); setForm(EMPTY); setErr('');
  };

  const startEdit = (l) => { setEditLot(l.lot); setForm({ ...l }); setErr(''); };
  const cancelEdit = () => { setEditLot(null); setForm(EMPTY); setErr(''); };
  const toggle = (lot) => onUpdate(lots.map(l => l.lot === lot ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
  const remove = (lot) => { if (window.confirm(`${T('Xóa LOT', 'Delete LOT')} ${lot}?`)) onUpdate(lots.filter(l => l.lot !== lot)); };

  const F = ({ label, id, type, ph, req }) => (
    <div className="field">
      <label>{label}{req && <span className="req">*</span>}</label>
      <input id={id} type={type || 'text'} placeholder={ph}
        value={form[id] || ''}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))} />
    </div>
  );

  const active = lots.filter(l => l.status === 'active');
  const inactive = lots.filter(l => l.status !== 'active');

  return (
    <div className="bg-gray-100 min-h-[640px] p-4">
      <div className="max-w-[820px] mx-auto">
        <div className="flex items-center gap-2.5 mb-3.5">
          <button onClick={onBack} className="btn text-xs">← {T('Quay lại', 'Back')}</button>
          <LangToggle />
          <div>
            <div className="text-sm font-bold text-gray-900">{T('Quản lý LOT', 'LOT Management')}</div>
            <div className="text-[11px] text-gray-500">{T('Tạo, chỉnh sửa và quản lý số LOT hợp lệ', 'Create, edit and manage valid LOT numbers')}</div>
          </div>
        </div>

        {/* Form */}
        <div className="card mb-2.5">
          <div className="card-head justify-between">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
              {editLot ? `${T('Chỉnh sửa LOT:', 'Edit LOT:')} ${editLot}` : T('Thêm LOT mới', 'Add New LOT')}
            </span>
            {editLot && <button onClick={cancelEdit} className="btn btn-sm text-[10px]">{T('Hủy', 'Cancel')}</button>}
          </div>
          <div className="p-3">
            <div className="field-grid mb-2">
              <F label={T('Số LOT', 'LOT No.')} id="lot" ph="5537" req />
              <F label={T('Mã Nhà Cung Cấp', 'Supplier Code')} id="ncc" ph="NCC-001" req />
              <F label={T('Mã loại nguyên liệu', 'Material Code')} id="mcode" ph="PET-001" req />
              <div className="field">
                <label>{T('Loại nguyên liệu', 'Material Type')}</label>
                <select value={form.mat} onChange={e => setForm(f => ({ ...f, mat: e.target.value }))}>
                  {MAT.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <F label={T('Tổng trọng lượng (Kg)', 'Total Weight (Kg)')} id="wt" type="number" ph="12500" req />
              <F label={T('Số kiện phế liệu', 'No. of Bales')} id="bales" type="number" ph="48" req />
              <F label={T('Ngày vào số LOT', 'LOT Entry Date')} id="date" type="date" req />
            </div>
            {err && <div className="text-[11px] text-red-500 mb-2">{err}</div>}
            <button onClick={editLot ? handleSave : handleAdd} className="btn btn-green text-xs">
              {editLot ? `💾 ${T('Lưu chỉnh sửa', 'Save Changes')}` : `+ ${T('Thêm LOT', 'Add LOT')}`}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <div className="card-head justify-between">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
              {T('Danh sách LOT', 'LOT List')} ({lots.length})
            </span>
            <span className="text-[10px] text-gray-500">{active.length} active · {inactive.length} inactive</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50">
                  {[T('Số LOT','LOT No.'), T('Mã NCC','Supplier Code'), T('Mã loại NL','Material Code'),
                    T('Loại NL','Material'), T('Tổng KL (Kg)','Total Wt (Kg)'), T('Số kiện','Bales'),
                    T('Ngày vào LOT','LOT Entry Date'), T('Trạng thái','Status'), ''].map(h => (
                    <th key={h} className="px-2.5 py-2 text-[9px] font-mono text-gray-400 uppercase tracking-wider text-left border-b border-gray-100 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map(l => {
                  const ok = l.status === 'active';
                  return (
                    <tr key={l.lot} className={`border-b border-gray-50 ${editLot === l.lot ? 'bg-yellow-50' : 'bg-white'}`}>
                      <td className="px-2.5 py-2 font-mono font-bold text-[11px] whitespace-nowrap">{l.lot}</td>
                      <td className="px-2.5 py-2 font-mono text-[11px]">{l.ncc}</td>
                      <td className="px-2.5 py-2 font-mono text-[11px]">{l.mcode}</td>
                      <td className="px-2.5 py-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200 font-mono">{l.mat}</span>
                      </td>
                      <td className="px-2.5 py-2 font-mono text-[11px] text-right">{Number(l.wt).toLocaleString()}</td>
                      <td className="px-2.5 py-2 font-mono text-[11px] text-right">{l.bales}</td>
                      <td className="px-2.5 py-2 font-mono text-[10px] whitespace-nowrap">{l.date}</td>
                      <td className="px-2.5 py-2">
                        <button onClick={() => toggle(l.lot)}
                          className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold border cursor-pointer"
                          style={{ borderColor: ok ? '#a7f3d0' : '#fca5a5', background: ok ? '#ecfdf5' : '#fef2f2', color: ok ? '#065f46' : '#dc2626' }}>
                          {ok ? '● active' : '○ inactive'}
                        </button>
                      </td>
                      <td className="px-2.5 py-2 whitespace-nowrap">
                        <button onClick={() => startEdit(l)} className="btn btn-sm btn-blue mr-1">{T('sửa','edit')}</button>
                        <button onClick={() => remove(l.lot)} className="btn btn-sm btn-red">{T('xóa','del')}</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
