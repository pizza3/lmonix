import React ,{Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash'
export default class Visible extends Component{
    state = {
        visible:false
    }

    componentDidMount(){
        if(this.props.activeObj>0){
            this.setState({
                visible:this.props.active.visible
            })
        }
    }
        
    componentDidUpdate(prevProps){
        if(!_.isEqual(prevProps.active,this.props.active)){
            if(this.props.objPresent.length>0){
                let val = this.props.active.visible || false
                this.setState({
                    visible:val
                })
            }
        }
    }

    handleInputChange=()=>{
        const {visible} = this.state
        this.setState({
            visible:!visible
        },()=>{
            this.props.changeObjectProp(!this.props.active.visible,'visible',)
        })

    }
    render(){
        const isObjectPresent = this.props.objPresent.length>0
        return(
            <Container>
                <Title>Visible</Title>
                <label className="form-switch">
                    {isObjectPresent?
                    <input type="checkbox" checked={this.state.visible} onChange={this.handleInputChange} />
                    :
                    <input type="checkbox" disabled  checked={this.state.visible}  />
                    }
                    <i></i>
                </label>
            </Container>
        )
    }
}


const Container = styled.div`
    position:relative;
    float:left;
    width:100%;
    height:auto;
    padding-bottom: 18px;
`
const Title = styled.div`
    position: relative;
    float: left;
    color: #969696;
    font-size: 10px;
    margin-left: 9px;
    margin-top: 4px;
    font-weight: 700;
`