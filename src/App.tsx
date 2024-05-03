import React from 'react';
import './App.css';
import SvTimeline from './components/SvTimeline';
import { usePlant } from './hooks/usePlant';

function App() {
  const plant = usePlant();
  return (
    <div className="App">
      {plant && <SvTimeline plant={plant} />}
    </div>
  );
}

export default App;
