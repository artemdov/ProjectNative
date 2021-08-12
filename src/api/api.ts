import axios from 'axios';

export const API = {
  getData() {
    return axios.get('https://api.artic.edu/api/v1/artworks');
  },
};
