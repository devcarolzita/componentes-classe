import React from 'react';
import './carousel.css';
import { fetchImages } from '../../services/api';

type CarouselProps = {
  category: string;
  onUnmount: () => void;
};

type Images = {
  img: string,
  author: string,
};

type CarouselState = {
  images: Images[];
  isLoading: boolean;
  currentImageIndex: number;
};

// Pesquisar sobre POO
class Carousel extends React.Component<CarouselProps, CarouselState> {
  private timeID: number | undefined = undefined;

  state = {
    images: [] as Images [],
    isLoading: true,
    currentImageIndex: 0,
  }

  //Funções do ciclo de vida
  async componentDidMount() {
    console.log('Componente foi montado!');
    await this.getImages();
    
   
  }

  componentDidUpdate(prevProps: CarouselProps) {
    console.log('Componente foi atualizado!');

   
  }

  componentWillUnmount() {
    console.log('O componente foi "desmontado" com sucesso. Aconteceu um "acidente".');
    clearInterval(this.timeID);
    this.props.onUnmount();
  }

  getImages = async () => {
    const {category} = this.props;
    const images  = await fetchImages(category);

    console.log('imagens get iamgens', images[0].img);
    
    this.setState(() => ({
      images: images,
      isLoading: false
    }))
    this.timeID = setInterval(() => {
      this.nextImage();
      console.count('Imagem alterada');
    }, 4000);
  };

  // [] avança uma imagem
  nextImage = () => {
    // Primeiro conferir se cheguei no limite
    // Alterar o valor
    this.setState((prev) => ({
      currentImageIndex: (prev.currentImageIndex === prev.images.length - 1 ) ? 0 : prev.currentImageIndex + 1,
    }))
   
    
  };

  // [] volta uma imagem
  previousImage = () => {
    this.setState((prev) => ({
      currentImageIndex: (prev.currentImageIndex  === 0 ) ?  prev.images.length - 1 : prev.currentImageIndex - 1,
    }))
  };

  render() {
    const {isLoading,images, currentImageIndex } = this.state;

    if (isLoading) {
      return <h1>Carregando...</h1>
    }

      return (
        <div className="carousel">
          <button
            className="carousel-button carousel-button-left"
            onClick={ this.previousImage }
          >
            &#8249;
          </button>
  
          <img
            className="carousel-image"
            src={images[currentImageIndex].img}
          />
  
          <button
            className="carousel-button carousel-button-right"
            onClick={ this.nextImage }
          >
            &#8250;
          </button>
        </div>
      );
    }
    
}

export default Carousel;
