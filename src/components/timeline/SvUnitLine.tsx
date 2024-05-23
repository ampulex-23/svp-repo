import cn from 'classnames';
import {SvPlantData, SvUnitData} from '../../types';
import {useEffect, useRef} from 'react';
import m, {Moment} from 'moment';
import {COL_WIDTH} from './SvTimelineHeader';
import { decodeSvStatus } from '../../helpers/decodeSvStatus';
import calculateEngineRuntime, { EngineData } from '../../helpers/calculateGPURuntime';

export const ROW_HEIGHT = 100;

export interface SvUnitLineProps {
  plant: SvPlantData;
  unitId: string;
}

const drawUnit = (
  ctx: CanvasRenderingContext2D,
  start: Moment,
  end: Moment,
  unit: SvUnitData
): void => {
  const ndays = end.endOf('day').diff(start.startOf('day'), 'days') + 1;
  const RH = ROW_HEIGHT * 2;
  const CW = COL_WIDTH * 2;
  ctx.clearRect(0, 0, ndays * CW, RH);
  for (let d = 1; d <= ndays; d++) {
    const D = d;
    const day = start.clone().startOf('day').add((d - 1), 'days');
    const dayIsWeekend = [0, 6].includes(day.clone().subtract(12, 'hours').day());
    const dayIsToday = day.clone().subtract(12, 'hours').isSame(m(), 'day');
    const dayIsFirst = day.clone().subtract(12, 'hours').date() === 1;
    ctx.fillStyle = dayIsWeekend ? 'rgba(217,217,217,.4)' : '#F9F9F9';
    ctx.fillRect(d * CW - 2 * CW, 0, CW, RH);
  }
  const nminutes = ndays * 60 * 24;
  const width = ndays * CW;
  unit.states.forEach((now, i) => {
    if (i > 0) {
      const prev = unit.states[i - 1];
      const x = width * prev[0] / nminutes;
      const w = width * (now[0] - prev[0]) / nminutes;
      const prevS = decodeSvStatus(prev[1]);
      const nowS = decodeSvStatus(now[1]);
      if (prevS.runing) {
        ctx.fillStyle = '#63B55E';
        ctx.fillRect(x, RH - RH / 2 - 19, w, 12);
      }
      if (prevS.warning && prevS.runing) {
        ctx.fillStyle = '#FFC247';
        ctx.fillRect(x, RH - RH / 2 - 19, w, 12);
      }
      if (prevS.alarm && prevS.runing) {
        ctx.fillStyle = '#FF8A49';
        ctx.fillRect(x, RH - RH / 2 - 19, w, 12);
      }
      if (prevS.logging) {
        ctx.fillStyle = '#CACACA';
        ctx.fillRect(x - 1, RH - RH / 2 - 8, 2, 14);
      }
    }
  })
};

const SvUnitLine = ({plant, unitId}: SvUnitLineProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unit: SvUnitData = plant.units[unitId];
  const start = m(plant.dateFrom);
  const end = m(plant.dateTo);
  
  useEffect(() => {
    const ndays = end.endOf('day').diff(start.startOf('day'), 'days') + 1;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = ndays * COL_WIDTH * 2;
      canvas.height = ROW_HEIGHT * 2;
      canvas.style.height = ROW_HEIGHT + 'px';
      canvas.style.width = ndays * COL_WIDTH + 'px';
      const ctx = canvas.getContext('2d');
      (ctx && unit) && drawUnit(ctx, start, end, unit);
    }
  }, [unit]);
  return (
    <div className={cn('sv-timeline__row')}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SvUnitLine;
