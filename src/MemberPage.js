import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';

class MemberPage extends Component {
    render(){
        return(
            <div className="fullview">
                <AppBar/>
                Member page
                <BottomBar/>
            </div>
        );
    }
}

export default MemberPage;