import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

class BottomBar extends Component {
    render(){

        const backButton = (this.props.handleBackPage)?(
            <Button className="bottomBackButton" onClick={this.props.handleBackPage}>Back</Button>
        ):null;
        const nextButton = (this.props.handleNextPage)?(
            <Button className="bottomNextButton" onClick={this.props.handleNextPage}>Next</Button>
        ):null;

        return(
            <div className="bottomBar">
                {backButton}
                {nextButton}
            </div>
        );
    }
}

export default BottomBar;