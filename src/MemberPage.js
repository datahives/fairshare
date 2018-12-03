import React, { Component } from 'react';
import { Button, Card, Elevation, H3, Icon, Intent, Label,Overlay } from '@blueprintjs/core';
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
                {this.props.member.avatar}
                <H3 style={{marginLeft: "20px", lineHeight: "45px"}}>{this.props.member.name}</H3>
            </div>
            <div className="flexRightHorizontal">
                <Button icon="edit">Edit</Button>
            </div>
          </Card>  
        );
    }
}

class NewMemberCard extends Component {

    constructor(props){
        super(props);

        this.state = {
            showdialog: false,
            name: '',
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleOpen(){
        this.setState({
            showdialog: true,
        });
    }

    handleClose(){
        this.setState({
            showdialog: false,
        });
    }

    onChange(event){
        this.setState({
            name: event.target.value,
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
                                <H3>Add Participant</H3>
                                <Label>
                                    Name
                                    <input className="bp3-input bp3-fill" type="text" placeholder="Name" onChange={this.onChange}/>
                                </Label>
                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.DANGER} fill onClick={this.handleClose}>Cancel</Button>
                                <Button intent={Intent.PRIMARY} fill onClick={()=>{this.setState({showdialog: false}); this.props.handleAddMember(this.state.name)}}>Add</Button>
                            </div>
                        </div>
                        
                    </Card>
                </Overlay>
            </Card>
        );
    }
}

class MemberPage extends Component {
    render(){
        const MemberList = this.props.members.map(member=>{
            return (
                <MemberCard key={member.id} member={member}/>
            );
        });
        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    {MemberList}
                    <NewMemberCard handleAddMember={this.props.handleAddMember}/>
                </div>
                <BottomBar handleBackPage={this.props.handleBackPage} handleNextPage={this.props.handleNextPage}/>
            </div>
        );
    }
}

export default MemberPage;