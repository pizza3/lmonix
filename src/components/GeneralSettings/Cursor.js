import React,{Component} from 'react'
import styled from 'styled-components';

export default class Cursor extends Component{

    render(){
        return(
            <Wrapper>
                <Header>
                    <Title>Cursor</Title>
                    <label className="form-switch">
                        <input type="checkbox" checked={this.props.isCursor} onChange={this.props.setCursor} />
                        <i></i>
                    </label>
                </Header>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position:relative;
    width:100%;
    height:auto;
    float: left;
    padding: 15px 7px 0px 7px;
`

const Header = styled.div`
    position:relative;
    width:100%;
    height:19px;
`
const Title = styled.div`
    position:relative;
    float:left;
    font-size: 12px;
    color: #b7b7b7;
    font-weight:500;
`