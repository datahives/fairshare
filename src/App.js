import React, { Component } from 'react';
import './App.css';
// import { Button } from '@blueprintjs/core';

import Avatar from './Avatar';
import SplashPage from './SplashPage';
import MemberPage from './MemberPage';
import ItemPage from './ItemPage';
import SummaryPage from './SummaryPage';

const randomcolor = require('randomcolor');
const sha256 = require('js-sha256');

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      page: 1,
      members: [],
      items: [],
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.addMember = this.addMember.bind(this);
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

  addMember(member){
    let members = this.state.members;
    members.push(member);
    this.setState({
      members: members,
    });
  }

  addItem = (item)=>{
    let items = this.state.items;
    items.push(item);
    this.setState({
      items: items,
    });
  }

  render() {
    let renderedPage;
    switch(this.state.page){
      case 0:
        renderedPage = <SplashPage handleNextPage={this.nextPage}/>;
        break;
      case 1:
        renderedPage = <MemberPage 
          members={this.state.members}
          handleBackPage={this.previousPage} 
          handleNextPage={this.nextPage} 
          handleAddMember={this.addMember}/>;
        break;
      case 2:
        renderedPage = <ItemPage 
          members={this.state.members}
          items={this.state.items}
          handleBackPage={this.previousPage} 
          handleNextPage={this.nextPage}
          handleAddItem={this.addItem}/>;
        break;
      case 3:
        renderedPage = <SummaryPage handleBackPage={this.previousPage} handleNextPage={this.nextPage}/>;
        break;
      default:
        renderedPage = <div><strong>Four-oh-Four | 404 </strong></div>;
    }

    return (
      <div className="App">
        {renderedPage}
      </div>
    );
  }
}

export default App;
