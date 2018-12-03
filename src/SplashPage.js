import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';

class SplashPage extends Component {
    render(){
        return(
            <div className="fullview">
                <AppBar/>
                <div className="centerVertical">
                    <div className="centerHorizontal">
                        <div className="splashTitle">
                            I'm full!<br/>
                            It's time to pay the bill.
                        </div>
                    </div>
                    <div className="centerHorizontal">
                        <Button large intent={Intent.PRIMARY} onClick={this.props.handleNextPage}>
                            Let's pay!
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SplashPage;