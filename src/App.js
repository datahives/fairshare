import React, { Component } from 'react';
import './App.css';
// import { Button } from '@blueprintjs/core';

import SplashPage from './SplashPage';
import MemberPage from './MemberPage';
import ItemPage from './ItemPage';
import SummaryPage from './SummaryPage';

class App extends Component {
  state = {
    page: 3
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
        renderedPage = <ItemPage/>;
        break;
      case 3:
        renderedPage = <SummaryPage/>;
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
