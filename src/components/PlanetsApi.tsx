import { useState, useEffect } from 'react';
import Table from './Table';

function PlanetsApi() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        const processedPlanets = data.results.map((planet) => {
          const { residents, ...planetData } = planet;
          return planetData;
        });
        setPlanets(processedPlanets);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <Table planets={ planets } />
    </div>
  );
}

export default PlanetsApi;
