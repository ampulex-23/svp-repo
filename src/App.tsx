import React, { useEffect, useState } from 'react';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {usePlant} from './hooks/usePlant';
import SvHeader from './components/header/SvHeader';
import ServicePage from './pages/SevicePage';
import TimelinePage from './pages/TimelinePage';
import EconomyPage from './pages/EconomyPage';
import SvSidebar from './components/sidebar/SvSidebar';
import useSocket from './hooks/useSocket';
import useMobileAndPortrait from './hooks/useMobileAndPortrait';
import classNames from 'classnames';
import { SvPlantData } from './types';

function App() {
  const [plantId, setPlantId] = useState<string | undefined>(undefined);
  const plants = {
    '9': usePlant('9'),
    '10': usePlant('10'),
    '11': usePlant('11'),
  } as Record<string, SvPlantData>;
  const { isMobile, isPortrait } = useMobileAndPortrait();
  
  return (
    <div className={classNames('sv-app', { 'mobile': isMobile && isPortrait })}>
      <SvHeader
        power={49367}
        heatCost={2.3}
        powerCost={1.4}
        powerCostUp={true}
        heatCostUp={false}
        onSetPlant={setPlantId}
      />
      <main>
        <SvSidebar plants={plants} plantId={undefined} />

        <Routes>
          <Route path="/service" element={<ServicePage />} />
          <Route path="/timeline" element={<TimelinePage plants={plants} plantId={undefined} />} />
          <Route path="/economy" element={<EconomyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
