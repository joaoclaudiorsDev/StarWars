import { useState, useEffect } from 'react';
import Table from './Table';
import { Planet } from './types';
import { PlanetProvider, usePlanetContext } from './PlanetContext';

function PlanetsApi() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const { filteredPlanets, setSearchTerm, updateFilteredPlanets } = usePlanetContext();

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
      <Table planets={ filteredPlanets } />
    </div>
  );
}
export default PlanetsApi;
