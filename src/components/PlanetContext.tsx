import React, { createContext, useContext, useState, useCallback } from 'react';
import { PlanetContextType, Planet, Filter, ColumnType } from './types';

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export function usePlanetContext() {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetProvider');
  }
  return context;
}

export function PlanetProvider({ children }: { children: React.ReactNode }) {
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filter>({
    column: 'population',
    comparison: 'greater',
    value: '0',
  });

  const updateFilteredPlanets = useCallback(
    (allPlanets: Planet[]) => {
      const filtered = allPlanets.filter((planet) => {
        const planetValue = planet[filters.column as ColumnType];

        if (filters.comparison === 'greater') {
          return Number(planetValue) > Number(filters.value);
        } if (filters.comparison === 'less') {
          return Number(planetValue) < Number(filters.value);
        }
        return Number(planetValue) === Number(filters.value);
      });

      setFilteredPlanets(filtered);
    },
    [filters],
  );

  const contextValue: PlanetContextType = {
    filteredPlanets,
    setSearchTerm,
    updateFilteredPlanets,
    filters,
    setFilters,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}
