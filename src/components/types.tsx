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

export type Filter = {
  column: ValidColumn;
  name: string;
  value: string;
};

export type FilterContextType = {
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  removeFilter: (name: string) => void;
};

export type NumericFilter = {
  column: string;
  comparison: string;
  value: number;
};

export type FilterContextValue = {
  filters: NumericFilter[];
  addFilter: (filter: NumericFilter) => void;
  removeFilter: (name: string) => void;
};

export type ValidColumn = keyof Planet;
