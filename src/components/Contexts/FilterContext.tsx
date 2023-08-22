import { createContext, useContext, useState } from 'react';
import { FilterContextType, FilterContextValue, NumericFilter } from '../types';

const FilterContext = createContext<FilterContextValue>({
  filters: [],
  addFilter: () => {},
  removeFilter: () => {},
});

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: any) {
  const [filters, setFilters] = useState<NumericFilter[]>([]);

  const addFilter = (filter: NumericFilter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (name: string) => {
    const updatedFilters = filters.filter((filter) => filter.column !== name);
    setFilters(updatedFilters);
  };

  const contextValue: FilterContextValue = {
    filters,
    addFilter,
    removeFilter,
  };

  return (
    <FilterContext.Provider value={ contextValue }>
      {children}
    </FilterContext.Provider>
  );
}
