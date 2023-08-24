import React from 'react';
import { fireEvent, render, waitFor, within, screen, renderHook } from '@testing-library/react';
import PlanetsApiWithProvider from '../components/PlanetsApiWithProvider';
import PlanetsApi from '../components/PlanetsApi';
import Table from '../components/Table';
import { PlanetProvider } from '../components/Contexts/PlanetContext';
import { FilterProvider, useFilterContext } from '../components/Contexts/FilterContext';
import { APIResult } from './ApiResult';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { g } from 'vitest/dist/types-e3c9754d';
import App from '../App';


describe('PlanetsApiWithProvider component', () => {
  it('renders header with correct title', () => {
    const { getByText } = render(<PlanetsApiWithProvider />);
    const headerElement = getByText(/Star Wars Planets/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('renders all data-testid elements in PlanetsApi', () => {
    const { getByTestId } = render(<PlanetsApi />);
    const nameFilterElement = getByTestId('name-filter');
    const columnFilterElement = getByTestId('column-filter');
    const comparisonFilterElement = getByTestId('comparison-filter');
    const valueFilterElement = getByTestId('value-filter');
    const buttonFilterElement = getByTestId('button-filter');
    const h1Element = screen.getByText(/star wars planets/i);
    const inputElement = screen.getByPlaceholderText('Filter by name');
    const removeFiltersButton = screen.getByTestId('button-remove-filters');
    
    expect(nameFilterElement).toBeInTheDocument();
    expect(columnFilterElement).toBeInTheDocument();
    expect(comparisonFilterElement).toBeInTheDocument();
    expect(valueFilterElement).toBeInTheDocument();
    expect(buttonFilterElement).toBeInTheDocument();
    expect(h1Element).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(removeFiltersButton).toBeInTheDocument();
  });

  it('verifies that numeric filter starts with 0', () => {
    const { getByTestId } = render(<PlanetsApi />);
    const selectElement = getByTestId('column-filter');
    const comparisonElement = getByTestId('comparison-filter');
    const valueElement = getByTestId('value-filter');

    fireEvent.change(selectElement, { target: { value: 'population' } });
    fireEvent.change(comparisonElement, { target: { value: 'maior que' } });

    const numericValue = 0;
    expect(valueElement).toHaveValue(numericValue);
  });

  it('should remove all filters when remove all filters button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<PlanetsApiWithProvider />);
    const removeAllFiltersButton = getByTestId('button-remove-filters');

    fireEvent.click(removeAllFiltersButton);

    expect(queryByTestId('filter')).toBeNull();
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