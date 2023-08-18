import React, { createContext, useContext, useState, useCallback } from 'react';
import { PlanetContextType } from './types';

const PlanetContext = createContext<PlanetContextType>({
  filteredPlanets: [],
  setSearchTerm: () => {},
  updateFilteredPlanets: () => {},
});

export function usePlanetContext() {
  return useContext(PlanetContext);
}

export function PlanetProvider({ children }: any) {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const updateFilteredPlanets = useCallback(
    (allPlanets : any) => {
      const filtered = allPlanets
        .filter((planet : any) => planet.name.toLowerCase()
          .includes(searchTerm.toLowerCase()));
      setFilteredPlanets(filtered);
    },
    [searchTerm],
  );

  return (
    <PlanetContext.Provider
      value={
        { filteredPlanets, setSearchTerm, updateFilteredPlanets }
         }
    >
      {children}
    </PlanetContext.Provider>
  );
}
