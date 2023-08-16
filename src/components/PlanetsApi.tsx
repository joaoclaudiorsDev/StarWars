import { useState, useEffect } from 'react';
import Table from './Table';
import { ColumnType, Planet } from './types';
import { usePlanetContext } from './PlanetContext';

function PlanetsApi() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const {
    filteredPlanets,
    setSearchTerm,
    updateFilteredPlanets,
    filters,
    setFilters,
  } = usePlanetContext();

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

  const handleFilterButtonClick = () => {
    const filtered = planets.filter((planet) => {
      const planetValue = planet[filters.column as ColumnType];

      if (filters.comparison === 'greater') {
        return Number(planetValue) > Number(filters.value);
      } if (filters.comparison === 'less') {
        return Number(planetValue) < Number(filters.value);
      }
      return Number(planetValue) === Number(filters.value);
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

      {/* Novos seletores e lógica de filtro */}
      <select
        data-testid="column-filter"
        value={ filters.column }
        onChange={ (e) => setFilters((prevFilters) => ({
          ...prevFilters,
          column: e.target.value,
        })) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ filters.comparison }
        onChange={ (e) => setFilters((prevFilters) => ({
          ...prevFilters,
          comparison: e.target.value,
        })) }
      >
        <option value="maior que">maior que</option>
        <option value="less">menor que</option>
        <option value="equal">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ filters.value }
        onChange={ (e) => setFilters((prevFilters) => ({
          ...prevFilters,
          value: e.target.value,
        })) }
      />

      <button data-testid="button-filter" onClick={ handleFilterButtonClick }>
        Apply Filter
      </button>

      <Table planets={ filteredPlanets } />
    </div>
  );
}

export default PlanetsApi;
