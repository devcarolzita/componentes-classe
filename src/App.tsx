import React from 'react';
import './App.css';
import Carousel from './components/carousel';

type AppState = {
  showCarousel: boolean;
  currentCategory: string;
};

class App extends React.Component<object, AppState> {
  state = {
    showCarousel: true,
    currentCategory: 'hd'
  }
  componentDidMount() {
    console.log('O componente concluiu a render');
  }

  toggleCarousel = () => {
    console.log('O componente atualizou a render');
    this.setState((prev) => ({
        showCarousel: !prev.showCarousel
    }))
  };

  updateCategory = () => {
    const categories = ['sports', 'sky', 'nature', 'cats', 'dogs', 'ducks', 'code', 'sloth'];
    const randomIndex = Math.floor(Math.random() * categories.length);
    this.setState({
      currentCategory: categories[randomIndex],
    });
  };

  render() {
    console.count('RENDERIZOU O APP');
    const {showCarousel, currentCategory} = this.state;
    return (
      <>
        <div className="wrapper">
          <h2>Carrossel de imagens</h2>
          <button onClick={this.toggleCarousel}>Toggle Carousel</button>
          
          {showCarousel && <Carousel
              category={currentCategory}
              onUnmount={ this.updateCategory }
            />}
          
        </div>
      </>
    );
  }
}

export default App;
