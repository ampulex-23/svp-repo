import {SvPlantData, SvState} from '../../types';
import Select from 'react-select';
import './SvSidebar.scss';
import SvSidebarItem from './SvSidebarItem';
import { decodeSvStatus } from '../../helpers/decodeSvStatus';
import calculateEngineRuntime, { EngineData } from '../../helpers/calculateGPURuntime';

const SvSidebar: React.FC<{
  plant?: SvPlantData;
}> = ({plant}) => {
  return (
    <aside className="sv-sidebar">
      <div className="sv-sidebar__header">
        <span>ГПУ</span>
        <Select
          options={[
            {
              label: 'По номеру',
              value: 'unitId'
            },
            {
              label: 'По пробегу',
              value: 'mh'
            }
          ]}
        />
      </div>
      <div className="sv-sidebar__list">
        {plant &&
          Object.entries(plant.units).map(([unitId, unit]) => {
            const lastState = unit.states.at(-1) as SvState;
            const state = decodeSvStatus(lastState[1]);
            const status = state.alarm ? 'alarm' : state.warning ? 'warning' : 'ok';
                        
            return (
              <SvSidebarItem
                key={unitId}
                unitId={unitId}
                unit={unit}
                unitStatus={status}
                statusMessage={status === 'alarm' ? 'Авария' : ((120 - Math.round(Math.random() * 100)) + ' дней до ТО' )}
                powerKw={5000 - Math.round(Math.random() * 2500)}
                powerPercents={100 - Math.random() * 75}
              />
            );
          })}
      </div>
    </aside>
  );
};

export default SvSidebar;
