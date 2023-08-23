import { Planet } from './types';
import { usePlanetContext } from './Contexts/PlanetContext';

function Table({ planets }: { planets: Planet[] }) {
  if (planets.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <table data-testid="planets-table">
      <thead>
        <tr>
          <th data-testid="column-name">Name</th>
          <th data-testid="column-rotation_period">Rotation Period</th>
          <th data-testid="column-orbital_period">Orbital Period</th>
          <th data-testid="column-diameter">Diameter</th>
          <th data-testid="column-climate">Climate</th>
          <th data-testid="column-gravity">Gravity</th>
          <th data-testid="column-terrain">Terrain</th>
          <th data-testid="column-surface_water">Surface Water</th>
          <th data-testid="column-population">Population</th>
          <th data-testid="column-films">Films</th>
          <th data-testid="column-created">Created</th>
          <th data-testid="column-edited">Edited</th>
          <th data-testid="column-url">URL</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
