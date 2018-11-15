import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyle, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

class MemberEdit extends Component {
    constructor(props){
        super(props)

        this.state = {
            isExist: (!this.props.target)?false:true,
            name: (!this.props.target)?"":this.props.target.name
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onApply = this.onApply.bind(this)
    }

    onNameChange = (e)=>{
        this.setState({
            name: e.target.value
        })
    }

    onApply = (e)=>{
        e.preventDefault()
        if(this.state.name!==""){
            if(!this.state.isExist){
                const newMember = {
                    name: this.state.name
                }
                this.props.handleAddMember(newMember)
            }else{
                const newMember = this.props.target
                newMember.name = this.state.name
                this.props.handleEditMember(newMember, this.props.target)
            }
            
        }
    }

    render(){
        return(
            <div>
                <Paper className={this.props.classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        { (!this.state.isExist)?"Add new member": "Edit "+this.props.target.name}
                    </Typography>
                    <TextField
                        id="member-name"
                        label="Name"
                        value={this.state.name}
                        placeholder="Member name"
                        fullWidth
                        onChange={this.onNameChange}
                    />
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

MemberEdit.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MemberEdit)