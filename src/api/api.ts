import axios from 'axios';

export const API = {
  getArtworks() {
    return axios.get('https://api.artic.edu/api/v1/artworks');
  },

  searchArtwork(value: string) {
    return axios.get(
      `https://api.artic.edu/api/v1/artworks/search?q=${value}&fields=image_id,title,id,publication_history,artist_display`,
    );
  },
};
