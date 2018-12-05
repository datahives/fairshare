import React, { Component } from 'react';
import { Button, 
         Card, 
         Elevation, 
         H3, 
         H5, 
         HTMLSelect, 
         Icon, Intent, 
         Label, 
         NumericInput, 
         Overlay } from '@blueprintjs/core';
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

class NewItemCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            showdialog: false,
            name: '',
            type: 'item',
            value: 0,
        };     
    }

    handleOpen = ()=>{
        this.setState({
            showdialog: true,
        });
    }

    handleClose = ()=>{
        this.setState({
            showdialog: false,
        });
    }

    onNameChange = (event)=>{
        this.setState({
            name: event.target.value,
        });
    }

    onTypeChange = (event)=>{
        const type = (event.target.value==="Surcharge")?"surcharge":"item";
        this.setState({
            type: type,
        });
    }

    onPriceChange = (value)=>{
        this.setState({
            value: value,
        });
    }

    render(){
        return(
            <Card className="card" interactive={true} elevation={Elevation.TWO}>
                <div className="centerVertical" onClick={this.handleOpen}>
                    <div className="centerHorizontal">
                        <Icon icon="plus" iconSize={30}/>
                    </div>
                </div>
                <Overlay isOpen={this.state.showdialog}>
                    <Card className="dialog" elevation={Elevation.THREE}>
                        <div className="flexSpanVertical" style={{height: "100%"}}>
                            <div>
                                <H3>Add Item</H3>
                                <Label>
                                    Item name
                                    <input className="bp3-input bp3-fill" type="text" placeholder="Item name" onChange={this.onNameChange}/>
                                </Label>
                                <Label>
                                    Type
                                    <HTMLSelect options={["Item","Surcharge"]} onChange={this.onTypeChange}/>
                                </Label>
                                <Label>
                                    {(this.state.type==="item")?"Price":"Add-on percentage"}
                                    <NumericInput fill min={0} value={this.state.value} onValueChange={this.onPriceChange}/>
                                </Label>
                                <Label>
                                    Paid by
                                    <MemberSelect/>
                                </Label>
                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.DANGER} fill onClick={this.handleClose}>Cancel</Button>
                                <Button intent={Intent.PRIMARY} fill onClick={()=>{}}>Add</Button>
                            </div>
                        </div>
                    </Card>
                </Overlay>
            </Card>
        );
    }
}

class MemberSelect extends Component {
    constructor(props){
        super(props);

        this.state = {
            showdialog: false,
            selected: [],
        };
    }

    handleOpen = ()=>{
        this.setState({
            showdialog: true,
        });
    }

    handleClose = ()=>{
        this.setState({
            showdialog: false,
        });
    }

    render(){
        return(
            <div>
                <Button fill onClick={this.handleOpen}>0 participants</Button>
                <Overlay isOpen={this.state.showdialog}>
                    <Card className="dialog" elevation={Elevation.THREE} style={{height: "80%"}}>
                        <div className="flexSpanVertical" style={{height: "100%"}}>
                            <div>
                                <H3>Select participants</H3>

                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.PRIMARY} fill onClick={this.handleClose}>Back</Button>
                            </div>
                        </div>
                    </Card>
                </Overlay>
            </div>
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
                    <NewItemCard/>
                </div>
                <BottomBar handleBackPage={this.props.handleBackPage} handleNextPage={this.props.handleNextPage}/>
            </div>
        );
    }
}

export default ItemPage;