import { useState, useRef } from 'react';
import { USERS } from '../data/constants';
import { useLang } from '../hooks/useLang';
import LangToggle from './LangToggle';

export default function LoginScreen({ onLogin }) {
  const [uid, setUid] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState('');
  const [shake, setShake] = useState(false);
  const { T } = useLang();
  const formRef = useRef();

  const submit = () => {
    const u = USERS.find(u => u.id === uid && u.pass === pass);
    if (u) {
      onLogin(u);
    } else {
      setErr(T('Tài khoản hoặc mật khẩu không đúng', 'Incorrect account or password'));
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-[640px] flex items-center justify-center bg-gray-100">
      <div className="w-[380px] bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-[#1e293b] px-8 py-6 text-center">
          <div className="flex justify-end mb-3"><LangToggle /></div>
          <div className="w-12 h-12 bg-epr-green rounded-xl flex items-center justify-center mx-auto mb-3 text-base font-extrabold text-white">EPR</div>
          <div className="text-lg font-bold text-slate-100 mb-1">EPR Documentation</div>
          <div className="text-[11px] text-slate-500">Moc An Chau · MAC System</div>
        </div>

        <div ref={formRef} className={`px-8 py-6 ${shake ? 'shake' : ''}`}>
          <div className="mb-3">
            <div className="text-[10px] text-gray-500 font-mono mb-1 font-semibold">{T('Tài khoản (ID)', 'Account (ID)')}</div>
            <input value={uid} onChange={e => { setUid(e.target.value); setErr(''); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="admin / ma_user / recycler01"
              className="font-mono" autoFocus />
          </div>
          <div className="mb-4">
            <div className="text-[10px] text-gray-500 font-mono mb-1 font-semibold">{T('Mật khẩu', 'Password')}</div>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={pass}
                onChange={e => { setPass(e.target.value); setErr(''); }}
                onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder="••••••••" className="pr-9" />
              <button onClick={() => setShowPass(s => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-400 text-sm p-0">
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          {err && <div className="text-[11px] text-red-500 mb-2">✕ {err}</div>}
          <button onClick={submit}
            className="btn btn-green w-full h-10 text-sm rounded-lg mb-4">
            {T('Đăng nhập', 'Login')} →
          </button>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-[9px] text-gray-400 mb-1.5 font-bold uppercase tracking-wider">
              {T('Tài khoản demo — bấm để điền', 'Demo accounts — click to fill')}
            </div>
            {USERS.map(u => (
              <button key={u.id} onClick={() => { setUid(u.id); setPass(u.pass); setErr(''); }}
                className="flex items-center gap-2 p-1.5 border border-gray-200 rounded-md bg-white w-full text-left mb-1 cursor-pointer hover:border-epr-green transition-colors">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: u.color }} />
                <span className="text-[11px] font-mono font-bold text-gray-700 min-w-[80px]">{u.id}</span>
                <span className="text-[11px] text-gray-400">—</span>
                <span className="text-[11px] text-gray-500">{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
