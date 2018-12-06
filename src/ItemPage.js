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
                <EditItemButton {...this.props}/>
            </div>
          </Card>  
        );
    }
}

class AddItemCard extends Component {
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
                <EditItemDialog
                    item={null}
                    showdialog={this.state.showdialog}
                    handleClose={this.handleClose}
                    {...this.props}/>
            </Card>
        );
    }
}

class EditItemButton extends Component {
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
                <EditItemDialog
                    showdialog={this.state.showdialog}
                    handleClose={this.handleClose}
                    {...this.props}/>
            </div>
        );
    }
}

class EditItemDialog extends Component {
    constructor(props){
        super(props);

        const name = (this.props.item)?this.props.item.name:'';
        const type = (this.props.item)?this.props.item.type:'item';
        const value = (this.props.item)?this.props.item.value:0;
        const paidby = (this.props.item)?this.props.item.paidby:[];
        this.state = {
            name: name,
            type: type,
            value: value,
            paidby: paidby,
        };     
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

        if(this.props.item){
            newItem.id = this.props.item.id;
            this.props.handleEditItem(this.props.item, newItem);
        }else{
            this.props.handleAddItem(newItem);
        }
        
        if(!this.props.item){
            this.setState({
                name: '',
                type: 'item',
                value: 0,
                paidby: [],
            });
        }
        this.props.handleClose();
    }

    onDelete = ()=>{
        this.props.handleDeleteItem(this.props.item);
    }

    render(){
        return(
            <Overlay isOpen={this.props.showdialog}>
                <Card className="dialog" elevation={Elevation.THREE}>
                    <div className="flexSpanVertical" style={{height: "100%"}}>
                        <div>
                            <H3>{(this.props.item)?"Edit":"Add"} Item</H3>
                            <Label>
                                Item name
                                <input className="bp3-input bp3-fill" type="text" placeholder="Item name" value={this.state.name} onChange={this.onNameChange}/>
                            </Label>
                            <Label>
                                Type
                                <HTMLSelect options={["Item","Surcharge"]} value={(this.state.type==="surcharge")?"Surcharge":"Item"} onChange={this.onTypeChange}/>
                            </Label>
                            <Label>
                                {(this.state.type==="item")?"Price":"Add-on percentage"}
                                <NumericInput fill min={0} value={this.state.value} value={this.state.value} onValueChange={this.onPriceChange}/>
                            </Label>
                            { (this.state.type==="item")?(
                                <Label>
                                    Paid by
                                    <MemberSelect members={this.props.members} paidby={this.state.paidby} onPaidByChange={this.onPaidByChange}/>
                                </Label>
                                ):null }
                            
                        </div>
                        <div className="flexRightHorizontal">
                            <Button intent={Intent.NONE} fill onClick={this.props.handleClose}>Cancel</Button>
                            {(this.props.item)?<Button intent={Intent.DANGER} fill onClick={this.onDelete}>Delete</Button>:null}
                            <Button intent={Intent.PRIMARY} fill onClick={this.onConfirm}>Add</Button>
                        </div>
                    </div>
                </Card>
            </Overlay>
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
                    item={item}
                    totalItemValue={totalItemValue}
                    {...this.props}/>
            );
        })

        return(
            <div className="fullview">
                <AppBar/>
                <div className="contentpane">
                    {itemList}
                    <AddItemCard {...this.props}/>
                </div>
                <BottomBar {...this.props}/>
            </div>
        );
    }
}

export default ItemPage;