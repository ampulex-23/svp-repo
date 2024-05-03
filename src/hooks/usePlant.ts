import {useState} from 'react';
import {SvPlantData, SvTimelineResponse} from '../types';

export const usePlant = () => {
  const [plant, setPlant] = useState<SvPlantData | undefined>(undefined);
  const fetchPlant = () => {
    fetch('/res.json')
      .then(r => r.json())
      .then(({data}: SvTimelineResponse) => {
        setPlant(data);
      });
  };
  !plant && fetchPlant();
  return plant;
};
