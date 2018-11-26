import React, { Component } from 'react';
import {
    Box,
    Button,
    Heading
} from 'grommet';
import './App.css';

import AppBar from './AppBar';
import App from './App';

class MemberCard extends Component {
    render(){
        return(
            <Box
                className="Card"
                elevation="medium"
            >
                {this.props.children}
            </Box>
        )
    }
}

class MemberPage extends Component {
    render(){
        return(
            <Box fill>
                <AppBar/>
                <Box
                    fill
                    align="center"
                    direction="row-responsive"
                >
                    <MemberCard/>
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                    <MemberCard />
                </Box>
            </Box>
        )
    }
}

export default MemberPage;