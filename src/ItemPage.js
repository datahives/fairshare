import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

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
    }
})

class ItemList extends Component {
    render(){
        const items = this.props.items.filter((item)=>{
            return item.type==="item"
        })
        const addtions = this.props.items.filter((item)=>{
            return item.type==="addition"
        })

        return(
            <div className={this.props.classes.root}>
                <Typography variant="h6" className={this.props.classes.sectionhead}>
                    Food items
                </Typography>
                <List>
                    {items.map((item)=>{
                        return(
                            <ListItem key={item.name} button onClick={()=>this.props.handleDialogPage(4, item)}>
                                <ListItemText primary={item.name} secondary={"Price: "+item.price}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete member" onClick={()=>this.props.handleDeleteItem(item)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>

                <Divider/>
                <Typography variant="h6" className={this.props.classes.sectionhead}>
                    Additions
                </Typography>

                <List>
                    {addtions.map((item)=>{
                        return(
                            <ListItem key={item.name} button onClick={()=>this.props.handleDialogPage(4, item)}>
                                <ListItemText primary={item.name} secondary={"Price: "+Math.floor(item.value*100)+"% = "}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete member" onClick={()=>this.props.handleDeleteItem(item)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>

                <Button variant="fab" 
                    onClick={()=>this.props.handleDialogPage(4, null)}
                    color="primary" aria-label="Add" 
                    className={this.props.classes.button}>
                    <AddIcon/>
                </Button>
            </div>
        )
    }
}

ItemList.PropTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemList)