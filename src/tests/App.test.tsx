import React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import PlanetsApiWithProvider from '../components/PlanetsApiWithProvider';
import PlanetsApi from '../components/PlanetsApi';
import Table from '../components/Table';
import { PlanetProvider } from '../components/Contexts/PlanetContext';
import { FilterProvider } from '../components/Contexts/FilterContext';
import { APIResult } from './ApiResult';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { g } from 'vitest/dist/types-e3c9754d';

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
    expect(nameFilterElement).toBeInTheDocument();
    expect(columnFilterElement).toBeInTheDocument();
    expect(comparisonFilterElement).toBeInTheDocument();
    expect(valueFilterElement).toBeInTheDocument();
    expect(buttonFilterElement).toBeInTheDocument();
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
});

describe('Table component', () => {
 
  it('should render loading message when no planets are provided', () => {
    const { getByText } = render(<Table planets={[]} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render table header elements with correct data-testid', () => {
    const { getByTestId } = render(
      <PlanetProvider>
        <Table planets={[]} />
      </PlanetProvider>
    );

    const columnHeaderName = getByTestId('column-name');
    expect(columnHeaderName).toBeInTheDocument();

    const columnHeaderRotationPeriod = getByTestId('column-rotation_period');
    expect(columnHeaderRotationPeriod).toBeInTheDocument();

    const columnHeaderOrbitalPeriod = getByTestId('column-orbital_period');
    expect(columnHeaderOrbitalPeriod).toBeInTheDocument();

    const columnHeaderDiameter = getByTestId('column-diameter');
    expect(columnHeaderDiameter).toBeInTheDocument();

    const columnHeaderClimate = getByTestId('column-climate');
    expect(columnHeaderClimate).toBeInTheDocument();

    const columnHeaderGravity = getByTestId('column-gravity');
    expect(columnHeaderGravity).toBeInTheDocument();

    const columnHeaderTerrain = getByTestId('column-terrain');
    expect(columnHeaderTerrain).toBeInTheDocument();

    const columnHeaderSurfaceWater = getByTestId('column-surface_water');
    expect(columnHeaderSurfaceWater).toBeInTheDocument();

    const columnHeaderPopulation = getByTestId('column-population');
    expect(columnHeaderPopulation).toBeInTheDocument();

    const columnHeaderFilms = getByTestId('column-films');
    expect(columnHeaderFilms).toBeInTheDocument();

    const columnHeaderCreated = getByTestId('column-created');
    expect(columnHeaderCreated).toBeInTheDocument();

    const columnHeaderEdited = getByTestId('column-edited');
    expect(columnHeaderEdited).toBeInTheDocument();

    const columnHeaderUrl = getByTestId('column-url');
    expect(columnHeaderUrl).toBeInTheDocument();
  });
});

describe('PlanetsApiWithProvider component', () => {

  it('should render remove all filters button', () => {
    const { getByTestId } = render(<PlanetsApiWithProvider />);
    const removeAllFiltersButton = getByTestId('button-remove-filters');
    expect(removeAllFiltersButton).toBeInTheDocument();
  });

  it('should remove all filters when remove all filters button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<PlanetsApiWithProvider />);
    const removeAllFiltersButton = getByTestId('button-remove-filters');


    fireEvent.click(removeAllFiltersButton);

    expect(queryByTestId('filter')).toBeNull();
  });

});


