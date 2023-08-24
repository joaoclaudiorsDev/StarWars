export const fetchData = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
