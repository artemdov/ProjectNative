import axios from 'axios';

export const API = {
  getData() {
    return axios.get('https://api.artic.edu/api/v1/artworks');
  },
  getQueryData(value: string) {
    return axios.get(
      `https://api.artic.edu/api/v1/artworks/search?q=${value}&fields=image_id,title,id,publication_history,artist_display`,
    );
  },
};
