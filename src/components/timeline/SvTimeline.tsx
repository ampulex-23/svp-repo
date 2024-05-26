import cn from 'classnames';
import './SvTimeline.scss';
import {SvPlantData} from '../../types';
import SvTimelineHeader from './SvTimelineHeader';
import m from 'moment';
import SvUnitLine from './SvUnitLine';
import React, { UIEventHandler, useRef } from 'react';

export interface SvTimelineProps {
  plants: Record<string, SvPlantData>;
  plantId?: string;
}
const SvTimeline = ({plants, plantId}: SvTimelineProps): JSX.Element => {
  const plant = Object.values(plants)[0];
  
  if (Object.values(plants).filter(Boolean).length < 3) {
    return <></>;
  }
  const handleScroll: UIEventHandler = e => {
    const el = document.getElementById('sidebar-list');
    if (el) {
      const top = e.currentTarget.scrollTop;
      el.style.marginTop = `-${top}px`;
    }
    
  }
  const start = m(plant.dateFrom);
  const end = m(plant.dateTo);
  const Plants = plantId ? [plants[plantId]] : Object.values(plants);
  
  return (
    <div className={cn('sv-timeline')} onScroll={handleScroll}>
      <SvTimelineHeader start={start} end={end} />
      {Plants.map(p => Object.keys(p.units).map(unitId => (
        <SvUnitLine key={unitId} unitId={unitId} plant={p} />
      ))).flat()}
    </div>
  );
};

export default SvTimeline;
