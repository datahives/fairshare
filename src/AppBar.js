import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';

class AppBar extends Component{
    render(){
        return(
            <div className="AppBar">
                <h1>Fairshare</h1>
            </div>
        );
    }
}

export default AppBar;