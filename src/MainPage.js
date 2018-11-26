import React, { Component } from 'react';
import {
    Box,
} from 'grommet';
import './App.css';

import AppBar from './AppBar';

const menumembers = require('./assets/menu-members.png');
const menuitems = require('./assets/menu-items.png');
const menusummary = require('./assets/menu-summary.png');

class MenuCard extends Component {
    render(){
        return (
            <Box
                className="MenuCard"
                elevation="medium"
                style={{ backgroundImage: "url(" + this.props.background+")"}}
            >
                {this.props.children}
            </Box>
            
        );
    }
}

class MainPage extends Component {
    render(){
        return(
            <Box fill>
                <AppBar/>
                <Box
                    fill
                    align="center"
                    direction="column"
                    justify="start"
                >
                    <MenuCard background={menumembers}/>
                    <MenuCard background={menuitems}/>
                    <MenuCard background={menusummary}/>
                </Box>
            </Box>
        );
    }
}

export default MainPage;