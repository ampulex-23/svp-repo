import React, { useEffect, useState } from 'react';
import moment from 'moment';

import './SvClock.scss';

const Clock = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='sv-clock'>
      <div className='time'>
        {currentTime.format('HH:mm')}:
        <span className='seconds'>{currentTime.format('ss')}</span>
      </div>
      <div className='date'>{currentTime.format('DD MMMM YYYY')}</div>
    </div>
  );
};

export default Clock;