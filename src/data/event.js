const baileImage = require('../../assets/images/baile-da-norte.jpg');

// Replace this local object with `api.get('/eventos/:id')` when the API is available.
export const event = {
  id: 'placeholder-1',
  title: 'Baile da Norte',
  date: 'HOJE',
  time: '20H',
  location: 'Casa de Cultura da Brasil\u00E2ndia',
  address: 'R. Miramb\u00E1, 327 - Brasil\u00E2ndia, SP',
  distance: '2,3 km de voc\u00EA',
  image: baileImage,
  // Add local event photos here later without changing the carousel.
  images: [baileImage, baileImage, baileImage],
  likes: 256,
  comments: 32,
  description: 'O melhor baile da zona norte!\nMuita m\u00FAsica, cultura e conex\u00E3o.\nChega junto e fortalece!',
  attractions: [
    { id: '1', name: 'DJ KM', image: baileImage },
    { id: '2', name: 'MC Luanna', image: baileImage },
    { id: '3', name: 'DJ Guuh', image: baileImage },
    { id: '4', name: 'MC Kako', image: baileImage },
  ],
};
