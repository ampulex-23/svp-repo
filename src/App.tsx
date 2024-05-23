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

function App() {
  const [plantId, setPlantId] = useState<string>('9');
  const plant = usePlant(plantId);
  
  
  return (
    <div className="sv-app">
      <SvHeader
        power={49367}
        heatCost={2.3}
        powerCost={1.4}
        powerCostUp={true}
        heatCostUp={false}
        onSetPlant={setPlantId}
      />
      <main>
        <SvSidebar plant={plant} />

        <Routes>
          <Route path="/service" element={<ServicePage />} />
          <Route path="/timeline" element={<TimelinePage plant={plant} />} />
          <Route path="/economy" element={<EconomyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
