import React, { useState, useEffect } from 'react';
import Table from './Table';
import { NumericFilter, Planet, ValidColumn } from './types';
import { usePlanetContext } from './Contexts/PlanetContext';
import { useFilterContext } from './Contexts/FilterContext';
import { fetchData } from './fetch/api';

function PlanetsApi() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { filteredPlanets, setSearchTerm, updateFilteredPlanets } = usePlanetContext();
  const { availableColumns, addFilter, removeFilter } = useFilterContext();
  const [activeFilters, setActiveFilters] = useState<NumericFilter[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<ValidColumn>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('maior que');
  const [selectedValue, setSelectedValue] = useState<number | ''>(0);
  const [sortOrder, setSortOrder] = useState<{
    column: ValidColumn; sort: 'ASC' | 'DESC'
  }>({
    column: 'population',
    sort: 'ASC',
  });

  useEffect(() => {
    const fetchDataAndUpdatePlanets = async () => {
      const fetchedPlanets = await fetchData();
      console.log('API response:', fetchedPlanets);
      setPlanets(fetchedPlanets);
      updateFilteredPlanets(fetchedPlanets);
    };

    fetchDataAndUpdatePlanets();
  }, [updateFilteredPlanets]);

  const handleFilterClick = () => {
    if (!selectedColumn || !selectedComparison || selectedValue === '') {
      console.error('Invalid filter values');
      return;
    }

    const newFilter: NumericFilter = {
      column: selectedColumn as ValidColumn,
      comparison: selectedComparison,
      value: selectedValue as number,
    };

    addFilter(newFilter);

    setSelectedColumn('population');
    setSelectedComparison('maior que');
    setSelectedValue(0);

    const updatedFilters = [...activeFilters, newFilter];
    setActiveFilters(updatedFilters);

    const filtered = planets.filter((planet) => {
      return updatedFilters.every((filter) => {
        const planetValue = parseFloat(planet[filter.column] as string);
        switch (filter.comparison) {
          case 'maior que':
            return planetValue > filter.value;
          case 'menor que':
            return planetValue < filter.value;
          case 'igual a':
            return planetValue === filter.value;
          default:
            return true;
        }
      });
    });

    updateFilteredPlanets(filtered);
  };

  const handleColumnSort = () => {
    const sortedPlanets = [...filteredPlanets].sort((planetA, planetB) => {
      const aValue : any = planetA[sortOrder.column];
      const bValue: any = planetB[sortOrder.column];

      if (aValue === 'unknown' && bValue !== 'unknown') return 1;
      if (aValue !== 'unknown' && bValue === 'unknown') return -1;

      if (sortOrder.sort === 'ASC') {
        if (aValue === 'unknown' || bValue === 'unknown') {
          return aValue.localeCompare(bValue);
        }
        return parseFloat(aValue) - parseFloat(bValue as string);
      }
      if (aValue === 'unknown' || bValue === 'unknown') {
        return bValue.localeCompare(aValue);
      }
      return parseFloat(bValue as string) - parseFloat(aValue);
    });

    updateFilteredPlanets(sortedPlanets);
  };

  const handleRemoveFilter = (filterColumn: string) => {
    removeFilter(filterColumn);

    const updatedActiveFilters = activeFilters
      .filter((filter) => filter.column !== filterColumn);
    setActiveFilters(updatedActiveFilters);

    let filtered = planets;
    updatedActiveFilters.forEach((filter) => {
      filtered = filtered.filter((planet) => {
        const planetValue = parseFloat(planet[filter.column] as string);
        switch (filter.comparison) {
          case 'maior que':
            return planetValue > filter.value;
          case 'menor que':
            return planetValue < filter.value;
          case 'igual a':
            return planetValue === filter.value;
          default:
            return true;
        }
      });
    });

    updateFilteredPlanets(filtered);
  };
  const handleRemoveAllFilters = () => {
    setActiveFilters([]);
    updateFilteredPlanets(planets);
  };

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <input
        type="text"
        placeholder="Filter by name"
        data-testid="name-filter"
        onChange={ (e) => {
          setSearchTerm(e.target.value);
          updateFilteredPlanets(planets);
        } }
      />
      <button data-testid="button-remove-filters" onClick={ handleRemoveAllFilters }>
        Remove All Filters
      </button>
      <div>
        {activeFilters.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <span data-testid="column">{filter.column}</span>
            <span data-testid="comparison">{filter.comparison}</span>
            <span data-testid="value">{filter.value}</span>
            <button
              data-testid="button"
              onClick={ () => handleRemoveFilter(filter.column) }
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <select
        data-testid="column-filter"
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value as ValidColumn) }
      >
        {availableColumns.map((column: any) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ selectedComparison }
        onChange={ (e) => setSelectedComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ selectedValue }
        onChange={ (e) => setSelectedValue(parseFloat(e.target.value)) }
      />
      <select
        data-testid="column-sort"
        value={ sortOrder.column }
        onChange={ (e) => setSortOrder((prevSortOrder) => ({
          ...prevSortOrder,
          column: e.target.value as ValidColumn,
        })) }
      >
        {availableColumns.map((column, index) => (
          <option key={ index } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <label>
        <input
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ sortOrder.sort === 'ASC' }
          onChange={ () => setSortOrder((prevSortOrder) => ({
            ...prevSortOrder, sort: 'ASC' })) }
        />
        Ascendente
      </label>

      <label>
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ sortOrder.sort === 'DESC' }
          onChange={ () => setSortOrder((prevSortOrder) => ({
            ...prevSortOrder, sort: 'DESC' })) }
        />
        Descendente
      </label>

      <button
        data-testid="column-sort-button"
        onClick={ handleColumnSort }
      >
        Ordenar
      </button>
      <button data-testid="button-filter" onClick={ handleFilterClick }>
        Filter
      </button>
      <Table data-testid="planets-table" planets={ filteredPlanets } />
    </div>
  );
}

export default PlanetsApi;
