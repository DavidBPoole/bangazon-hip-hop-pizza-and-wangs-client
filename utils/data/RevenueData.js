import { clientCredentials } from '../client';

const getRevenues = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/revenues`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching revenue data:', error);
      reject(error);
    });
});

const createRevenue = (revenue) => new Promise((resolve, reject) => {
  console.warn('Sending Revenue Data:', revenue);
  fetch(`${clientCredentials.databaseURL}/revenues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(revenue),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getRevenues, createRevenue };
