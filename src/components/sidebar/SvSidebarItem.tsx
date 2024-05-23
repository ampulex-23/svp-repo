import calculateEngineRuntime, { EngineData } from '../../helpers/calculateGPURuntime';
import {SvUnitData, SvUnitStatus} from '../../types';

const SvSidebarItem: React.FC<{
  unit: SvUnitData;
  unitStatus: SvUnitStatus;
  statusMessage?: string;
  unitId: string;
  powerPercents: number;
  powerKw?: number;
  mh?: number;
}> = ({
  unit,
  unitId,
  unitStatus,
  statusMessage = '60 дней до ТО',
  powerPercents = 66,
  powerKw = 4766,
  mh = 16465
}) => {
  const series: EngineData[] = unit.states.map(s => [s[0], s[1][1]]);
  const { totalRuntime, milestoneTimes } = calculateEngineRuntime(series);
  return (
    <div className={"sv-sidebar__item" + (unitStatus === 'alarm' ? ' alarm' : '')}>
      <div>
        <span className="gpu-id">ГПУ-{unitId}</span>
        {unitStatus === 'ok' && <img src="/img/status_ok.svg" />}
        {unitStatus === 'warning' && <img src="/img/status_warning2.svg" />}
        {unitStatus === 'alarm' && <img src="/img/status_alarm.svg" />}
        <span className="status-message">{statusMessage}</span>
      </div>
      <div>
        <div className="power-gauge">
          <div
            className="power-gauge__gauge"
            style={{width: `${powerPercents}%`}}
          ></div>
        </div>
      </div>
      <div>
        <span className="power-kw value">
          <span>{powerKw}</span>
          <span>кВт</span>
        </span>
        <span className="moto-hours value">
          <span>{totalRuntime}</span>
          <span>мч</span>
        </span>
      </div>
    </div>
  );
};

export default SvSidebarItem;
