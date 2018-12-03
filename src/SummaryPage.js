import React, { Component } from 'react';
import { Button, Card, Elevation, H3, H5 } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Avatar from './Avatar';

class MemberSummaryCard extends Component{
    render(){
        return(
            <Card className="card" interactive={true} elevation={Elevation.TWO}>
                <div className="flexLeftHorizontal">
                    <Avatar label="MN" bgcolor="blue" color="white"/>
                    <div className="flexTopVertical">
                        <H3 style={{lineHeight: "45px"}}>Member name</H3>
                        <H5>500 THB</H5>
                        <p>Paid: 200 THB</p>
                        <p>Balance: -300 THB</p>
                    </div>
                </div>
                <div className="flexRightHorizontal">
                    <Button icon="upload" fill>Pay</Button>
                    <Button icon="download" fill>Change</Button>
                </div>
            </Card>
        )
    }
}

class SummaryPage extends Component {
    render(){
        return( 
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    <MemberSummaryCard/>
                    <MemberSummaryCard/>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

export default SummaryPage;