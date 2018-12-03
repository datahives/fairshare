import React, { Component } from 'react';
import { Button, Card, Elevation, H3 } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Avatar from './Avatar';

class MemberCard extends Component {
    render(){
        return(
          <Card className="card" interactive={true} elevation={Elevation.TWO}>
            <div className="flexLeftHorizontal">
                <Avatar label="MN" bgcolor="blue" color="white"/>
                <H3 style={{marginLeft: "20px", lineHeight: "45px"}}>Member name</H3>
            </div>
            <div className="flexRightHorizontal">
                <Button icon="edit">Edit</Button>
            </div>
          </Card>  
        );
    }
}

class MemberPage extends Component {
    render(){
        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    <MemberCard/>
                    <MemberCard/>
                </div>
                <BottomBar handleBackPage={this.props.handleBackPage} handleNextPage={this.props.handleNextPage}/>
            </div>
        );
    }
}

export default MemberPage;