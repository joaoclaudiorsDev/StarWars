import React from 'react';
import { render, waitFor, screen, renderHook } from '@testing-library/react';
import PlanetsApiWithProvider from '../components/PlanetsApiWithProvider';
import Table from '../components/Table';
import { PlanetProvider } from '../components/Contexts/PlanetContext';
import { FilterProvider, useFilterContext } from '../components/Contexts/FilterContext';
import { APIResult } from './ApiResult';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const TEST_IDS = {
  nameFilter: 'name-filter',
  columnFilter: 'column-filter',
  comparisonFilter: 'comparison-filter',
  valueFilter: 'value-filter',
  buttonFilter: 'button-filter',
  h1Element: /Star Wars Planets/i,
  removeAllFiltersButton: 'button-remove-filters',
  loadingText: 'Loading...',
};

describe('PlanetsApiWithProvider component', () => {
  beforeEach(() => {
    render(
      <PlanetProvider>
        <FilterProvider>
          <PlanetsApiWithProvider />
        </FilterProvider>
      </PlanetProvider>
    );
  });

  it('renders header with correct title', () => {
    const headerElement = screen.getByText(TEST_IDS.h1Element);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders all data-testid elements in PlanetsApi', () => {
    const { getByTestId } = screen;

    expect(getByTestId(TEST_IDS.nameFilter)).toBeInTheDocument();
    expect(getByTestId(TEST_IDS.columnFilter)).toBeInTheDocument();
    expect(getByTestId(TEST_IDS.comparisonFilter)).toBeInTheDocument();
    expect(getByTestId(TEST_IDS.valueFilter)).toBeInTheDocument();
    expect(getByTestId(TEST_IDS.buttonFilter)).toBeInTheDocument();
    expect(screen.getByText(TEST_IDS.h1Element)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.removeAllFiltersButton)).toBeInTheDocument();
  });

  it('verifies that numeric filter starts with 0', () => {
    const { getByTestId } = screen;

    userEvent.selectOptions(getByTestId(TEST_IDS.columnFilter), 'population');
    userEvent.selectOptions(getByTestId(TEST_IDS.comparisonFilter), 'maior que');
    expect(getByTestId(TEST_IDS.valueFilter)).toHaveValue(0);
  });

  it('should remove all filters when remove all filters button is clicked', async () => {
    const { getByTestId, queryByTestId } = screen;

    userEvent.click(getByTestId(TEST_IDS.buttonFilter)); // Add a filter
    expect(queryByTestId('filter')).toBeInTheDocument();

    userEvent.click(getByTestId(TEST_IDS.removeAllFiltersButton));

    await waitFor(() => {
      expect(queryByTestId('filter')).not.toBeInTheDocument();
    });
  });
});


describe('Table component', () => {

  it('should render planet data when planets are provided', () => {
    const mockPlanets = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        films: ['A New Hope'],
        created: '2021-08-23T13:56:10.544Z',
        edited: '2021-08-23T13:56:10.544Z',
        url: 'https://swapi.dev/api/planets/1/'
      },
    ];
    const { getByTestId, queryByText } = render(<Table planets={mockPlanets as any} />);

    const { getByText } = render(<Table planets={[]} />);

    expect(getByText('Loading...')).toBeInTheDocument();

  });


  it('should render planet data when planets are provided', () => {
    const mockPlanets = [
      {
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        films: ['A New Hope'],
        created: '2021-08-23T13:56:10.544Z',
        edited: '2021-08-23T13:56:10.544Z',
        url: 'https://swapi.dev/api/planets/1/',
      },
    ];

    render(<Table planets={mockPlanets as any} />);
    
    const columnName = screen.getByTestId('column-name');
    const columnRotationPeriod = screen.getByTestId('column-rotation_period');
    const columnOrbitalPeriod = screen.getByTestId('column-orbital_period');
    const columnDiameter = screen.getByTestId('column-diameter');
    const columnClimate = screen.getByTestId('column-climate');
    const columnGravity = screen.getByTestId('column-gravity');
    const columnTerrain = screen.getByTestId('column-terrain');
    const columnSurfaceWater = screen.getByTestId('column-surface_water');
    const columnPopulation = screen.getByTestId('column-population');
    const columnFilms = screen.getByTestId('column-films');
    const columnCreated = screen.getByTestId('column-created');
    const columnEdited = screen.getByTestId('column-edited');
    const columnUrl = screen.getByTestId('column-url');
    
    expect(columnName).toBeInTheDocument();
    expect(columnRotationPeriod).toBeInTheDocument();
    expect(columnOrbitalPeriod).toBeInTheDocument();
    expect(columnDiameter).toBeInTheDocument();
    expect(columnClimate).toBeInTheDocument();
    expect(columnGravity).toBeInTheDocument();
    expect(columnTerrain).toBeInTheDocument();
    expect(columnSurfaceWater).toBeInTheDocument();
    expect(columnPopulation).toBeInTheDocument();
    expect(columnFilms).toBeInTheDocument();
    expect(columnCreated).toBeInTheDocument();
    expect(columnEdited).toBeInTheDocument();
    expect(columnUrl).toBeInTheDocument();
  });

});

describe('FilterContext test', () => {
  it('add a filter', () => {
    const { result } = renderHook(() => useFilterContext(), {
      wrapper: FilterProvider,
    });

    const { addFilter } = result.current;
    
    addFilter({ column: 'population', comparison: 'maior que', value: 1000 });

    expect(result.current.filters).toHaveLength(0);
    expect(result.current.availableColumns).toHaveLength(5);
  });

  it('remove a filter', () => {
    const { result } = renderHook(() => useFilterContext(), {
      wrapper: FilterProvider,
    });

    const { addFilter, removeFilter } = result.current;
    
    addFilter({ column: 'population', comparison: 'maior que', value: 1000 });

    removeFilter('population');

    expect(result.current.filters).toHaveLength(0);
    expect(result.current.availableColumns).toHaveLength(5);
  });
});

describe('API test', () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (APIResult),
  });

  it('Test if API is calling', async () => {
    render(
      <PlanetProvider>
        <FilterProvider>
          <PlanetsApiWithProvider />
        </FilterProvider>
      </PlanetProvider>
    );
    waitFor(() => {
      expect(global.fetch).toBeCalledTimes(1);
    })
  });
})