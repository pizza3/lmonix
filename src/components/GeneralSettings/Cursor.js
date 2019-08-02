import React,{Component} from 'react'
import {Wrapper, Header, Title} from './styled'
import Switch from '../../designLib/Switch'
export default class Cursor extends Component{

    render(){
        return(
            <Wrapper>
                <Header>
                    <Title>Cursor</Title>
                    <Switch checked={this.props.isCursor} onChange={this.props.setCursor}/>
                </Header>
            </Wrapper>
        )
    }
}