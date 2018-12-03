import React, { Component } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

class Avatar extends Component{
    render(){
        return(
            <div className="Avatar" 
                style={{
                    backgroundColor:this.props.bgcolor,
                    color: this.props.color
                    }}>
                {this.props.label}
            </div>
        );
    }
}

export default Avatar;