import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const styles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    button: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
})

class MemberList extends Component {

    render(){
        return (
            <div className={this.props.classes.root}>
                <List>
                    {this.props.members.map((member)=>{
                        return (
                            <ListItem key={member.name} button onClick={()=>this.props.handleDialogPage(3, member)}>
                                <ListItemText primary={member.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete member" onClick={()=>this.props.handleDeleteMember(member)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
                    
                <Button variant="fab" 
                    onClick={()=>this.props.handleDialogPage(3, null)}
                    color="primary" aria-label="Add" 
                    className={this.props.classes.button}>
                    <PersonAddIcon/>
                </Button>
            </div>
        )
    }
}

MemberList.PropTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MemberList)