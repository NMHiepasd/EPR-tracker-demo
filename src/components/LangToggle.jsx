import { useLang } from '../hooks/useLang';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex bg-[#0f172a] rounded-full p-0.5 gap-px border border-[#334155]">
      {['vi','en'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border-none cursor-pointer font-mono tracking-widest transition-all ${
            lang === l ? 'bg-epr-green text-white' : 'bg-transparent text-slate-500'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
