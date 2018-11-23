import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import indigo from '@material-ui/core/colors/indigo'

const styles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    sectionhead: {
        margin: theme.spacing.unit * 2
    },
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    normalbutton: {
        margin: theme.spacing.unit
    },
    centered: {
        textAlign: "center"
    },
    bigText: {
        fontSize: "1.5em"
    },
})

const getMemberPayAmount = (member, items) => {
    let amountPayable = 0
    items.forEach(item=>{
        if(item.payby.indexOf(member)!==-1){
            amountPayable+=(parseInt(item.price)/item.payby.length)
        }
    })
    return amountPayable
}

class MemberCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            showPayDialog: false,
            showChangeDialog: false,
            paidAmount: 0,
            changeAmount: 0,
        }

        this.handlePayButton = this.handlePayButton.bind(this)
        this.handleChangeDialog = this.handleChangeDialog.bind(this)
        this.handleChangePayAmount = this.handleChangePayAmount.bind(this)
        this.handleChangeChangeAmount = this.handleChangeChangeAmount.bind(this)
        this.handlePayConfirmation = this.handlePayConfirmation.bind(this)
        this.handleChangeConfirmation = this.handleChangeConfirmation.bind(this)
    }

    handlePayButton(){
        this.setState({
            showPayDialog: !this.state.showPayDialog
        })
    }

    handleChangeDialog(){
        this.setState({
            showChangeDialog: !this.state.showChangeDialog
        })
    }

    handleChangePayAmount(event){
        this.setState({
            paidAmount: event.target.value
        })
    }

    handleChangeChangeAmount(event){
        this.setState({
            changeAmount: event.target.value
        })
    }

    handlePayConfirmation(){
        this.props.handlePayMember(this.props.member, this.state.paidAmount)
        this.setState({
            paidAmount: 0,
            showPayDialog: false
        })
    }

    handleChangeConfirmation(){
        this.props.handleChangeMember(this.props.member, this.state.changeAmount)
        this.setState({
            changeAmount: 0,
            showChangeDialog: false
        })
    }

    render(){
        const amountPayable = getMemberPayAmount(this.props.member, this.props.items)
        const paidAmount = this.props.member.paidAmount
        const changeAmount = this.props.member.changeAmount
        const balance = paidAmount - amountPayable - changeAmount

        const payDialog = (
            <div>
                <TextField
                    id="pay-amount"
                    label="Pay amount"
                    value={this.state.paidAmount}
                    onChange={this.handleChangePayAmount}
                    type="number"
                    margin="normal"
                />
                <Button className={this.props.classes.normalbutton} variant="contained" size="large" color="primary" onClick={this.handlePayConfirmation}>
                    PAY
                </Button>
            </div>
        )
        const changeDialog = (
            <div>
                <TextField
                    id="pay-amount"
                    label="Pay amount"
                    value={this.state.changeAmount}
                    onChange={this.handleChangeChangeAmount}
                    type="number"
                    margin="normal"
                />
                <Button className={this.props.classes.normalbutton} variant="contained" size="large" color="primary" onClick={this.handleChangeConfirmation}>
                    CHANGE
                </Button>
            </div>
        )

        let statuscolor
        if (balance > 0) {
            statuscolor = indigo[200]
        } else if (balance < 0) {
            statuscolor = red[200]
        }else{
            statuscolor = green[200]
        }

        return (
            <Card style={{ backgroundColor: statuscolor}}>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.member.name}
                    </Typography>
                    <Typography variant="subtitle2">
                        Total: {amountPayable}
                    </Typography>
                    <Typography variant="subtitle2">
                        Paid: {parseInt(this.props.member.paidAmount)}
                    </Typography>
                    <Typography variant="subtitle2">
                        Change: {changeAmount}
                    </Typography>
                    <Typography variant="subtitle2">
                        Balance: {balance}
                    </Typography>
                    <Button className={this.props.classes.normalbutton} variant="outlined" size="large" color="primary" onClick={this.handlePayButton}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                    <Button className={this.props.classes.normalbutton} variant="outlined" size="large" color="secondary" onClick={this.handleChangeDialog}>
                        &nbsp;&nbsp;&nbsp;&nbsp;Change&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                    {(this.state.showPayDialog)?payDialog:null}
                    {(this.state.showChangeDialog)?changeDialog:null}
                </CardContent>
            </Card>
        )
    }
}

class SummaryPage extends Component {

    render(){
        const membercards = this.props.members.map(member => {
            return (
                <MemberCard member={member} items={this.props.items} 
                    classes={this.props.classes}
                    handlePayMember={this.props.handlePayMember}
                    handleChangeMember={this.props.handleChangeMember}/>
            )
        })

        return (
            <div className={this.props.classes.root}>
                <Typography variant="h6" className={this.props.classes.sectionhead}>
                    Summary
                </Typography>

                <Card>
                    <CardContent className={this.props.classes.centered}>
                        <Typography variant="subtitle1" gutterBottom>
                            Total: <span className={this.props.classes.bigText}>355</span>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Pot: <span className={this.props.classes.bigText}>200</span>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Balance: <span className={this.props.classes.bigText}>-155</span>
                        </Typography>
                        
                    </CardContent>
                </Card>

                <Divider/>

                <Typography variant="h6" className={this.props.classes.sectionhead}>
                    Individual
                </Typography>

                {membercards}

            </div>
        )
    }
}

SummaryPage.PropTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SummaryPage)