import React, { Component } from 'react';
import {
    Box,
    Button,
    Text
} from 'grommet';

class AppBar extends Component {
    render(){
        return(
            <Box
                tag="header"
                direction="row"
                justify="between"
                background="accent1"
                pad={{ left: "medium", right: "medium", vertical: "large"}}
                style={{zIndex: '100'}}
            >
                <Text size="medium">
                    Fairshare
                </Text>
            </Box>
        );
    }
}

export default AppBar;