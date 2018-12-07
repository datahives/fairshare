import React, { Component } from 'react';
import { Button, Card, Divider, Elevation, H3, H5, Label, Overlay, NumericInput, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

import AppBar from './AppBar';
import BottomBar from './BottomBar';

function roundToTwoDecimal(value){
    return Math.round(value *100) /100;
}

class TotalSummaryCard extends Component{
    render(){
        const balance = this.props.pot - this.props.totalItemValue;
        let color = "black";
        if(balance>0){
            color = "#3FA57A";
        }else if(balance<0){
            color = "red";
        }

        return(
            <Card className="card" interactive={true} elevation={Elevation.TWO}>
                <div className="flexTopVertical">
                    <H5>Total</H5>
                    <H3>{roundToTwoDecimal(this.props.totalItemValue)} THB</H3>
                    <Divider/>
                    <H5>Pot</H5>
                    <H3>{roundToTwoDecimal(this.props.pot)} THB</H3>
                    <Divider/>
                    <H5>Balance</H5>
                    <H3 style={{color:color}}>{roundToTwoDecimal(balance)} THB</H3>
                </div>
            </Card>
        );
    }
}

class MemberSummaryCard extends Component{
    constructor(props){
        super(props);

        this.state = {
            pot: 0,
        };
    }

    computeMemberDebt = ()=>{
        let totalItemValue=0;
        this.props.items.forEach(item=>{
            if(item.paidby.indexOf(this.props.member.id)!==-1){
                if(item.type==="item"){
                    totalItemValue = totalItemValue + (item.value / item.paidby.length);
                }
            }
            if(item.type==="surcharge"){
                totalItemValue = totalItemValue + (totalItemValue*item.value /100);
            }
        });
        return totalItemValue;
    }

    updateMemberPot = (value)=>{
        let pot = this.state.pot;
        pot = pot + value;
        this.setState({
            pot: pot,
        });
    }

    render(){
        const debt = this.computeMemberDebt();
        const balance = this.state.pot - debt;
        let color = "black";
        if(balance > 0){
            color = "#3FA57A";
        }else if(balance < 0){
            color = "red";
        }

        return(
            <Card className="card" interactive={true} elevation={Elevation.TWO}>
                <div className="flexLeftHorizontal">
                    {this.props.member.avatar}
                    <div className="flexTopVertical">
                        <H3 style={{lineHeight: "45px"}}>{this.props.member.name}</H3>
                        <H5>{roundToTwoDecimal(debt)} THB</H5>
                        <p>Paid: {roundToTwoDecimal(this.state.pot)} THB</p>
                        <p style={{color:color}}>Balance: {roundToTwoDecimal(balance)} THB</p>
                    </div>
                </div>
                <PayButtons updatePot={this.updateMemberPot} {...this.props}/>
            </Card>
        )
    }
}

class PayButtons extends Component {
    constructor(props){
        super(props);

        this.state = {
            showPayDialog: false,
            showChangeDialog: false,
            payValue: 0,
            changeValue: 0,
        };
    }

    openPayDialog = ()=>{
        this.setState({
            showPayDialog: true,
        });
    }

    closePayDialog = ()=>{
        this.setState({
            showPayDialog: false,
        });
    }

    onPay = ()=>{
        this.props.updatePot(this.state.payValue);
        this.props.updateTotalPot(this.state.payValue);
        this.setState({
            payValue: 0,
            showPayDialog: false,
        });
    }

    openChangeDialog = ()=>{
        this.setState({
            showChangeDialog: true,
        });
    }

    closeChangeDialog = ()=>{
        this.setState({
            showChangeDialog: false,
        });
    }

    onChange = ()=>{
        this.props.updatePot(-this.state.changeValue);
        this.props.updateTotalPot(-this.state.changeValue);
        this.setState({
            changeValue: 0,
            showChangeDialog: false,
        })
    }

    render(){
        return(
            <div className="flexRightHorizontal">
                <Button icon="upload" fill onClick={this.openPayDialog}>Pay</Button>
                <Button icon="download" fill onClick={this.openChangeDialog}>Change</Button>
                <Overlay isOpen={this.state.showPayDialog}>
                    <Card className="dialog" elevation={Elevation.THREE}>
                        <div className="flexSpanVertical" style={{height: "100%"}}>
                            <div>
                                <H3>Pay</H3>
                                <Label>
                                    {this.props.member.name} is paying
                                    <NumericInput fill value={this.state.payValue} onValueChange={(value)=>this.setState({payValue: value})}/>
                                </Label>
                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.NONE} fill onClick={this.closePayDialog}>Cancel</Button>
                                <Button intent={Intent.PRIMARY} fill onClick={this.onPay}>Pay</Button>
                            </div>
                        </div>
                    </Card>
                </Overlay>
                <Overlay isOpen={this.state.showChangeDialog}>
                    <Card className="dialog" elevation={Elevation.THREE}>
                        <div className="flexSpanVertical" style={{height: "100%"}}>
                            <div>
                                <H3>Change</H3>
                                <Label>
                                    {this.props.member.name} is getting changed of
                                    <NumericInput fill value={this.state.changeValue} onValueChange={(value)=>this.setState({changeValue: value})}/>
                                </Label>
                            </div>
                            <div className="flexRightHorizontal">
                                <Button intent={Intent.NONE} fill onClick={this.closeChangeDialog}>Cancel</Button>
                                <Button intent={Intent.PRIMARY} fill onClick={this.onChange}>Pay</Button>
                            </div>
                        </div>
                    </Card>
                </Overlay>
            </div>
        );
    }
}

class SummaryPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            pot: 0,
        };
    }

    computeTotalPrice = ()=>{
        let totalItemValue = 0;
        this.props.items.forEach(item=>{
            if(item.type==="item"){
                totalItemValue = totalItemValue + item.value;
            }
        });

        this.props.items.forEach(item=>{
            if(item.type==="surcharge"){
                const addon = (totalItemValue*item.value /100);
                totalItemValue = totalItemValue + addon;
            }
        });
        
        return totalItemValue;
    }

    updateTotalPot = (value)=>{
        let pot = this.state.pot;
        pot = pot + value;
        this.setState({
            pot: pot,
        });
    }

    render(){
        const memberList = this.props.members.map(member=>{
            return(
                <MemberSummaryCard key={member.id}
                    member={member}
                    updateTotalPot={this.updateTotalPot}
                    {...this.props}/>
            );
        });

        return( 
            <div className="fullview">
                <AppBar title="Summary"/>
                <div className="contentpane">
                    <TotalSummaryCard totalItemValue={this.computeTotalPrice()} pot={this.state.pot}/>
                    {memberList}
                </div>
                <BottomBar handleBackPage={this.props.handleBackPage}/>
            </div>
        );
    }
}

export default SummaryPage;