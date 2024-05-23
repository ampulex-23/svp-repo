import {useEffect, useState} from 'react';
import {SvPlantData, SvTimelineResponse} from '../types';

export const usePlant = (plantId: string) => {
  const [plant, setPlant] = useState<SvPlantData | undefined>(undefined);
  const fetchPlant = () => {
    fetch(`/${plantId}.json`)
      .then(r => r.json())
      .then(({data}: SvTimelineResponse) => {
        setPlant(data);
      });
  };
  useEffect(() => {
    plantId && fetchPlant();
  }, [plantId]);
  
  return plant;
};
