import { useLang } from '../hooks/useLang';
import { GROUPS, GROUP_MAP, ROLE_ACCESS } from '../data/constants';
import { SHEETS } from '../data/sheets';
import LangToggle from './LangToggle';

export default function Sidebar({ user, lot, activeId, onSelect, onChangeLot, onLogout, onAdminClick }) {
  const { lang, T } = useLang();
  const access = ROLE_ACCESS[user.role] || [];
  const visibleGroups = GROUPS.filter(g => access.includes(g.key));
  const visibleSheets = SHEETS.filter(s => access.includes(s.group));
  const sheetCount = visibleSheets.length;

  const sheetLabel = (s) => lang === 'en' ? (s.len || s.lvi) : s.lvi;
  const groupLabel = (g) => lang === 'en' ? (g.en || g.vi) : g.vi;

  return (
    <nav className="bg-[#1e293b] flex flex-col h-[640px] overflow-y-auto">
      {/* Logo + user */}
      <div className="p-2.5 border-b border-[#334155] flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-epr-green rounded flex items-center justify-center text-white text-[9px] font-extrabold flex-shrink-0">EPR</div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-slate-100">MAC · EPR Forms</div>
            <div className="text-[9px] text-slate-500 font-mono">{sheetCount} {T('sheets', 'sheets')}</div>
          </div>
          <div className="ml-auto"><LangToggle /></div>
        </div>

        {/* User info */}
        <div className="bg-[#0f172a] rounded-md px-2 py-1.5 border border-[#334155] mb-1.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: user.color }} />
            <span className="text-[11px] font-bold text-slate-100">{user.name}</span>
            <span className="text-[9px] font-mono px-1 py-px rounded bg-white/10 text-slate-400 ml-auto">{user.role}</span>
          </div>
          <div className="text-[9px] text-slate-500 font-mono">{user.id}</div>
        </div>

        {/* LOT session */}
        <div className="bg-[#0f172a] rounded-md px-2 py-1.5 border border-[#334155]">
          <div className="text-[8px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">
            {T('Phiên LOT / LOT Session', 'LOT Session')}
          </div>
          <div className="font-mono font-bold text-epr-green text-xs">LOT: {lot.lot}</div>
          <div className="text-[9px] text-slate-400">{lot.mat} · {lot.ncc}</div>
          <button onClick={onChangeLot}
            className="mt-1.5 text-[9px] px-1.5 py-0.5 w-full border border-[#334155] rounded bg-transparent text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
            {T('Đổi LOT', 'Change LOT')}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-1">
        {/* Traceability */}
        <div className="text-[9px] font-bold text-slate-500 px-3 pt-2 pb-0.5 uppercase tracking-widest">
          {T('Truy xuất / Traceability', 'Traceability')}
        </div>
        <button
          onClick={() => onSelect('TRACE')}
          className={`nav-sheet-btn ${activeId === 'TRACE' ? 'trace-active' : ''}`}>
          <span className="text-sm flex-shrink-0">🔍</span>
          <span className={`text-[11px] font-${activeId === 'TRACE' ? 'semibold' : 'normal'} leading-tight ${activeId === 'TRACE' ? 'text-yellow-300' : 'text-slate-400'}`}>
            {T('Truy xuất nguồn gốc LOT', 'LOT Traceability')}
          </span>
        </button>
        <div className="h-px bg-[#273548] mx-3 my-1" />

        {/* Groups */}
        {visibleGroups.map(g => {
          const sheets = visibleSheets.filter(s => s.group === g.key);
          const gm = GROUP_MAP[g.key];
          return (
            <div key={g.key}>
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <span className="badge text-[9px]" style={{ background: gm.bg, color: gm.color, border: `1px solid ${gm.border}` }}>
                  {g.label}
                </span>
                <span className="text-[10px] text-slate-400 truncate">{groupLabel(g)}</span>
              </div>
              {sheets.map(s => {
                const active = s.id === activeId;
                return (
                  <button key={s.id} onClick={() => onSelect(s.id)}
                    className={`nav-sheet-btn ${active ? 'active' : ''}`}>
                    <span className={`text-[9px] font-mono flex-shrink-0 ${active ? 'text-epr-green' : 'text-slate-600'}`}>{s.id}</span>
                    <span className={`text-[11px] leading-tight ${active ? 'text-emerald-100 font-semibold' : 'text-slate-400'}`}>
                      {sheetLabel(s)}
                    </span>
                  </button>
                );
              })}
              <div className="h-px bg-[#273548] mx-3 my-1" />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-[#334155] flex-shrink-0">
        {user.role === 'admin' && (
          <button onClick={onAdminClick}
            className="btn text-[9px] py-1 px-2.5 w-full text-left bg-transparent border-[#334155] text-slate-500 mb-1 hover:text-slate-300 transition-colors">
            ⚙ {T('Quản lý LOT (Admin)', 'LOT Management (Admin)')}
          </button>
        )}
        <button onClick={onLogout}
          className="btn text-[9px] py-1 px-2.5 w-full text-left bg-transparent border-[#334155] text-slate-500 hover:text-slate-300 transition-colors">
          ← {T('Đăng xuất', 'Logout')}
        </button>
        <div className="text-[9px] text-slate-600 mt-2 space-y-1">
          <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-epr-green inline-block" />LOT key</div>
          <div><span className="text-red-500">*</span> {T('Bắt buộc', 'Required')}</div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-epr-green-light border border-epr-green-border inline-block" />
            {T('Tự tính', 'Computed')}
          </div>
        </div>
      </div>
    </nav>
  );
}
