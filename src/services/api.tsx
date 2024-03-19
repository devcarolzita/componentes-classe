const apiKey = import.meta.env.VITE_API_KEY;
type Photo = {
  photographer: string;
  src: {
    large: string;
  }
};

export const fetchImages = async (category: string) => {
  const apiUrl = `https://api.pexels.com/v1/search?query=${category}&per_page=5&orientation=landscape&size=large`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar as imagens');
    }

    const data = await response.json();
    const images = data.photos.map((photo: Photo) => ({img: photo.src.large, author: photo.photographer }));
    return images;
  } catch (error) {
    console.error('Erro ao buscar as imagens:', error);
    throw error;
  }
};
