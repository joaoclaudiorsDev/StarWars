import { Dispatch, ReactNode, SetStateAction } from 'react';

export type Planet = {
  rotation_period: ReactNode;
  orbital_period: ReactNode;
  diameter: ReactNode;
  gravity: ReactNode;
  surface_water: ReactNode;
  films: ReactNode;
  created: ReactNode;
  edited: ReactNode;
  url: ReactNode;
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
  column: string;
  comparison: string;
  value: string | number;
  name: string;
};

export type NumericFilter = {
  column: ValidColumn;
  comparison: string;
  value: number;
};

export type FilterContextType = {
  filters: NumericFilter[];
  availableColumns: string[];
  addFilter: (filter: NumericFilter) => void;
  removeFilter: (name: string) => void;
};

export type FilterContextValue = {
  filters: NumericFilter[];
  addFilter: (filter: NumericFilter) => void;
  removeFilter: (name: string) => void;
};

export type ValidColumn = keyof Planet;
