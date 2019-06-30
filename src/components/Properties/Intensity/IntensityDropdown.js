import React, {Component} from 'react'

export default class Index extends Component{

    state={
        value:0.0
    }

    componentDidMount(){        
        this.setState({
            value:this.props.active.children[0].intensity
        })
    }

    handleRange = (e) =>{
        this.setState({
            value:e.target.value
        })
        this.props.active.children[0].intensity=parseFloat(e.target.value)        
    }

    render(){
        return(
            <input
            className="slider"
            id="damping"
            data-name="damping"
            type="range"
            min={0.0}
            max={1.0}
            step={0.1}
            value={this.state.value}
            onChange={this.handleRange}
            />
        )
    }
}