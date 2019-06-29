import React ,{Component, Fragment} from 'react';
import styled from 'styled-components';
import _ from 'lodash'

export default class Transform extends Component{
    state = {
        traX:0,
        traY:0,
        traZ:0,
        rotX:0,
        rotY:0,
        rotZ:0,
        scaX:0,
        scaY:0,
        scaZ:0,
    }
    componentDidMount(){     
        this.props.setController(this.setPos)
    }

    setPos = (val, mode)=>{
        if(mode==='translate'){
            this.setState({
                traX:val.x,
                traY:val.y,
                traZ:val.z,
            })
        }
        else if(mode==='rotate'){
            this.setState({
                rotX:val.x,
                rotY:val.y,
                rotZ:val.z,
            })
        }
        else{
            this.setState({
                scaX:val.x,
                scaY:val.y,
                scaZ:val.z,
            })
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
            const tx =this.props.objPresent[this.props.activeObj].position.x;
            const ty =this.props.objPresent[this.props.activeObj].position.y;
            const tz =this.props.objPresent[this.props.activeObj].position.z;
            const rx =this.props.objPresent[this.props.activeObj].rotation.x;
            const ry =this.props.objPresent[this.props.activeObj].rotation.y;
            const rz =this.props.objPresent[this.props.activeObj].rotation.z;
            const sx =this.props.objPresent[this.props.activeObj].scale.x;
            const sy =this.props.objPresent[this.props.activeObj].scale.y;
            const sz =this.props.objPresent[this.props.activeObj].scale.z;
            this.setState({
                traX:tx,
                traY:ty,
                traZ:tz,
                rotX:rx,
                rotY:ry,
                rotZ:rz,
                scaX:sx,
                scaY:sy,
                scaZ:sz,
            })
        }
    }
    handleChange=(e)=>{
        switch (e.target.name) {
            case "traX":
            this.setState({
                traX:Number(e.target.value)
            },()=>{
                this.props.changeObjectProp(this.state.traX,['position','x'],'transform')
            })
                break;
            case "traY":
            this.setState({
                traY:Number(e.target.value)
            },()=>{
                this.props.changeObjectProp(this.state.traY,['position','y'],'transform')
            })
            break;
            case "traZ":
            this.setState({
                traZ:Number(e.target.value)
            },()=>{
                this.props.changeObjectProp(this.state.traZ,['position','z'],'transform')
            })
            break;
            case "rotX":
            this.setState({
                rotX:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.rotX,['rotation','x'],'transform')
            })
                break;
            case "rotY":
            this.setState({
                rotY:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.rotY,['rotation','y'],'transform')
            })
            break;
            case "rotZ":
            this.setState({
                rotZ:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.rotZ,['rotation','z'],'transform')                
            })
            break;
            case "scaX":
            this.setState({
                scaX:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.scaX,['scale','x'],'transform')                
            })
                break;
            case "scaY":
            this.setState({
                scaY:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.scaY,['scale','y'],'transform')                
            })
            break;
            case "scaZ":
            this.setState({
                scaZ:e.target.value
            },()=>{
                this.props.changeObjectProp(this.state.scaZ,['scale','z'],'transform')                
            })
            break;
            default:
                break;
        }
    }
    render(){
        return(
            <Fragment>
                <Overlay>
                    <Container>
                        <Title>Translate</Title>
                        <Prop>
                            Z:
                            <Input name='traZ' type='number'  value={this.state.traZ} onChange={this.handleChange}/>
                        </Prop>
                        <Prop>
                            Y:
                            <Input name='traY' type='number'  value={this.state.traY} onChange={this.handleChange}/>
                        </Prop>
                        <Prop>
                            X:
                            <Input name='traX' type='number' value={this.state.traX} onChange={this.handleChange}/>
                        </Prop>
                    </Container>
                        <Container>
                        <Title>Rotation</Title>
                        <Prop>
                            Z:
                            <Input name='rotZ' type='number' value={this.state.rotZ} onChange={this.handleChange} />
                        </Prop>
                        <Prop>
                            Y:
                            <Input name='rotY' type='number' value={this.state.rotY} onChange={this.handleChange}/>
                        </Prop>
                        <Prop>
                            X:
                            <Input name='rotX' type='number'  value={this.state.rotX} onChange={this.handleChange}/>
                        </Prop>
                    </Container>
                    <Container>
                        <Title>Scale</Title>
                        <Prop>
                            Z:
                            <Input name='scaZ' type='number' value={this.state.scaZ} onChange={this.handleChange} />
                        </Prop>
                        <Prop>
                            Y:
                            <Input name='scaY' type='number' value={this.state.scaY} onChange={this.handleChange}/>
                        </Prop>
                        <Prop>
                            X:
                            <Input name='scaX' type='number'  value={this.state.scaX} onChange={this.handleChange}/>
                        </Prop>
                    </Container>
                </Overlay>
            </Fragment>
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
    margin-left: 6px;
    margin-top: 4px;
    font-weight: 700;
`
const Prop = styled.div`
    float: right;
    font-size: 11px;
    color: #9D9D9D;
    margin-right: 9px;
`
const Input = styled.input`
    width: 36px;
    height: 25px;
    border: 2px solid #DBDBDB;
    background: #DBDBDB;
    border-radius: 3px;
    font-size: 9px;
    font-weight: 600;
    color: #737373;
    &:focus{
        outline: none;
        background: #2F79EF;
        color: #fff;
        border: 2px solid #2F79EF;
    }
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`
const Overlay = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 2px solid #DBDBDB;
    margin-bottom: 20px;
    overflow: hidden;
`