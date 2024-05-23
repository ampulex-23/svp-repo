import React from 'react';
import SvTimeline from '../components/timeline/SvTimeline';
import {SvPlantData} from '../types';

const TimelinePage: React.FC<{plant?: SvPlantData}> = ({plant}) => {
  return <SvTimeline plant={plant} />;
};

export default TimelinePage;
