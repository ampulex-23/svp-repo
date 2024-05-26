import React from 'react';
import SvTimeline from '../components/timeline/SvTimeline';
import {SvPlantData} from '../types';

const TimelinePage: React.FC<{
  plants: Record<string, SvPlantData>;
  plantId?: string;
}> = ({plants, plantId}) => {
  return <SvTimeline plants={plants} plantId={plantId} />;
};

export default TimelinePage;
