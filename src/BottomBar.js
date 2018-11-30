import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

class BottomBar extends Component {
    render(){
        return(
            <div className="bottomBar">
                <Button className="bottomBackButton">Back</Button>
                <Button className="bottomNextButton">Next</Button>
            </div>
        );
    }
}

export default BottomBar;