import React, { Component } from 'react';
import { Button, Card, Elevation, H3, H5 } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Avatar from './Avatar';

class AvatarList extends Component{
    render(){
        return(
            <div className="flexLeftHorizontal" style={{width: "100%"}}>
                <Avatar label="MN" bgcolor="blue" color="white"/>
                <Avatar label="MN" bgcolor="blue" color="white"/>
            </div>
        );
    }
}

class ItemCard extends Component {
    render(){
        return(
          <Card className="card" interactive={true} elevation={Elevation.TWO}>
            <H3>Item name</H3>
            <H5>Food</H5>

            <p>100 THB</p>

            <AvatarList/>

            <div className="flexRightHorizontal">
                <Button icon="edit">Edit</Button>
            </div>
          </Card>  
        );
    }
}

class ItemPage extends Component {
    render(){
        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    <ItemCard/>
                    <ItemCard/>
                </div>
                <BottomBar/>
            </div>
        );
    }
}

export default ItemPage;