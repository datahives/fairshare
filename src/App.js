import React, { Component } from 'react';
import {Grommet} from 'grommet';
import './App.css';

import SplashPage from './SplashPage';
import MainPage from './MainPage';
import MemberPage from './MemberPage';

const theme = {
  global: {
    colors:{
      brand: "#3FA57A",
      accent1: "#3D138D"
    },
    font: {
      family: 'Open Sans',
      size: '16px',
      height: '14px',
    },
  },
};

class App extends Component {
  state = {
    currentPage: 2,
  };

  render() {
    let renderedPage;
    switch(this.state.currentPage){
      case 0:
        renderedPage = <SplashPage/>;
        break;
      case 1:
        renderedPage = <MainPage/>;
        break;
      case 2:
        renderedPage = <MemberPage/>;
        break;
      case 3:
        renderedPage = <div>Summary</div>;
        break;
      default:
        renderedPage = <div>404</div>;
    }

    return (
      <Grommet theme={theme} full>
        {renderedPage}
      </Grommet>
    );
  }
}

export default App;
