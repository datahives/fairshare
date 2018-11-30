import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Button, Intent } from '@blueprintjs/core';

class SplashPage extends Component {
    render(){
        return(
            <div className="fullview">
                <div className="centerVertical">
                    <div className="centerHorizontal">
                        <div className="splashTitle">
                            I'm full!<br/>
                            It's time to pay the bill.
                        </div>
                    </div>
                    <div className="centerHorizontal">
                        <Button large intent={Intent.PRIMARY} onClick={()=>{}}>
                            Let's pay!
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SplashPage;