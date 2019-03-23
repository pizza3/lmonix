import React ,{Component} from 'react';
import styled from 'styled-components';
import arrowWhite from '../../assets/arrowWhite.svg';
import arrow from '../../assets/arrow.svg';
import SceneTreeContainer from '../SceneTreeContainer';

export default class SceneTree extends Component{
    state={
        isGroup:false,
        showGroup:false
    }

    componentDidMount(){
        console.log(this.props.obj.children);
        
    }
    showGroup = () => {
        console.log('showing group inside of '+this.props.num )
        this.setState({
            showGroup:!this.state.showGroup
        })
    }
    render(){
        const SceneGraphEl = styled.div`
            position:relative;
            width: 100%;
            height: 22px;
            background: ${this.props.active ? '#2F79EF' : 'transparent'};
            border-radius: 0px;
            left: 0%;
            color: ${this.props.active ? '#FFFFFF' : '#828282'};
            font-size: 10px;
            padding: 4px 2px 0px 5px;
            &:hover{
                background: ${this.props.active ? '#186AEB':'#E6E6E6'};
            }
        `
        return(
            <Container>
                <SceneGraphEl id={'obj'+this.props.num} onClick={()=>{this.props.setActiveObj(this.props.num)}}>
                    {this.props.name}
                    {
                        this.props.obj.children.length>1?
                        <ArrowContainer onClick={this.showGroup}>
                            <ArrowImage src={this.props.active?arrowWhite:arrow} alt={'open'} showGroup={this.state.showGroup}/>
                        </ArrowContainer>
                        :
                        null
                    }
                </SceneGraphEl>
                {/* {
                    this.props.obj.children.length>=2 && this.state.showGroup?
                    // this.props.obj.children.map((obj,i)=>{
                        // <SceneTreeContainer num={1} name={this.props.obj.children[1].objName} obj={this.props.obj.children[1]} active={true} {...this.props} objPresent={this.props.objPresent}  check={false} />
                        <SceneGraphEl id={'obj'+this.props.num} onClick={()=>{this.props.setActiveObj(this.props.num)}}>
                        </SceneGraphEl>

                    // })                    
                    :
                    null
                } */}
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