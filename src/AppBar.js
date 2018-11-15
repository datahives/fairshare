import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    bottomRemark: {
        position: "fixed",
        bottom: 0
    }
}

class ButtonAppBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            menuDrawerOpen: false
        }

        this.openDrawer = this.openDrawer.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
    }

    openDrawer = ()=>{
        this.setState({
            menuDrawerOpen: true
        })
    }

    closeDrawer = () =>{
        this.setState({
            menuDrawerOpen: false
        })
    }

    render(){
        const menu = (
            <div className={this.props.classes.list}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Start over"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemText primary="About Fair Share"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Fair Share on Github"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Datahives Opensource"/>
                    </ListItem>
                </List>
                <div className={this.props.classes.bottomRemark}>
                    <Typography variant="overline">
                        Made with ❤️ by <br/><a href="#">Datahives Opensource</a>
                    </Typography>
                </div>
            </div>
        )

        return (
            <div className={this.props.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={this.props.classes.menuButton} 
                            color="inherit"
                            onClick={this.openDrawer} aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" 
                            color="inherit"
                            className={this.props.classes.grow}>
                            Fair Share
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={this.state.menuDrawerOpen} onClose={this.closeDrawer}>
                    <div
                        tabIndex={0}
                        role='button'
                    >
                        {menu}
                    </div>
                </Drawer>
            </div>
        )
    }
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)