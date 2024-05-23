import cn from 'classnames';
import './SvTimeline.scss';
import {SvPlantData} from '../../types';
import SvTimelineHeader from './SvTimelineHeader';
import m from 'moment';
import SvUnitLine from './SvUnitLine';

export interface SvTimelineProps {
  plant?: SvPlantData;
}
const SvTimeline = ({plant}: SvTimelineProps): JSX.Element => {
  if (!plant) {
    return <></>;
  }
  const start = m(plant.dateFrom);
  const end = m(plant.dateTo);
  return (
    <div className={cn('sv-timeline')}>
      <SvTimelineHeader start={start} end={end} />
      {Object.keys(plant.units).map(unitId => (
        <SvUnitLine key={unitId} unitId={unitId} plant={plant} />
      ))}
    </div>
  );
};

export default SvTimeline;
