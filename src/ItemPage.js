import React, { Component } from 'react';
import { Button, 
         Card, 
         Checkbox,
         Divider,
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

const sha256 = require('js-sha256');

class AvatarList extends Component{
    render(){
        return(
            <div className="flexLeftHorizontal" style={{width: "100%"}}>
                {this.props.avatars}
            </div>
        );
    }
}

class ItemCard extends Component {
    render(){
        const avatarlist = this.props.members.map(member=>{
            if (this.props.item.paidby.indexOf(member.id)!==-1){
                return member.avatar;
            }
        });

        return(
          <Card className="card" interactive={true} elevation={Elevation.TWO}>
            <H3>{this.props.item.name}</H3>
            <H5>{(this.props.item.type==="surcharge")?"Surcharge":"Item"}</H5>

            <p>{this.props.item.value} {(this.props.item.type==="surcharge")?"% = ":"THB"}
               {(this.props.item.type==="surcharge")?this.props.totalItemValue * this.props.item.value / 100: null}
            </p>

            <AvatarList avatars={avatarlist}/>

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
            paidby: [],
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

    onPaidByChange = (list)=>{
        this.setState({
            paidby: list,
        });
    }
    
    onConfirm = ()=>{
        const newItem = {
            id: sha256((new Date()).getTime().toString()),
            name: this.state.name,
            type: this.state.type,
            value: this.state.value,
            paidby: this.state.paidby,
        };

        this.props.handleAddItem(newItem);
        this.setState({
            showdialog: false,
            name: '',
            type: 'item',
            value: 0,
            paidby: [],
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
                                    <MemberSelect members={this.props.members} paidby={this.state.paidby} onPaidByChange={this.onPaidByChange}/>
                                </Label>
                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.DANGER} fill onClick={this.handleClose}>Cancel</Button>
                                <Button intent={Intent.PRIMARY} fill onClick={this.onConfirm}>Add</Button>
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
            selected: this.props.paidby,
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

    handleSelect = (event, id)=>{
        const idx = this.state.selected.indexOf(id);
        const list = this.state.selected;
        if(event.target.checked && idx=== -1){
            list.push(id);
        }else{
            list.splice(idx,1);
        }
        this.setState({
            selected: list,
        });
        this.props.onPaidByChange(list);
    }

    render(){

        const memberList = this.props.members.map(member=>{
            return (
                <div>
                    <div className="flexLeftHorizontal" style={{alignItems:"baseline"}}>
                        <Checkbox 
                            checked={(this.state.selected.indexOf(member.id)!==-1)?true:false}
                            onChange={(event)=>{this.handleSelect(event,member.id)}}/> 
                        {member.avatar} 
                        {member.name}
                    </div>
                    <Divider/>
                </div>
            );
        });

        return(
            <div>
                <Button fill onClick={this.handleOpen}>{this.props.paidby.length} {(this.props.paidby.length>1)?"participants":"participant"}</Button>
                <Overlay isOpen={this.state.showdialog}>
                    <Card className="dialog" elevation={Elevation.THREE} style={{height: "80%"}}>
                        <div className="flexSpanVertical" style={{height: "100%"}}>
                            <div>
                                <H3>Select participants</H3>
                                {memberList}
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
        let totalItemValue = 0;
        this.props.items.forEach(item=>{
            if(item.type==="item"){
                totalItemValue = totalItemValue+item.value;
            }
        })

        const itemList = this.props.items.map(item=>{
            return(
                <ItemCard key={item.id} 
                    members={this.props.members}
                    item={item} 
                    totalItemValue={totalItemValue}/>
            );
        })

        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    {itemList}
                    <NewItemCard members={this.props.members} handleAddItem={this.props.handleAddItem}/>
                </div>
                <BottomBar handleBackPage={this.props.handleBackPage} handleNextPage={this.props.handleNextPage}/>
            </div>
        );
    }
}

export default ItemPage;