import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

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
    centered: {
        textAlign: "center"
    },
    bigText: {
        fontSize: "1.5em"
    }
})

class SummaryPage extends Component {

    render(){
        const membercards = this.props.members.map(member => {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            {member.name}
                        </Typography>
                    </CardContent>
                </Card>
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