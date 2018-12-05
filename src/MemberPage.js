import React, { Component } from 'react';
import { Button, Card, Elevation, H3, Icon, Intent, Label,Overlay } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';
import Avatar from './Avatar';

const randomcolor = require('randomcolor');
const sha256 = require('js-sha256');

function getInitial(name){
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  }

class MemberCard extends Component {
    render(){
        return(
          <Card className="card" interactive={true} elevation={Elevation.TWO}>
            <div className="flexLeftHorizontal">
                {this.props.member.avatar}
                <H3 style={{marginLeft: "20px", lineHeight: "45px"}}>{this.props.member.name}</H3>
            </div>
            <div className="flexRightHorizontal">
                <EditMemberButton member={this.props.member} handleEditMember={this.props.handleEditMember} handleDeleteMember={this.props.handleDeleteMember}/>
            </div>
          </Card>  
        );
    }
}

class AddMemberCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showdialog: false,
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
            <Card className="card" interactive={true} elevation={Elevation.TWO}>
                <div className="centerVertical" onClick={this.handleOpen}>
                    <div className="centerHorizontal">
                        <Icon icon="plus" iconSize={30}/>
                    </div>
                </div>
                <EditMemberDialog 
                    member={null} 
                    showdialog={this.state.showdialog}
                    handleClose={this.handleClose}
                    {...this.props}/>
            </Card>
        );
    }
}

class EditMemberButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            showdialog: false,
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
                <Button icon="edit" onClick={this.handleOpen}>Edit</Button>
                <EditMemberDialog 
                    showdialog={this.state.showdialog}
                    handleClose={this.handleClose}
                    {...this.props}/>
            </div>
        );
    }

}

class EditMemberDialog extends Component {

    constructor(props){
        super(props);

        const name = (this.props.member)?this.props.member.name:'';
        this.state = {
            name: name,
        };
    }

    onChange = (event)=>{
        this.setState({
            name: event.target.value,
        });
    }

    onConfirm = ()=>{
        const newMember = {
            id: sha256((new Date()).getTime().toString()),
            name: this.state.name,
            avatar: <Avatar label={getInitial(this.state.name)} bgcolor={randomcolor({luminosity: 'light'})} color="black"/>
        };

        if(this.props.member){
            newMember.id = this.props.member.id;
            this.props.handleEditMember(this.props.member,newMember)
        }else{
            this.props.handleAddMember(newMember);
        }
        this.setState({
            name: '',
        });
        this.props.handleClose();
    }

    onDelete = ()=>{
        this.props.handleDeleteMember(this.props.member);
    }

    render(){
        return(
            <Overlay isOpen={this.props.showdialog}>
                <Card className="dialog" elevation={Elevation.THREE}>
                    <div className="flexSpanVertical" style={{height: "100%"}}>
                        <div>
                            <H3>{(this.props.member)?"Edit":"Add"} Participant</H3>
                            <Label>
                                Name
                                <input className="bp3-input bp3-fill" type="text" placeholder="Name" value={this.state.name} onChange={this.onChange}/>
                            </Label>
                        </div>
                        <div className="flexRightHorizontal">
                            <Button intent={Intent.NONE} fill onClick={this.props.handleClose}>Cancel</Button>
                            {(this.props.member)?<Button intent={Intent.DANGER} fill onClick={this.onDelete}>Delete</Button>:null}
                            <Button intent={Intent.PRIMARY} fill onClick={this.onConfirm}>Add</Button>
                        </div>
                    </div>
                    
                </Card>
            </Overlay>
        );
    }
}

class MemberPage extends Component {
    render(){
        const MemberList = this.props.members.map(member=>{
            return (
                <MemberCard key={member.id} 
                    member={member}
                    {...this.props}/>
            );
        });
        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    {MemberList}
                    <AddMemberCard {...this.props}/>
                </div>
                <BottomBar {...this.props}/>
            </div>
        );
    }
}

export default MemberPage;