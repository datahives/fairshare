import React, { Component } from 'react';
import './App.css';
// import { Button } from '@blueprintjs/core';

import SplashPage from './SplashPage';
import MemberPage from './MemberPage';

class App extends Component {
  state = {
    page: 1
  }

  render() {
    let renderedPage;
    switch(this.state.page){
      case 0:
        renderedPage = <SplashPage/>;
        break;
      case 1:
        renderedPage = <MemberPage/>;
        break;
      case 2:
        renderedPage = <div>Items</div>;
        break;
      case 3:
        renderedPage = <div>Summary</div>;
        break;
      default:
        renderedPage = <div>404</div>;
    }

    return (
      <div className="App">
        {renderedPage}
      </div>
    );
  }
}

export default App;
