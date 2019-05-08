import React, {Component} from 'react'

export default class OpacityRange extends Component{

    state={
        value:0.0
    }

    componentDidMount(){
        this.setState({
            value:this.props.objPresent[this.props.activeObj].children[0].material.opacity
        })
    }

    componentDidUpdate(prevProps){

    }

    handleRange = (e) =>{
        this.setState({
            value:e.target.value
        })
        this.props.objPresent[this.props.activeObj].children[0].material.opacity=parseFloat(e.target.value)        
    }

    render(){
        return(
            <input
            className="slider"
            id="opacity"
            data-name="opacity"
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