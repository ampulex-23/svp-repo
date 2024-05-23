import cn from 'classnames';

import './SvHeader.scss';
import { useEffect } from 'react';
import Clock from './Clock';
import { NavLink } from 'react-router-dom';
import PlantSelect from './PlantSelect';
import Select from 'react-select';

export interface SvHeaderProps {
  power: number;
  powerCost: number;
  powerCostUp: boolean;
  heatCost: number;
  heatCostUp: boolean;
  onSetPlant(id: string): void;
}

const SvHeader = ({
  power,
  powerCost,
  heatCost,
  powerCostUp,
  heatCostUp,
  onSetPlant
}: SvHeaderProps): JSX.Element => {

  return (
    <header className={cn('sv-header')}>
      <div className={cn('sv-header__wrap')}>
        <div className="left-block">
          <a href="/" className="logo">
            <img src="/logo.svg" alt=''></img>
          </a>
          <div className="power">
            <div>
              <span>{power}</span>
              <small>кВт</small>
            </div>
            <div>
              <small>Мощность станции</small>
            </div>
          </div>
        </div>
        <div className="right-block">
          <div className="meters">
            <div className={cn('meter', { 'c-up': powerCostUp })}>
              <div>
                <span>{powerCost}</span>
                <small className="units">р/кВт ч</small>
              </div>
              <div>
                <small>Стоимость энергии</small>
              </div>
            </div>
            <div className={cn('meter', { 'c-up': heatCostUp })}>
              <div>
                <span>{heatCost}</span>
                <small className="units">р/кВт ч</small>
              </div>
              <div>
                <small>Стоимость тепла</small>
              </div>
            </div>
            <Clock />
          </div>
          <div className="menu">
            <button>
              <img src="/img/theme.svg" alt=''></img>
            </button>
            <button>
              <img src="/img/settings.svg" alt=''></img>
            </button>
          </div>
        </div>
      </div>
      <div className="sv-header__nav">
        <div className="plant-select">
          <Select
            onChange={e => onSetPlant(e?.value || '9')}
            defaultValue={{ label: 'Энергоцентр 1', value: '9' }}
            options={[
              { label: 'Энергоцентр 1', value: '9' },
              { label: 'Энергоцентр 2', value: '10' },
              { label: 'Энергоцентр', value: '11' },
            ]} />
        </div>
        <nav>
          <ul>
            <li hidden>
              <NavLink to="/service">Сервис</NavLink>
            </li>
            <li>
              <NavLink to="/timeline">Календарь</NavLink>
            </li>
            <li hidden>
              <NavLink to="/economy">Экономия</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SvHeader;
