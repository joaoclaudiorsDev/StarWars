import React, { useState, useEffect } from 'react';
import Table from './Table';
import { NumericFilter, Planet } from './types';
import { usePlanetContext } from './Contexts/PlanetContext';
import { useFilterContext } from './Contexts/FilterContext';

type ValidColumn = keyof Planet;

function PlanetsApi() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { filteredPlanets, setSearchTerm, updateFilteredPlanets } = usePlanetContext();
  const { filters, addFilter } = useFilterContext();

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

  const [selectedColumn, setSelectedColumn] = useState<ValidColumn>('population');
  const [selectedComparison, setSelectedComparison] = useState<string>('maior que');
  const [selectedValue, setSelectedValue] = useState<number | ''>(0);

  const handleFilterClick = () => {
    if (!selectedColumn || !selectedComparison || selectedValue === '') {
      console.error('Invalid filter values');
      return;
    }

    const numericFilter: NumericFilter = {
      column: selectedColumn,
      comparison: selectedComparison,
      value: selectedValue as number,
    };

    addFilter(numericFilter);

    const filtered = planets.filter((planet) => {
      const planetValue = parseFloat(planet[selectedColumn] as string);
      if (selectedComparison === 'maior que') {
        return planetValue > selectedValue;
      } if (selectedComparison === 'menor que') {
        return planetValue < selectedValue;
      }
      return planetValue === selectedValue;
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
      <button
        data-testid="button-filter"
        onClick={ handleFilterClick }
      >
        Filter
      </button>
      <Table planets={ filteredPlanets } />
    </div>
  );
}

export default PlanetsApi;
