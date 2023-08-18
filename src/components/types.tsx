import { Dispatch, SetStateAction } from 'react';

export type Planet = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: string;
};

export type PlanetContextType = {
  filteredPlanets: Planet[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  updateFilteredPlanets: (allPlanets: Planet[]) => void;
};
