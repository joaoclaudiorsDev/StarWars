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
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
};

export type Filter = {
  column: string;
  comparison: string;
  value: string;
};

export type ColumnType = keyof Planet;
