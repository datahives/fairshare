import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyle, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'

const styles = (theme)=>({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit*2,
        paddingBottom: theme.spacing.unit*2,
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    }
})

class ItemEdit extends Component {
    constructor(props){
        super(props)

        this.state = {
            isExist: (!this.props.target)?false:true,
            name: (!this.props.target)?"":this.props.target.name,
            price: (!this.props.target)?"":this.props.target.price,
            value: (!this.props.target)?"":this.props.target.value,
            type: (!this.props.target)?"item":this.props.target.type,
            payby: (!this.props.target) ? this.props.members.slice() : this.props.target.payby,
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
        this.onPriceChange = this.onPriceChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
        this.onPaybyChange = this.onPaybyChange.bind(this)
        this.onApply = this.onApply.bind(this)
    }

    onNameChange = (e)=>{
        this.setState({
            name: e.target.value
        })
    }

    onTypeChange = (e)=>{
        this.setState({
            type: e.target.value
        })
    }

    onPriceChange = (e)=>{
        if(!isNaN(e.target.value)){
            this.setState({
                price: e.target.value
            })    
        }
    }

    onValueChange = (e)=>{
        if(!isNaN(e.target.value)){
            this.setState({
                value: e.target.value / 100
            })    
        }
    }

    onPaybyChange = (event)=>{
        let payby = event.target.value
        if (!Array.isArray(payby)){
            payby = [payby]
        }
        console.log(payby)
        this.setState({ payby: payby})
    }

    onApply = (e)=>{
        e.preventDefault()
        if(this.state.name!==""){
            if(!this.state.isExist){
                const newItem = {
                    name: this.state.name,
                    type: this.state.type,
                    price: this.state.price,
                    value: this.state.value,
                    payby: this.state.payby,
                }
                this.props.handleAddItem(newItem)
            }else{
                const newItem = this.props.target
                newItem.name = this.state.name
                newItem.type = this.state.type
                newItem.price = this.state.price
                newItem.value = this.state.value
                newItem.payby = this.state.payby
                this.props.handleEditItem(newItem, this.props.target)
            }
            
        }
    }

    render(){

        const memberList = this.props.members.map(member=>{
            return(
                <MenuItem key={member.name} value={member}>
                    {member.avatar}
                    {member.name}
                </MenuItem>
            )
        })

        console.log(this.state.payby)

        return(
            <div>
                <Paper className={this.props.classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        { (!this.state.isExist)?"Add new item": "Edit "+this.props.target.name}
                    </Typography>
                    <TextField
                        id="item-name"
                        label="Name"
                        value={this.state.name}
                        placeholder="Item name"
                        fullWidth
                        onChange={this.onNameChange}
                    />
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={this.state.type}
                        inputProps={{
                            name: "type",
                            id: "type-select"
                        }}
                        fullWidth
                        onChange={this.onTypeChange}
                    >
                        <MenuItem value="item">Item</MenuItem>
                        <MenuItem value="addition">Addition</MenuItem>
                    </Select>
                    {(this.state.type==="item")?(
                        <TextField
                        id="item-price"
                        label="Price"
                        value={this.state.price}
                        placeholder="Item price"
                        fullWidth
                        onChange={this.onPriceChange}
                        />
                    ):(
                        <TextField
                        id="item-value"
                        label="Value"
                        value={Math.floor(this.state.value*100)}
                        placeholder="Addition value (%)"
                        fullWidth
                        onChange={this.onValueChange}
                        />
                    )}
                    <InputLabel>Pay by</InputLabel>
                    <Select
                        multiple
                        fullWidth
                        onChange={this.onPaybyChange}
                        value={this.state.payby}
                        renderValue={selected => {
                            return(
                                <div>
                                    {selected.map(member => {
                                        return <Chip
                                            avatar={member.avatar}
                                            label={member.name}
                                        />
                                    })  }
                                </div>
                            )           
                        }}
                    >
                        {memberList}
                    </Select>

                    <Button variant="contained" color="primary" className={this.props.classes.button}
                        onClick={this.onApply}
                    >
                        Apply
                    </Button>
                </Paper>
            </div>
        )
    }
}

ItemEdit.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemEdit)