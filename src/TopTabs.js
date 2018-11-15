import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = {
    root: {
        flexGrow: 1,
    }
}

class TopTaps extends Component {
    render(){
        return (
            <Tabs value={this.props.value} 
                onChange={this.props.handleTapChange}
                centered>
                <Tab label="Members"/>
                <Tab label="Items"/>
                <Tab label="Summary"/>
            </Tabs>
        )
    }
}

TopTaps.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(TopTaps)