import { Planet } from './types';

function Table({ planets }: { planets: Planet[] }) {
  if (planets.length === 0) {
    return <p>Loading...</p>;
  }

  const headers = Object.keys(planets[0]).filter((key) => key !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.name }>
            {headers.map((header) => (
              <td key={ header }>{planet[header as keyof Planet]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
