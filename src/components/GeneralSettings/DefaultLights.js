import React from 'react'
import {Wrapper, Header, Title} from './styled'
import Switch from '../../designLib/Switch'


const DefaultLights = (props)=>{
    return(
        <Wrapper>
            <Header>
                <Title>Default Lights</Title>
                <Switch checked={props.isDefaultLights} onChange={props.setDefaultLights}/>
            </Header>
        </Wrapper>
    )
}
export default DefaultLights