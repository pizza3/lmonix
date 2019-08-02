import React ,{Component} from 'react';
import IntensityRange from './IntensityRange'
import {Container, Title} from '../styled'

export default class Intensity extends Component{
    render(){
        return(
            <Container>
                <Title>Intensity</Title>
               <IntensityRange {...this.props} addInScene={this.props.addInScene}/>
            </Container>
        )
    }
}