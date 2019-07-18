import React ,{Component} from 'react';
import styled from 'styled-components';
import Trigger from 'rc-trigger'
import TextureDropdown from './TextureDropdown'
import Cross from '../../../assets/cross.svg'
export default class Texture extends Component{
    state = {
        currentTexture:'Add Texture',
        isTexture:false
    }

    componentDidMount(){
        if(this.props.active&&this.props.active.objTexture&&this.props.active.objTexture.name){
            this.setState({
                isTexture:true,
                currentTexture:this.props.active.objTexture.name
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.activeObj!==this.props.activeObj){
            if(this.props.active&&this.props.active.objTexture&&this.props.active.objTexture.name){
                this.setState({
                    isTexture:true,
                    currentTexture:this.props.active.objTexture.name
                })
            }
            else{
                this.setState({
                    isTexture:false
                })
            }
        }
    }

    checkForTexture = () => {
        this.setState({
            isTexture:true,
            currentTexture:this.props.active.objTexture.name
        })
    }

    removeTexture = () => { 
        this.props.changeObjectProp(null,'map','material')
        this.props.changeObjectProp(true,'needsUpdate','material')
        this.props.changeObjectProp({},'objTexture')  
        this.setState({
            isTexture:false
        })      
    }

    render(){
        const { currentTexture, isTexture } = this.state
        const content = this.props.active? 
        this.props.active.objTexture?
        this.props.active.objTexture.name
        :currentTexture
        :currentTexture
        return(
            <Container>
                <Title>Texture</Title>
                <Trigger action={['click']} popup={<div><TextureDropdown {...this.props} addInScene={this.props.addInScene} checkForTexture={this.checkForTexture}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                        points: ["tr", "bl"],
                        offset: [-290, -20],
                }}>
                    <Input>
                        {isTexture?content:'Add Texture'}
                    </Input>
                </Trigger>
                {isTexture?<Delete src={Cross} onClick={this.removeTexture}/>:null}
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
const Input = styled.div`
    position: relative;
    float: right;
    width: 141px;
    height: 25px;
    border: 2px solid #DBDBDB;
    background: #DBDBDB;
    border-radius: 3px;
    margin-right: 6px;
    font-size: 10px;
    padding: 4px;
    padding-right: 15px;
    color: #969696;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`
const Delete = styled.img`
    position: absolute;
    width: 21px;
    right: 8px;
    top: 2px;
    border-radius: 3px;
    &:hover{
        background: #c7c7c7;
    }
`