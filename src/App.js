import React, { Component } from 'react';
import './App.css';
// import { Button } from '@blueprintjs/core';

import SplashPage from './SplashPage';
import MemberPage from './MemberPage';
import ItemPage from './ItemPage';
import SummaryPage from './SummaryPage';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      page: 0
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage(){
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage(){
    this.setState({
      page: this.state.page - 1
    });
  }

  render() {
    let renderedPage;
    switch(this.state.page){
      case 0:
        renderedPage = <SplashPage handleNextPage={this.nextPage}/>;
        break;
      case 1:
        renderedPage = <MemberPage handleBackPage={this.previousPage} handleNextPage={this.nextPage}/>;
        break;
      case 2:
        renderedPage = <ItemPage handleBackPage={this.previousPage} handleNextPage={this.nextPage}/>;
        break;
      case 3:
        renderedPage = <SummaryPage handleBackPage={this.previousPage} handleNextPage={this.nextPage}/>;
        break;
      default:
        renderedPage = <div><strong>Four-oh-Four | 404</strong></div>;
    }

    return (
      <div className="App">
        {renderedPage}
      </div>
    );
  }
}

export default App;
