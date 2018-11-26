import React, { Component } from 'react';
import './App.css';
import { Button } from '@blueprintjs/core';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button intent="success" text="Click me!" onClick={()=>{}}/>
      </div>
    );
  }
}

export default App;
