import React ,{Component} from 'react';
import styled from 'styled-components';
import Images from './Images'

export default class AssetManager extends Component{
    state = {}
    render(){
        return(
            <AssetManagerContainer>
                <Title>Assets</Title>
                <Images titleName='Images' {...this.props} location={this.props.title} filterBy={['jpg', 'png','mtl','webp']}/>
                <Images titleName='Videos' {...this.props} location={this.props.title} filterBy={['mp4','webm']}/>
                <Images titleName='Models' {...this.props} location={this.props.title} filterBy={['obj']}/>
            </AssetManagerContainer>
        )
    }
}


const AssetManagerContainer = styled.div`
    position:relative;
    float:left;
    width:100%;
    height:auto;
    border-bottom: 2px solid #DBDBDB;
    padding-bottom: 10px;
`
const Title = styled.div`
    position: relative;
    float: left;
    color: #969696;
    font-size: 15px;
    margin-left: 5px;
    font-weight: 600;
    width: 100%;
`