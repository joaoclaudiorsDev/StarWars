import { PlanetProvider } from './PlanetContext';
import PlanetsApi from './PlanetsApi';

export default function PlanetsApiWithProvider() {
  return (
    <PlanetProvider>
      <PlanetsApi />
    </PlanetProvider>
  );
}
