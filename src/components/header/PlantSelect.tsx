import React from 'react';
import "./PlantSelect.scss";

interface PlantSelectProps {
  plants: string[];
  onChosePlant?: (plant: string) => void;
  currentPlant?: string;
}

const PlantSelect: React.FC<PlantSelectProps> = ({
  plants,
  onChosePlant,
  currentPlant
}) => {
  return (
    <select
      className='plant-selector'
      onChange={e => onChosePlant && onChosePlant(e.target.value)}
      value={currentPlant || ''}
    >
      {plants.map((plant, index) => (
        <option key={index} value={plant}>
          {plant}
        </option>
      ))}
    </select>
  );
};

export default PlantSelect;
