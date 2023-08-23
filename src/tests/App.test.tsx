import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PlanetsApiWithProvider from '../components/PlanetsApiWithProvider';
import PlanetsApi from '../components/PlanetsApi';

test('renders PlanetsApiWithProvider component', () => {
  const { getByText } = render(<PlanetsApiWithProvider />);
  
  const headerElement = getByText(/Star Wars Planets/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders all data-testid elements in PlanetsApi', () => {
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

test('verifies that numeric filter starts with 0', () => {
  const { getByTestId } = render(<PlanetsApi />);
  
  const selectElement = getByTestId('column-filter');
  const comparisonElement = getByTestId('comparison-filter');
  const valueElement = getByTestId('value-filter');
  
  fireEvent.change(selectElement, { target: { value: 'population' } });
  
  fireEvent.change(comparisonElement, { target: { value: 'maior que' } });
  
  const numericValue = 0;
  expect(valueElement).toHaveValue(numericValue);
});