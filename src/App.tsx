import { Suspense, useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

// page uses the hook
function Page() {
  const { t, i18n } = useTranslation();

  const [lngs, setLngs] = useState({ en: { nativeName: 'Inglês' }, ptBr: { nativeName: 'Português'}});

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err: Error, ret: any) => {
      if (err) return // TODO: handle err...
      setLngs(ret);
    });
  }, [lngs]);

  return (
    <div className="App App-header" style={{ minWidth: '100%'}}>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{t('title')}</h2>
      </div>
      <div >
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng as keyof typeof lngs].nativeName}
            </button>
          ))}
        </div>
        <MyComponent />
      </div>
        <div>{t('description.part2')}</div>
      {/* <div>{t('new.key', 'this will be added automatically')}</div> */}
    </div>
  );
}

const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}