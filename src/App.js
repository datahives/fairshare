import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import ButtonAppBar from './AppBar'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      page: 0
    }

    this.handleTapChange = this.handleTapChange.bind(this)
  }

  handleTapChange = (event, page)=>{
    this.setState({
      page: page
    })
  }

  render() {
    return (
      <div className="App">
        <ButtonAppBar page={this.state.page} handleTapChange={this.handleTapChange}/>
      </div>
    );
  }
}

export default App;
