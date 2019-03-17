import React ,{Component} from 'react';
import styled from 'styled-components';
import Trigger from 'rc-trigger'
import TextureDropdown from './TextureDropdown'

export default class Texture extends Component{
    state = {
        currentTexture:'Add Texture'
    }
    componentDidMount(){

    }
    render(){
        return(
            <Container>
                <Title>Texture</Title>
                <Trigger action={['click']} popup={<div><TextureDropdown {...this.props} addInScene={this.props.addInScene}/></div>} prefixCls='dropdown' 
                    popupAlign={{
                        points: ["tr", "bl"],
                        offset: [-280, -20],
                }}>
                    <Input>
                        {this.state.currentTexture}
                    </Input>
                </Trigger>
            </Container>
        )
    }
}


const Container = styled.div`
    position:relative;
    float:left;
    width:100%;
    height:auto;
    padding-bottom: 10px;
`
const Title = styled.div`
    position: relative;
    float: left;
    color: #969696;
    font-size: 12px;
    margin-left: 9px;
    margin-top: 4px;
`

const Input = styled.div`
    position: relative;
    float: right;
    width: 138px;
    height: 25px;
    border: 2px solid #DBDBDB;
    background: #DBDBDB;
    border-radius: 3px;
    margin-right: 18px;
    font-size: 10px;
    padding: 4px;
    color: #969696;
    cursor: pointer;
`