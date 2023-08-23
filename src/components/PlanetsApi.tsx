import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Filter, NumericFilter, Planet, ValidColumn } from './types';
import { usePlanetContext } from './Contexts/PlanetContext';
import { useFilterContext } from './Contexts/FilterContext';

function PlanetsApi() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { filteredPlanets, setSearchTerm, updateFilteredPlanets } = usePlanetContext();
  const { filters, availableColumns, addFilter } = useFilterContext();
  const [activeFilters, setActiveFilters] = useState<NumericFilter[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<ValidColumn>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('maior que');
  const [selectedValue, setSelectedValue] = useState<number | ''>(0);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((data: { results: Planet[] }) => {
        setPlanets(data.results);
        updateFilteredPlanets(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
        const planetValue = parseFloat(planet[filter.column as keyof Planet]);
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

      <select
        data-testid="column-filter"
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value as ValidColumn) }
      >
        {availableColumns.map((column : any) => (
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
      <button data-testid="button-filter" onClick={ handleFilterClick }>
        Filter
      </button>
      <Table planets={ filteredPlanets } />
    </div>
  );
}

export default PlanetsApi;
