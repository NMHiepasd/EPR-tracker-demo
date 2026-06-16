import { createContext, useContext, useState } from 'react';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('vi');
  const T = (vi, en) => lang === 'en' ? en : vi;
  const FL = (f) => lang === 'en' ? (f.le || f.lv) : f.lv;
  return (
    <LangContext.Provider value={{ lang, setLang, T, FL }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
