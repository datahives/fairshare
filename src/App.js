import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import ButtonAppBar from './AppBar'
import MemberPage from './MemberPage'
import MemberEdit from './MemberEdit'
import ItemPage from './ItemPage'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      page: 1,
      members: [
        {
          name: "Me",
        },
      ],
      items : [
        {
          name: "Food 1",
          price: 65,
        },
        {
          name: "Food 2",
          price: 45,
        },
        {
          name: "Food 3",
          price: 100,
        }
      ],
      additions: [
        {
          name: "Service charge",
          value: 0.1
        },
        {
          name: "VAT",
          value: 0.07
        }
      ]
    }

    this.handleTapChange = this.handleTapChange.bind(this)
    this.handleDialogPage = this.handleDialogPage.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
    this.handleEditMember = this.handleEditMember.bind(this)
    this.handleDeleteMember = this.handleDeleteMember.bind(this)
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

  render() {

    let page
    switch (this.state.page){
      case 0: 
        page = <MemberPage members={this.state.members} handleDialogPage={this.handleDialogPage} handleDeleteMember={this.handleDeleteMember}/> 
        break
      case 1:
        page = <ItemPage items={this.state.items} additions={this.state.additions}/>
        break
      case 2:
        page = <div>Summary page</div>
        break
      case 3:
        page = <MemberEdit target={this.state.target} handleAddMember={this.handleAddMember} handleEditMember={this.handleEditMember}/>
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
