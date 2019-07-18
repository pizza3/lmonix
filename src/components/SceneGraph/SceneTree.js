import React ,{Component} from 'react';
import styled from 'styled-components';
import arrowWhite from '../../assets/arrowWhite.svg';
import arrow from '../../assets/arrow.svg';
import _ from 'lodash'
export default class SceneTree extends Component{
    state={
        isGroup:false,
        showGroup:false
    }
    componentDidMount(){
        const {activeDrilldown,num}=this.props        
        if(_.isUndefined(activeDrilldown[this.props.obj.uuid])){
            this.setState({
                showGroup:false
            })
        }
        else{
            this.setState({
                showGroup:activeDrilldown[this.props.obj.uuid]
            })     
        }
    }
    showGroup = () => {
        const {showGroup}=this.state
        this.setState({
            showGroup:!showGroup
        },()=>{
            this.props.updateActiveDrilldown(this.props.obj.uuid,!showGroup)
        })
    }

    render(){
        const {layer, active}=this.props
        const isActive = this.props.obj.uuid === active.uuid
        const SceneGraphEl = styled.div`
            position:relative;
            width: 100%;
            height: 22px;
            background: ${isActive ? '#2F79EF' : 'transparent'};
            border-radius: 0px;
            left: 0%;
            color: ${isActive ? '#FFFFFF' : '#828282'};
            font-size: 10px;
            padding: 4px 2px 0px ${5+3*layer}px;
            &:hover{
                background: ${isActive ? '#186AEB':'#E6E6E6'};
            }
        `
        return(
            <Container>
                <SceneGraphEl id={'obj'+this.props.obj.uuid} onClick={()=>{this.props.setActiveObj(this.props.obj)}}>
                    {this.props.name}
                    {
                        this.props.obj.children.length>1?
                        <ArrowContainer onClick={this.showGroup}>
                            <ArrowImage src={isActive?arrowWhite:arrow} alt={'open'} showGroup={this.state.showGroup}/>
                        </ArrowContainer>
                        :
                        null
                    }
                </SceneGraphEl>
                {this.state.showGroup?this.props.children:[]}
            </Container>
        )
    }
}


const Container = styled.div`
    position:relative;
    width:100%;
    float:left;
    height:auto;
`

const ArrowContainer = styled.button`
    position: relative;
    float: right;
    width: 13px;
    height: 15px;
    border: none;
    background: transparent;
`

const ArrowImage = styled.img`
    width: 5px;
    transform: ${props=>props.showGroup?'rotate(90deg)':'rotate(0deg)'};
`