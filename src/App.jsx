import { useState } from 'react';
import { SEED_LOTS, ROLE_ACCESS } from './data/constants';
import { SHEETS } from './data/sheets';
import LoginScreen from './components/LoginScreen';
import LotGate from './components/LotGate';
import AdminPanel from './components/AdminPanel';
import Sidebar from './components/Sidebar';
import SheetForm from './components/SheetForm';
import TraceView from './components/TraceView';
import { validateAllSheets, generateCertificatePdf } from './utils/pdf';

// view: 'login' | 'gate' | 'admin' | 'main'
export default function App() {
  const [view, setView]   = useState('login');
  const [user, setUser]   = useState(null);
  const [lot,  setLot]    = useState(null);
  const [lots, setLots]   = useState(JSON.parse(JSON.stringify(SEED_LOTS)));
  const [activeId, setActiveId] = useState('S01');
  const [formData, setFormData] = useState({});

  const updateSheetData = (sheetId, data) => {
    setFormData(prev => ({
      ...prev,
      [sheetId]: data
    }));
  };

  const login = (u) => { setUser(u); setView('gate'); };
  const logout = () => { setUser(null); setLot(null); setView('login'); };
  const unlock = (l) => { setLot(l); setView('main'); };
  const changeLot = () => { setLot(null); setView('gate'); };
  const handlePreviewPdf = async () => {
    const errors = validateAllSheets(formData);

    if (errors.length > 0) {
      alert(errors.slice(0, 10).join('\n'));
      return;
    }

    const url = await generateCertificatePdf({ formData, lotInfo: lot });
    window.open(url, '_blank');
  };

  // ensure activeId is accessible for current user
  const access = user ? (ROLE_ACCESS[user.role] || []) : [];
  const visibleSheets = SHEETS.filter(s => access.includes(s.group));
  const sheet = visibleSheets.find(s => s.id === activeId)
    || (visibleSheets.length ? visibleSheets[0] : null);

  if (view === 'login') return <LoginScreen onLogin={login} />;
  if (view === 'gate')  return (
    <LotGate
      lots={lots} user={user}
      onUnlock={unlock}
      onAdmin={() => setView('admin')}
      onLogout={logout}
    />
  );
  if (view === 'admin') return (
    <AdminPanel
      lots={lots}
      onUpdate={setLots}
      onBack={() => setView(lot ? 'main' : 'gate')}
    />
  );

  // main
  return (
    <div className="flex" style={{ height: 640 }}>
      <Sidebar
        user={user}
        lot={lot}
        activeId={activeId}
        onSelect={setActiveId}
        onChangeLot={changeLot}
        onLogout={logout}
        onAdminClick={() => setView('admin')}
      />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4" style={{maxHeight: 640}}>
        <div className="mb-3 flex justify-end">
          <button
              onClick={handlePreviewPdf}
              className="btn text-[11px] px-3 py-1.5 font-semibold bg-epr-green text-white"
          >
            Tạo PDF / Preview
          </button>
        </div>
        {activeId === 'TRACE'
            ? <TraceView lotInfo={lot}/>
            : sheet
                ? <SheetForm
                    key={activeId + lot.lot}
                    sheet={sheet}
                    lotInfo={lot}
                    data={formData[sheet.id] || {}}
                    onChangeData={(data) => updateSheetData(sheet.id, data)}
                />
                : <div className="text-center text-gray-400 py-16">Chọn sheet từ sidebar</div>
        }
      </main>
    </div>
  );
}
