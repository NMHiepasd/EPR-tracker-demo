import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import LangToggle from './LangToggle';

export default function LotGate({ lots, user, onUnlock, onAdmin, onLogout }) {
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');
  const [shake, setShake] = useState(false);
  const { T } = useLang();
  const active = lots.filter(l => l.status === 'active');

  const tryUnlock = () => {
    const found = active.find(l => l.lot.trim() === input.trim());
    if (found) {
      onUnlock(found);
    } else {
      setErr(T('Số LOT không tồn tại hoặc đã bị vô hiệu hóa', 'LOT number does not exist or has been deactivated'));
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-[580px] flex items-center justify-center bg-gray-100 p-8 relative">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <LangToggle />
        {user.role === 'admin' && (
          <button onClick={onAdmin} className="btn text-[10px] px-2.5 py-1 bg-white/90">
            ⚙ {T('Quản lý LOT', 'Manage LOT')}
          </button>
        )}
        <button onClick={onLogout} className="btn text-[10px] px-2.5 py-1 bg-white/90">
          {T('Đăng xuất', 'Logout')}
        </button>
      </div>

      <div className="w-[400px] bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-[#0f172a] px-5 py-3.5 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-epr-green rounded flex items-center justify-center text-white text-[9px] font-extrabold">EPR</div>
          <div>
            <div className="text-xs font-bold text-slate-100">{T('Xin chào', 'Hello')}, {user.name}</div>
            <div className="text-[10px] text-slate-500 font-mono">{user.id} · {user.role === 'admin' ? T('Toàn quyền', 'Full Access') : `${user.role} access`}</div>
          </div>
        </div>

        <div className="px-5 py-5">
          <div className="text-center mb-4">
            <div className="text-2xl mb-1.5">🔐</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{T('Nhập số LOT để mở hồ sơ', 'Enter LOT number to access records')}</div>
            <div className="text-[11px] text-gray-500">{T('Mỗi lô hàng có số LOT riêng do admin cấp', 'Each batch has a unique LOT number issued by admin')}</div>
          </div>

          <div className={shake ? 'shake' : ''}>
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setErr(''); }}
              onKeyDown={e => e.key === 'Enter' && tryUnlock()}
              placeholder={T('VD: 5534 hoặc LOT-2026-001', 'E.g.: 5534 or LOT-2026-001')}
              autoFocus
              className="text-center font-mono text-sm h-11 tracking-wider mb-1.5"
              style={{ borderColor: err ? '#ef4444' : input ? '#10b981' : '' }}
            />
            {err && <div className="text-[11px] text-red-500 text-center mb-2">{err}</div>}
          </div>

          <button onClick={tryUnlock} className="btn btn-green w-full h-10 text-xs rounded-lg mb-4">
            {T('Xác nhận LOT', 'Confirm LOT')} →
          </button>

          <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-[9px] text-gray-400 mb-1.5 font-bold uppercase tracking-wider">
              {T('LOT đang active', 'Active LOTs')}
            </div>
            <div className="flex flex-wrap gap-1">
              {active.map(l => (
                <button key={l.lot} onClick={() => { setInput(l.lot); setErr(''); }}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-gray-300 bg-white text-gray-600 font-mono cursor-pointer hover:border-epr-green hover:text-epr-green transition-colors">
                  {l.lot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
