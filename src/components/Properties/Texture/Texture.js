import React ,{Component} from 'react';
import styled from 'styled-components';
import Trigger from 'rc-trigger'
import TextureDropdown from './TextureDropdown'

export default class Texture extends Component{
    state = {
        currentTexture:'Add Texture'
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
    color: #969696;
    cursor: pointer;
`