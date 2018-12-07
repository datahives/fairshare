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
      page: 0,
      members: [],
      items: [],
    };
  }

  nextPage = ()=>{
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage = ()=>{
    this.setState({
      page: this.state.page - 1
    });
  }

  addMember = (member)=>{
    let members = this.state.members;
    members.push(member);
    this.setState({
      members: members,
    });
  }

  editMember = (oldmember, newmember)=>{
    let members = this.state.members;
    const idx = members.indexOf(oldmember);
    members.splice(idx,1,newmember);
    this.setState({
      members: members,
    });
  }

  deleteMember = (member)=>{
    let members = this.state.members;
    const idx = members.indexOf(member);
    members.splice(idx,1);

    let items = this.state.items;
    items.forEach(item=>{
      const ididx = item.paidby.indexOf(member.id);
      if(ididx!==-1){
        item.paidby.splice(ididx,1);
      }
    })

    this.setState({
      members: members,
      items: items,
    });
  }

  addItem = (item)=>{
    let items = this.state.items;
    items.push(item);
    this.setState({
      items: items,
    });
  }

  editItem = (olditem, newitem)=>{
    let items = this.state.items;
    const idx = items.indexOf(olditem);
    items.splice(idx,1,newitem);
    this.setState({
      items: items,
    });
  }

  deleteItem = (item)=>{
    let items = this.state.items;
    const idx = items.indexOf(item);
    items.splice(idx,1);
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
          handleAddMember={this.addMember}
          handleEditMember={this.editMember}
          handleDeleteMember={this.deleteMember}/>;
        break;
      case 2:
        renderedPage = <ItemPage 
          members={this.state.members}
          items={this.state.items}
          handleBackPage={this.previousPage} 
          handleNextPage={this.nextPage}
          handleAddItem={this.addItem}
          handleEditItem={this.editItem}
          handleDeleteItem={this.deleteItem}/>;
        break;
      case 3:
        renderedPage = <SummaryPage 
          members={this.state.members}
          items={this.state.items}
          handleBackPage={this.previousPage} 
          handleNextPage={this.nextPage}/>;
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
