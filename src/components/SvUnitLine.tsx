import cn from 'classnames';
import {SvPlantData, SvUnitData} from '../types';
import {useEffect, useRef} from 'react';
import m, {Moment} from 'moment';
import {COL_WIDTH} from './SvTimelineHeader';
import { decodeSvStatus } from '../helpers/decodeSvStatus';

export const ROW_HEIGHT = 50;

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
  ctx.clearRect(0, 0, ndays * COL_WIDTH * 2, ROW_HEIGHT);
  for (let d = 1; d <= ndays; d++) {
    const D = d * 2;
    const day = start.clone().startOf('day').add(d, 'days');
    const dayIsWeekend = [0, 6].includes(day.clone().subtract(12, 'hours').day());
    const dayIsToday = day.clone().subtract(12, 'hours').isSame(m(), 'day');
    const dayIsFirst = day.clone().subtract(12, 'hours').date() === 1;
    ctx.fillStyle = dayIsWeekend ? '#E0E0E0' : '#FFFFFF';
    ctx.fillRect(D * COL_WIDTH - 2 * COL_WIDTH, 0, COL_WIDTH * 2, ROW_HEIGHT);
  }
  const nminutes = ndays * 60 * 24;
  const width = ndays * COL_WIDTH;
  unit.states.forEach((now, i) => {
    if (i > 0) {
      const prev = unit.states[i - 1];
      const x = width * prev[0] / nminutes;
      const w = width * (now[0] - prev[0]) / nminutes;
      const prevS = decodeSvStatus(prev[1]);
      const nowS = decodeSvStatus(now[1]);
      if (prevS.runing) {
        ctx.fillStyle = '#50DE80';
        ctx.fillRect(x, ROW_HEIGHT - ROW_HEIGHT / 2, w, 8);
      }
      if (prevS.warning) {
        ctx.fillStyle = '#EEEE00';
        ctx.fillRect(x, ROW_HEIGHT - ROW_HEIGHT / 2 - 8, w, 8);
      }
      if (prevS.alarm) {
        ctx.fillStyle = '#EE5E00';
        ctx.fillRect(x, ROW_HEIGHT - ROW_HEIGHT / 2 - 16, w, 8);
      }
      if (prevS.logging) {
        ctx.fillStyle = '#606060';
        ctx.fillRect(x, ROW_HEIGHT - ROW_HEIGHT / 2 + 8, w, 4);
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
      canvas.height = ROW_HEIGHT;
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
