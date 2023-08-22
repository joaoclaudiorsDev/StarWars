import { PlanetProvider } from './Contexts/PlanetContext';
import PlanetsApi from './PlanetsApi';
import { FilterProvider } from './Contexts/FilterContext';

export default function PlanetsApiWithProvider() {
  return (
    <PlanetProvider>
      <FilterProvider>
        <PlanetsApi />
      </FilterProvider>
    </PlanetProvider>
  );
}
