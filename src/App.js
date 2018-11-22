import React, { Component } from 'react'
import logo from './logo.svg'
import Avatar from '@material-ui/core/Avatar'
import deepPurple from '@material-ui/core/colors/deepPurple'
import './App.css'

import ButtonAppBar from './AppBar'
import MemberPage from './MemberPage'
import MemberEdit from './MemberEdit'
import ItemPage from './ItemPage'
import ItemEdit from './ItemEdit'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      page: 1,
      members: [
        {
          name: "Me",
          avatar: (
            <Avatar
              style={{ backgroundColor: deepPurple[500]}}
            >M</Avatar>),
        },
      ],
      items : [
        {
          name: "Service charge",
          price: 0,
          value: 0.1,
          type: "addition",
        },
        {
          name: "VAT",
          price: 0,
          value: 0.07,
          type: "addition",
        }
      ],
    }

    this.handleTapChange = this.handleTapChange.bind(this)
    this.handleDialogPage = this.handleDialogPage.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
    this.handleEditMember = this.handleEditMember.bind(this)
    this.handleDeleteMember = this.handleDeleteMember.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  handleTapChange = (event, page)=>{
    this.setState({
      page: page
    })
  }

  handleDialogPage = (page, target)=>{
    this.setState({
      page: page,
      target: target
    })
  }

  handleAddMember = (member)=>{
    let members = this.state.members
    members.push(member)
    this.setState({
      page: 0,
      members: members
    })
  }

  handleEditMember = (newmember, oldmember)=>{
    const idx = this.state.members.indexOf(oldmember)
    let members = this.state.members
    members[idx] = newmember
    this.setState({
      page: 0,
      members: members
    })
  }

  handleDeleteMember = (oldmember)=>{
    const idx = this.state.members.indexOf(oldmember)
    let members = this.state.members
    members.splice(idx,1)
    this.setState({
      page: 0,
      members: members
    })
  }

  handleAddItem = (item)=>{
    let items = this.state.items
    items.push(item)
    this.setState({
      page: 1,
      items: items
    })
  }

  handleEditItem = (newitem, olditem)=>{
    const idx = this.state.items.indexOf(olditem)
    let items = this.state.items
    items[idx] = newitem
    this.setState({
      page: 1,
      items: items
    })
  }

  handleDeleteItem = (olditem)=>{
    const idx = this.state.items.indexOf(olditem)
    let items = this.state.items
    items.splice(idx,1)
    this.setState({
      page: 1,
      items: items
    })
  }

  render() {

    let page
    switch (this.state.page){
      case 0: 
        page = <MemberPage members={this.state.members} handleDialogPage={this.handleDialogPage} handleDeleteMember={this.handleDeleteMember}/> 
        break
      case 1:
        page = <ItemPage items={this.state.items} handleDialogPage={this.handleDialogPage}  handleDeleteItem={this.handleDeleteItem}/>
        break
      case 2:
        page = <div>Summary page</div>
        break
      case 3:
        page = <MemberEdit target={this.state.target} handleAddMember={this.handleAddMember} handleEditMember={this.handleEditMember}/>
        break
      case 4:
        page = <ItemEdit target={this.state.target} handleAddItem={this.handleAddItem} handleEditItem={this.handleEditItem}/>
        break
      default:
        page = <div>Default page</div>
    }

    return (
      <div className="App">
        <ButtonAppBar page={this.state.page} handleTapChange={this.handleTapChange}/>
        {page}
      </div>
    );
  }
}

export default App;
