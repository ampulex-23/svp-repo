import cn from 'classnames';
import m, {Moment} from 'moment';
import {useEffect, useRef} from 'react';
import { fillRoundedRect } from '../../helpers/draw';

export const COL_WIDTH = 25;
export const HEADER_HEIGHT = 70;

export const WEEKDAY_COLOR = '#252525';
export const WEEKEND_COLOR = '#968E8E';

export interface SvTimelineHeaderProps {
  start: Moment;
  end: Moment;
}

m.updateLocale('ru', {
  months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
});


const drawHeader = (
  ctx: CanvasRenderingContext2D,
  start: Moment,
  end: Moment
): void => {
  const ndays = end.endOf('day').diff(start.startOf('day'), 'days') + 1;
  const CW = COL_WIDTH * 2;
  const HH = HEADER_HEIGHT * 2;
  ctx.clearRect(0, 0, ndays * CW, HH);
  ctx.fillStyle = '#F9F9F9';
  ctx.fillRect(0, 0, ndays * CW, HH);
  ctx.fontKerning = 'none';
  for (let d = 1; d <= ndays; d++) {
    const D = d;
    const day = start.clone().startOf('day').add(d, 'days');
    const dayIsWeekend = [0, 6].includes(day.clone().subtract(12, 'hours').day());
    const dayIsToday = day.clone().subtract(12, 'hours').isSame(m(), 'day');
    const dayIsFirst = day.clone().subtract(12, 'hours').date() === 1;
    const dayText = day.subtract(12, 'hours').format('DD');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '24px IBM Plex Sans';
    if (dayIsToday) {
      ctx.fillStyle = '#60ED15';
      fillRoundedRect(ctx, D * CW - 2 * CW + 4, HH - 26, 2 * CW - 8, 28, 8);
    }
    ctx.fillStyle = dayIsWeekend ? WEEKEND_COLOR : WEEKDAY_COLOR;
    ctx.fillText(dayText, (d - 1) * CW + CW / 2, HH - 6);
    if (dayIsFirst) {
      const dateText = day.subtract(12, 'hours').format('MMMM');
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.font = '300 28px IBM Plex Sans';
      ctx.fillText(dateText, (d - 1) * CW + 10, HH - 50);
      ctx.fillStyle = WEEKDAY_COLOR;
      ctx.fillRect((d - 1) * CW, HH - 80, 2, 30);  
    }
    
  }
};

const SvTimelineHeader = ({start, end}: SvTimelineHeaderProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ndays = end.endOf('day').diff(start.startOf('day'), 'days') + 1;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = ndays * COL_WIDTH * 2;
      canvas.height = HEADER_HEIGHT * 2;
      canvas.style.height = HEADER_HEIGHT + 'px';
      canvas.style.width = ndays * COL_WIDTH + 'px';
      const ctx = canvas.getContext('2d');
      ctx && drawHeader(ctx, start, end);
    }
  }, []);
  return (
    <div className={cn('sv-timeline__header')}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SvTimelineHeader;