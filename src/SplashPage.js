import React, { Component } from 'react';
import {
    Box, 
    Button,
    Heading
} from 'grommet';

class SplashPage extends Component{
    render(){
        return (
            <Box
                fill
                flex
                direction="row"
                align="center"
                background="brand"
                margin={{"vertical": "0", "horizontal": "0"}}
            >
                <Box
                    direction="column"
                    flex
                    align="center"
                >
                    <Heading level="1" size="small" color="light-1" textAlign="center">
                        I'm full! <br/>
                        It's time to pay the bill.
                    </Heading>
                    <Button
                        primary
                        color="accent1"
                        label="Let's pay"
                        margin="large"
                        onClick={()=>{}}
                        {...this.props}
                    />          
                </Box>
            </Box>
        )
    }
}

export default SplashPage;