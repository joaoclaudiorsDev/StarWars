import React, { createContext, useContext, useState } from 'react';
import { FilterContextType, NumericFilter } from '../types';

const FilterContext = createContext<FilterContextType>({
  filters: [],
  availableColumns: [],
  addFilter: () => {},
  removeFilter: () => {},
});

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: any) {
  const [filters, setFilters] = useState<NumericFilter[]>([]);
  const [availableColumns, setAvailableColumns] = useState<string[]>([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const addFilter = (filter: NumericFilter) => {
    setFilters([...filters, filter]);
    setAvailableColumns(availableColumns.filter((column) => column !== filter.column));
  };

  const removeFilter = (name: string) => {
    const updatedFilters = filters.filter((filter) => filter.column !== name);
    setFilters(updatedFilters);
    if (!availableColumns.includes(name)) {
      setAvailableColumns([...availableColumns, name]);
    }
  };

  const contextValue: FilterContextType = {
    filters,
    availableColumns,
    addFilter,
    removeFilter,
  };

  return (
    <FilterContext.Provider value={ contextValue }>
      {children}
    </FilterContext.Provider>
  );
}
